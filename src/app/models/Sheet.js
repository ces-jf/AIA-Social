import Sequelize, { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

class Sheet extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING(100),
        path: Sequelize.STRING(100),
        collection_name: Sequelize.STRING(100),
        is_private: Sequelize.BOOLEAN,
        description: Sequelize.STRING(255),
        status: Sequelize.ENUM('Enviado', 'Erro', 'Sucesso'),
        user_id: Sequelize.INTEGER,
        category_id: Sequelize.INTEGER,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async (collection) => {
      collection.hash_name = await uuidv4();
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

export default Sheet;
