const tableName = 'esusu_group_members';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable(tableName, {
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
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.dropTable(tableName),
    ]);
  },
};