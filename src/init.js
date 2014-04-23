$(document).ready(function(){
  window.dancers = [];
  window.clubRevenue = 0;
  window.danceFloorHeight = $(".dancefloor").height();
  window.danceFloorWidth = $(".dancefloor").width();

  $(".DancerButton").on("click", function(event){
    var dancerFunctionName = $(this).data("dancer-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerFunction = window[dancerFunctionName];

    // make a dancer with a random position


    var dancer = new dancerFunction(
      window.danceFloorHeight * Math.random() + 40, //top bar ~40px
      window.danceFloorWidth * Math.random(),
      Math.random() * 1000,
      window.dancers.length
    );

    $('.dancefloor').append(dancer.$node);
    window.dancers.push(dancer);

  });



});
