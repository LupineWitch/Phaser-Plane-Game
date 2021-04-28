class SceneMain extends Phaser.Scene
{
  constructor() 
  {
    super({ key: "SceneMain" });
  }

  preload() 
  {
    // Images
    //Backgrounds
    this.load.image("sprBg0", "Content/Backgrounds/sprBg0.png");
    this.load.image("sprBg1", "Content/Backgrounds/sprBg1.png");
    //Enemies
    this.load.image("enemy0","Content/SpaceShooterRedux/PNG/Enemies/enemyBlack1.png");
    this.load.image("enemy1","Content/SpaceShooterRedux/PNG/Enemies/enemyBlack2.png");
    this.load.image("enemy2","Content/SpaceShooterRedux/PNG/Enemies/enemyBlack3.png");
    this.load.image("enemy3","Content/SpaceShooterRedux/PNG/Enemies/enemyBlack4.png");
    this.load.image("enemy4","Content/SpaceShooterRedux/PNG/Enemies/enemyBlack5.png");
    //Projectiles
    this.load.image("enemy_proj_0","Content/SpaceShooterRedux/PNG/Lasers/laserBlue01.png");
    this.load.image("player_proj_0","Content/SpaceShooterRedux/PNG/Lasers/laserGreen11.png");
    //Player
    this.load.image("player0","Content/SpaceShooterRedux/PNG/playerShip1_green.png");

    //Sounds
    //Laser
    this.load.audio("sndLaser", "Content/Sounds/sfx_wpn_laser12.wav");
  }

  create() 
  {
    // Adding sounds to array
    this.sfx =
    {  
      laser: this.sound.add("sndLaser")
    };

    //Buttons init
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //Player Init
    this.player = new Player( this, this.game.config.width * 0.5,this.game.config.height * 0.5,"player0");
    this.player.setScale(0.5);
    //Entity groups init
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    ///Random spawn event
    this.time.addEvent({
        delay: 500,
        callback: function() {
            var enemy = null;
            if (Phaser.Math.Between(0, 10) >= 3) 
            {
              enemy = new GunShip(this, Phaser.Math.Between(0, this.game.config.width), 0);
            }
            else 
            {
              if (Phaser.Math.Between(0, 10) >= 5) 
              {
                if (this.getEnemiesByType("ChaserShip").length < 5) 
                {
                  enemy = new ChaserShip(this, Phaser.Math.Between(0, this.game.config.width), 0);
                }
              }
              else 
              {
                enemy = new CarrierShip(this, Phaser.Math.Between(0, this.game.config.width), 0);
              }
            }
        
            if (enemy !== null) 
            {
              enemy.setScale(Phaser.Math.Between(10, 20) * 0.05);
              this.enemies.add(enemy);
            }
        },
        callbackScope: this,
        loop: true
    });

    // Collisions between player projectiles and enemies
    this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
      if (enemy) 
      {
        if (enemy.onDestroy !== undefined) 
        {
          enemy.onDestroy();
        }
      
        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    // Overlaping
    this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
      if (!player.getData("isDead") && !enemy.getData("isDead")) 
      {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
      if (!player.getData("isDead") && !laser.getData("isDead")) 
      {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });

    // Create background(s)
    this.backgrounds = [];
    for (var i = 0; i < 5; i++)
    { 
      var bg = new ScrollingBackground(this, "sprBg0", i * 10);
      this.backgrounds.push(bg);
    }
  }

  getEnemiesByType(type) 
  {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) 
    {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) 
      {
        arr.push(enemy);
      }
    }
    return arr;
  }

  update()
  {
    if (!this.player.getData("isDead"))
    {
      this.player.update();

      //Movement
      if (this.keyW.isDown) 
      {
        this.player.moveUp();
      }
      else 
      {
        if (this.keyS.isDown) 
        {
          this.player.moveDown();
        }
      }   

      if (this.keyA.isDown)
      {
        this.player.moveLeft();
      }
      else 
      {
        if (this.keyD.isDown)
        {
          this.player.moveRight();
        }
      }
      
      //Shooting
      if (this.keySpace.isDown) 
      {
          this.player.setData("isShooting", true);
      }
      else 
      {
          this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
          this.player.setData("isShooting", false);
      }
    }

    for (var i = 0; i < this.enemies.getChildren().length; i++)
    {
      var enemy = this.enemies.getChildren()[i];
      enemy.update();

      if (enemy.x < -enemy.displayWidth || enemy.x > this.game.config.width + enemy.displayWidth 
        || enemy.y < -enemy.displayHeight * 4 || enemy.y > this.game.config.height + enemy.displayHeight) 
      {
        if (enemy) 
        {
          if (enemy.onDestroy !== undefined) 
          {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }


    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) 
    {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth || laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 || laser.y > this.game.config.height + laser.displayHeight) 
      {
        if (laser) 
        {
          laser.destroy();
        }
      }
    }
  
    for (var i = 0; i < this.playerLasers.getChildren().length; i++) 
    {
      var laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth || laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 || laser.y > this.game.config.height + laser.displayHeight) 
      {
        if (laser) 
        {
          laser.destroy();
        }
      }
    }

    // Scroll background
    for (var i = 0; i < this.backgrounds.length; i++)
    {
      this.backgrounds[i].update();
    }
  }
}