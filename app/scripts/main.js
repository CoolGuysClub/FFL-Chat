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
$('#Logout').click(function() {
  firebaseRef.unauth();
  location.reload();
});


}); // End of the line jQuery
