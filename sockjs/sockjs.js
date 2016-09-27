var sockjs = require("sockjs");
var sock = sockjs.createServer();

var arrayOfPeople = [];
var historyArr = [];
var onlineUsers = [];

sock.on("connection", (conn)=>{

  arrayOfPeople.push(conn);
  conn.on("data", (msg)=>{
    var newMsg = JSON.parse(msg);

    if(newMsg.author){
      msg = newMsg.time + " " + newMsg.author + " : " + newMsg.msg;
      historyArr.push(msg);
      var objToSend = JSON.stringify({text: msg, user: newMsg.author, onlineUsers: onlineUsers});
      arrayOfPeople.forEach((user)=>{
        user.write(objToSend);
      });
    } else if(newMsg.intro){
      msg = "К чату присоединился: " + newMsg.intro + " :)";
      onlineUsers.push(newMsg.intro);
      arrayOfPeople.forEach((user)=>{
        if(user === conn){
          user.specialName = newMsg.intro;
          user.write(JSON.stringify({history: historyArr, onlineUsers: onlineUsers}));
        }
        user.write(JSON.stringify({text: msg, onlineUsers: onlineUsers}));
      });
      historyArr.push(msg);
    }
  });
  conn.on("close", ()=>{
    var whoLeft = "";
    arrayOfPeople.forEach((i)=>{
      if(i === conn){
        whoLeft = i.specialName || "Чат-бот";
        onlineUsers.splice(onlineUsers.indexOf(i.specialName), 1);
      }
    });
    arrayOfPeople  = arrayOfPeople.filter((i)=>{
      var msg = whoLeft + " покинул чат :(";
      if(i === conn){
        return false;
      } else {
        historyArr.push(msg);
        i.write(JSON.stringify({text: msg, onlineUsers: onlineUsers}));
        return true;
      }
    });
  });
});
module.exports = sock;
