const { DataTypes } = require('sequelize');
const sequelize = require('../1 - configurations/sequelizeconn');

const User = sequelize.define('user', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username:{
        type: DataTypes.STRING,
        validate:{ len:{args:[5,10], msg:"name from 5 to 10 chars !"} },
        allowNull: false,
        unique: true,
    },
    photo:{
        type: DataTypes.STRING,
        defaultValue: '',
    },
    hash:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        defaultValue: '',
    },
    password:{
        type: DataTypes.STRING,
        validate:{ len:{args:[5,10], msg:"name from 5 to 10 chars !"} },
        allowNull: false,
    },
    firstname:DataTypes.STRING,
    lastname:DataTypes.STRING,
    templatecolor:DataTypes.STRING
});

module.exports = User;