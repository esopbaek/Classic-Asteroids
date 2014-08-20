(function(root) {
  var Asteroids = root.Asteroids = ( root.Asteroids || {});
  
  var Bullet = Asteroids.Bullet = function(pos, vel) {
    Asteroids.MovingObject.call(this,
        pos, vel,
        Asteroids.Bullet.RADIUS,
        Asteroids.Bullet.COLOR);
  };
  
  Bullet.RADIUS = 5;
  Bullet.COLOR = "red";

  Bullet.inherits(Asteroids.MovingObject);
  
})(this)
