// BallerDancers move randomly, start with more money than normal dancers
var BallerDancer = function(top, left, timeBetweenSteps, dancerIndex) {
  Dancer.apply(this, Array.prototype.slice.call(arguments));

  // ballers start with at least $400
  this.money = Math.max((Math.floor(Math.random()*1000)), 400);
  this.$node.attr({
    // src: 'http://cdn.freebievectors.com/illustrations/10/b/business-man-clip-art/preview.jpg',
    width: '50px',
    height: '50px'
  });
    this.$node.css({
    'background-color': 'green',
    'border-radius': '1000px'
  });
};

// "inheriting" Dancer
BallerDancer.prototype = Object.create(Dancer.prototype);
BallerDancer.prototype.constructor = BallerDancer;

BallerDancer.prototype.step = function () {
  Dancer.prototype.step.apply(this);

  // ballers move randomly
  this.randomMovement();

  // if baller falls betwen $10, he leaves the club
  if (this.money < 10 && this.isAtTheClub) {
    this.leaveTheClub();
  }
};
