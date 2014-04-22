var Dancer = function(top, left, timeBetweenSteps, dancerIndex) {
  this.$node = $('<img class="dancer" id=' +
    dancerIndex + '>');

  this._id = dancerIndex;
  this.name = window.names[Math.floor(Math.random()*28)];
  this._timeBetweenSteps = timeBetweenSteps;
  this._position = [top, left];
  this.step();
  this.setPosition(this._position);
  this.money = Math.floor(Math.random()*200);
  this.isAtTheClub = true;
};

Dancer.prototype.step = function() {
  var boundStep = this.step.bind(this);
  setTimeout(boundStep, this._timeBetweenSteps);
};

Dancer.prototype.randomMovement = function ()  {
  this._position[0] += (Math.random()*40)-20;
  this._position[1] += (Math.random()*40)-20;
  this.setPosition(this._position);
};

Dancer.prototype.setPosition = function(position) {
  this._position = position;
  var styleSettings = {
    top: position[0],
    left: position[1]
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.leaveTheClub = function() {
  this.$node.remove();
  $('.announcement').html('<h1>' + this.name + ' has left the club!</h1>');
  $('.announcement').fadeIn(500).delay(3000).fadeOut("slow");
  window.dancers.splice(this._id, 1, null);
  for(var i = 0; i < window.dancers.length; i++) {
    if(window.dancers[i]){
      window.dancers[i]._id = i;
    }
  }
};

/*// Creates and returns a new dancer object that can step
var makeDancer = function(top, left, timeBetweenSteps){

  var dancer = {};

  // use jQuery to create an HTML <span> tag
  dancer.$node = $('<span class="dancer"></span>');


  dancer.step = function(){
    // the basic dancer doesn't do anything interesting at all on each step,
    // it just schedules the next step
    setTimeout(dancer.step, timeBetweenSteps);
  };
  dancer.step();

  dancer.setPosition = function(top, left){
    // Use css top and left properties to position our <span> tag
    // where it belongs on the page. See http://api.jquery.com/css/
    //
    var styleSettings = {
      top: top,
      left: left
    };
    dancer.$node.css(styleSettings);
  };

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  dancer.setPosition(top, left);

  return dancer;
};
*/
