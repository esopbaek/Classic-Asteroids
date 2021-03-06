(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius) {
    // inherit these attributes from moving object
    Asteroids.MovingObject.call(this, pos, vel, radius, Asteroids.Asteroid.COLOR);
  };
  
  // inherits is defined in helpers.js
  Asteroid.inherits(Asteroids.MovingObject);
  
  Asteroid.COLOR = "gray";
  Asteroid.RADIUS = 25;
  
  Asteroid.randomAsteroid = function(dimX, dimY) {
    return new Asteroid(
      [dimX * Math.random(), dimY * Math.random()],
      this.randomVec(), Asteroids.Asteroid.RADIUS * Math.random() + 15
    );
  };
  
  Asteroid.randomVec = function() {
    // helper function for randomAsteroid
    return [Math.random() * 4 - 2, Math.random() * 4 - 2];
  };
  
})(this)
