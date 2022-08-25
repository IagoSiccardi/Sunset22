'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER,references : {
          model : {
            tableName : 'Orders'
          },
          key : 'id'
        },
        onDelete : 'cascade'
      },productId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Products'
          },
          key : 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : {
            tableName : 'Users'
          },
          key : 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        
        type: Sequelize.DATE
      },
      deletedAt: {
       
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};