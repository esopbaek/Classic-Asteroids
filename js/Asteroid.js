(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    // inherit these attributes from moving object
    Asteroids.MovingObject.call(this, pos, vel, Asteroids.Asteroid.RADIUS, Asteroids.Asteroid.COLOR);
  };
  
  Asteroid.COLOR = "gray";
  Asteroid.RADIUS = 30;
  
  Asteroid.randomAsteroid = function(dimX, dimY) {
    return new Asteroid(
      [dimX * Math.random(), dimY * Math.random()],
      this.randomVec()
    );
  };
  
  Asteroid.randomVec = function() {
    // helper function fro randomAsteroid
    return [Math.random() * 20 - 10, Math.random() * 20 - 10];
  };
  
  // inherits is defined in helpers.js
  Asteroid.inherits(Asteroids.MovingObject);
  
})(this)