var Dancer = function(top, left, timeBetweenSteps, dancerIndex) {

  // jquery node to build the final representation
  this.$node = $('<img class="dancer" id=' +
    dancerIndex + '>');

  // private variables
  this._id = dancerIndex;
  this._position = [top, left];
  this._timeBetweenSteps = timeBetweenSteps;

  // other variables
  this.name = window.names[Math.floor(Math.random()*window.names.length)]; // TO-DO: make names not global
  this.money = Math.max(Math.floor(Math.random()*200), 20)
  // truly removing objects was difficult, so we can make them "leave" by flipping the isAtTheClub boolean
  this.isAtTheClub = true;

  // things called at object creation
  this.setPosition(this._position);
  this.step();
};

// invoking this on a dancer makes them leave the club, announcing their exit
Dancer.prototype.leaveTheClub = function() {
  this.$node.remove();
  this.isAtTheClub = false;
  // sets the dancer as null so other dancer's _id don't have to be updated
  window.dancers[this._id] = null;
  announceDancerHasLeft(this);
  // removes the dancer from the sidebar
  removeSideBarEntry(this);
};

// call dancer.randomMovement to make dancer move randomly
Dancer.prototype.randomMovement = function ()  {
  var ms = window.movementSpeed;

  var dY = (Math.random()*(2*ms)) - ms;
  var dX = (Math.random()*(2*ms)) - ms;

// TO-DO clean this up
  this._position[0] = Math.min((Math.max(50, this._position[0]+ dY)), window.danceFloorHeight - 100);
  this._position[1] = Math.min((Math.max(0, this._position[1] + dX)), window.danceFloorWidth - 50);
  this.setPosition(this._position);
};

// setPosition takes an array position, and sets the dancer's top and left attributes (style)
Dancer.prototype.setPosition = function(position) {
  this._position = position;
  var styleSettings = {
    top: position[0],
    left: position[1]
  };
  this.$node.css(styleSettings);
};

// this function calls itself every _timeBetweenSteps ms
Dancer.prototype.step = function() {
  var self = this;
  setTimeout(function() {
    self.step();
  }, this._timeBetweenSteps);
};
