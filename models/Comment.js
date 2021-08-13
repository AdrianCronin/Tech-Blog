const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'post',
            key: 'id',
          },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        date_created: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        sequelize,
        underscored: true,
        modelName: 'comment'
    },
);

module.exports = Comment;