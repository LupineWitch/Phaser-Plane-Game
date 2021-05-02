class SceneMainMenu extends Phaser.Scene 
{
  constructor() 
  {
    super({ key: "SceneMainMenu" });
  }
  
  preload()
  {
    //Graphics
    // Backgrounds
    this.load.image("sprBg0", "Content/Backgrounds/sprBg0.png");
    this.load.image("sprBg1", "Content/Backgrounds/sprBg1.png");
    // Play button
    this.load.image("sprBtnPlay", "Content/MenuButtons/sprBtnPlay.png");
    this.load.image("sprBtnPlayHover", "Content/MenuButtons/sprBtnPlayHover.png");
    this.load.image("sprBtnPlayDown", "Content/MenuButtons/sprBtnPlayDown.png");

    //Sounds
    // Play button
    this.load.audio("sndBtnOver", "Content/Sounds/sfx_menu_move4.wav");
    this.load.audio("sndBtnDown", "Content/Sounds/sfx_menu_select1.wav");
    this.load.audio("backgroundMusic", "Content/Music/SoundHelix-Song-16.mp3");

  }

  create() 
  {
    // Add sounds to array
    this.sfx = {
      btnOver: this.sound.add("sndBtnOver"),
      btnDown: this.sound.add("sndBtnDown")
    };

    this.bgMusic = this.sound.add('backgroundMusic', { volume: 0.5, loop: true });
    this.bgMusic.play();

    // Create play button
    this.btnPlay = this.add.sprite(this.game.config.width * 0.5,this.game.config.height * 0.5,"sprBtnPlay");
    this.btnPlay.setInteractive();

    this.btnPlay.on("pointerover", function() {
      this.btnPlay.setTexture("sprBtnPlayHover");
      this.sfx.btnOver.play(); 
    }, this);

    this.btnPlay.on("pointerout", function() {
      this.setTexture("sprBtnPlay");
    });

    this.btnPlay.on("pointerdown", function() {
      this.btnPlay.setTexture("sprBtnPlayDown");
      this.sfx.btnDown.play();
    }, this);

    this.btnPlay.on("pointerup", function() {
      this.btnPlay.setTexture("sprBtnPlay");
      this.scene.start("SceneMain");
    }, this);

    // Title text
    this.title = this.add.text(this.game.config.width * 0.5, 128, "SPACE SHOOTER", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);

    // Setting background(s)
    this.backgrounds = [];
    for (var i = 0; i < 5; i++) 
    {
      var keys = ["sprBg0", "sprBg1"];
      var key = keys[Phaser.Math.Between(0, keys.length - 1)];
      var bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }
  
  update()
  {
    // Scrolling the background
    for (var i = 0; i < this.backgrounds.length; i++) 
    {
      this.backgrounds[i].update();
    }
  }
}