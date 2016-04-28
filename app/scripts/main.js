console.log('\'Allo \'Allo!');

$(function () {

  var welcome = $('#welcome');
  var intro = $('#intro');
  intro.show();
  welcome.hide();

  //firebase
  var firebaseRef = new Firebase('https://ffl-chat.firebaseio.com/');
  var fireChat = new Firechat(firebaseRef);
  console.log(fireChat);
  var Login = $('#Login');
    Login.click(function() {
      firebaseRef.authWithOAuthPopup('github', function (error, authData) {
        if (error) {
          console.log(error);
        } else {
          intro.hide();
          setTimeout(function () {
            $('header').animate({
              height: '8vh'
            }).css('background-color', 'transparent');
            welcome.show('slow');
          }, 500);
          console.log(authData);
        }
      });
    });

  firebaseRef.onAuth(function (authData) {
    if (authData) {
      initChat(authData);
    }
  });
  function initChat(authData) {
  fireChat.setUser(authData.uid, authData[authData.provider].username, function (user) {
    console.log(user);
    intro.remove();

  });
  $('.userName').text(authData.github.username);
}

// Loggin the user out
$('#Logout').click(function() {
  firebaseRef.unauth();
  location.reload();
});
//See which room is here...
fireChat.getRoomList(function (room) {
  console.log(room);
});
//get specific room metadata
fireChat.getRoom('-KGSfZGEbRU5tSOCKH6v', function (roomId) {
  console.log(roomId);
});
// function roomId() {
//
// }
//Sending a Message...
var chatForm = $('#chatForm');
chatForm.submit(function (elof) {
  elof.preventDefault();
  var chatMsg = $('#chatMsg').val();
  console.log(chatMsg);
  fireChat.sendMessage('-KGSfZGEbRU5tSOCKH6v', chatMsg,'default', function(msg) {
    $('.panel-body').append(msg);
  });
});

fireChat.on('message-add', function (message) {
  console.log(message);
});



}); // End of the line jQuery
