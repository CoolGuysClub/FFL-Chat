console.log('\'Allo \'Allo!');

$(function () {

  //firebase
  var firebaseRef = new Firebase('https://ffl-chat.firebaseio.com/');
  console.log(firebaseRef);
  var Login = $('#Login');
    Login.click(function() {
      console.log('hello');
      firebaseRef.authWithOAuthPopup('github', function (error, authData) {
        if (error) {
          console.log(error);
        } else {
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
  var chat = new FirechatUI(firebaseRef, document.getElementById('chatBox'));
  chat.setUser(authData.uid, authData[authData.provider].username);
  $('#userName').text(authData.github.username);
}


}); // End of the line jQuery
