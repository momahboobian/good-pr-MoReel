import { dataFromGoogleSheets } from "./fetchData";
import { processData } from "./processData";

export default async function googleSheet(req, res) {
  const { action } = req.query;

  try {
    const dataSheet = await dataFromGoogleSheets();

    await processData(dataSheet, action);

    return res.status(200).json({
      message: "Data retrieved and logged successfully from!",
      data: dataSheet,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
