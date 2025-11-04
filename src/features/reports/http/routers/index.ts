import express from 'express';
// import { getAAReportController } from '../controllers/getAAReportController';
import { getLatestAADataController } from '../controllers/getLatestAADataController';

const reports_routes = express.Router();

// reports_routes.get('/reports/aa', getAAReportController);
reports_routes.get('/reports/aa/latest', getLatestAADataController)

export default reports_routes;