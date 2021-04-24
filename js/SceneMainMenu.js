class SceneMainMenu extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMainMenu" });
    }
    
    preload()
    {
      this.load.image("sprBtnPlay", "Content/MenuButtons/sprBtnPlay.png");
      this.load.image("sprBtnPlayHover", "Content/MenuButtons/sprBtnPlayHover.png");
      this.load.image("sprBtnPlayDown", "Content/MenuButtons/sprBtnPlayDown.png");
      this.load.image("sprBtnRestart", "Content/MenuButtons/sprBtnRestart.png");
      this.load.image("sprBtnRestartHover", "Content/MenuButtons/sprBtnRestartHover.png");
      this.load.image("sprBtnRestartDown", "Content/MenuButtons/sprBtnRestartDown.png");
    }
  
    create() {
      this.scene.start("SceneMain");
    }
  }

