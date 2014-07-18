(function(root){
  var Asteroids = root.Asteroids = ( root.Asteroids || {});
  
  var Ship = Asteroids.Ship = function(pos, vel) {
      Asteroids.MovingObject.call(this, pos, vel, Asteroids.Ship.RADIUS, Asteroids.Ship.COLOR);
      this.angle = 0;
      this.angularVel = 0;
  };
  
  Ship.RADIUS = 5;
  Ship.COLOR = "blue";
  Ship.MAXSPEED
  
  Ship.inherits(Asteroids.MovingObject);
  
  Ship.prototype.power = function(impulse, angle) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };
  
  Ship.prototype.drawShip = function(ctx) {
    var vertices = [[0,-10],[-5,5],[5,5]];
    ctx.save();
    ctx.translate(this.pos[0],this.pos[1]);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(vertices[0][0], vertices[0][1]);
    ctx.lineTo(vertices[1][0], vertices[1][1]);
    ctx.lineTo(vertices[2][0], vertices[2][1]);
    ctx.closePath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.25;
    ctx.stroke();

    ctx.restore();
  };
  
  Ship.prototype.fireBullet = function() {
    var speed = Math.sqrt(this.vel[0] * this.vel[0] + this.vel[1] * this.vel[1]);
    var dirX = this.vel[0] / speed;
    var dirY = this.vel[1] / speed;
    if (this.vel == [0,0]) {
      return null;
    } else {
      return new Asteroids.Bullet([this.pos[0],this.pos[1]], [(Math.sin(this.angle) * 10 + this.vel[0]),
      (-Math.cos(this.angle) * 10 + this.vel[1])])
    }
  };
  

  
  
})(this)