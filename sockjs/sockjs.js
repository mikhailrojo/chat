var sockjs = require("sockjs");
var sock = sockjs.createServer();

var arrayOfPeople = [];
var historyArr = [];

sock.on("connection", (conn)=>{

  arrayOfPeople.push(conn);
  conn.on("data", (msg)=>{
    var newMsg = JSON.parse(msg);

    if(newMsg.author){
      msg = newMsg.time + " " + newMsg.author + " : " + newMsg.msg;
      historyArr.push(msg);
      var objToSend = JSON.stringify({text: msg});
      arrayOfPeople.forEach((user)=>{
        user.write(objToSend);
      });
    } else if(newMsg.intro){
      msg = "К чату присоединился: " + newMsg.intro + " :)";
      historyArr.push(msg);
      arrayOfPeople.forEach((user)=>{
        if(user === conn){
          user.specialName = newMsg.intro;
          user.write(JSON.stringify({history: historyArr}));
        }
      });
    }
  });
  conn.on("close", ()=>{
    var whoLeft = "";
    arrayOfPeople.forEach((i)=>{
      if(i === conn){
        whoLeft = i.specialName || "Чат-бот";
      }
    });
    arrayOfPeople  = arrayOfPeople.filter((i)=>{
      var msg = whoLeft + " покинул чат :(";
      if(i === conn){
        return false;
      } else {
        historyArr.push(msg);
        i.write(JSON.stringify({text: msg}));
        return true;
      }
    });
  });
});
module.exports = sock;
