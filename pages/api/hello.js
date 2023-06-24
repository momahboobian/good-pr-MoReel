const { Octokit } = require("@octokit/rest");

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  });

  const owner = "nataliiazab";
  const repos = "good-pr";

  const repo = await octokit.request(
    "https://api.github.com/repos/nataliiazab/good-pr"
  );
  const issues = await octokit.request(
    "https://api.github.com/repos/nataliiazab/good-pr/issues"
  );
  const contributors = await octokit.request(
    "https://api.github.com/repos/nataliiazab/good-pr/contributors"
  );
  const languages = await octokit.request(
    "https://api.github.com/repos/nataliiazab/good-pr/languages"
  );

  const contributorsNames = contributors.data.map((el) => el.login); //used to retrieve individual PRs

  const pr = await Promise.all(
    contributorsNames.map(
      async (contributorName) =>
        await octokit.request("GET /search/issues", {
          q: `is:pr repo:${owner}/${repos} author:${contributorName}`,
        })
    )
  );

  return res.status(200).json({
    repo: repo,
    issues: issues,
    contributors: contributors,
    languages: languages,
    pr: pr,
  });
};
