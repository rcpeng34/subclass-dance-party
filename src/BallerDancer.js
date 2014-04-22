var BallerDancer = function(top, left, timeBetweenSteps, dancerIndex) {
  Dancer.apply(this, Array.prototype.slice.call(arguments));
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
  this._position[0] += (Math.random()*40)-20;
  this._position[1] += (Math.random()*40)-20;
  this.setPosition(this._position);
};
