const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN,
});
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const owner = "nataliiazab";
  const repository = "good-pr";

  try {
    const [repoData, assigneesData] = await Promise.all([
      octokit.request(`GET /repos/${owner}/${repository}`),
      octokit.request(`GET /repos/${owner}/${repository}/assignees`),
    ]);

    const contributorsNames = assigneesData.data.map((el) => el.login);

    const [issuesClosedData, issuesOpenData, prData] = await Promise.all([
      octokit.request(`GET /repos/${owner}/${repository}/issues`, {
        state: "closed",
      }),
      octokit.request(`GET /repos/${owner}/${repository}/issues`, {
        state: "open",
      }),
      Promise.all(
        contributorsNames.map((contributorName) =>
          octokit.request("GET /search/issues", {
            q: `is:pr repo:${owner}/${repository} author:${contributorName}`,
          })
        )
      ),
    ]);

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
