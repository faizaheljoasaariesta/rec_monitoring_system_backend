import { connect } from "../../../../utils/databases/mssqlConnection";
import { runQuery } from "./runQuery";

export const getDailyAnalytic = async (start: string, end: string) => {
  return runQuery(async (pool) => {
    const result = await pool
    .request()
    .input("start", start)
    .input("end", end)
    .query(`
      DECLARE @today DATETIME = CAST(@end AS DATETIME);
      DECLARE @yesterday DATETIME = CAST(@start AS DATETIME);
      DECLARE @date1 DATETIME = DATEADD(DAY, -365, @today);
      DECLARE @date2 DATETIME = @today;

      WITH F1 AS(
      SELECT
          LOG_ID,
          PRODUCT_NO,
          EMP_NO,
          CASE
              WHEN LEN(LOG_FILENAME) = 16 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 12, 11)
              WHEN LEN(LOG_FILENAME) = 17 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 13, 11)
          END AS SN,
          CASE 
              WHEN LEN(LOG_FILENAME) = 16 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 1, 1)
              WHEN LEN(LOG_FILENAME) = 17 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 2, 2)
          END AS MACHINE_ID,
          TEST_RESULT,
          CREATE_DATETIME,
          TEST_DATETIME
      FROM
          [REC_DB].[dbo].[RG_AA_IOT]
      WHERE
          TEST_DATETIME BETWEEN @date1 AND @date2
          AND LOG_FILENAME NOT LIKE '%999%'
          AND (PRODUCT_NO LIKE 'AFM531%' OR PRODUCT_NO LIKE 'AFM331%') AND PRODUCT_NO NOT LIKE 'AFM624%'
          AND TEST_ITEM = 'FOCUS_ANALYTICS_1'
      ),
      F2 AS(
      SELECT
          LOG_ID,
          PRODUCT_NO,
          EMP_NO,
          CASE
              WHEN LEN(LOG_FILENAME) = 16 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 12, 11)
              WHEN LEN(LOG_FILENAME) = 17 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 13, 11)
          END AS SN,
          CASE 
              WHEN LEN(LOG_FILENAME) = 16 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 1, 1)
              WHEN LEN(LOG_FILENAME) = 17 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 2, 2)
          END AS MACHINE_ID,
          TEST_RESULT,
          CREATE_DATETIME,
          TEST_DATETIME
      FROM
          [REC_DB].[dbo].[RG_AA_IOT]
      WHERE
          TEST_DATETIME BETWEEN @date1 AND @date2
          AND LOG_FILENAME NOT LIKE '%999%'
          AND (PRODUCT_NO LIKE 'AFM531%' OR PRODUCT_NO LIKE 'AFM331%') AND PRODUCT_NO NOT LIKE 'AFM624%'
          AND TEST_ITEM = 'FOCUS_ANALYTICS_2'
      ),
      F3 AS(
      SELECT
          LOG_ID,
          PRODUCT_NO,
          EMP_NO,
          CASE
              WHEN LEN(LOG_FILENAME) = 16 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 12, 11)
              WHEN LEN(LOG_FILENAME) = 17 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 13, 11)
          END AS SN,
          CASE 
              WHEN LEN(LOG_FILENAME) = 16 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 1, 1)
              WHEN LEN(LOG_FILENAME) = 17 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 2, 2)
          END AS MACHINE_ID,
          TEST_RESULT,
          CREATE_DATETIME,
          TEST_DATETIME
      FROM
          [REC_DB].[dbo].[RG_AA_IOT]
      WHERE
          TEST_DATETIME BETWEEN @date1 AND @date2
          AND LOG_FILENAME NOT LIKE '%999%'
          AND (PRODUCT_NO LIKE 'AFM531%' OR PRODUCT_NO LIKE 'AFM331%') AND PRODUCT_NO NOT LIKE 'AFM624%'
          AND TEST_ITEM = 'FOCUS_ANALYTICS_3'
      ),
      F4 AS(
      SELECT
          LOG_ID,
          PRODUCT_NO,
          EMP_NO,
          CASE
              WHEN LEN(LOG_FILENAME) = 16 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 12, 11)
              WHEN LEN(LOG_FILENAME) = 17 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 13, 11)
          END AS SN,
          CASE 
              WHEN LEN(LOG_FILENAME) = 16 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 1, 1)
              WHEN LEN(LOG_FILENAME) = 17 THEN SUBSTRING(LOG_FILENAME, CHARINDEX('.', LOG_FILENAME) - 2, 2)
          END AS MACHINE_ID,
          TEST_RESULT,
          CREATE_DATETIME,
          TEST_DATETIME
      FROM
          [REC_DB].[dbo].[RG_AA_IOT]
      WHERE
          TEST_DATETIME BETWEEN @date1 AND @date2
          AND LOG_FILENAME NOT LIKE '%999%'
          AND (PRODUCT_NO LIKE 'AFM531%' OR PRODUCT_NO LIKE 'AFM331%') AND PRODUCT_NO NOT LIKE 'AFM624%'
          AND TEST_ITEM = 'FOCUS_ANALYTICS_4'
      ),
      JOIN_TABLE AS(
      SELECT
          F1.LOG_ID AS LOG_ID_1,
          F2.LOG_ID AS LOG_ID_2,
          F3.LOG_ID AS LOG_ID_3,
          F4.LOG_ID AS LOG_ID_4,
          F1.EMP_NO,
          F1.PRODUCT_NO AS PRODUCT_NO,
          F1.SN AS SN,
          F1.MACHINE_ID AS MACHINE_ID,
          F1.TEST_RESULT AS F1_RESULT,
          F2.TEST_RESULT AS F2_RESULT,
          F3.TEST_RESULT AS F3_RESULT,
          F4.TEST_RESULT AS F4_RESULT,
          F1.CREATE_DATETIME,
          F1.TEST_DATETIME
      FROM F1
      LEFT JOIN F2 ON 
          F1.SN = F2.SN 
          AND F1.MACHINE_ID = F2.MACHINE_ID
          AND F1.TEST_DATETIME = F2.TEST_DATETIME
          AND abs(F2.LOG_ID-F1.LOG_ID) < 5
      LEFT JOIN F3 ON
          F1.SN = F3.SN 
          AND F1.MACHINE_ID = F3.MACHINE_ID
          AND F1.TEST_DATETIME = F3.TEST_DATETIME
          AND abs(F3.LOG_ID-F2.LOG_ID) < 5
      LEFT JOIN F4 ON
          F1.SN = F4.SN 
          AND F1.MACHINE_ID = F4.MACHINE_ID
          AND F1.TEST_DATETIME = F4.TEST_DATETIME
          AND abs(F4.LOG_ID-F3.LOG_ID) < 5
      ),
      OK_TABLE AS(
      SELECT
          EMP_NO,
          LOG_ID_1,
          LOG_ID_2,
          LOG_ID_3,
          LOG_ID_4,
          PRODUCT_NO,
          SN,
          MACHINE_ID,
          F1_RESULT,
          F2_RESULT,
          F3_RESULT,
          F4_RESULT,
          CREATE_DATETIME,
          TEST_DATETIME,
          ROW_NUMBER() OVER (PARTITION BY SN ORDER BY LOG_ID_1 DESC) AS RowNum
      FROM 
          JOIN_TABLE
      WHERE
          (F1_RESULT LIKE '%OK%' AND F2_RESULT LIKE '%OK%' AND F3_RESULT LIKE '%OK%' AND F4_RESULT LIKE '%OK%' )
          OR(F1_RESULT LIKE '%OK%' AND F2_RESULT LIKE '%OK%' AND F3_RESULT LIKE '%OK%' AND (MACHINE_ID = 5 OR MACHINE_ID = 7))
      ),
      NG_TABLE AS(
      SELECT
          EMP_NO,
          LOG_ID_1,
          LOG_ID_2,
          LOG_ID_3,
          LOG_ID_4,
          PRODUCT_NO,
          SN,
          MACHINE_ID,
          F1_RESULT,
          F2_RESULT,
          F3_RESULT,
          F4_RESULT,
          CREATE_DATETIME,
          TEST_DATETIME,
          ROW_NUMBER() OVER (PARTITION BY SN ORDER BY LOG_ID_1 DESC) AS RowNum
      FROM 
          JOIN_TABLE
      WHERE
          F1_RESULT LIKE '%NG%' OR F2_RESULT LIKE '%NG%' OR F3_RESULT LIKE '%NG%' OR F4_RESULT LIKE '%NG%'
      ),
      ALL_TABLE AS(
      SELECT
          EMP_NO,
          LOG_ID_1,
          LOG_ID_2,
          LOG_ID_3,
          LOG_ID_4,
          PRODUCT_NO,
          SN,
          MACHINE_ID,
          F1_RESULT,
          F2_RESULT,
          F3_RESULT,
          F4_RESULT,
          CREATE_DATETIME,
          TEST_DATETIME,
          ROW_NUMBER() OVER (PARTITION BY SN ORDER BY LOG_ID_1 DESC) AS RowNum
      FROM 
          JOIN_TABLE
      ),
      OK_PRODUCT_LIST AS (
      SELECT
          SN,
          MACHINE_ID
      FROM OK_TABLE
      WHERE 
          RowNum = 1
      ),
      OK_PRODUCT_LIST_DAILY AS (
      SELECT
          SN,
          MACHINE_ID
      FROM OK_TABLE
      WHERE 
          RowNum = 1
          AND TEST_DATETIME BETWEEN @yesterday AND @today
      ),
      --NG_PRODUCT_LIST AS (
      --SELECT 
      --	SN,
      --	MACHINE_ID
      --FROM NG_TABLE
      --WHERE 
      --	RowNum = 1
      --	AND NG_TABLE.SN NOT IN (SELECT OK_PRODUCT_LIST.SN FROM OK_PRODUCT_LIST)
      --),

      NG_PRODUCT_LIST AS (
      SELECT 
          NG.SN,
          NG.MACHINE_ID
      FROM 
          NG_TABLE NG
      LEFT JOIN 
          OK_PRODUCT_LIST OK
      ON 
          NG.SN = OK.SN
      WHERE 
          NG.RowNum = 1
          AND OK.SN IS NULL
      ),
      NG_PRODUCT_LIST_DAILY AS (
      SELECT 
          NG.SN,
          NG.MACHINE_ID
      FROM 
          NG_TABLE NG
      LEFT JOIN 
          OK_PRODUCT_LIST OK
      ON 
          NG.SN = OK.SN
      WHERE 
          NG.RowNum = 1
          AND OK.SN IS NULL
          AND TEST_DATETIME BETWEEN @yesterday AND @today 
      ),

      RETRY_COUNT AS (
      SELECT 
          MACHINE_ID,
          SUM(RowNum-1) AS COUNTS
      FROM 
          (
          SELECT *, 
              ROW_NUMBER() OVER (PARTITION BY SN ORDER BY RowNum DESC) AS rn
          FROM ALL_TABLE
          ) AS subquery
      WHERE rn = 1
      GROUP BY MACHINE_ID
      ),

      OK_COUNT AS(
      SELECT 
          MACHINE_ID, COUNT(*) AS COUNTS
      FROM 
          OK_PRODUCT_LIST
      GROUP BY MACHINE_ID
      ),

      NG_COUNT AS(
      SELECT 
          MACHINE_ID, COUNT(*) AS COUNTS
      FROM 
          NG_PRODUCT_LIST
      GROUP BY MACHINE_ID
      ),

      OK_COUNT_DAILY AS(
      SELECT 
          MACHINE_ID, COUNT(*) AS COUNTS
      FROM 
          OK_PRODUCT_LIST_DAILY
      GROUP BY MACHINE_ID
      ),

      NG_COUNT_DAILY AS(
      SELECT 
          MACHINE_ID, COUNT(*) AS COUNTS
      FROM 
          NG_PRODUCT_LIST_DAILY
      GROUP BY MACHINE_ID
      ),

      RETRY_COUNT_DAILY AS (
      SELECT 
          MACHINE_ID,
          SUM(RowNum-1) AS COUNTS
      FROM 
          (
          SELECT *, 
              ROW_NUMBER() OVER (PARTITION BY SN ORDER BY RowNum DESC) AS rn
          FROM ALL_TABLE
          ) AS subquery
      WHERE
          TEST_DATETIME BETWEEN @yesterday AND　@today and rn = 1
      GROUP BY MACHINE_ID
      )

      -- Main Search
      SELECT 
          OK_COUNT.MACHINE_ID,
          ISNULL(OK_COUNT_DAILY.COUNTS, 0) AS OK,
          ISNULL(NG_COUNT_DAILY.COUNTS, 0) AS NG,
          ISNULL(RETRY_COUNT_DAILY.COUNTS, 0) AS RETRY,
          ISNULL(OK_COUNT.COUNTS, 0) AS OK_YEAR,
          ISNULL(NG_COUNT.COUNTS, 0) AS NG_YEAR,
          ISNULL(RETRY_COUNT.COUNTS, 0) AS RETRY_YEAR

      FROM OK_COUNT
      LEFT JOIN NG_COUNT ON
          OK_COUNT.MACHINE_ID = NG_COUNT.MACHINE_ID

      LEFT JOIN RETRY_COUNT ON
          OK_COUNT.MACHINE_ID = RETRY_COUNT.MACHINE_ID

      LEFT JOIN OK_COUNT_DAILY ON
          OK_COUNT.MACHINE_ID = OK_COUNT_DAILY.MACHINE_ID

      LEFT JOIN NG_COUNT_DAILY ON
          OK_COUNT.MACHINE_ID = NG_COUNT_DAILY.MACHINE_ID

      LEFT JOIN RETRY_COUNT_DAILY ON
          OK_COUNT.MACHINE_ID = RETRY_COUNT_DAILY.MACHINE_ID
      WHERE OK_COUNT.MACHINE_ID!=0
      ORDER BY CAST(OK_COUNT.MACHINE_ID AS INT)
    `)

    return result.recordset;
  });
};

