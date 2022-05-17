const tableName = 'esusu_groups';

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
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.dropTable(tableName),
    ]);
  },
};