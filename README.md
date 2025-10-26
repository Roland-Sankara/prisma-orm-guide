# Prisma ORM Guide
These are the steps you need to setup prisma@6.18.0 for your node/express.js backend service

### Init your Node project
1. Run the ```npm init -y``` to create your node project
2. install the following tools; express, nodemon. Run ```npm install express nodemon```
3. Setup a simple server in a file named **index.js**

### Setup Prisma
1. Run this to install prisma ```npm install prisma```
2. Create a Database locally on the Postgres DBMS. Open **psql** and run ```CREATE DATABASE <enter-db-name>;```
3. Get back to your project and run ```npx prisma init``` to initialize prisma in your project
4. Replace the **DATABASE_URL** link in the **.env** file to match your database. [Check this guide](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgresql)
5. Open the **schema.prisma** file and add your database models. Make sure you have installed the **Prisma VS Code Extension** to ensure syntax highlighting and autocompletion
6. When you are done defining the models in the **schema.prisma** file, run the command ```npx prisma migrate dev``` to allow prisma generate the migration file and setup your models as database tables in your DATABASE
7. You'll see a folder named **generated/prisma** created for you automatically. In that folder is the **prisma client** that you'll use to access your DB and [make queries as guide here](https://www.prisma.io/docs/orm/prisma-client/queries/crud) 
