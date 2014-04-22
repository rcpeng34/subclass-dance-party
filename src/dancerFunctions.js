$(document).ready(function(){

  var dancer;

  $('body').append('<div id="info" class="popbox"></div>')

  $('.dancefloor')
  .on('mouseenter', '.dancer', function(){
    dancer = window.dancers[this.id];
    console.log(this.id, this)
    $('.popbox').text("money in wallet: $" + dancer.money);
    dancer.money = Math.max(0, dancer.money-10);
    // $('.popbox').css({position})
    $('.popbox').show();
  });

  $('.dancefloor')
  .on('mouseleave', '.dancer', function(){
    $('.popbox').hide();
  });

});
