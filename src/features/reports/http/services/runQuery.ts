import { ConnectionPool } from "mssql";
import { connect } from "../../../../utils/databases/mssqlConnection";


export const runQuery = async (fn: (arg0: ConnectionPool) => any, retries = 3) => {
  while (retries > 0) {
    try {
      const pool = await connect();
      return await fn(pool);
    } catch (err) {
      retries--;
      if (retries === 0) throw err;
      console.log("Retrying MSSQL query...");
      await new Promise(res => setTimeout(res, 500));
    }
  }
};