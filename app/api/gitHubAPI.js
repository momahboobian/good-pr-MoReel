const { Octokit } = require("@octokit/rest");

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  });

  const owner = "nataliiazab";
  const repository = "good-pr";

  const assignees = await octokit.request(
    `https://api.github.com/repos/${owner}/${repository}/assignees`
  );
  const repo = await octokit.request(
    `https://api.github.com/repos/${owner}/${repository}`
  );
  const issues = await octokit.request(
    `https://api.github.com/repos/${owner}/${repository}/issues`
  );
  const contributors = await octokit.request(
    `https://api.github.com/repos/${owner}/${repository}/contributors`
  );
  const languages = await octokit.request(
    `https://api.github.com/repos/${owner}/${repository}/languages`
  );

  const contributorsNames = assignees.data.map((el) => el.login); //used to retrieve individual PRs

  const pr = await Promise.all(
    contributorsNames.map(
      async (contributorName) =>
        await octokit.request("GET /search/issues", {
          q: `is:pr repo:${owner}/${repository} author:${contributorName}`,
        })
    )
  );

  return res.status(200).json({
    repo: repo,
    assignees: assignees,
    issues: issues,
    contributors: contributors,
    languages: languages,
    pr: pr,
  });
};