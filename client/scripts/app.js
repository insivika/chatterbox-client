var app = {

  init : function(){

  },
  send: function(){

  },

  receive: function(){

  }
}


$(document).ready(function(){

    var $chats = $('#chats');


    let message = {
      username: 'shawndrost',
      text: 'Cool beans',
      roomname: '4chan',
    };

    // SEND FUNCTION
    app.send = $("#messenger-form").submit(function(e){
      
      message.text = $('.messenger-input').val();

      console.log(message.text)

      $.ajax({
        url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/message',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (chats) {
          console.log('chatterbox: Message sent');
    
          $chats.append('<div><strong>' + message.username + '</strong><br>' + message.text +'</div>');
    
    
          // <div>
          //   <strong>Name:</strong> 
          //   <br>
          //   Lorem ipsum dolor sit amet consectetur adipisicing elit.
          // </div>
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });
    
      e.preventDefault()
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


//POST MESSAGES




  // RETRIEVE MESSAGES

