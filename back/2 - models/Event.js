const { DataTypes } = require('sequelize');
const sequelize = require('../1 - configurations/sequelizeconn');
const Employee = require('./Employee');

const Event = sequelize.define('event', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    title: DataTypes.STRING,

    description: DataTypes.TEXT,

    start: DataTypes.STRING,

    end: DataTypes.STRING,

    domain: DataTypes.STRING,
    
    completion: DataTypes.INTEGER,

    profit: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
});

Event.hasMany(Employee);
Employee.belongsTo(Event);

module.exports = Event;