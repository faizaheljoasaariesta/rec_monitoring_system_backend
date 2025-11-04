import { Request, Response } from "express";
import { sql, connect } from "../../../../utils/databases/mssqlConnection";
import { generateAAReportQuery } from "../services/generateAAReportQuery";

export const getAAReportController = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({
      success: false,
      message: "startDate and endDate query parameters are required",
    });
  }

  try {
    const pool = await connect();
    const query = generateAAReportQuery(String(startDate), String(endDate));
    const result = await pool.request().query(query);

    return res.status(200).json({
      success: true,
      message: `AA report from ${startDate} to ${endDate}`,
      data: result.recordset,
    });
  } catch (err: any) {
    console.error("Error fetching AA report:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching AA report",
      error: err.message || err,
    });
  }
};