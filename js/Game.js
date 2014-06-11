(function (root) {
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Game = Asteroids.Game = function(canvasEl) {
    this.ctx = canvasEl.getContext("2d");
    this.asteroids = [];
    
    this.addAsteroids(10);
  };
  
  Game.prototype.addAsteroids = function(numAsteroids) {
    for(var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  };
  
  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.FPS = 30;
  
  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }
    
  };
  
  Game.prototype.move = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      console.log("Move "+i);
      this.asteroids[i].move();
    }
  };
  
  Game.prototype.step = function() {
    //console.log("Step!");
    this.move();
    this.draw();
  };
  
  Game.prototype.start = function() {
    var game = this;
    window.setInterval(function(){
      game.step();
    }, Game.FPS);
  };
})(this)