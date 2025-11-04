# Architecture Web Apps REC Monitoring System

![Architecture Project](./public/images/architecture.png)

# Setup Mini PC/NAS

```
npm install --global yarn
sudo apt update
sudo apt install postgresql
sudo systemctl status postgresql
sudo -i -u postgres
psql
ALTER USER postgres WITH PASSWORD '<password>';
CREATE USER <username> WITH PASSWORD '<password>';
ALTER USER <username> WITH SUPERUSER;
CREATE DATABASE '<database name>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <username>;
\q
exit
```

# Setup or Running This Project

```
yarn install
```

### Create File .env

```
# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database name>?schema=public"
SECRET_KEY=""

# Configuration Express
PORT=

# Setup Mailer
EMAIL_USER=
EMAIL_APP_PASSWORD=

# Setup Connection to Microsoft SQL Database
SERVER_NAME=
DATABASE_NAME=
USERNAME=
PASSWORD=
```

# Procedure to use Database PostgreSQL

1. Generated Schema Prisma database:

```
yarn prisma generate
yarn prisma migrate dev --name init_database
```

2. Running this project:

```
yarn dev
```

3. Running with PM2:

```
pm2 start ecosystem.config.js --env development
pm2 start ecosystem.config.js --env production
```

