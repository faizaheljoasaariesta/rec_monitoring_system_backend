import { Request, Response } from "express";
import { 
  getAllProductNumbers,
  getAllOperatorNumbers,
  getLatestAAData, 
  getFilteredAAData,
  getAAReportSummary,
  getAAReportDailySummary,
  getAAReportOperatorSummary
} from "../services/queryAAReport";

export const getAllOperatorNumbersController = async (req: Request, res: Response) => {
  try {
    const data = await getAllOperatorNumbers();
    res.status(200).json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching latest AA data",
      error: err.message
    });
  }
};

export const getAllProductNumbersController = async (req: Request, res: Response) => {
  try {
    const product = await getAllProductNumbers();
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Get all product success.',
      data: { product },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: "Error to get all product",
      error: err.message
    });
  }
};

export const getLatestAADataController = async (req: Request, res: Response) => {
  try {
    const data = await getLatestAAData();
    res.status(200).json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching latest AA data",
      error: err.message
    });
  }
};

export const getFilteredAADataController = async (req: Request, res: Response) => {
  try {
    const { start, end, product, item } = req.query;

    const data = await getFilteredAAData(
      start as string,
      end as string,
      product as string,
      item as string
    );

    res.status(200).json({
      success: true,
      count: data.length,
      filters: { start, end, product, item },
      data
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching filtered AA data",
      error: err.message
    });
  }
};

export const getAAReportSummaryController = async (req: Request, res: Response) => {
  try {
    const { start, end, product } = req.query;

    const summary = await getAAReportSummary(
      start as string,
      end as string,
      product as string
    );

    res.status(200).json({
      success: true,
      filters: { start, end, product },
      summary
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching AA report summary",
      error: err.message
    });
  }
};

export const getAAReportDailySummaryController = async (req: Request, res: Response) => {
  try {
    const { start, end, product } = req.query;

    const summary = await getAAReportDailySummary(
      start as string,
      end as string,
      product as string
    );

    res.status(200).json({
      success: true,
      filters: { start, end, product },
      data: summary
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching daily AA report summary",
      error: err.message
    });
  }
};

export const getAAReportOperatorSummaryController = async (req: Request, res: Response) => {
  try {
    const { start, end, product } = req.query;

    const summary = await getAAReportOperatorSummary(
      start as string,
      end as string,
      product as string
    );

    res.status(200).json({
      success: true,
      filters: { start, end, product },
      data: summary
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Error fetching operator AA report summary",
      error: err.message
    });
  }
};