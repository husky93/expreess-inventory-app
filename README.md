# expreess-inventory-app

A simple CRUD application following the MVC pattern made with [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) along with [pug](https://pugjs.org/language/plain-text.html) for creating view templates. [MongoDB](https://www.mongodb.com/) was used for a database along with [mongoose](https://mongoosejs.com/) ODM for modeling the application.

### Live: [https://express-inventory-app.onrender.com/](https://express-inventory-app.onrender.com/)

## How to run server locally:
- Clone repository.
- Run ``npm install`` command in your terminal.
- Create .env file
- In .env file set up new enviromental variable named ``MONGODB_URL`` and paste your own mongoDB connection link.
- Run ``npm run start`` command in your terminal.
- Server will listen to requests from ``localhost:3000``.

## Features
- Model View Controller pattern based application.
- Custom routing with params based routes.
- Display view templates based on requested route and specified render arguments.
- Application data models based on [mongoose's](https://mongoosejs.com/) schema based solution.
- POST requests validation with [express-validator](https://express-validator.github.io/docs/).
- Create, Update, Delete options for both Category and Item models.
- Disabled Category deletion until all items inside the category are deleted.

### Dependencies Used:
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [async](https://www.npmjs.com/package/async)
- [express-validator](https://express-validator.github.io/docs/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [pug](https://pugjs.org/language/plain-text.html)

#### Dev dependencies:
- [nodemon](https://www.npmjs.com/package/nodemon)
