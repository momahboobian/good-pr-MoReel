import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_TOKEN,
});

export async function fetchRepoData(repoOwner, repoName) {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const repoData = await octokit.request(
        `GET /repos/${repoOwner}/${repoName}`
      );
      return {
        id: repoData.data.id,
        demo_url: repoData.data.homepage,
      };
    } catch (error) {
      console.error(
        `Error fetching data for ${repoOwner}/${repoName}:`,
        error.message
      );
      retries++;
      if (retries >= maxRetries) {
        throw new Error(`Failed to fetch data for ${repoOwner}/${repoName}`);
      }
    }
  }
}
