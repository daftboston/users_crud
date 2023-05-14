//1.  npm init -y.  
//2. npm install express  nodemon -D  npm i pg pg-hstore     actualizar los scripts
//3. crear archivo app.js
//4. importar express 
// crear carpeta src y meter el archivo app.js 


const express = require ('express');
const db = require('./utils/database');
const Users=require('./models/usersModels');
const cors = require('cors');

app.use(cors());



//Seleccion de puerto automatico, si no hay valor en PORT usa el 8000, se importa el env y se configura  con el require  y abajo en listen se cambia el 8000 x el port linea 139 
require('dotenv').config()
const PORT = process.env.PORT || 8000;


//25b habilitar cors antes que el const app= express









//5. crear una instacioa de express llamada app



const app = express();
//IMPORTANTE para poder extraer formato jason y comvertirlo en un objeto que podamos manipular despues del express y antes de las peticiones  

app.use(express.json());

app.get('/', (req, res)=>{
    res.send ('servidor funcionando')
});


app.post('/users', async (req, res)=>{
    try{
        //Extraemos el cuerpo de la peticion
        const newUser =req.body;
        //INSERT INTO users VALUES (firstname, lastname, email, password)
        await Users.create(newUser)
        res.status(201).send();
    } catch(error){
        res.status(400).json(error);
    }
})

app.get ('/users',async(req, res)=>{
    try{
        const users = await Users.findAll({
            attributes: {
                exclude: ["password"]
            },
        });
        res.json(users);
    } catch(error){
        res.status(400).json(error)

    }
})

// get user by id
//rutas especificas
// localhost:8000/users/id/1

app.get ('/users/id/:id',async(req, res)=>{
    try{
        // request. paramas trae un objeto que traiga los 
        const {id}= req.params;
        console.log(req.params);

        //sequielize ofrece un metodo find by primary key, 
        const user = await Users.findByPk(id, {
            attributes: {
                exclude: ["password"],
            }
        })
        
        res.json(user);
    } catch(error){
        res.status(400).json(error)

    }
})


// busqueda en postman localhost:8000/users/email/kevin@gmail.com
app.get ('/users/email/:email/',async(req, res)=>{
    try{
        
        const {email}= req.params;
        console.log(req.params);
        //findOne  busca el primero, where, se indica donde buscar.
        const user = await Users.findOne({
            where:{email}
        })
        
        res.json(user);
    } catch(error){
        res.status(400).json(error)

    }
})

//ELIMINAR UN USUARIO.
// DELETE FROM users WHERE id=3, elimina al usuario con id 3
//localhost:8000/users/4

app.delete('/users/:id', async(req, res)=>{
    try{
        const {id}= req.params;
        await Users.destroy({
            where:{id},
        });
        res.status(204).send();
    }catch(error){
        res.status(400).json(error) 
    }
})

//UPDATE 
// UPDATE users SET firstname= 'nicachu', lastname 'nimichy' WHERE id = "x"

app.put('/users/:id', async(req,res)=>{
    try{
        const {id}=req.params;
        const {fistname, lastname}= req.body
        await Users.update({fistname, lastname}, {
            where: {id}
        })
        res.status(204).send();
    }catch(error){
        res.status(400).json(error) 


    }
})


//6. poner a escuchar el servidor

app.listen(PORT, ()=> {
    console.log(`servidor escuchando en el puerto ${PORT}`);
});


//7. instalar los controladores para posgres npm i pg pg-hstore

//8. cambiar la ubicacion del app.json   a una nueva carpeta llamada src y en el script cambiar la direccion de ejecucion.
// 9. crear una carpeta dentro de src que se llama utils  y crear dentro un archivo que se llama database.js, desde ahi se gestiona la conexion con la base de datos. ahi se continua el proceso.

//10 continuar en database...


//14.Comprobar que nos conectamos a la baser de datos, importar el modulo db con la ruta.
//const db = require('./utils/database')

//15. creamos una autenticacion de una conexion con el metodo autenticate, el cual es un metodo asicrono
db.authenticate() // es una funcion asincrona
.then (()=> console.log('Base de datos conectada'))
.catch((err)=> console.log(err));

//16. creamos una carpeta llamada models y un archivo con el nombre de la tabla. con la convencion nombretablaModels.js. y continuamos alli...


//21 ruta para obtener los datos de la tabla conectada en Models.

// 22. Crear dentro de la ruta un funcion asincrona async, pide la info y responde a la base de datos. para que el hilo de trabajo sea libre es asincorna

//23. importar la tabla o modelo

//const Users=require('./models/usersModels')

// para gestionar los errores se trabaja el try catch
/*
app.get('/categories',async (req, res, next)=> {
    try{
        //pedir info a la base de datos y usar el medoto findAll()
        //? SELECT * FROM categories
        const categories = await Categories.findAll()
        res.json(categories)

    } catch(error){
        next(error)

    }
    
}) */


//24.! Es posible instalar una dependencia llamada nodemon para que cualquier cambio se actualize sin necesidad de actualizar el servidor. comando npm i nodemon -D   tambien hay que agregar al package.json en el script   "dev": "nodemon ./src/app.js", 



//25. metodo para sincronizar con psql.

db.sync()
.then(()=>console.log('base de datos sincronizada'))
.catch(error=> console.log(error))

// Variables de entorno
// donenv es una dependencia para node, para la creacion de variables de entorno. en process.emv
// se instala con el comando npm i dotenv
// luego se crea un archivo en la carpeta raiz llamado .env , las reglas son  NOMBRE DE LAS VARIABLES EN MAYUSCULAS, NO EXISTEN LOS ESPACIOS, NO HAY COMILLAS se continua ahi...
//donde se vayan a usar las variables de entorno se importa el donenv, en este caso en el database

console.log(process.env);


//26 instalar cors.  cors es  un paquete de node.js que nos provee un middelware de conexion express nom i cors
// luego importarlo const cors = require('cors')