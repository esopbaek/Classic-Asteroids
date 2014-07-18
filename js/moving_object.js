(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var MovingObject = Asteroids.MovingObject = function(pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };
  
  MovingObject.prototype.isOffScreen = function() {
    if (this.pos[0] > Asteroids.Game.DIM_X + this.radius) {
      return "right"
    } else if (this.pos[1] > Asteroids.Game.DIM_Y + this.radius) {
      return "bottom"
    } else if (this.pos[0] + this.radius < 0) {
      return "left"
    } else if (this.pos[1] + this.radius < 0) {
      return "top"
    } else {
      return false
    }
  };
  
  MovingObject.prototype.move = function() {
    switch (this.isOffScreen()) {
    case "right":
      this.pos[0] %= Asteroids.Game.DIM_X;
      break;
    case "left":
      this.pos[0] = Asteroids.Game.DIM_X - this.pos[0];
      break;
    case "bottom":
      this.pos[1] %= Asteroids.Game.DIM_Y;
      break;
    case "top":
      this.pos[1] = Asteroids.Game.DIM_Y - this.pos[1];
      break;
    }
    
    this.pos[0] = (this.pos[0] + this.vel[0]);
    this.pos[1] = (this.pos[1] + this.vel[1]);
  };
  
  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };
  
  
  MovingObject.prototype.isCollidedWith = function(otherObject) {
    //compute the distance between the two centers for the objects.
    var xDiff = this.pos[0] - otherObject.pos[0];
    var yDiff = this.pos[1] - otherObject.pos[1];
    var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    //console.log(distance + " " + (this.radius + otherObject.radius));
    return ((this.radius + otherObject.radius) > distance);
  };
  
})(this)