import { Router } from "express";
import { 
  getAllProductController,
  getAllProductNumbersController,
  getAllOperatorNumbersController,
  getLatestAADataController,
  getFilteredAADataController,
  getAAReportSummaryController,
  getAAReportDailySummaryController,
  getAAReportOperatorSummaryController,
} from "../controllers/getAAReports";

const reports_routes = Router();

reports_routes.get("/aa-iot/product-list", getAllProductController);
reports_routes.get("/aa-iot/product", getAllProductNumbersController);
reports_routes.get("/aa-iot/operator", getAllOperatorNumbersController);
reports_routes.get("/aa-iot/latest", getLatestAADataController);
reports_routes.get("/aa-iot/filter", getFilteredAADataController);
reports_routes.get("/aa-iot/summary", getAAReportSummaryController);
reports_routes.get("/aa-iot/summary/daily", getAAReportDailySummaryController);
reports_routes.get("/aa-iot/summary/operator", getAAReportOperatorSummaryController);

export default reports_routes;