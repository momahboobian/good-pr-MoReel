const { Octokit } = require("@octokit/rest");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create an in-memory cache object
const cache = {};

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN,
});

// Time in milliseconds for cache expiration (30 minutes)
const cacheExpirationTime = 30 * 60 * 1000;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  // const { owner, repository } = req.body; // Extract owner and repository from the request body
  // const owner = "howard-ss";
  // const repository = "Study-Buddies-Final-Project";

  // const owner = "nataliiazab";
  // const repository = "good-pr";

  // const owner = "Innapoliakova";
  // const repository = "set";

  // const owner = "Bahare09";
  // const repository = "ldn9-fp-wordwise";

  // const owner = "BoshraM";
  // const repository = "ldn9-Ctrl-Shift-Learn";

  // const owner = "ShayanMahnam";
  // const repository = "lentegeur-hospital-facility-board";

  const owner = "susanssky";
  const repository = "careless-whisper";

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

    const [issuesClosedData, issuesOpenData, prData] = await Promise.all([
      getCached(`closed_issues_${owner}_${repository}`, () =>
        octokit.request(`GET /repos/${owner}/${repository}/issues`, {
          state: "closed",
        })
      ),
      getCached(`open_issues_${owner}_${repository}`, () =>
        octokit.request(`GET /repos/${owner}/${repository}/issues`, {
          state: "open",
        })
      ),
      Promise.all(
        contributorsNames.map((contributorName) =>
          getCached(`pr_${owner}_${repository}_${contributorName}`, () =>
            octokit.request("GET /search/issues", {
              q: `is:pr repo:${owner}/${repository} author:${contributorName}`,
            })
          )
        )
      ),
    ]);

    const repositoryUpdatedAt = repoData.data.pushed_at;
    const repoId = repoData.data.id;

    // Insert the repository.updated_at value into the database
    const thiss = await prisma.repository.update({
      where: { id: Number(repoId) },
      data: {
        updated_at: repositoryUpdatedAt,
      },
    });
    console.log(thiss);
    console.log(repoId);

    return res
      .status(200)
      .json([
        repoData.data,
        issuesClosedData.data,
        issuesOpenData.data,
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

  const response = await requestFn();
  cache[key] = {
    data: response,
    cachedTime: Date.now(),
  };

  return response;
}
