import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  pixelArt: true,
  parent: 'game',
  scale: {
    width: 320,
    height: 240,
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade'
  }
};
