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
  this.findBaller();
  // console.log(this._position);
  this.setPosition(this._position);
};

var findDistance = function (pos1, pos2) {
  var y = pos1[0] - pos2[0];
  var x = pos1[1] - pos2[1];
  return Math.sqrt(y*y + x*x);
};
// findBaller finds the nearest baller dancer
// sets position to be closer every step
DiggerDancer.prototype.findBaller = function () {
  var closestBaller;
  var closestDistance;
  var currentBaller;
  var currentDistance;

  for(var i = 0; i < window.dancers.length; i++) {
    if(window.dancers[i].constructor === BallerDancer) {
      if (!closestBaller) {
        closestBaller = window.dancers[i];
        closestDistance = findDistance(closestBaller._position, this._position);
      } else { //closestBaller is not undefined, so see if distance is closer
        currentBaller = window.dancers[i];
        currentDistance = findDistance(currentBaller._position, this._position);
        if(currentDistance < closestDistance) {
          closestBaller = currentBaller;
          closestDistance = currentDistance;
        }
      }
    }
  }
  this._position[0] += (10/closestDistance)*(closestBaller._position[0]-this._position[0]);
  this._position[1] += (10/closestDistance)*(closestBaller._position[1]-this._position[1]);
};



