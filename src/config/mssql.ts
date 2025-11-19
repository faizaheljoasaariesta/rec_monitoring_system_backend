// import { 
//   SERVER_NAME,
//   DATABASE_NAME,
//   USERNAME,
//   PASSWORD
// } from './env';

const mssql_config = {
  server: '192.168.2.250',
  database: 'REC_DB',
  user: 'sa',
  password: 'Rg54013657',
  options: {
    encrypt: false,
    enableArithAbort: true,
    trustServerCertificate: true,
    useUTC: true,
    cryptoCredentialsDetails: {
      minVersion: 'TLSv1'
    }
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