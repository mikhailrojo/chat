(function(){

  var input = $("#msgForm input");
  var msgForm = $("#msgForm").hide();
  var chat = $("#chatroom");
  var nameForm = $("#nameForm");
  var nameOfTheUser = "";
  var onlineUsers = [];

  $("#nameForm input").focus();
  var sock = new SockJS("/echo");

  sock.onmessage = function(e){
    var elem;
    var received = JSON.parse(e.data);
    console.log(received);
    if(received.history){
      appendHistory(received.history);
    } else {
      if(received.user === nameOfTheUser) {
        elem = $("<p>").text(received.text).addClass("msg");
      }else{
        elem = $("<p>").text(received.text).addClass("oldMsg");
      }
      chat.append(elem);
    }
    chat.scrollTop(chat.scrollTop()+100000);
    if(received.onlineUsers.toString() !== onlineUsers.toString()){
      console.log("не равно");
      onlineUsers = received.onlineUsers;
      showOnlineUsers(onlineUsers);
    }
  };


  nameForm.submit(function(e){
    e.preventDefault();
    nameOfTheUser = $("#nameForm input").val();
    var objToSend = JSON.stringify({intro: nameOfTheUser});
    sock.send(objToSend);
    nameForm.remove();
    msgForm.show();
    input.focus();
  });

  msgForm.submit(function(e){
    e.preventDefault();
    var objToSend = JSON.stringify({author: nameOfTheUser, msg: input.val(), time:  new Date().toLocaleString()});
    sock.send(objToSend);
    input.val("");
  });

  function appendHistory(arr){
    for(var i = 0, len = arr.length; i < len; i ++){
      chat.append($("<p>").text(arr[i]).addClass("oldMsg"));
    }
    chat.scrollTop(chat.scrollTop()+100000);
  }

  function showOnlineUsers(arr){
    var parent = $("#onlineUsers");
    $("#onlineUsers .online").remove(); // удаляем старые записи
    for(var i = 0, len = arr.length; i < len; i ++){
      var user = $("<div>").addClass("online").append("<img src='http:\/\/bootdey.com/img/Content/avatar/avatar"+(i%8 +1)+".png' alt='User name'>").append("<span>"+ arr[i] +"</span><span> online</span>");
      parent.append(user);
    }
  }

})();
