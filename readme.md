<h1 align="center">App To do list - Backend</h1>


Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express-4.17.1-brightgreen)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node%20Js-14.15.4-orange)](https://nodejs.org/)
[![Sequelize ORM](https://img.shields.io/badge/Sequelize-6.0.0-red)](https://sequelize.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. <a href="https://www.getpostman.com/">Postman</a>
3. [Xampp](https://www.apachefriends.org/download.html)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type 
```npm install```
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Apache and MYSQL Server using xampp, etc.
5. Create a database with the name **todos** then  set config file [here](#set-config) in directory src/config/config.json
6. migration table with sequelize [here](#table-migratiton)
8. run seeder with sequelize [here](#seeder)
8. Open Postman desktop application or Chrome web app extension that has installed before
9. Choose HTTP Method and enter request url.
10. You can see all the end point [here](#api-request-example)


### set config
```
src/config/config.json
    
"username": "your username",
"password": "your password",
"database": "name databases",
"host": "127.0.0.1",
"dialect": "mysql"

```

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
DB_PORT=4000
SECRET_KEY = bL9os1b52fcEaPlXKejUfVx0vWWcqrEP

```
### table migratiton
```
before doing the migration, please create a database in your local
Open app's directory in CMD or Terminal

cd src
Sequelize db:migrate

```
### seeder
```
Open app's directory in CMD or Terminal

cd src
sequelize db:seed:all

----------------------------------------------
it will fill in the users table, with the account 
username = admin@gmail.com
password = admin123
```

### fix problem Sequelize cannot run
```
Open app's directory in CMD or Terminal

cd src
npm install --save sequelize
npm install --save-dev sequelize-cli
```


### Compiles and hot-reloads for development
```
npm run dev
```

## API Request Example 
[View Documentaion](https://documenter.getpostman.com/view/13525105/TzCV4QjT)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c89147951d12e6640090?action=collection%2Fimport#?env%5Bkode%5D=W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOmZhbHNlfSx7ImtleSI6ImF3cyIsInZhbHVlIjoiaHR0cDovLzU0LjE1Mi4xNDUuMjMyOjMwMDAvYXBpIiwiZW5hYmxlZCI6ZmFsc2V9LHsia2V5IjoibG9jYWwiLCJ2YWx1ZSI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvIiwiZW5hYmxlZCI6ZmFsc2V9LHsia2V5IjoiZW5lcmdlZWsiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOmZhbHNlfSx7ImtleSI6InB0emVnZW50b2RvbGlzdCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZX1d)

## Related Project

- [To do List Frontend](https://github.com/FendiAnwarRifai/todolist-frontend)

<!-- CONTACT -->
## Contact

- Email - fendianwar36@gmail.com
- LinkedIn - [Fendi Anwar Rifa'i](https://www.linkedin.com/in/fendi-anwar-rifai/)



