import sql from "mssql";
import mssql_config from "../../config/mssql";

let pool: sql.ConnectionPool | null = null;

export const connect = async () => {
  if (pool) {
    return pool;
  }

  try {
    pool = await sql.connect(mssql_config);
    console.info("MSSQL Connected");
    return pool;
  } catch (err) {
    console.error("MSSQL Connection Error:", err);
    pool = null;
    throw err;
  }
};

export { sql };
