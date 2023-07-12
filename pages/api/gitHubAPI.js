const { Octokit } = require("@octokit/rest");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Create an in-memory cache object
const cache = {};

//tokens
const tokens = [
  process.env.GITHUB_AUTH_TOKEN_1,
  process.env.GITHUB_AUTH_TOKEN_2,
  process.env.GITHUB_AUTH_TOKEN_3,
];

let currentTokenIndex = 0;

function rotateToken() {
  currentTokenIndex = (currentTokenIndex + 1) % tokens.length;
}

// Function to get the current token
function getCurrentToken() {
  return tokens[currentTokenIndex];
}

// Create Octokit instance with the current token
const octokit = new Octokit({
  auth: getCurrentToken(),
});

// Time in milliseconds for cache expiration (30 minutes)
const cacheExpirationTime = 30 * 60 * 1000;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { owner, repository } = req.body; // Extract the id from the request body
  // const owner = "nataliiazab";
  // const repository = "good-pr";
  try {
    const [repoData, assigneesData] = await Promise.all([
      getCached(`repo_${owner}_${repository}`, () =>
        octokit.request(`GET /repos/${owner}/${repository}`)
      ),
      getCached(`assignees_${owner}_${repository}`, () =>
        octokit.request(`GET /repos/${owner}/${repository}/assignees`)
      ),
    ]);
    const contributorsNames = assigneesData.data.map((el) => el.login);
    const [prData, closedIndividualIssues, openIndividualIssues] =
      await Promise.all([
        Promise.all(
          contributorsNames.map((contributorName) =>
            getCached(`pr_${owner}_${repository}_${contributorName}`, () =>
              octokit.request("GET /search/issues", {
                q: `is:pr repo:${owner}/${repository} author:${contributorName}`,
              })
            )
          )
        ),
        Promise.all(
          contributorsNames.map((contributorName) =>
            getCached(
              `pr_${owner}_${repository}_${contributorName}_closedIndividualIssues`,
              () =>
                octokit.request("GET /search/issues", {
                  q: ` repo:${owner}/${repository} type:issue assignee:${contributorName} state:closed`,
                })
            )
          )
        ),
        Promise.all(
          contributorsNames.map((contributorName) =>
            getCached(
              `pr_${owner}_${repository}_${contributorName}_openIndividualIssues`,
              () =>
                octokit.request("GET /search/issues", {
                  q: ` repo:${owner}/${repository} type:issue assignee:${contributorName} state:open`,
                })
            )
          )
        ),
      ]);
    const repositoryUpdatedAt = repoData.data.pushed_at;
    const repoId = repoData.data.id;
    const githubURL = repoData.data.html_url;
    const demoURL = repoData.data.homepage;
    //calculates total number of prs
    const prs = prData
      .filter((el) => el.data.items.length > 0)
      .map((el) => el.data.total_count)
      .reduce((sum, el) => sum + el, 0);
    // Insert the repository.updated_at and total_prs into the database
    await prisma.repository.updateMany({
      where: { id: repoId },
      data: {
        updated_at: { set: repositoryUpdatedAt },
        total_prs: { set: prs },
        github_url: { set: githubURL },
        demo_url: { set: demoURL },
      },
    });
    //

    const issuesClosed = closedIndividualIssues
      .filter((el) => el.data.items.length > 0)
      .map((el) => el.data);
    const issuesOpen = openIndividualIssues
      .filter((el) => el.data.items.length > 0)
      .map((el) => el.data);

    return res
      .status(200)
      .json([
        repoData.data,
        issuesOpen,
        issuesClosed,
        prData.filter((el) => el.data.items.length > 0).map((el) => el.data),
      ]);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Error fetching data" });
  }
};

// Helper function to get data from cache or make a request and store the response in the cache
async function getCached(key, requestFn) {
  const cachedItem = cache[key];
  if (cachedItem && Date.now() - cachedItem.cachedTime < cacheExpirationTime) {
    return cachedItem.data;
  }
  try {
    const response = await requestFn();
    cache[key] = {
      data: response,
      cachedTime: Date.now(),
    };
    return response;
  } catch (error) {
    if (
      error.status === 403 &&
      error.response.headers["x-ratelimit-remaining"] === "0" &&
      error.response.headers["x-ratelimit-resource"] === "search"
    ) {
      // Delay before retrying
      await delay(60 * 1000); // Wait for 60 seconds

      rotateToken();
      octokit.auth = getCurrentToken();

      // Retry the request using the new token
      return getCached(key, requestFn);
    }
    throw error;
  }
}

// Helper function for delaying execution
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