export const getAllProduct = async () => {
  try {
    const pool = await connect();
    const result = await pool.request().query(`
      WITH ProductStats AS (
          SELECT 
              PRODUCT_NO,
              COUNT(*) AS TotalTest,
              SUM(CASE WHEN TEST_RESULT LIKE 'OK%' THEN 1 ELSE 0 END) AS TotalOK
          FROM [dbo].[RG_AA_IOT]
          GROUP BY PRODUCT_NO
      ),

      LastTest AS (
          SELECT 
              t.PRODUCT_NO,
              t.TRAVEL_CARD_NUMBER,
              t.LOG_ID,
              t.EMP_NO,
              t.CREATE_DATETIME,
              t.TEST_RESULT,
              ROW_NUMBER() OVER (PARTITION BY t.PRODUCT_NO ORDER BY t.CREATE_DATETIME DESC) AS rn
          FROM [dbo].[RG_AA_IOT] t
      )

      SELECT 
          lt.PRODUCT_NO AS ProductNo,
          lt.TRAVEL_CARD_NUMBER AS TravelCard,
          lt.LOG_ID AS SerialNo,
          lt.EMP_NO AS Operator,
          lt.CREATE_DATETIME AS LastTestDatetime,

          CASE 
              WHEN (CAST(ps.TotalOK AS FLOAT) / ps.TotalTest) >= 0.9 THEN 'OK'
              ELSE 'NG'
          END AS Result
      FROM LastTest lt
      INNER JOIN ProductStats ps ON lt.PRODUCT_NO = ps.PRODUCT_NO
      WHERE lt.rn = 1
      ORDER BY lt.PRODUCT_NO;
    `);

    return result.recordset;

  } catch (err) {
    console.error("Error fetching all product:", err);
    throw err;
  }
};

