import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    preload() {

        // Harita
        this.load.tilemapTiledJSON("map", "maps/date1.tmj");

        // Tilesetler
        this.load.image("tiles", "maps/Tilemap_color1.png");
        this.load.image("Bushe1", "maps/Bushe1.png");
        this.load.image("Bushe2", "maps/Bushe2.png");
        this.load.image("Rock1", "maps/Rock1.png");
        this.load.image("Tree1", "maps/Tree1.png");
        this.load.image("Tree2", "maps/Tree2.png");
        this.load.image("Tree3", "maps/Tree3.png");
        this.load.image("Tree4", "maps/Tree4.png");
        this.load.image("House2", "maps/House2.png");

        // Karakterler
        this.load.image("erenn", "sprites/erenn.png");
        this.load.image("yaren", "sprites/yaren.png");
    }

    create() {

        // Harita
        const map = this.make.tilemap({
            key: "map"
        });

        const ground = map.addTilesetImage("Tileset", "tiles");
        const bushe1 = map.addTilesetImage("Bushe1", "Bushe1");
        const bushe2 = map.addTilesetImage("Bushe2", "Bushe2");
        const rock1 = map.addTilesetImage("Rock1", "Rock1");
        const tree1 = map.addTilesetImage("Tree1", "Tree1");
        const tree2 = map.addTilesetImage("Tree2", "Tree2");
        const tree3 = map.addTilesetImage("Tree3", "Tree3");
        const tree4 = map.addTilesetImage("Tree4", "Tree4");
        const house2 = map.addTilesetImage("House2", "House2");

        const allTilesets = [
            ground,
            bushe1,
            bushe2,
            rock1,
            tree1,
            tree2,
            tree3,
            tree4,
            house2
        ];

        const groundLayer =
            map.createLayer("Ground", allTilesets);

        const collisionLayer =
            map.createLayer("Collision", allTilesets);

        const objectsLayer =
            map.createLayer("Objects", allTilesets);

        const frontLayer =
            map.createLayer("Front", allTilesets);

        collisionLayer.setCollisionByExclusion([-1]);

        // Eren

        this.player = this.physics.add.sprite(
            640,
            500,
            "erenn"
        );

        this.player.setScale(3);
        this.player.setDepth(3);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(
            this.player,
            collisionLayer
        );

        // Yaren

        this.yaren = this.physics.add.staticSprite(
            780,
            260,
            "yaren"
        );

        this.yaren.setScale(3);
        this.yaren.setDepth(3);

        // Trigger

        const triggerLayer =
            map.getObjectLayer("Triggers");

        this.door = triggerLayer.objects.find(
            object => object.name === "Door"
        );  // Katman sırası

        groundLayer.setDepth(0);
        collisionLayer.setDepth(1);
        objectsLayer.setDepth(2);
        frontLayer.setDepth(4);

        // Kamera

        this.cameras.main.startFollow(this.player);

        this.cameras.main.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );

        this.physics.world.setBounds(
            0,
            0,
            map.widthInPixels,
            map.heightInPixels
        );

        // Klavye

        this.cursors =
            this.input.keyboard.createCursorKeys();

        this.keyE =
            this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.E
            );

        this.keyY =
            this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.Y
            );

        this.keySpace =
            this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SPACE
            );

        // ==========================
        // DİYALOG
        // ==========================

        this.dialogs = [

            "💜 Yaren\n\nHoş geldin Balım...",

            "Seni bekliyordum.",

            "Bugün birlikte çok güzel bir gün geçireceğiz.",

            "Önce evimize gidelim.",

            "→ Yeni Görev:\nYaren ile eve git."

        ];

        this.dialogIndex = 0;

        this.isTalking = false;

        // Diyalog kutusu

        this.dialogBox = this.add.rectangle(

            this.cameras.main.width / 2,
            this.cameras.main.height - 100,

            760,
            180,

            0x000000,
            0.85
        );

        this.dialogBox.setScrollFactor(0);
        this.dialogBox.setDepth(100);
        this.dialogBox.setVisible(false);

        this.dialogText = this.add.text(

            this.cameras.main.width / 2 - 320,
            this.cameras.main.height - 140,

            "",

            {

                fontSize: "24px",

                color: "#ffffff",

                wordWrap: {

                    width: 640

                }

            }

        );

        this.dialogText.setScrollFactor(0);
        this.dialogText.setDepth(101);
        this.dialogText.setVisible(false);

        // Konuş yazısı

        this.talkText = this.add.text(

            0,
            0,

            "[E] Konuş",

            {

                fontSize: "18px",

                color: "#ffffff",

                backgroundColor: "#000000",

                padding: {

                    x: 8,
                    y: 4

                }

            }

        );

        this.talkText.setScrollFactor(0);
        this.talkText.setDepth(100);
        this.talkText.setVisible(false);

        // Eve gir yazısı

        this.enterText = this.add.text(

            0,
            0,

            "[Y] Eve Gir",

            {

                fontSize: "18px",

                color: "#ffffff",

                backgroundColor: "#000000",

                padding: {

                    x: 8,
                    y: 4

                }

            }

        );

        this.enterText.setScrollFactor(0);
        this.enterText.setDepth(100);
        this.enterText.setVisible(false);
            }

           update() {

        // ==================================
        // Diyalog açıksa oyuncu hareket etmesin
        // ==================================

        if (!this.isTalking) {

            this.player.setVelocity(0);

            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-200);
            }

            if (this.cursors.right.isDown) {
                this.player.setVelocityX(200);
            }

            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-200);
            }

            if (this.cursors.down.isDown) {
                this.player.setVelocityY(200);
            }

        } else {

            this.player.setVelocity(0);

        }

        // ==================================
        // Yaren ile konuşma
        // ==================================

        const distance = Phaser.Math.Distance.Between(
            this.player.x,
            this.player.y,
            this.yaren.x,
            this.yaren.y
        );

        if (distance < 120) {

            this.talkText.setVisible(true);

            this.talkText.setPosition(
                this.cameras.main.width / 2 - 45,
                this.cameras.main.height - 60
            );

            if (
                Phaser.Input.Keyboard.JustDown(this.keyE)
                && !this.isTalking
            ) {

                this.isTalking = true;

                this.dialogIndex = 0;

                this.dialogBox.setVisible(true);
                this.dialogText.setVisible(true);

                this.dialogText.setText(
                    this.dialogs[this.dialogIndex] +
                    "\n\n[SPACE] Devam"
                );

            }

        } else {

            this.talkText.setVisible(false);

        }

        // ==================================
        // SPACE ile diyaloğu ilerlet
        // ==================================

        if (
            this.isTalking &&
            Phaser.Input.Keyboard.JustDown(this.keySpace)
        ) {

            this.dialogIndex++;

            if (this.dialogIndex < this.dialogs.length) {

                this.dialogText.setText(
                    this.dialogs[this.dialogIndex] +
                    "\n\n[SPACE] Devam"
                );

            } else {

                this.dialogBox.setVisible(false);
                this.dialogText.setVisible(false);

                this.isTalking = false;
                }

}

         // ==================================
        // Eve giriş
        // ==================================

        if (this.door) {

            const houseDistance = Phaser.Math.Distance.Between(
                this.player.x,
                this.player.y,
                this.door.x + this.door.width / 2,
                this.door.y + this.door.height / 2
            );

            if (houseDistance < 70) {

                this.enterText.setVisible(true);

                this.enterText.setPosition(
                    this.cameras.main.width / 2 - 55,
                    this.cameras.main.height - 30
                );

                if (Phaser.Input.Keyboard.JustDown(this.keyY)) {

                    this.scene.start("HouseScene");

                }

            } else {

                this.enterText.setVisible(false);

            }

        }

    }

 }