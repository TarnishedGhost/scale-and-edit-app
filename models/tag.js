const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Image = require('./image');

const Tag = sequelize.define('Tag', {
    title: { type: DataTypes.STRING, allowNull: false },
    added_by: { 
        type: DataTypes.INTEGER, 
        references: { model: User, key: 'id' } 
    },
    image_id: { 
        type: DataTypes.INTEGER, 
        references: { model: Image, key: 'id' } 
    }
});

module.exports = Tag;
