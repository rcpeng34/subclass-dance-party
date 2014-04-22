var BallerDancer = function(top, left, timeBetweenSteps, dancerIndex) {
  Dancer.apply(this, Array.prototype.slice.call(arguments));
  // ballers start with at least $400
  this.money = Math.max((Math.floor(Math.random()*1000)), 400);
  this.$node.attr({
    src: 'http://cdn.freebievectors.com/illustrations/10/b/business-man-clip-art/preview.jpg',
    width: '50px',
    height: '100px'
  });
};

BallerDancer.prototype = Object.create(Dancer.prototype);
// BallerDancer.prototype.oldstep = Dancer.prototype.step;
BallerDancer.prototype.constructor = BallerDancer;
BallerDancer.prototype.step = function () {
  // this.oldstep();
  Dancer.prototype.step.apply(this);
  this.randomMovement();
  if (this.money < 10 && this.isAtTheClub) {
    this.isAtTheClub = false;
    this.leaveTheClub();
    //TODO: fix array (fill in gaps)
  }
};
