import Phaser from "phaser";
import GameScene from "./scenes/GameScene";
import HouseScene from "./scenes/HouseScene";

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,

  backgroundColor: "#7ec850",

  pixelArt: true,

  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },

  scene: [
    GameScene,
    HouseScene
  ]
};

new Phaser.Game(config);