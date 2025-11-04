import { sql, connect } from "../../../../utils/databases/mssqlConnection";

export const getLatestAAData = async () => {
  try {
    const pool = await connect();
    const result = await pool.request()
      .query(`
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