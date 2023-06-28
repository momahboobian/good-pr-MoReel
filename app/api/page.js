const { Octokit } = require("@octokit/rest");

const owner = "nataliiazab";
const repository = "good-pr";

export const GET = async (request) => {
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_AUTH_TOKEN,
    });

    const assignees = await octokit.rest.repos.listCollaborators({
      owner,
      repo: repository,
    });

    const contributorsNames = assignees.data.map((el) => el.login);

    return response.status(200).json({ contributorsNames });
  } catch (error) {
    return response.status(500).json({ message: "Failed to fetch all issues" });
  }
};
