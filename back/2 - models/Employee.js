const { DataTypes } = require('sequelize');
const sequelize = require('../1 - configurations/sequelizeconn');

const Employee = sequelize.define('employee', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    name: DataTypes.STRING,

    phone: DataTypes.STRING,

    role: DataTypes.STRING,

    photo:{
        type: DataTypes.STRING,
        defaultValue: '',
    },
});

module.exports = Employee;