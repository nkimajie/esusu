const { Model, Sequelize} = require('sequelize');
const { seq: DB } = require('../../sequelize');
const bcrypt = require('bcrypt');
const _ = require('lodash');
/**
 * Class for Authentication Model
 */
class Users extends Model {

};

Users.init({
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid: {
        type: Sequelize.UUID,
        unique: true,
        defaultValue: Sequelize.UUIDV4,
    },
    firstName: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'esusu_users',
    underscored: false,
    timestamps: true,
    sequelize: DB,
});

module.exports = Users;