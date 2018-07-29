var app = {}

$(document).ready(function(){

    var $chats = $('#chats');


    let message = {
      username: 'shawndrost',
      text: 'Cool beans',
      roomname: '4chan',
    };

    // SEND FUNCTION
    app.send = $("#messenger-form").submit(function(e){

      e.preventDefault()

      // Re-assigning keys to the message object

      message.text = $('.messenger-input').val();

      var user = window.location.search;
      message.username = user.split('=')[1]

      message.roomname = $('#room-selector').val();

      console.log(message.username)
      console.log(message.text)
      console.log(message.roomname)

      // POST message to server

      $.ajax({
        url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/message',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (chats) {
          console.log('chatterbox: Message sent');

          $chats.append('<div><strong>' + message.username + ':</strong><br>' + message.text +'</div>');

        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });


      });


      app.receive = function(){
        $.ajax({
          // This is the url you should use to communicate with the parse API server.
          url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/message',
          type: 'GET',
          data: JSON.stringify(message),
          contentType: 'application/json',
          success: function (data) {
            console.log('chatterbox: Message sent');
          },
          error: function (data) {
            // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to send message', data);
          }
        });
      }
});



