$(document).ready(function(){

  var dancer;

  $('body').append('<div id="info" class="popbox"></div>')

  $('.dancefloor')
  .on('mouseenter', '.dancer', function(){
    dancer = window.dancers[this.id];
    console.log(this.id, this)
    $('.popbox').text("money in wallet: $" + dancer.money);
    $('.popbox').show();
  });

  $('.dancefloor')
  .on('mouseleave', '.dancer', function(){
    $('.popbox').hide();
  });

  $('.dancefloor')
  .on('click', '.dancer', function(){
    dancer.money -= 10;
    window.clubRevenue += 10;
    $('.ClubRevenue').html(window.clubRevenue);
  });

  $('.LineUpButton').on('click', function(event){
    for(var i = 0; i < window.dancers.length; i++) {
      if(window.dancers[i]) {
        window.dancers[i].setPosition([
          $('body').height()*0.6, $('.dancefloor').width()*0.9 - 100*i
        ]);
        window.dancers[i].money -=10;
        window.clubRevenue += 10;
        $('.ClubRevenue').html(window.clubRevenue);
      }
    }
  });

  //findDistance takes arrays
  // var findDistance = function (pos1, pos2) {
  //   var y = pos1[0] - pos2[0];
  //   var x = pos1[1] - pos2[1];
  //   return Math.sqrt(y*y + x*x);
  // };

});
