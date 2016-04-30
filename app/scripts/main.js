console.log('\'Allo \'Allo!');

$(function () {

  var welcome = $('#welcome');
  var intro = $('#intro');
  var spinner = $('#spinner');
  spinner.hide();
  intro.show();
  welcome.hide();

  //firebase
  var firebaseRef = new Firebase('https://ffl-chat.firebaseio.com/');
  var fireChat = new Firechat(firebaseRef);
  var Login = $('#Login');
    Login.click(function() {
      firebaseRef.authWithOAuthPopup('github', function (error, authData) {
        if (error) {
          console.log(error);
        } else {
          intro.hide();
          spinner.show();
          setTimeout(function () {
            $('header').animate({
              height: '8vh'
            }).css('background-color', 'transparent');
            spinner.hide();
            welcome.show('slow');
          }, 1500);
          console.log(authData);
        }
      });
    });

  firebaseRef.onAuth(function (authData) {
    if (authData) {
      initChat(authData);
      $('header').css('background-color', 'transparent');
    }
  });
  function initChat(authData) {
    console.log('authData', authData);
  fireChat.setUser(authData.uid, authData[authData.provider].username, function (user) {
    intro.remove();
    console.log(user);
    setTimeout(function () {
      $('.userName').text(authData.github.username);
    }, 1300);
  });
  /* if already logged in, append "logged in as 'Tenkaklet'" else append  */


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
  if (chatMsg === '') {
    return false;
  } else {
    fireChat.sendMessage('-KGSfZGEbRU5tSOCKH6v', chatMsg,'default', function(msg) {
      $('.panel-body').append(msg);
    });
     $('#chatMsg').val('');
  }
});
var roomId = '-KGSfZGEbRU5tSOCKH6v';
var messages = new Firebase('https://ffl-chat.firebaseio.com/room-messages/' + roomId);

var output = messages + roomId;
console.log(output);
messages.on('child_added', function(snapshot, prevChildKey) {
  var newMessage = snapshot.val();
  console.log(newMessage);
  // console.log(newMessage.message);
  //chatArea is a ul
  var chatArea = $('#chatArea');
  chatArea.append("<li>" + '<span>' +  newMessage.name + '</span>' + ' says: ' + newMessage.message + "</li>");
});
fireChat.getUsersByRoom(roomId,null, function (users) {
  console.log('users', users);
});


}); // End of the line jQuery
