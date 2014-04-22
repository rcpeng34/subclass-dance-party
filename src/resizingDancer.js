var ResizingDancer = function(top, left, timeBetweenSteps, dancerIndex) {
  Dancer.apply(this, Array.prototype.slice.call(arguments));
};

ResizingDancer.prototype = Object.create(Dancer.prototype);
ResizingDancer.prototype.step = function () {
  Dancer.prototype.step.apply(this);

  var border = this.$node.css("border");
  if(border === "10px solid rgb(255, 0, 0)") {
    this.$node.css("border", "50px solid rgb(255, 0, 0)");
  } else {
    this.$node.css("border", "10px solid rgb(255, 0, 0)");
  }
};
