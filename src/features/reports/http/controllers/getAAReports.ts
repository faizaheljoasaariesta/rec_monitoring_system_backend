import { Request, Response } from "express";
import { format } from "date-fns";
import { 
  getAllProduct,
  getAllProductNumbers,
  getAllOperatorNumbers,
  getLatestAAData, 
  getFilteredAAData,
  getAAReportSummary,
  getAAReportDailySummary,
  getAAReportOperatorSummary,
  getDailyAnalytic
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

export const getAllProductController = async (req: Request, res: Response) => {
  try {
    const product = await getAllProduct();
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

export const getDailyAnalyticController = async (req: Request, res: Response) => {
  try {
    const { start, end } = req.query;

    const formatDate = (date: Date) => format(date, "yyyy-MM-dd HH:mm:ss");

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const startDate = start ? String(start) : formatDate(yesterday);
    const endDate = end ? String(end) : formatDate(today);

    const analytic = await getDailyAnalytic(startDate, endDate);

    res.status(200).json({
      status: 'success',
      code: 200,
      message: `Get analytic data success!`,
      data: { 
        date: {startDate, endDate},
        analytic,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      statue: 'error',
      code: 500,
      message: "Error fatching daily analytic for AA_IQT!",
      error: err.message
    });
  }
}