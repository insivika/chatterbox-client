var app = {

  rooms : {},

  friends : {},

  server : 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',

};


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


// EVENT HANDLERS AND FUNCTION CALLS

$("#add-room").submit(function(e){

  var newRoom = $('#add-room-input').val();

  app.renderRoom(newRoom);
 
  $('#add-room-input').val('');

  e.preventDefault();
})

// Submitting a new message
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


// Clearing ALL messages
$('#clear-messages').click(function(){

  app.clearMessages();

});

// Get Friends from Local Storage && and adding them to the DOM

$(window).load(function(){

  let friends;

  if(localStorage.getItem('friends') === null){
    friends = [];
  } else {
    friends = JSON.parse(localStorage.getItem('friends'));
  }

  friends.forEach(function(friend){

    $('#friend-list').append('<div class="friend">' + friend + '</div>');

  });

  localStorage.setItem('friends', JSON.stringify(friends));

  app.friendMessage()

});

//Getting new friend from the DOM and sending him/her to the local storage

$('body').on('click', function(event){
    
  if(event.target.classList.contains('username')){

    var newFriend = event.target.innerHTML.slice(0, -1);

    app.addNewFriendToLocaStorage(newFriend);
  }
  
});

//Toggling the messages form friends to look different than non-friends




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

  // GET messages from server

  app.fetch = function(){
    
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      success: function (messages) {
        //app.renderMessage(data);
        $.each(messages.results, function(i, message){

            app.renderMessage(message);

        });
        console.log('chatterbox: Message received');


        // for(key in app.rooms){
        //   $('#room-selector').append('<option>' + app.rooms[key] + '</option>')
        // }

      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }

    });

    app.friends = {};
  }  

  app.fetch();

  // Clears messages from DOM
  app.clearMessages = function(){

    console.log('this is working');
    $('#chats').empty();

  }

  // Add messages to DOM
  app.renderMessage = function(message){

    $chats.append('<div class="message-body "><span class="username">'+ message.username +':</span><br>'+ message.text+'</div>');

  }

  // Add rooms to DOM
  app.renderRoom = function(newRoom){

    $('#roomSelect').append('<option>' + newRoom + '</option>');
    
  }

  // Add Friend to local Storage
  app.addNewFriendToLocaStorage = function(newFriend){

    let friends;

    if(localStorage.getItem('friends') === null){
      friends = [];
    } else {
      friends = JSON.parse(localStorage.getItem('friends'));
    }

    if(friends.indexOf(newFriend) === -1){
      friends.push(newFriend);
      $('#friend-list').append('<div class="friend">' + newFriend + '</div>');
    } 
    
    localStorage.setItem('friends', JSON.stringify(friends));

  }

  app.friendMessage = function(){

    let friends;

    if(localStorage.getItem('friends') === null){
      friends = [];
    } else {
      friends = JSON.parse(localStorage.getItem('friends'));
    }

    // Loop over all HTML elements that contain these strings and change their classes

    friends.forEach(function(friend){
      match = JSON.stringify(friend);

      $('div').each(function(item){

        let messenger = $(this).text().substr(0, $(this).text().indexOf(':'))

        if(friend == messenger){
          console.log($(this));
          $(this).toggleClass('message-body-friend')
        }
      })

    })

   
    localStorage.setItem('friends', JSON.stringify(friends));

  }
});

};

app.init();


/* Josh's escaping method

app.escape = function(str) {

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  return String(str).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
    return entityMap[s];
  });
};
*/