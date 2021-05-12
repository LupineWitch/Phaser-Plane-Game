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
    this.load.image("player1","Content/PowerUps/Shield/playerShip1_green_shield.png");
    this.load.image("shield1", "Content/SpaceShooterRedux/PNG/Effects/shield1.png")
    //Sounds
    //Laser
    this.load.audio("sndLaser", "Content/Sounds/sfx_wpn_laser12.wav");
    this.load.audio("sndexp", "Content/Sounds/sfx_exp_medium1.wav");

    //Animations - load sprites
    // Explosion
    this.load.image("expFrame1", "Content/Explosions/Explosion_1.png");
    this.load.image("expFrame2", "Content/Explosions/Explosion_2.png");
    this.load.image("expFrame3", "Content/Explosions/Explosion_3.png");
    this.load.image("expFrame4", "Content/Explosions/Explosion_4.png");
    this.load.image("expFrame5", "Content/Explosions/Explosion_5.png");
    this.load.image("expFrame6", "Content/Explosions/Explosion_6.png");
    this.load.image("expFrame7", "Content/Explosions/Explosion_7.png");

    //Bonuses
    // Heart
    this.load.image("power_up0_f1", "Content/PowerUps/Heart/hear (1).png");
    this.load.image("power_up0_f2", "Content/PowerUps/Heart/hear (2).png");
    this.load.image("power_up0_f3", "Content/PowerUps/Heart/hear (3).png");
    this.load.image("power_up0_f4", "Content/PowerUps/Heart/hear (4).png");
    this.load.image("power_up0_f5", "Content/PowerUps/Heart/hear (5).png");
    this.load.image("power_up0_f6", "Content/PowerUps/Heart/hear (6).png");
    this.load.image("power_up0_f7", "Content/PowerUps/Heart/hear (7).png");
    this.load.image("power_up0_f8", "Content/PowerUps/Heart/hear (8).png");
    this.load.image("power_up0_f9", "Content/PowerUps/Heart/hear (9).png");
    // Triple shot
    this.load.image("power_up1_f1", "Content/PowerUps/Triple/triple (1).png");
    this.load.image("power_up1_f2", "Content/PowerUps/Triple/triple (2).png");
    this.load.image("power_up1_f3", "Content/PowerUps/Triple/triple (3).png");
    this.load.image("power_up1_f4", "Content/PowerUps/Triple/triple (4).png");
    this.load.image("power_up1_f5", "Content/PowerUps/Triple/triple (5).png");
    this.load.image("power_up1_f6", "Content/PowerUps/Triple/triple (6).png");
    this.load.image("power_up1_f7", "Content/PowerUps/Triple/triple (7).png");
    this.load.image("power_up1_f8", "Content/PowerUps/Triple/triple (8).png");
    // Shield
    this.load.image("power_up2_f1", "Content/PowerUps/Shield/pixil-frame-0.png");
    this.load.image("power_up2_f2", "Content/PowerUps/Shield/pixil-frame-1.png");
    this.load.image("power_up2_f3", "Content/PowerUps/Shield/pixil-frame-2.png");
    this.load.image("power_up2_f4", "Content/PowerUps/Shield/pixil-frame-3.png");
    this.load.image("power_up2_f5", "Content/PowerUps/Shield/pixil-frame-4.png");
    this.load.image("power_up2_f6", "Content/PowerUps/Shield/pixil-frame-5.png");
    this.load.image("power_up2_f7", "Content/PowerUps/Shield/pixil-frame-6.png");
    this.load.image("power_up2_f8", "Content/PowerUps/Shield/pixil-frame-7.png");
    this.load.image("power_up2_f9", "Content/PowerUps/Shield/pixil-frame-8.png");
    this.load.image("power_up2_f10", "Content/PowerUps/Shield/pixil-frame-9.png");
    this.load.image("power_up2_f11", "Content/PowerUps/Shield/pixil-frame-10.png");
    this.load.image("power_up2_f12", "Content/PowerUps/Shield/pixil-frame-11.png");
  }


  create() 
  {
    // Adding sounds to array
    this.sfx =
    {  
      laser: this.sound.add("sndLaser"),
      explosion1: this.sound.add("sndexp")

    };

        //Animations create
        this.anims.create({
          key: 'deathExplosion',
          frames: [
              { key: 'expFrame1' },
              { key: 'expFrame2' },
              { key: 'expFrame3' },
              { key: 'expFrame4' },
              { key: 'expFrame5' },
              { key: 'expFrame6' },
              { key: 'expFrame7', duration: 50 }
          ],
          frameRate: 16,
          repeat: 0
      });

      this.anims.create({
        key: 'power_up0anim',
        frames: [
            { key: 'power_up0_f1' },
            { key: 'power_up0_f2' },
            { key: 'power_up0_f3' },
            { key: 'power_up0_f4' },
            { key: 'power_up0_f5' },
            { key: 'power_up0_f6' },
            { key: 'power_up0_f7' },
            { key: 'power_up0_f8' },
            { key: 'power_up0_f9', duration: 20 }
        ],
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
      key: 'power_up1anim',
      frames: [
          { key: 'power_up1_f1' },
          { key: 'power_up1_f2' },
          { key: 'power_up1_f3' },
          { key: 'power_up1_f4' },
          { key: 'power_up1_f5' },
          { key: 'power_up1_f6' },
          { key: 'power_up1_f7' },
          { key: 'power_up1_f8', duration: 20 }
      ],
      frameRate: 5,
      repeat: -1
  });

  this.anims.create({
    key: 'power_up2anim',
    frames: [
        { key: 'power_up2_f1' },
        { key: 'power_up2_f2' },
        { key: 'power_up2_f3' },
        { key: 'power_up2_f4' },
        { key: 'power_up2_f5' },
        { key: 'power_up2_f6' },
        { key: 'power_up2_f7' },
        { key: 'power_up2_f8' },
        { key: 'power_up2_f9' },
        { key: 'power_up2_f10' },
        { key: 'power_up2_f11' },
        { key: 'power_up2_f12', duration: 20 }
    ],
    frameRate: 5,
    repeat: -1
});

    //Buttons init
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    //Player Init
    this.player = new Player( this, this.game.config.width * 0.5,this.game.config.height * 0.5,"player0");
    this.player.setScale(0.5);
    var HP_info = this.add.text(10, 10, 'HP: 3', { font: '48px Arial', fill: '#FFFFFF' });
    //Entity groups init
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();
    this.pickUps = this.add.group();


    ///Random spawn event
    this.time.addEvent({
        delay: 500,
        callback: function() {
            var enemy = null;
            if (Phaser.Math.Between(0, 10) >= 3) 
            {
              enemy = new GunShip(this, Phaser.Math.Between(0, this.game.config.width), 0);
            }
            else if(Phaser.Math.Between(0, 10) >= 5)
            {
              enemy = new SliderShip(this, 70, 0);

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
              enemy.setScale(Phaser.Math.Between(10, 15) * 0.04);
              this.enemies.add(enemy);
            }
        },
        callbackScope: this,
        loop: true
    });

    //Spawn power up
    this.time.addEvent({
      delay: 2000,
      callback: function() {
          var powerUp = null;
          if (Phaser.Math.Between(0, 10) >= 3) 
          {
            powerUp = new Power_up(this, Phaser.Math.Between(0, this.game.config.width), 0, "power_up0_f1","power_up","HP");
            powerUp.setScale(1);
            powerUp.play("power_up0anim");

          }
          else if(Phaser.Math.Between(0,10) >= 4)
          {
            powerUp = new Power_up(this, Phaser.Math.Between(0, this.game.config.width), 0, "power_up1_f1","power_up","TripleShot");
            powerUp.setScale(1.5);
            powerUp.play("power_up1anim");
          }
          else if(Phaser.Math.Between(0,10) >= 7)
          {
            powerUp = new Power_up(this, Phaser.Math.Between(0, this.game.config.width), 0, "power_up2_f1","power_up","Shield");
            powerUp.setScale(1.5);
            powerUp.play("power_up2anim");
          }
      
          if (powerUp !== null) 
          {
            this.pickUps.add(powerUp);
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
      if (!player.getData("isDead") && !enemy.getData("isDead") && player.getData("CurrBonus") != "Shield") 
      {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
      laser.destroy();
      let tempHP = Number.parseInt(player.getData("HitPoints"));
      player.setData("HitPoints", tempHP <= 0 ? 0 :tempHP - 1 );
      HP_info.setText('HP: ' + Number.parseInt(player.getData("HitPoints")));
      if (player.getData("HitPoints") <= 0 && !laser.getData("isDead") && player.getData("CurrBonus") != "Shield") 
      {
        player.explode(false);
      laser.destroy();
      player.onDestroy();
      }
    });

    this.physics.add.overlap(this.player,this.pickUps,function(player,pickup)
    {
      var bonus = pickup.getData("bonus_type");
      var hp = Number.parseInt(player.getData("HitPoints"));
      switch(bonus)
      {
        case "HP":
          player.setData("HitPoints", hp + 1);
      HP_info.setText('HP: ' + Number.parseInt(player.getData("HitPoints")));
          break;
        case "TripleShot":
          player.setData("CurrBonus","TripleShot");
          player.setData("BonusTimeUP", 1000);          
          break;
          case "Shield":
            player.setData("CurrBonus","Shield");
            player.setData("BonusTimeUP", 1000); 
            player.setTexture("player1"); 
            //this.shield = new Shield(this, player.x, player.y, "shield1","shield_gizmo"); 
            break;
        default:
          break;
    }
    pickup.destroy();
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

    for (var i = 0; i < this.pickUps.getChildren().length; i++) 
    {
      var pickUp = this.pickUps.getChildren()[i];
     // pickUps.update();

      if (pickUp.x < -pickUp.displayWidth || pickUp.x > this.game.config.width + pickUp.displayWidth ||
        pickUp.y < -pickUp.displayHeight * 4 || pickUp.y > this.game.config.height + pickUp.displayHeight) 
      {
        if (pickUp) 
        {
          pickUp.destroy();
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