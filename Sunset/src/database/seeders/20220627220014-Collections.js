'use strict';

const collections = [
  {
    name: 'Heaven',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Hell',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]


module.exports = {
  async up (queryInterface, Sequelize) {
    
  
     await queryInterface.bulkInsert("Collections",collections,{});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Collections', null, {});
     
  }
};
