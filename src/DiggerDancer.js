var DiggerDancer = function(top, left, timeBetweenSteps, dancerIndex) {
  Dancer.apply(this, Array.prototype.slice.call(arguments));
  this.$node.attr({
    src: 'http://cdn.freebievectors.com/illustrations/10/m/miner-mine-job-profession/preview.jpg',
    width: '50px',
    height: '50px'
  });
};

DiggerDancer.prototype = Object.create(Dancer.prototype);
DiggerDancer.prototype.constructor = DiggerDancer;
// DiggerDancer.prototype.oldstep = Dancer.prototype.step;
DiggerDancer.prototype.step = function () {
  // this.oldstep();
  Dancer.prototype.step.apply(this);

  // if Digger hasn't found a Baller in a while, find Baller
  var foundBaller = this.findBaller()[0];
  var foundDist = this.findBaller()[1];
  if(!foundBaller) {
    this.randomMovement();
  } else {
    this._position[0] += (10/foundDist)*(foundBaller._position[0]-this._position[0]);
    this._position[1] += (10/foundDist)*(foundBaller._position[1]-this._position[1]);
    this.dig(foundBaller, foundDist);
  }
  // else random motion
  this.setPosition(this._position);


  if (this.money < 10 && this.isAtTheClub) {
    this.isAtTheClub = false;
    window.dancers.splice(this._id, 1);
    this.leaveTheClub();
    //TODO: fix array (fill in gaps)
  }
};

var findDistance = function (pos1, pos2) {
  var y = pos1[0] - pos2[0];
  var x = pos1[1] - pos2[1];
  return Math.sqrt(y * y + x * x);
};

// findBaller finds the nearest baller dancer
// returns an array of form [closest baller, distance]
DiggerDancer.prototype.findBaller = function () {
  var currentBaller = null;
  var currentDistance = null;
  var closestBaller = null;
  var closestBallerDistance = null;

  for(var i = 0; i < window.dancers.length; i++) {
    if(window.dancers[i].constructor === BallerDancer) {
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
  return ([closestBaller, closestBallerDistance]);
};

DiggerDancer.prototype.dig = function(baller, distance) {
  if(distance <= 10) {
    baller.money -= 10;
    this.money += 10;
    // return true;
  }
  // return false;
};



