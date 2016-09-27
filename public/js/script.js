(function(){

  var input = $("#msgForm input");
  var msgForm = $("#msgForm").hide();
  var chat = $("#chatroom");
  var nameForm = $("#nameForm");
  var nameOfTheUser = "";

  $("#nameForm input").focus();
  var sock = new SockJS("/echo");

  sock.onmessage = function(e){
    var received = JSON.parse(e.data);
    if(received.history){
      appendHistory(received.history);
    } else {
      chat.append($("<p>").text(received.text));
    }
    chat.scrollTop(chat.scrollTop()+100000);
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
      chat.append($("<p>").text(arr[i]));
    }
    chat.scrollTop(chat.scrollTop()+100000);
  }

})();
