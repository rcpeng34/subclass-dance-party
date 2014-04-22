var BallerDancer = function(top, left, timeBetweenSteps, dancerIndex) {
  Dancer.apply(this, Array.prototype.slice.call(arguments));
  this.$node.css('background',
    'url(http://cdn.freebievectors.com/illustrations/10/b/business-man-clip-art/preview.jpg)')
};

BallerDancer.prototype = Object.create(Dancer.prototype);
// BallerDancer.prototype.oldstep = Dancer.prototype.step;
BallerDancer.prototype.step = function () {
  // this.oldstep();
  Dancer.prototype.step.apply(this);
};
