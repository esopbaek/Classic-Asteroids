(function (root) {
  
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  
  var Game = Asteroids.Game = function(canvasEl) {
    this.ctx = canvasEl.getContext("2d");
    this.asteroids = [];
    this.score = 0;
    this.lives = 3;
    this.addAsteroids(8);
    this.ship = new Asteroids.Ship([Game.DIM_X/2, Game.DIM_Y/2], [0,0]);
    this.gameOver = false;
    this.bullets = [];
    this.score = 0;
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
    var that = this;
    
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ctx.font = "20pt Arial";
    this.ctx.fillStyle = "white";
  	this.ctx.fillText("Lives: " + this.lives, 10, 30);
  	this.ctx.fillText("Score: " + this.score,	10, 60);
    
    if (this.lives < 1) {
  		this.ctx.fillStyle = "white";
  		this.ctx.font = "20pt Arial";
  		this.ctx.fillText("GAMEOVER", Game.DIM_X/2, Game.DIM_Y/2);
  		this.ctx.font = "10pt Arial";
  		this.ctx.fillText("press space to continue", Game.DIM_X/2, Game.DIM_Y/2 + 10)
      this.gameOver = true;
    } 
    Game.prototype.newGame = function() {
      this.gameOver = false;
      this.asteroids = [];
      this.score = 0;
      this.lives = 3;
      this.addAsteroids(8);
      this.ship.pos[0] = Game.DIM_X/2
      this.ship.pos[1] = Game.DIM_Y/2
      this.bullets = [];
      this.score = 0;
    }
    
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }
    this.ship.angle += this.ship.angularVel;
    this.ship.drawShip(this.ctx);

    for (var i = 0; i< this.bullets.length; i++) {
      this.bullets[i].draw(this.ctx);
    }
  };
  
  Game.prototype.move = function() {
    this.ship.vel[0] *= .98;
    this.ship.vel[1] *= .98;
    
    //Move asteroids
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
    }
    
    this.ship.move();
    
    //Move bullets
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();
    }
  };
  
  Game.prototype.step = function() {
    if (!(this.gameOver)) {
      this.killBullets();
      this.move();
      this.draw();
      this.checkCollisions();
      this.killBullets();
      this.isGameWon();
    }
  };
  
  Game.prototype.start = function() {
    var game = this;
    this.bindKeyHandlers();
    this.timer = setInterval(function(){
      game.step();
    }, Game.FPS);
  };
  
  Game.prototype.reset = function() {
      this.lives--;
      this.asteroids = [];
      this.addAsteroids(8);
      this.ship = new Asteroids.Ship([Game.DIM_X/2, Game.DIM_Y/2], [0,0]);
      this.bullets = [];
      this.score = 0;
  }
  
  Game.prototype.checkCollisions = function() {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.ship.isCollidedWith(this.asteroids[i]) && this.lives > 0) {
          this.reset();
      }
      for(var j=0; j<this.bullets.length; j++) {
        if(this.asteroids[i].isCollidedWith(this.bullets[j])){
          this.splitAsteroid(this.asteroids[i]);
          this.removeBullet(this.bullets[j]);
          this.score += 10;
          break;
        }
      }
    }
  };
  
  Game.prototype.stop = function() {
    clearInterval(this.timer);

  };
  
  Game.prototype.fireBullet = function() {
    var bullet = this.ship.fireBullet();
    if(bullet){
      this.bullets.push(bullet);
    }
  };
  
  Game.prototype.removeBullet = function(bullet) {
    var index = this.bullets.indexOf(bullet)
    if (index > -1) {
      this.bullets.splice(index, 1);
    }
  };
  
  Game.prototype.removeAsteroid = function(asteroid) {
    var index = this.asteroids.indexOf(asteroid)
    if (index > -1) {
      this.asteroids.splice(index, 1);
    }
  };
  
  Game.prototype.splitAsteroid = function(asteroid) {
    if (asteroid.radius > 30) {      
      this.asteroids.push(new Asteroids.Asteroid([asteroid.pos[0], asteroid.pos[1]], Asteroids.Asteroid.randomVec(), asteroid.radius/2))
      this.asteroids.push(new Asteroids.Asteroid([asteroid.pos[0], asteroid.pos[1]], Asteroids.Asteroid.randomVec(), asteroid.radius/2))
      this.removeAsteroid(asteroid)

    } else {
      this.removeAsteroid(asteroid)
    }
  };

  Game.prototype.bindKeyHandlers = function() {
    var that = this;
    
    key('up', function(){
      that.ship.power(
        [Math.sin(that.ship.angle) * .8, 
        -Math.cos(that.ship.angle) * .8]); });
    key('left', function() {
      that.ship.angularVel = -(Math.PI/30) });
    key('right', function() {
      that.ship.angularVel = (Math.PI/30) });
    key('space', function() {
      console.log(that.lives)
      if (that.lives > 0) {
        that.fireBullet();
      } else {
        that.newGame();
      }
    });
    keyup('up', function() {
      that.ship.vel[0] *= .8
      that.ship.vel[1] *= .8
    })
    keyup('left', function(){ 
      that.ship.angularVel = 0 
    });
    keyup('right', function(){ 
      that.ship.angularVel = 0 
    });
  };
  
  Game.prototype.isGameWon = function() {
    if (this.asteroids.length === 0) {
      var that = this;
      setInterval(function(){
        that.ctx.font = "50pt Arial";
        that.ctx.fillStyle = "white";
        that.ctx.fillText("CONGRATS, YOU WIN!", Game.DIM_X/2 - 360, Game.DIM_Y/2);
        that.bullets = []
      }, 60)
      this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      this.stop();
    }
  };
  
  Game.prototype.killBullets = function() {
    var that = this;
    _.each(this.bullets, function(bullet) {
      if (bullet.isOffScreen()) {
        that.removeBullet(bullet);
      }
    })
  };
  
})(this)