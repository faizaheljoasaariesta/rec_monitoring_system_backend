module.exports = {
  apps: [
    {
      name: "rec_monitoring_system_backend",
      script: "dist/index.js",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT:9000,
      },
    },
  ],
};