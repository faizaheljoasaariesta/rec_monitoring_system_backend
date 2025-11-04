import dotenv from 'dotenv';
import { configureApp } from './utils/configureApp';
import users_routes from './features/users/http/routes';
import reports_routes from './features/reports/http/routers';
import { connect } from './utils/databases/mssqlConnection';

dotenv.config();

const { app, httpServer, ioServer } = configureApp();
const PORT = process.env.PORT || 3000;

app.use('/api', users_routes);
app.use('/api', reports_routes);

ioServer.on('connection', (socket) => {
  try {
    if (!socket.handshake.auth.token) {
      socket.disconnect();
      console.error("Rejected connection due to missing auth.token");
      return;
    }
    console.info("CONNECTED HANDSHAKE AUTH: ", socket.handshake.auth.token);
  } catch (err) {
    console.error("Error in socket connection:", err);
    socket.disconnect();
  }
});

(async () => {
  try {
    await connect();
    httpServer.listen(PORT, () => {
      console.info(`Server running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
})();
