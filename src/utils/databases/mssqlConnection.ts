import sql from "mssql";
import mssql_config from "../../config/mssql";

export const connect = async () => {
  try {
    const pool = await sql.connect(mssql_config);
    console.log("MSSQL Connected");
    return pool;
  } catch (err) {
    console.error("MSSQL Connection Error:", err);
    throw err;
  }
};

export { sql };
