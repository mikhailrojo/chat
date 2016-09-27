var sock = require("sockjs-client");
var assert = require("assert");
var s = new sock("http://localhost:3000/echo");
var user;




describe("Chat unit test of returning values", ()=>{
  before(()=>{
    user = JSON.stringify({
      intro: "Misha"
    });
  });

  after(()=>{
    s.close();
  });

  describe("Chat shoud return history object when new person connects", ()=>{
    it("should broadcast about new user", (done)=>{
      s.onopen = ()=> {
        s.onmessage = e => {
          var returnValue = JSON.parse(e.data);
          assert.ok(returnValue.history);
          done();
        };
        s.send(user);
      };
    });

    it("should write to the chat new person name", (done)=>{
      var currentDate = new Date().toLocaleString();
      s.onmessage = e => {
        var returnObj = JSON.parse(e.data).text;
        assert.equal(returnObj, currentDate + " Tima : Привет");
        done();
      };
      s.send(JSON.stringify({author: "Tima", msg: "Привет", time:  currentDate}));
    });
  });
});
