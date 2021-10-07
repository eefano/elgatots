import Phaser from 'phaser';

type Mob = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

type Posa = {
  img:string;
  xof:integer;
  yof:integer;
}

class Clock {
  constructor(public shootchances:integer) {}
}

export default class Demo extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  private points!:integer;
  private win!:boolean;
  private enemies!:Phaser.GameObjects.Group;
  private cat!:Phaser.Physics.Arcade.Sprite;
  private pose!:{[key:string]: Posa};
  private cursors!:Phaser.Types.Input.Keyboard.CursorKeys;

  cat_vs_enemies(cat:
                 /*   Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | */
                     Phaser.Types.Physics.Arcade.GameObjectWithBody , 
                enemy:
               /* Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | */
                Phaser.Types.Physics.Arcade.GameObjectWithBody )
  {
    
    (enemy as Mob).disableBody(true,true);
      
    (enemy as Mob).getData('collision');
  }

  preload() {
    this.load.path = 'assets/';
    
    this.load.image("placeholder");
    this.load.image("allarme_1");
    this.load.image("cake_1");
    this.load.image("gatto_1");
    this.load.image("gatto_2");
    this.load.image("gatto_3");
    this.load.image("gatto_4");
    this.load.image("gatto_5");
    this.load.image("lazer_E");
    this.load.image("lazer_N");
    this.load.image("lazer_NE");
    this.load.image("lazer_NO");
    this.load.image("lazer_O");
    this.load.image("lazer_S");
    this.load.image("lazer_SE");
    this.load.image("lazer_SO");
    this.load.image("sfondo");
    this.load.image("sveglia_1");
    this.load.image("sveglia_2"); 

    /*
    this.load.audioSprite('boom','boom.ogg');
    this.load.audioSprite('hit','hit.ogg');
    this.load.audioSprite('ring','ring.ogg');
    this.load.audioSprite('shot','shot.ogg');
    */

    this.load.audio('ingame','ingame.ogg');
    this.load.audio('die','die.ogg');
    this.load.audio('win','win.ogg');  

    this.load.json('layers','layers.json');
  }

  resize()
  {
    var kx = Math.max(1,Math.floor(window.innerWidth / this.game.scale.gameSize.width));
    var ky = Math.max(1,Math.floor(window.innerHeight / this.game.scale.gameSize.height));  
    this.game.scale.setZoom(Math.min(kx,ky)); 
  }

  create() {
    this.points=0;
    this.win=false;

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    this.pose = this.cache.json.get('layers');


    this.textures.get('gatto_2').get().customPivot=true;
    this.textures.get('gatto_2').get().pivotY=1;
    this.textures.get('gatto_2').get().pivotX=0.5;

    this.anims.create(
       {
        key: 'catwalk',
        frames: [{key:'gatto_2'},{key:'gatto_3'}],
        frameRate: 8,
        repeat: -1
    });

    this.anims.create(
      {
       key: 'clockwalk',
       frames: [{key:'sveglia_1'},{key:'sveglia_2'}],
       frameRate: 1,
       repeat: -1
   });

    
    this.add.image(0,0,'sfondo').setOrigin(0,0);
   
    this.enemies = this.physics.add.group({allowGravity:false});
    this.cat = this.physics.add.sprite(40,220,'gatto_2');
     
    this.add.image(40,220,'placeholder').setOrigin(0,0);

    this.cat.play('catwalk');
    //this.cat.setTexture('cake_1');

    this.physics.add.overlap(this.cat,this.enemies,this.cat_vs_enemies);
    
    this.cursors=this.input.keyboard.createCursorKeys();
  

   // this.sound.playAudioSprite('boom');   
    }

    update()
{
    if(this.win==false)
  {
      if(this.points>=500)
      {
          this.win = true;
          return;
      }
      else
      {
        this.enemies.maxSize=1;
      }


      while(!this.enemies.isFull())
      {
          this.enemies.add(
            this.physics.add.sprite(100,100,'sveglia_1')
            .play('clockwalk')
            .setData('logic',new Clock(0)));
      }

      if(this.cursors.left.isDown) this.cat.setX(this.cat.x-1);
      if(this.cursors.right.isDown) this.cat.setX(this.cat.x+1);
      if(this.cursors.up.isDown) this.cat.setY(this.cat.y-1);
      if(this.cursors.down.isDown) this.cat.setY(this.cat.y+1);

  }
   
}
}
