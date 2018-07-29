var app = {
  rooms : {
    lobby : 'lobby'
  },
};

$(document).ready(function(){

    var $chats = $('#chats');


    let message = {
      username: 'shawndrost',
      text: 'Cool beans',
      roomname: '4chan',
    };

    // Setting input requirements
    $(".messenger-input").prop('required',true);
    $("#add-room-input").prop('required',true);


    // Add room to DOM

    $("#add-room").submit(function(e){

      var newRoom = $('#add-room-input').val();


      $('#room-selector').append('<option>' + newRoom + '</option>')

      console.log(newRoom);

      $('#add-room-input').val('');

      e.preventDefault()
    })


    // SEND FUNCTION
    app.send = $("#messenger-form").submit(function(e){

      e.preventDefault()

      // Re-assigning keys to the message object

      message.text = $('.messenger-input').val();

      var user = window.location.search;
      message.username = user.split('=')[1]

      message.roomname = $('#room-selector').val();


      // POST message to server

      $.ajax({
        url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/message',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (chats) {
          console.log('chatterbox: Message sent');

        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });

      $('.messenger-input').val('');

      });

      // GET messages from server

      app.receive =

        $.ajax({
          // This is the url you should use to communicate with the parse API server.
          url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/message',
          type: 'GET',
         // data: JSON.stringify(message),
          contentType: 'application/json',

          success: function (messages) {

            $.each(messages.results, function(i, message){
              $chats.append('<div><strong>'+ message.username +':</strong><br>'+message.text+'</div>');

              for(key in app.rooms){

                if(key !== message.roomname){

                  app.rooms[message.roomname] = message.roomname;

                }
              }
            });
            console.log('chatterbox: Message received');
            console.log(app.rooms)

            for(key in app.rooms){
              $('#room-selector').append('<option>' + app.rooms[key] + '</option>')
            }

          },
          error: function (data) {
            // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
            console.error('chatterbox: Failed to receive message', data);
          }
        });

        // Displaying messages based on rooms

        console.log(app.rooms)


});


