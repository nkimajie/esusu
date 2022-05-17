/* eslint-disable space-before-function-paren */
const tableName = 'esusu_users';

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
        uuid: {
          type: Sequelize.UUID,
          unique: false,
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