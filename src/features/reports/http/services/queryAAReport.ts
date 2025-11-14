import { sql, connect } from "../../../../utils/databases/mssqlConnection";

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
      SELECT TOP 500
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
      console.log(startDate, endDate)
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
    console.log(result);
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

