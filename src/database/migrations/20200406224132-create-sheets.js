module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sheets', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      collection_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      is_private: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('Enviado', 'Erro', 'Sucesso'),
        allowNull: false,
        defaultValue: 'Enviado',
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('sheets');
  },
};
