$(document).ready(function(){

  // instantiate some global vars (should these be here?)
  window.clubRevenue = 0;
  window.danceFloorHeight = $(".dancefloor").height();
  window.danceFloorWidth = $(".dancefloor").width();
  window.dancers = [];
  window.movementSpeed = 20;
  window.chaseSpeed = 10;

  $(".DancerButton").on("click", function(event){

    // grabs type of dancer from data
    var dancerFunctionName = $(this).data("dancer-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerFunction = window[dancerFunctionName];

    // make a dancer with a random position
    var dancer = new dancerFunction(
      window.danceFloorHeight * Math.random() + 40, //top bar ~40px
      window.danceFloorWidth * Math.random(),
      (Math.random() * 300) + 300, // at least 300 ms + 0-300 ms
      window.dancers.length
    );

    // append new dancer to dom
    $('.dancefloor').append(dancer.$node);
    // push dancer to array of dancers
    window.dancers.push(dancer);
    // append new dancer to sidelist
    addSideBarEntry(window.dancers[window.dancers.length -1]);

  });
});
