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
  }
};

export default mssql_config;