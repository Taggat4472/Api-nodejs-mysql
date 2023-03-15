require("dotenv").config()


const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(
   //   process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,
"restoapp","cda","azerty",
  {
  host: "127.0.0.1" ,
  dialect: 'mariadb',
  
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Connexion aux models
db.product = require("./product.model.js")(sequelize, DataTypes);



module.exports = db;