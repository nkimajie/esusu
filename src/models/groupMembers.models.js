const { Model, Sequelize} = require('sequelize');
const { seq: DB } = require('../../sequelize');

/**
 * Class for Authentication Model
 */
class GroupMembers extends Model {

};

GroupMembers.init({
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      groupId: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      userName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      userEmail: {
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
    tableName: 'esusu_group_members',
    underscored: false,
    timestamps: true,
    sequelize: DB,
});

module.exports = GroupMembers;