
const Sequelize = require("sequelize");
const database = require(__dirname+"/config.js");
 

 const Message = database.connection.define('message', {
      senderId: {
        type: Sequelize.INTEGER
      },
      recipientId: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      }
      // ,
      // timestamp: {
      //   type: Sequelize.STRING
      // }
    });
    module.exports =Message
  //   return Message;
  // };
  //database.connection.sync()