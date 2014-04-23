// DiggerDancers gravitate towards Ballers, unless there are
// none present, in which case they move randomly
var DiggerDancer = function(top, left, timeBetweenSteps, dancerIndex) {
  Dancer.apply(this, Array.prototype.slice.call(arguments));

  this.$node.attr({
    // src: 'http://cdn.freebievectors.com/illustrations/10/m/miner-mine-job-profession/preview.jpg',
    width: '25px',
    height: '25px'
  });
  this.$node.css({
    'background-color': 'yellow',
    'border-radius': '100px'
  });
};

// "inheriting" Dancer
DiggerDancer.prototype = Object.create(Dancer.prototype);
DiggerDancer.prototype.constructor = DiggerDancer;

DiggerDancer.prototype.step = function () {
  Dancer.prototype.step.apply(this);

  var cs = window.chaseSpeed;

  // find a baller
  var foundBaller = this.findBaller()[0];
  var foundDist = this.findBaller()[1];

  // if Digger can't find a baller, move randomly
  if(!foundBaller) {
    this.randomMovement();
  }

  // once Digger finds a baller, move towards baller
  else {
    this.chaseBaller(window.chaseSpeed, foundBaller, foundDist);
  }

  // leave if money exceeds 500
  if (this.money > 500 && this.isAtTheClub) {
    this.leaveTheClub();
  }
};

// chaseballer is a movement pattern where the digger chases the baller it found via findBaller
// see line 33 to see where it is invoked
DiggerDancer.prototype.chaseBaller = function(cs, fb, fd) {
  this._position[0] += (cs/fd)*(fb._position[0]-this._position[0]);
  this._position[1] += (cs/fd)*(fb._position[1]-this._position[1]);
  this.setPosition(this._position);
  this.dig(fb, fd); // check if close enough to dig
};

// if digger gets within 10 px of a baller, digger takes $10 from baller
// only happens if baller has enough money (> $10)
DiggerDancer.prototype.dig = function(baller, distance) {
  if(distance <= 10 && baller.money > 10) {
    baller.money -= 10;
    this.money += 10;
    updateSideBarEntry(baller);
    updateSideBarEntry(this);
  }
};

// findBaller finds the nearest baller dancer
// returns an array of form [closest baller, distance]
DiggerDancer.prototype.findBaller = function () {
  var currentBaller = null;
  var currentDistance = null;
  var closestBaller = null;
  var closestBallerDistance = null;

  // helper function for calculating distance
  var findDistance = function (pos1, pos2) {
    var y = pos1[0] - pos2[0];
    var x = pos1[1] - pos2[1];
    return Math.sqrt(y * y + x * x);
  };

  // this loop basically goes through the dancers array looking for ballers,
  // when it finds one, it sets it as the closest if it is closest
  // returns the baller object and distance.
  for(var i = 0; i < window.dancers.length; i++) {
    if(window.dancers[i]) {
      if(getTypeOfDancer(window.dancers[i]) === "Baller") {
        if (!closestBaller) {
          closestBaller = window.dancers[i];
          closestBallerDistance = findDistance(closestBaller._position, this._position);
        } else { //closestBaller is not undefined, so see if distance is closer
          currentBaller = window.dancers[i];
          currentDistance = findDistance(currentBaller._position, this._position);
          if(currentDistance <= closestBallerDistance) {
            closestBaller = currentBaller;
            closestBallerDistance = currentDistance;
          }
        }
      }
    }
  }
  return ([closestBaller, closestBallerDistance]);
};
