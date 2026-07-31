import Phaser from "phaser";

export default class HouseScene extends Phaser.Scene {

    constructor() {
        super("HouseScene");
    }

    preload() {

        // Harita
        this.load.tilemapTiledJSON(
            "house",
            "maps/House.tmj"
        );

        // Tileset
        this.load.image(
            "houseTiles",
            "maps/roguelikeIndoor_transparent_4x.png"
        );

        // Karakterler
        this.load.image(
            "erenn",
            "sprites/erenn.png"
        );

        this.load.image(
            "yaren",
            "sprites/yaren.png"
        );

    }

    create() {

        // Harita
        const map = this.make.tilemap({
            key: "house"
        });

        // Tileset
        const tileset = map.addTilesetImage(
            "roguelikeIndoor_transparent_4x",
            "houseTiles"
        );

        // Katmanlar
        const groundLayer =
            map.createLayer("Ground", tileset);

        const collisionLayer =
            map.createLayer("Collision", tileset);

        const objectsLayer =
            map.createLayer("Objects", tileset);

        const frontLayer =
            map.createLayer("Front", tileset);
            const triggerLayer = map.getObjectLayer("Triggers");

this.exitDoor = triggerLayer.objects.find(
    object => object.name === "ExitDoor"
);

        // Çarpışmalar
        collisionLayer.setCollisionByExclusion([-1]);

        // =====================
        // EREN
        // =====================

        this.player = this.physics.add.sprite(
            160,
            260,
            "erenn"
        );

        this.player.setScale(3);
        this.player.setDepth(3);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(
            this.player,
            collisionLayer
        );

        // =====================
        // YAREN
        // =====================

        this.yaren = this.physics.add.staticSprite(
            235,
            260,
            "yaren"
        );

        this.yaren.setScale(3);
        this.yaren.setDepth(3);

        // Kamera

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

        this.cameras.main.startFollow(this.player);

        // Zoom
        this.cameras.main.setZoom(2);

        // Katman sırası

        groundLayer.setDepth(0);
        collisionLayer.setDepth(1);
        objectsLayer.setDepth(2);
        this.player.setDepth(3);
        this.yaren.setDepth(3);
        frontLayer.setDepth(4);

        // Klavye

        this.cursors =
            this.input.keyboard.createCursorKeys();

        this.keyY =
            this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.Y
            );

        // Evden çık yazısı

        this.exitText = this.add.text(
            0,
            0,
            "[Y] Evden Çık",
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

        this.exitText.setScrollFactor(0);
        this.exitText.setDepth(100);
        this.exitText.setVisible(false);
        }

         update() {

        // Hareket
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

        // Kapı (çıkış) noktası
        if (this.exitDoor) {

    const exitDistance = Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.exitDoor.x + this.exitDoor.width / 2,
        this.exitDoor.y + this.exitDoor.height / 2
    );

    if (exitDistance < 70) {

        this.exitText.setVisible(true);

        this.exitText.setPosition(
            this.cameras.main.width / 2 - 70,
            this.cameras.main.height - 45
        );

        if (Phaser.Input.Keyboard.JustDown(this.keyY)) {
            this.scene.start("GameScene");
        }

    } else {

        this.exitText.setVisible(false);

    }

}


    }

}