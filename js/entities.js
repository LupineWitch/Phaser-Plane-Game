class Entity extends Phaser.GameObjects.Sprite
{
  constructor(scene, x, y, key, type) 
  {
      super(scene, x, y, key);
      this.scene = scene;
      this.scene.add.existing(this);
      this.scene.physics.world.enableBody(this, 0);
      this.setData("type", type);
      this.setData("isDead", false);
  }

  explode(canDestroy)
  {
    if (!this.getData("isDead")) 
    {
      // this.setTexture("sprExplosion"); 
      //  this.play("sprExplosion"); 
      //this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play();

      if (this.shootTimer !== undefined) 
      {
        if (this.shootTimer) 
        {
          this.shootTimer.remove(false);
        }
      }

      this.setAngle(0);
      this.body.setVelocity(0, 0);

      this.on('animationcomplete', function() {
        if (canDestroy) 
        {
          this.destroy();
        }
        else 
        {
          this.setVisible(false);
        }
      }, this);
      this.setData("isDead", true);
    }
  }
}

class Player extends Entity
{
  constructor(scene, x, y, key, type)
  {
    super(scene, x, y, key);
    this.setData("speed", 200);
    this.setData("isShooting", false);
    this.setData("timerShootDelay", 10);
    this.setData("timerShootTick", this.getData("timerShootDelay") - 1); 
  }

  onDestroy()
  {
    this.scene.time.addEvent(
    {
      delay: 1000,
      callback: function() 
      {
        this.scene.scene.start("SceneGameOver");
      },
      callbackScope: this,
      loop: false
    });
  }

  moveUp() 
  {
    this.body.velocity.y = -this.getData("speed");
  }
    
  moveDown() 
  {
    this.body.velocity.y = this.getData("speed");
  }
  
  moveLeft() 
  {
    this.body.velocity.x = -this.getData("speed");
  }
  
  moveRight() 
  {
    this.body.velocity.x = this.getData("speed");
  }


  update()
  {
    this.body.setVelocity(0, 0);

    //Stay in bounds
    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    //Shooting logic
    if (this.getData("isShooting")) 
    {
        if (this.getData("timerShootTick") < this.getData("timerShootDelay")) 
        {
          // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
          this.setData("timerShootTick", this.getData("timerShootTick") + 1); 
        }
        else 
        {
          // when the "manual timer" is triggered:
          var laser = new PlayerLaser(this.scene, this.x, this.y);
          this.scene.playerLasers.add(laser);
        
          this.scene.sfx.laser.play();
          this.setData("timerShootTick", 0);
        }
    }
  }
}

class PlayerLaser extends Entity 
{
  constructor(scene, x, y) 
  {
    super(scene, x, y, "player_proj_0");
    this.body.velocity.y = -200;
  }
}

class EnemyLaser extends Entity 
{
  constructor(scene, x, y) 
  {
    super(scene, x, y, "enemy_proj_0");
    this.body.velocity.y = 200;
  }
}

class ChaserShip extends Entity 
{
  constructor(scene, x, y) 
  {
    super(scene, x, y, "enemy0", "ChaserShip");
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.states = {
      MOVE_DOWN: "MOVE_DOWN",
      CHASE: "CHASE"
    };
    this.state = this.states.MOVE_DOWN;
  }

  update()
  {
      if (!this.getData("isDead") && this.scene.player) 
      {
          if (Phaser.Math.Distance.Between(this.x, this.y, this.scene.player.x, this.scene.player.y) < 320) 
          {
            this.state = this.states.CHASE;
          }
    
          if (this.state == this.states.CHASE) 
          {
            var dx = this.scene.player.x - this.x;
            var dy = this.scene.player.y - this.y;
    
            var angle = Math.atan2(dy, dx);
    
            var speed = 100;
            this.body.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
          }
      }

      //   if (this.x < this.scene.player.x) {
      //     this.angle -= 5;
      //   }
      //   else {
      //     this.angle += 5;
      //   } 
  }
}
  
class GunShip extends Entity 
{
  constructor(scene, x, y) 
  {
    super(scene, x, y, "enemy1", "GunShip");
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function() {
        var laser = new EnemyLaser(this.scene,this.x,this.y);
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true
    });
  }

  onDestroy()
  {
    if (this.shootTimer !== undefined) 
    {
      if (this.shootTimer) 
      {
        this.shootTimer.remove(false);
      }
    }
  }
}
  
class CarrierShip extends Entity 
{
  constructor(scene, x, y) 
  {
    super(scene, x, y, "enemy2", "CarrierShip");
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}



class ScrollingBackground 
{
  constructor(scene, key, velocityY) 
  {
    this.scene = scene;
    this.key = key;
    this.velocityY = velocityY;
    this.layers = this.scene.add.group();
    this.createLayers();
  }

  createLayers()
  {
    for (var i = 0; i < 2; i++) 
    {
      var layer = this.scene.add.sprite(0, 0, this.key);
      layer.y = (layer.displayHeight * i);
      var flipX = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
      var flipY = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
      layer.setScale(flipX * 2, flipY * 2);
      layer.setDepth(-5 - (i - 1));
      this.scene.physics.world.enableBody(layer, 0);
      layer.body.velocity.y = this.velocityY;

      this.layers.add(layer);
    }
  }

  update()
  {
    if (this.layers.getChildren()[0].y > 0) 
    {
      for (var i = 0; i < this.layers.getChildren().length; i++) 
      {
        var layer = this.layers.getChildren()[i];
        layer.y = (-layer.displayHeight) + (layer.displayHeight * i);
      }
    }
  }
}