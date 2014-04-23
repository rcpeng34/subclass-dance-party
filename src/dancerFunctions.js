  // ===========================HELPER FUNCS==================================

var announceDancerHasLeft = function(dancer) {
    $('.announcement').html('<h1>' + dancer.name + ' has left the club!</h1>');
    $('.announcement').fadeIn(1000).delay(1500).fadeOut(1000);
  };

// given a dancer, makes a new sidebar entry for dancer
var addSideBarEntry = function(dancer){

    $('.sidebar-ul').append(
      '<li class="sidebar-entry" id=' + dancer._id + '>' +
      getTypeOfDancer(dancer) + ': ' + dancer.name + ' | $' + dancer.money + '</li>'
    );
  };

// given a dancer, updates the sidebar entry for it with money amount
var updateSideBarEntry = function(dancer){
  // TO-DO figure out why jquery selection requires this format here
  $('li#'+dancer._id+'.sidebar-entry').html(
    getTypeOfDancer(dancer) + ': ' + dancer.name + ' | $' + dancer.money
  );
};

// given a dancer, this removes the sidebar entry
var removeSideBarEntry = function(dancer){
  $('.sidebar-entry#'+dancer._id).remove();
};

var getTypeOfDancer = function(dancer) {
  var dancerType;
  if(dancer.constructor === BallerDancer) {
    dancerType = "Baller";
  } else {
    dancerType = "Gold Digger"
  }
  return dancerType;
};


$(document).ready(function(){
  var dancer;

  // ====================THINGS THAT ARE HIDDEN AT FIRST====================

  // popbox is the popup that has dancer info in it
  $('body').append('<div id="info" class="popbox"></div>');

  //announcement will make announcements in the center of the screen
  $('.dancefloor').append('<span id="announcement" class="announcement"></span>');

  // ==============================EVENTS===================================

  // when you mouseover a dancer, show its name and money in popbox
  $('.dancefloor')
  .on('mouseenter', '.dancer', function(){
    dancer = window.dancers[this.id];
    $('.popbox').html(
      '<p>name: ' + dancer.name + '</p>' +
      '<p>money in wallet: $' + dancer.money + '</p>'
      );
    $('.popbox').css({
      top: dancer._position[0] + 50,
      left: dancer._position[1] + 50
    });
    $('.popbox').fadeIn('fast');
  });

// TO-DO: refactor into a function instead of 2 places
$('.sidebar')
  .on('click', 'li', function(){
    dancer = window.dancers[this.id];
    $('.popbox').html(
      '<p>name: ' + dancer.name + '</p>' +
      '<p>money in wallet: $' + dancer.money + '</p>'
      );
    $('.popbox').css({
      top: dancer._position[0] + 50,
      left: dancer._position[1] + 50
    });
    $('.popbox').fadeIn('fast');
  });

  // when you mouseleave a dancer, hide the popbox
  $('.dancefloor')
  .on('mouseleave', '.dancer', function(){
    $('.popbox').fadeOut('slow');
  });

  // when you mouseleave a dancer, hide the popbox
  $('.sidebar')
  .on('mouseleave', 'li', function(){
    $('.popbox').fadeOut('slow');
  });

  // when you CLICK a dancer, club takes $10 from the dancer (and updates the club revenue)
  $('.dancefloor')
  .on('click', '.dancer', function(){
    dancer.money -= 10;
    window.clubRevenue += 10;
    $('.ClubRevenue').html(window.clubRevenue);
  });

  // when you click LineUp, the dancers line up in a horiz line and takes $10 from each
  // does not try to take money from nulls (line 48)
  $('.LineUpButton').on('click', function(event){
    for(var i = 0; i < window.dancers.length; i++) {
      if(window.dancers[i]) {
        window.dancers[i].setPosition([
          $('.dancefloor').height()*0.6, $('.dancefloor').width()*0.9 - 100*i
        ]);
        window.dancers[i].money -=10;
        window.clubRevenue += 10;
        $('.ClubRevenue').html(window.clubRevenue);
        updateSideBarEntry(window.dancers[i]);
      }
    }
  });


});
