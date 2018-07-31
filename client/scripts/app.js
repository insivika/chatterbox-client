var app = {

  rooms : {
    lobby: 'lobby'
  },

};

$(document).ready(function(){

let message = {
  username: 'shawndrost',
  text: 'Cool beans',
  roomname: '4chan',
};


app.init =  function(){

$(document).ready(function(){

    var $chats = $('#chats');

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


$("#messenger-form").submit(function(e){

  e.preventDefault()

  // Re-assigning keys to the message object

  message.text = $('.messenger-input').val();

  var user = window.location.search;

  message.username = user.split('=')[1]

  message.roomname = $('#room-selector').val();

  app.send();

  $('.messenger-input').val('');

});




// SEND FUNCTION
app.send = function(message){

        // POST message to server

        $.ajax({
          url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
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

    }


setInterval(app.fetch,1000);

  // GET messages from server

  app.fetch = function(message){
     $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      dataType: 'jsonp',
      contentType: 'application/json',



      success: function (messages) {

        $.each(messages.results, function(i, message){

          $chats.append('<div><strong>'+ message.username +':</strong><br>'+message.text+'</div>');

          //console.log(message)


            if(app.rooms[message.roomname] !== message.roomname){

              app.rooms[message.roomname] = message.roomname;

            }

        });
        console.log('chatterbox: Message received');


        for(key in app.rooms){
          $('#room-selector').append('<option>' + app.rooms[key] + '</option>')
        }

      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }

    });

  }  
});

};

app.init();