export const getAllProductNumbers = async () => {
  try {
    const pool = await connect();
    const result = await pool.request().query(`
      SELECT DISTINCT PRODUCT_NO
      FROM [dbo].[RG_AA_IOT]
      ORDER BY PRODUCT_NO ASC;
    `);

    return result.recordset.map(row => row.PRODUCT_NO);

  } catch (err) {
    console.error("Error fetching all product numbers:", err);
    throw err;
  }
};

export const getAllOperatorNumbers = async () => {
  try {
    const pool = await connect();
    const result = await pool.request().query(`
      SELECT DISTINCT EMP_NO
      FROM [dbo].[RG_AA_IOT]
      ORDER BY EMP_NO ASC;
    `);

    return result.recordset.map(row => row.EMP_NO);

  } catch (err) {
    console.error("Error fetching all product numbers:", err);
    throw err;
  }
};

export const getLatestAAData = async () => {
  try {
    const pool = await connect();
    const result = await pool.request().query(`
      SELECT TOP 10 *
      FROM [dbo].[RG_AA_IOT]
      ORDER BY TEST_DATETIME DESC;
    `);
    return result.recordset;
  } catch (err) {
    console.error("Error fetching latest AA data:", err);
    throw err;
  }
};

export const getFilteredAAData = async (startDate?: string, endDate?: string, product?: string, item?: string) => {
  try {
    const pool = await connect();
    const request = pool.request();

    const conditions: string[] = [];

    if (startDate && endDate) {
      conditions.push(`TEST_DATETIME >= '${startDate}' AND TEST_DATETIME < DATEADD(DAY, 1, '${endDate}')`);
    }
    if (product) {
      conditions.push(`PRODUCT_NO LIKE '%${product}%'`);
    }
    if (item) {
      conditions.push(`TEST_ITEM = '${item}'`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT TOP 100
        LOG_ID,
        EMP_NO,
        PRODUCT_NO,
        LOG_FILENAME,
        TEST_ITEM,
        TEST_RESULT,
        CREATE_DATETIME,
        TEST_DATETIME
      FROM [dbo].[RG_AA_IOT]
      ${whereClause}
      ORDER BY TEST_DATETIME DESC;
    `;

    const result = await request.query(query);
    return result.recordset;

  } catch (err) {
    console.error("Error fetching filtered AA data:", err);
    throw err;
  }
};

export const getAAReportSummary = async (startDate?: string, endDate?: string, product?: string) => {
  try {
    const pool = await connect();
    const request = pool.request();

    const conditions: string[] = [];

    if (startDate && endDate) {
      conditions.push(`TEST_DATETIME >= '${startDate}' AND TEST_DATETIME < DATEADD(DAY, 1, '${endDate}')`);
    }
    if (product) {
      conditions.push(`PRODUCT_NO LIKE '%${product}%'`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT
        COUNT(*) AS total_tests,
        SUM(CASE WHEN TEST_RESULT LIKE 'OK%' THEN 1 ELSE 0 END) AS total_ok,
        SUM(CASE WHEN TEST_RESULT LIKE 'NG%' THEN 1 ELSE 0 END) AS total_ng,
        SUM(CASE WHEN TEST_RESULT LIKE 'RETRY%' THEN 1 ELSE 0 END) AS total_retry
      FROM [dbo].[RG_AA_IOT]
      ${whereClause};
    `;

    const result = await request.query(query);
    return result.recordset[0];

  } catch (err) {
    console.error("Error fetching AA summary:", err);
    throw err;
  }
};

export const getAAReportDailySummary = async (startDate?: string, endDate?: string, product?: string) => {
  try {
    const pool = await connect();
    const request = pool.request();

    const conditions: string[] = [];

    if (startDate && endDate) {
      conditions.push(`TEST_DATETIME >= '${startDate}' AND TEST_DATETIME < DATEADD(DAY, 1, '${endDate}')`);
    }
    if (product) {
      conditions.push(`PRODUCT_NO LIKE '%${product}%'`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT
        CONVERT(date, TEST_DATETIME) AS test_date,
        COUNT(*) AS total_tests,
        SUM(CASE WHEN TEST_RESULT LIKE 'OK%' THEN 1 ELSE 0 END) AS total_ok,
        SUM(CASE WHEN TEST_RESULT LIKE 'NG%' THEN 1 ELSE 0 END) AS total_ng,
        SUM(CASE WHEN TEST_RESULT LIKE 'RETRY%' THEN 1 ELSE 0 END) AS total_retry
      FROM [dbo].[RG_AA_IOT]
      ${whereClause}
      GROUP BY CONVERT(date, TEST_DATETIME)
      ORDER BY test_date ASC;
    `;

    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    console.error("Error fetching AA daily summary:", err);
    throw err;
  }
};

export const getAAReportOperatorSummary = async (startDate?: string, endDate?: string, product?: string) => {
  try {
    const pool = await connect();
    const request = pool.request();

    const conditions: string[] = [];

    if (startDate && endDate) {
      conditions.push(`TEST_DATETIME >= '${startDate}' AND TEST_DATETIME < DATEADD(DAY, 1, '${endDate}')`);
    }
    if (product) {
      conditions.push(`PRODUCT_NO LIKE '%${product}%'`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT
        EMP_NO AS operator_id,
        COUNT(*) AS total_tests,
        SUM(CASE WHEN TEST_RESULT LIKE 'OK%' THEN 1 ELSE 0 END) AS total_ok,
        SUM(CASE WHEN TEST_RESULT LIKE 'NG%' THEN 1 ELSE 0 END) AS total_ng,
        SUM(CASE WHEN TEST_RESULT LIKE 'RETRY%' THEN 1 ELSE 0 END) AS total_retry,
        ROUND(
          (CAST(SUM(CASE WHEN TEST_RESULT LIKE 'OK%' THEN 1 ELSE 0 END) AS FLOAT) / 
          NULLIF(COUNT(*), 0)) * 100, 2
        ) AS ok_rate
      FROM [dbo].[RG_AA_IOT]
      ${whereClause}
      GROUP BY EMP_NO
      ORDER BY total_tests DESC;
    `;

    const result = await request.query(query);
    return result.recordset;

  } catch (err) {
    console.error("Error fetching AA operator summary:", err);
    throw err;
  }
};

