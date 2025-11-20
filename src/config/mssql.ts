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
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
    // useUTC: true,
    // cryptoCredentialsDetails: {
    //   minVersion: 'TLSv1'
    // }
  },

  connectionTimeout: 90000,
  requestTimeout: 90000,
  cancelTimeout: 90000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 90000
  }
};

export default mssql_config;