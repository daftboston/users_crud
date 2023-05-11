const db = require ('../utils/database')
const {DataTypes}= require ('sequelize');

const  Users = db.define('users', {
    // id, firstname, lastname, email, password

    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
    },
    fistname: {
        type: DataTypes.STRING(30),
        allowNull: false, 
    },
    lastname:{
        type: DataTypes.STRING(30),
        allowNull: false, 
    },

    email:{
        type: DataTypes.STRING(50),
        // los correso siempre van con unique para que un usuario solo tenga un correo y no genere conflictos
        unique: true,
        allowNull: false, 
        validate: {
            isEmail:true,
        }
        },
    password: { 
        type: DataTypes.STRING, 
        allowNull: false,
    }
},

//los timestamps permiten que llenemos las tablas desde modelos sin llenar los demas campos que estan en node
/*{
    timestamps: false,
} */ )

module.exports= Users;