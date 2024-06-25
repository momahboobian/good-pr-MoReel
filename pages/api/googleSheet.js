import { dataFromGoogleSheets } from "./fetchData";
import { processData } from "./processData";

export default async function googleSheet(req, res) {
  const { sheetId, action } = req.query;

  try {
    if (!sheetId) {
      return res.status(400).json({ error: "Sheet ID is required" });
    }

    if (sheetId !== process.env.GOOGLE_SHEET_ID) {
      return res
        .status(401)
        .json({ error: "The provided Sheet ID does not match our records." });
    }

    const dataSheet = await dataFromGoogleSheets(sheetId);

    await processData(dataSheet, action);

    return res.status(200).json({
      message: "Data retrieved and logged successfully!",
      data: dataSheet,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: error.message });
  }
}
