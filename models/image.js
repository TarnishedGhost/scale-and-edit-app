const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Image = sequelize.define('Image', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    visibility: { type: DataTypes.INTEGER, defaultValue: 1 },
    added_by: { 
        type: DataTypes.INTEGER, 
        references: { model: User, key: 'id' } 
    }
});

module.exports = Image;
