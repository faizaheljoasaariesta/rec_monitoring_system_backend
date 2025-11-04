import { Request, Response } from "express";
import { getLatestAAData } from "../services/getLatestAAData";

export const getLatestAADataController = async (req: Request, res: Response) => {
  try {
    const data = await getLatestAAData();
    res.status(200).json({
      success: true,
      data
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching latest AA data",
      error: err.message
    });
  }
};