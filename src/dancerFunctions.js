$(document).ready(function(){

  $('body').append('<div id="info" class="popbox"></div>')

  $('.dancefloor')
  .on('mouseenter', '.dancer', function(){
    console.log($('.dancer'));
    console.log(this);

    $('.popbox').text('test');
    $('.popbox').show();
  });

  $('.dancefloor')
  .on('mouseleave', '.dancer', function(){
    $('.popbox').hide();
  });

});
