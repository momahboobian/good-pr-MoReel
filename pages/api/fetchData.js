import { google } from "googleapis";
import { fetchRepoData } from "./github";

// Fetch Data from Google Sheets
export async function dataFromGoogleSheets() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth: await auth.getClient(),
    });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1z9Svk5NKdDlg-Ph00ol8B-MC70tIOJxYIczSOWnGj0E",
      range: "spreadsheet!A2:C",
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No data found in the sheet" });
    }

    const dataSheet = await Promise.all(
      rows.map(async (row) => {
        const [team_name, repo_url, cohort] = row;

        if (!team_name || !repo_url || !cohort) {
          throw new Error("One or more required columns are empty!");
        }

        const urlParts = repo_url.split("/");
        const repoOwner = urlParts[urlParts.length - 2];
        const repoName = urlParts[urlParts.length - 1];

        try {
          const repoData = await fetchRepoData(repoOwner, repoName);

          return {
            id: repoData.id,
            team_name,
            repo_url,
            cohort,
            repo_owner: repoOwner,
            repo_name: repoName,
            demo_url: repoData.demo_url,
          };
        } catch (error) {
          throw new Error(
            `One or more repository URLs are invalid! ${error.message}`
          );
        }
      })
    );

    return {
      message: "Data retrieved and logged successfully data!",
      data: dataSheet,
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
// Placeholder for future data fetching function from Admin Panel
