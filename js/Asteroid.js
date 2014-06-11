(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    // inherit these attributes from moving object
    MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
  };
  
  Asteroid.COLOR = "gray";
  Asteroid.RADIUS = 10;
  
  Asteroid.randomAsteroid = function(dimX, dimY) {
  };
  
  Asteroid.randomVec = function() {
    // helper function fro randomAsteroid
  };
  
  
  // inherits is defined in helpers.js
  Asteroid.inherits(MovingObject);
  
})(this)