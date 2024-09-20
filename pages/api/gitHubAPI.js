<<<<<<< HEAD
import { PrismaClient } from "@prisma/client";

const { Octokit } = require("@octokit/rest");
=======
const { Octokit } = require("@octokit/rest");
import { PrismaClient } from "@prisma/client";
>>>>>>> 60d7b2c6e096f957bb81572040c1c39291ead2f0
const prisma = new PrismaClient();
// Create an in-memory cache object
const cache = {};

// Create Octokit instance with the current token
const octokit = new Octokit({
<<<<<<< HEAD
  auth: process.env.GITHUB_AUTH_TOKEN,
=======
	auth: process.env.GITHUB_AUTH_TOKEN,
>>>>>>> 60d7b2c6e096f957bb81572040c1c39291ead2f0
});

// Time in milliseconds for cache expiration (30 minutes)
const cacheExpirationTime = 30 * 60 * 1000;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
<<<<<<< HEAD
  const { owner, repository } = req.body; // Extract the id from the request body
  // const owner = "nataliiazab";
  // const repository = "good-pr";
  try {
    const [repoData, assigneesData] = await Promise.all([
      getCached(`repo_${owner}_${repository}`, () => octokit.request(`GET /repos/${owner}/${repository}`)),
      getCached(`assignees_${owner}_${repository}`, () =>
        octokit.request(`GET /repos/${owner}/${repository}/assignees`)
      ),
    ]);
    const contributorsNames = assigneesData.data.map((el) => el.login);
    const [prData, closedIndividualIssues, issues] = await Promise.all([
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
          getCached(`pr_${owner}_${repository}_${contributorName}_closedIndividualIssues`, () =>
            octokit.request("GET /search/issues", {
              q: ` repo:${owner}/${repository} type:issue assignee:${contributorName} state:closed`,
            })
          )
        )
      ),
      getCached(`pr_${owner}_${repository}_issues`, () => octokit.request(`GET /repos/${owner}/${repository}/issues`)),
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
        repo_url: { set: githubURL },
        demo_url: { set: demoURL },
      },
    });

    const issuesClosed = closedIndividualIssues;

    return res
      .status(200)
      .json([
        repoData.data,
        issues.data,
        issuesClosed.filter((el) => el.data.items.length > 0).map((el) => el.data),
        prData.filter((el) => el.data.items.length > 0).map((el) => el.data),
      ]);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Error fetching data" });
  }
=======
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
		const [prData, closedIndividualIssues, issues] = await Promise.all([
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
			getCached(`pr_${owner}_${repository}_issues`, () =>
				octokit.request(`GET /repos/${owner}/${repository}/issues`)
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
				repo_url: { set: githubURL },
				demo_url: { set: demoURL },
			},
		});

		const issuesClosed = closedIndividualIssues;

		return res
			.status(200)
			.json([
				repoData.data,
				issues.data,
				issuesClosed
					.filter((el) => el.data.items.length > 0)
					.map((el) => el.data),
				prData.filter((el) => el.data.items.length > 0).map((el) => el.data),
			]);
	} catch (error) {
		console.error("Error fetching data:", error);
		return res.status(500).json({ error: "Error fetching data" });
	}
>>>>>>> 60d7b2c6e096f957bb81572040c1c39291ead2f0
};

// Helper function to get data from cache or make a request and store the response in the cache
async function getCached(key, requestFn) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 60d7b2c6e096f957bb81572040c1c39291ead2f0
}
