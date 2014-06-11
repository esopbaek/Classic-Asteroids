(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    // inherit these attributes from moving object
    MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
  };
  
  Asteroid.COLOR = "gray";
  Asteroid.RADIUS = 10;
  
  Asteroid.randomAsteroid = function(dimX, dimY) {
    return new Asteroid(
      [dimX * Math.random(), dimY * Math.random()],
      this.randomVec()
    );
  };
  
  Asteroid.randomVec = function() {
    // helper function fro randomAsteroid
    return [Math.random() * 10 + 1, Math.random() * 10 + 1];
  };
  
  // inherits is defined in helpers.js
  Asteroid.inherits(MovingObject);
  
})(this)