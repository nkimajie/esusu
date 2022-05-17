const { Model, Sequelize} = require('sequelize');
const { seq: DB } = require('../../sequelize');

/**
 * Class for Authentication Model
 */
class Groups extends Model {

};

Groups.init({
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      groupUUID: {
        type: Sequelize.UUID,
        unique: false,
        defaultValue: Sequelize.UUIDV4,
      },
      groupName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      groupDesc: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      groupStatus: {
        type: Sequelize.ENUM('public', 'private'),
        defaultValue: 'public',
        allowNull: false,
      },
      groupAdminId: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
}, {
    tableName: 'esusu_groups',
    underscored: false,
    timestamps: true,
    sequelize: DB,
});

module.exports = Groups;