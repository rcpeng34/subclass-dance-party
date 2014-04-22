var ColorDancer = function(top, left, timeBetweenSteps, dancerIndex) {
  Dancer.apply(this, Array.prototype.slice.call(arguments));
};

ColorDancer.prototype = Object.create(Dancer.prototype);
ColorDancer.prototype.step = function () {
  Dancer.prototype.step.apply(this);
  var color = Math.random();
  if(color < 0.25) {
    color = "blue";
  } else if(color < 0.5) {
      color = "red";
  } else if(color < 0.75) {
    color = "green";
  } else {
    color = "yellow";
  }
  this.$node.css("border", "10px solid " + color);
};
