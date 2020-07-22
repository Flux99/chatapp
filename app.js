//Packages
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
 const server = require('http').createServer();
const io = require('socket.io')(3000);
const Sequelize = require("sequelize");
const Message = require(__dirname+"/database.js");
const database = require(__dirname+"/config.js");

//app.use
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

// const connection = new Sequelize("new", "postgres", "", {
//   host:'localhost',
//   dialect: 'postgres',
//   //storage: 'database.sqlite'
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });

database.connection.authenticate()
  .then(()=>{
    console.log("Database connected...");
    
  })
  .catch(err=>{
    console.log("error"+err);
    
  })
//const text=database.Message
  app.post("/second", function(req, res) {
    const abc =req.body.sendid;
    console.log("abc"+abc);
    
    Message.create({
      senderId: req.body.sendid,
      recipientId: req.body.recipientid,
      content: req.body.message,
      timestamp: req.body.timestamp
    }).then(chat=>{
      console.log("createdAt===="+chat.createdAt);
    });
  
   
  });
  // const Message = database.define('message', {
  //   senderId: {
  //     type: Sequelize.INTEGER
  //   },
  //   recipientId: {
  //     type: Sequelize.INTEGER
  //   },
  //   content: {
  //     type: Sequelize.STRING
  //   },
  //   timestamp: {
  //     type: Sequelize.STRING
  //   }
  // });

  //database.connection.sync()
  
const users={}

io.on('connection', socket => {
  console.log('check 1', socket.connected);
  
  socket.on("new-user",name=>{
    users[socket.id]=name
    socket.broadcast.emit("user-connected",name)
  });

    //console.log("new User");
    socket.on("send-chat-message",message=>{
      socket.broadcast.emit("chat-message",{message:message,name:users[socket.id]})
      console.log("oyee"+users[socket.id]);
      console.log("oyee message==="+message);
        
    });

    socket.on("disconnect",()=>{
      socket.broadcast.emit("user-disconnected",users[socket.id])
      delete users[socket.id]
    });

      socket.on("typing",(data)=>{
        socket.broadcast.emit("typing",users[socket.id])
      });

  });

app.get("/", function(req, res) {
    res.render("home");
  });




  app.listen(5500, function() {
    console.log("Server started on port 3000");
  });
