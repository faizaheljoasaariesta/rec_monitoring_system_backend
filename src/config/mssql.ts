import { 
  SERVER_NAME,
  DATABASE_NAME,
  USERNAME,
  PASSWORD
} from './env';

const mssql_config = {
  server: SERVER_NAME,
  database: DATABASE_NAME,
  user: USERNAME,
  password: PASSWORD,
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },

  connectionTimeout: 30000,  // 30 detik
  requestTimeout: 30000,     // 30 detik
  cancelTimeout: 30000,      // 30 detik
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

export default mssql_config;