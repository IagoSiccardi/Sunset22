'use strict';

const productsJson = require('../../data/products.json')

const products = productsJson.map(product => {
  return {
    ...product,
    createdAt: new Date(),
    updatedAt: new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Products', products, {});
    
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Products', null, {});
     
  }
};
