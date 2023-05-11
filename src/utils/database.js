//vamos a gestionar la conexion con una base de datos
//10. importar sequelize

const {sequalize, Sequelize}= require ('sequelize')

//VARIABLES DE ENTORNO. 
//donde se vayan a usar las variables de entorno se importa el donenv
require('dotenv').config();


//11. crear una instancia de sequelize con la configuracion de conexion

//12. secualize es el orm que nos permite manipular la base de datos desde aca. poner en el dialect postgres





const db = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    dialectOptions:{ssl:{require: true, rejectUnauthorized: false}},
});


//13. esta es la forma que que se hace un export default en node, se esta exportando la instancia db. que esta en la linea 11.
module.exports =  db;


//El host de la base de datos extero, se selecciona desde external database url. despues del @ hasta el .com y se pega en el host
//! postgres://users_crud_q5a6_user:3uI1CnkR1VMhf3HMBhZqx6TEhivBF9my@dpg-che120m7avja5m9vaiug-a.oregon-postgres.render.com/users_crud_q5a6

// host : dpg-che120m7avja5m9vaiug-a.oregon-postgres.render.com