(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };
  
  MovingObject.prototype.move = function() {
    //do physics here
  };
  
  MovingObject.prototype.draw = function(ctx) {
    //draw a circle with correct radius around pos
  };
  
  MovingObject.prototype.isCollidedWith = function(otherObject) {
    //compute the distance between the two centers fo the objects.
  };
  
})(this)