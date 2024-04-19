//sprites && variable setup.go
let bob: Sprite = null 
let blast: Sprite = null 
let enemyBlast: Sprite = null 
let alien: Sprite = null 
let npc: Sprite = null
let coinIcon: Sprite = null 
let bigAlien: Sprite = null 




let blasterVelocityX = 0 
let blasterVelocityY = 200
let keys = 1
let bossFight = false



namespace SpriteKind{
    export const EnemyProjectile = SpriteKind.create()
    export const NonPlayable = SpriteKind.create()
    export const Chest = SpriteKind.create()
    export const HealthChest = SpriteKind.create()
    export const BigAlien = SpriteKind.create()
    export const Gate = SpriteKind.create()
    export const Key = SpriteKind.create()
}


info.setLife((25)) 
info.setBackgroundColor(15)
info.setBorderColor(15)
info.setFontColor(1)
coinIcon = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . f f f f f f f f f f . . .
    . . f f 4 4 4 4 4 4 4 4 f f . .
    . f f 4 4 4 4 4 3 4 4 4 4 f f .
    . f 4 4 4 3 3 3 3 3 3 4 4 4 f .
    . f 4 4 4 3 4 4 3 4 4 4 4 4 f .
    . f 4 4 4 3 4 4 3 4 4 4 4 4 f .
    . f 4 4 4 3 3 3 3 3 3 4 4 4 f .
    . f 4 4 4 4 4 4 3 4 3 4 4 4 f .
    . f 4 4 4 4 4 4 3 4 3 4 4 4 f .
    . f 4 4 4 3 3 3 3 3 3 4 4 4 f .
    . f f 4 4 4 4 4 3 4 4 4 4 f f .
    . . f f 4 4 4 4 4 4 4 4 f f . .
    . . . f f f f f f f f f f . . .
    . . . . . . . . . . . . . . . .
`)
coinIcon.setPosition(135, 5)
coinIcon.setFlag(SpriteFlag.RelativeToCamera, true)

//controller setup
bob = sprites.create(assets.image`bob`, SpriteKind.Player)
controller.moveSprite(bob)
scene.cameraFollowSprite(bob)



//blaster 
controller.A.onEvent(ControllerButtonEvent.Pressed, function (){
    blast = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . 9 9 9 9 . . . . . .
        . . . . . 9 9 2 2 9 9 . . . . .
        . . . . . 9 2 2 2 2 9 . . . . .
        . . . . . 9 2 2 2 2 9 . . . . .
        . . . . . 9 9 2 2 9 9 . . . . .
        . . . . . . 9 9 9 9 . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, bob, blasterVelocityX, blasterVelocityY)
    music.pewPew.play()
})

//aiming
game.onUpdate(function(){
    //up
    if(controller.up.isPressed()){
        blasterVelocityY = -200
        blasterVelocityX  = 0
        //angles
        if(controller.left.isPressed()){
            blasterVelocityX = -200
        } 
        if(controller.right.isPressed()) {
            blasterVelocityX = 200
        }
    }
    //down
    if (controller.down.isPressed()) {
        blasterVelocityY = 200
        blasterVelocityX = 0 
        //angles
        if (controller.left.isPressed()) {
            blasterVelocityX = -200
        }
        if (controller.right.isPressed()) {
            blasterVelocityX = 200
        }

    }
    //left
    if (controller.left.isPressed()) {
        blasterVelocityY = 0
        blasterVelocityX = -200
        //angles
        if (controller.up.isPressed()) {
            blasterVelocityY = -200
        }
        if (controller.down.isPressed()) {
            blasterVelocityY = 200
        }
    }
    
    //right 
    if (controller.right.isPressed()) {
        blasterVelocityY = 0 
        blasterVelocityX = 200
        //angles
        if (controller.up.isPressed()) {
            blasterVelocityY = -200
        }
        if (controller.down.isPressed()) {
            blasterVelocityY = 200
        }

    }

})

//spawnFunctions

    //alien 
    function spawnAlien(xPos: number, yPos: number, movement: number){
        let alien = sprites.create(assets.image`alien`, SpriteKind.Enemy)
        alien.setPosition(xPos * 16, yPos * 16) 
        let enemyBlastX = 0 
        let enemyBlastY = -200
        let enemyAlive = true 
        let enemyMoveX = 0
        let enemyMoveY = 0
        let movementSequence = 1
        
        alien.onDestroyed(function() {
            enemyAlive = false 
        })
        //blaster 
        game.onUpdateInterval(1200, function () {
            if (enemyAlive == true && Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y)<= 70){
                if (Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y) <= 70){
                    if(bob.x < (alien.x + 20) && bob.x > (alien.x - 20) && bob.y > alien.y){
                        enemyBlastX = 0 
                        enemyBlastY = 200
                    }
                }
                if (Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y) <= 70) {
                    if (bob.x < (alien.x + 20) && bob.x > (alien.x - 20) && bob.y < alien.y) {
                        enemyBlastX = 0
                        enemyBlastY = -200
                    }
                } 
                if (Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y) <= 70) {
                    if (bob.y < (alien.y + 20) && bob.y > (alien.y - 20) && bob.x > alien.x) {
                        enemyBlastX = 200
                        enemyBlastY = 0
                    }
                }
                if (Math.abs(bob.x - alien.x) <= 70 && Math.abs(bob.y - alien.y) <= 70) {
                    if (bob.y < (alien.y + 20) && bob.y > (alien.y - 20) && bob.x < alien.x) {
                        enemyBlastX = -200
                        enemyBlastY = 0
                    }
                }   
                //angles2
                if(bob.x <= (alien.x - 20) && bob.y <= (alien.y - 20)){
                    enemyBlastX = -200
                    enemyBlastY = -200
                }
                if (bob.x >= (alien.x + 20) && bob.y <= (alien.y - 20)) {
                    enemyBlastX = 200
                    enemyBlastY = -200
                }
                if (bob.x <= (alien.x - 20) && bob.y >= (alien.y + 20)) {
                    enemyBlastX = -200
                    enemyBlastY =  200
                }
                if (bob.x >= (alien.x + 20) && bob.y >= (alien.y + 20)) {
                    enemyBlastX = 200
                    enemyBlastY = 200
                }

                //projectileForAlien
                enemyBlast = sprites.createProjectileFromSprite(img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . 5 5 5 5 5 . . . . .
                    . . . . . . 5 7 7 7 5 . . . . .
                    . . . . . . 5 7 7 7 5 . . . . .
                    . . . . . . 5 7 7 7 5 . . . . .
                    . . . . . . 5 5 5 5 5 . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, alien, enemyBlastX, enemyBlastY)
                enemyBlast.setKind(SpriteKind.EnemyProjectile)
                music.knock.play()
            }
        })
        //movement
        if(movement == 1){
            enemyMoveX = 20
        }
        game.onUpdateInterval(4000, function(){
            if(movement == 1){
                alien.setVelocity(enemyMoveX, enemyMoveY)
                enemyMoveX = enemyMoveX * -1
            }
        })

    }
    
    //npc
    function spawnNPC(xPos: number, yPos: number, costume: number){
        let npc = sprites.create(assets.image`bobs friend`, SpriteKind.NonPlayable)
        npc.setPosition(xPos * 16, yPos * 16)
        //shopKeeperCostume
        if(costume == 2){
            npc.setImage(assets.image`shopHelper`)
        }
        //gateGuyCostume!
        if(costume == 3){
            npc.setImage(assets.image`doog`)
        }

        //row_of_?
        if(costume == 4){
            npc.setImage(img`
                . . . . . . . f f f f f . . . .
                . . . . . . f e e e e e f . . .
                . . . . . f e e e d d d d f . .
                . . . . f f e e d f d d f d c .
                . . . f d d e e d f d d f d c .
                . . . c d b e e d d d d e e d c
                f f . c d b e e d d c d d d d c
                f e f . c f e e d d d c c c c c
                f e f . . f f e e d d d d d f .
                f e f . f e e e e f f f f f . .
                f e f f e e e e e e e f . . . .
                . f f e e e e f e f f e f . . .
                . . f e e e e f e f f e f . . .
                . . . f e f f b d f b d f . . .
                . . . f d b b d d c d d f . . .
                . . . f f f f f f f f f . . . .
            `)
        }
        game.onUpdate(function (){
            //Close2NPC
            if(Math.abs(bob.x - npc.x) < 40 && Math.abs(bob.y - npc.y) < 40){
                npc.z = bob.z - 1
                //shop1
                if(costume == 1){
                    npc.say('Welcome friend!', 500)
                }
                //shop2
                if (costume == 2) {
                    npc.say('Buy my stuff!', 500)
                } 
                //gateGuy
                if(costume == 3){
                    npc.say("KEY OPENS GATE!", 500)
                }
            }
            
        })
    }

    //chest
    function spawnChest(xPos: number, yPos: number, kind: number){
        let chest = sprites.create(img`
            . . b b b b b b b b b b b b . .
            . b 7 9 9 9 9 9 9 9 9 9 9 7 b .
            b 7 9 9 9 9 9 9 9 9 9 9 9 9 7 b
            b 7 9 9 9 9 9 9 9 9 9 9 9 9 7 b
            b 7 9 9 9 9 9 9 9 9 9 9 9 9 7 b
            b 7 7 9 9 9 9 9 9 9 9 9 9 7 7 b
            b 7 7 7 7 7 7 7 7 7 7 7 7 7 7 b
            b 7 7 7 7 7 7 7 7 7 7 7 7 7 7 b
            b b b b b b b 7 7 b b b b b b b
            c b b b b b b c c b b b b b b c
            c c c c c c b c c b c c c c c c
            b 7 7 7 7 7 c b b c 7 7 7 7 7 b
            b 7 7 7 7 7 7 7 7 7 7 7 7 7 7 b
            b c 7 7 7 7 7 7 7 7 7 7 7 7 c b
            b b b b b b b b b b b b b b b b
            . b b . . . . . . . . . . b b .
        `, SpriteKind.Chest)
        chest.setPosition(xPos * 16, yPos * 16)
        if(kind == 2){
            chest.setKind(SpriteKind.HealthChest)
        }
    }

    //gate
    function spawnGate(x1: number, y1: number){
        let gateLocked = true
        let gate = sprites.create(img`
            1122222222222222222222222222222222222222222222222222222222222211
            2211122222222222222222222222222222222222222222222222222222111122
            2222211122222222222222222222222222222222222222222222222111222222
            2222222211122222222222222222444222222222222222222222111222222222
            2222222222211122222222222224444422222222222222221111222222222222
            2222222222222211122222222244222442222222222221112222222222222222
            2222222222222222211122222244222442222222221112222222222222222222
            2222222222222222222211122244444442222211112222222222222222222222
            2222222222222222222222211444444444221122222222222222222222222222
            22222222222222222222222114444f4444112222222222222222222222222222
            22222222222222222222222114444f4444112222222222222222222222222222
            2222222222222222222221111444444444112222222222222222222222222222
            2222222222222221111111111111111111111112222222222222222222222222
            2222222221111112222222222222222222222221111111111222222222222222
            2221111112222222222222222222222222222222222222222111111111122222
            1112222222222222222222222222222222222222222222222222222222211111
        `, SpriteKind.Gate)
        gate.setPosition(x1 * 16 , y1 * 16)
        tiles.setWallAt(tiles.getTileLocation(x1, y1), true)
        tiles.setWallAt(tiles.getTileLocation(x1 + 1, y1), true)
        tiles.setWallAt(tiles.getTileLocation(x1 - 1, y1), true)
        tiles.setWallAt(tiles.getTileLocation(x1 + 2, y1), true)

        game.onUpdate(function(){
            if(keys > 0 && Math.abs(bob.x - gate.x)<= 20 && Math.abs(bob.y - gate.y)<= 20 && gateLocked == true){
                keys--
                gateLocked = false   
                music.bigCrash.play()
                gate.destroy()
                tiles.setWallAt(tiles.getTileLocation(x1, y1), false)
                tiles.setWallAt(tiles.getTileLocation(x1 + 1, y1), false)
                tiles.setWallAt(tiles.getTileLocation(x1 -1, y1), false)
                tiles.setWallAt(tiles.getTileLocation(x1 + 1, y1), false)
                music.beamUp.play()
                
            }
        })


    }
    
    
    //BigAlien
    function spawnBigAlien(xPos: number, yPos: number){
        let bigAlien = sprites.create(assets.image`AlienBuddyBully3000`, SpriteKind.BigAlien)
        bigAlien.setPosition(xPos * 16, yPos * 16)

        let alive = true
        let moveX = 50
        let moveY = 0
        let moveTime = 2200
        let moveSequence = 1
        let attackCooldown = 0
        let bossHP = 20

        bigAlien.onDestroyed(function(){
            alive = false
            //spawnKey

            let key: Sprite = sprites.create(assets.image`key`, SpriteKind.Key)
            key.setPosition(bigAlien.x, bigAlien.y)
        })

        //movementSequence
        game.onUpdateInterval(moveTime, function(){
            bigAlien.setVelocity(moveX, moveY)
            moveSequence++
            if(moveSequence > 4){
                moveSequence = 1
            }
            if(moveSequence == 1 || moveSequence == 4){
                moveX = 50
            }
            if(moveSequence == 2 || moveSequence == 3){
                moveX = -50
            }
        })

        //projectile
        game.onUpdateInterval(100, function(){
            if(alive == true){
                if(Math.abs(bob.x - bigAlien.x)<= 70 && Math.abs(bob.y - bigAlien.y ) <= 70){
                    attackCooldown++
                    if(attackCooldown < 19){
                        enemyBlast = sprites.createProjectileFromSprite(img`
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . b b b b b b . . . . .
                            . . . . b b 9 9 9 9 b b . . . .
                            . . . . b 9 9 d d 9 9 b . . . .
                            . . . . b 9 d d d d 9 b . . . .
                            . . . . b 9 d d d d 9 b . . . .
                            . . . . b 9 9 d d 9 9 b . . . .
                            . . . . b b 9 9 9 9 b b . . . .
                            . . . . . b b b b b b . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                        `, bigAlien, 0, 200)
                        enemyBlast.setKind(SpriteKind.EnemyProjectile)
                        music.knock.play()
                    }
                }
                if(attackCooldown > 29){
                    attackCooldown = 0
                }
            }
        })


        //bossTakesDamage
        game.onUpdate(function(){
            sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BigAlien, function(blast: Sprite, boss: Sprite){
                bossHP--
                blast.destroy()
                music.thump.play()
                boss.startEffect(effects.fire, 300)
                let bossSpeech = Math.pickRandom([1, 2, 3, 4])
                if(bossSpeech == 1){
                    boss.say("BOB?!?!", 100)
                }
                if (bossSpeech == 2) {
                    boss.say("WHY YOU BULLY ME?", 100)     
                }
                if (bossSpeech == 3) {
                    boss.say("I TO0 SWEET TO BE BULLIED!", 100)       
                }
                if (bossSpeech == 4){
                    boss.say("OWWW!!!", 100)
                }
                //destroyBoss
                if(bossHP < 1){
                    boss.say("", 1)
                    boss.destroy()
                    music.smallCrash.play()
                    music.stopAllSounds()
                    music.play(song, music.PlaybackMode.LoopingInBackground)
                   

                }
            })
        })

        //BossFightSong
        game.onUpdate(function(){
            if(Math.abs(bob.x - bigAlien.x)<= 50 && Math.abs(bob.y - bigAlien.y) <= 50 && bossFight == false){
                bossFight = true
                music.stopAllSounds()
                music.play(song2, music.PlaybackMode.LoopingInBackground)

            }
            if(bossFight == true && bob.y > 176){
                music.stopAllSounds()
                music.play(song, music.PlaybackMode.LoopingInBackground)
                bossFight = false

            }
        })
        
    
    }

//overlapFunctions

    //blast.hitsEnemy
    sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, 
    function(blast: Sprite, enemy: Sprite){
        enemy.destroy()
        blast.destroy()
        music.thump.play()

    })

    //damage
    sprites.onOverlap(SpriteKind.EnemyProjectile, SpriteKind.Player, 
    function(blast: Sprite, player: Sprite){
        info.changeLifeBy(-1)
        blast.destroy()
        player.startEffect(effects.coolRadial, 300)
        music.zapped.play()
    })

    //chestOpen
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Chest, function(player: Sprite, chest: Sprite){
        chest.destroy()
        info.changeScoreBy(5)
        
        let openChest =sprites.create(img`
            . b b b b b b b b b b b b b b .
            b 7 9 9 9 9 9 9 9 9 9 9 9 9 9 b
            b 7 9 f f f f f f f f f f f 7 b
            b 7 f f 4 4 4 4 4 4 4 4 f f f b
            b f f 4 4 4 4 4 3 4 4 4 4 f f b
            . f 4 4 4 3 3 3 3 3 3 4 4 4 f .
            b f 4 4 4 3 4 4 3 4 4 4 4 4 f b
            b f 4 4 4 3 4 4 3 4 4 4 4 4 f b
            b f 4 4 4 3 3 3 3 3 3 4 4 4 f b
            b f 4 4 4 4 4 4 3 4 3 4 4 4 f b
            b f 4 4 4 4 4 4 3 4 3 4 4 4 f b
            b f 4 4 4 3 3 3 3 3 3 4 4 4 f b
            b f f 4 4 4 4 4 3 4 4 4 4 f f b
            b c f f 4 4 4 4 4 4 4 4 f f c b
            b b b f f f f f f f f f f b b b
            . b b . . . . . . . . . . b b .
        `)
        
        openChest.setPosition(chest.x, chest.y)
        music.baDing.playUntilDone()
        openChest.setImage(assets.image`emptyChest`)
    })
    sprites.onOverlap(SpriteKind.Player, SpriteKind.HealthChest, function (player: Sprite, chest: Sprite) {
        chest.destroy()
        info.changeLifeBy(3)

        let openChest = sprites.create(img`
            . b b b b b b b b b b b b b b .
            b 7 9 9 9 9 9 9 9 9 9 9 9 9 9 b
            b 7 9 f f f f f 9 f f f f f 7 b
            b 7 f f 3 3 3 f f f 3 3 3 f f b
            b b f 3 3 3 3 3 f 3 3 3 3 3 f b
            . b f 3 3 3 3 3 3 3 1 1 3 3 f .
            b c f 3 3 3 3 3 3 3 1 1 3 3 f b
            b c f 3 3 3 3 3 3 3 3 3 3 3 f b
            b c f f 3 3 3 b b b 3 3 3 f f b
            b c c f f 3 b b b b b 3 f f c b
            b b b b f f b b b b b f f b b b
            b 7 7 7 7 f f b b b f f 7 7 7 b
            b 7 7 7 7 7 f f b f f 7 7 7 7 b
            b c 7 7 7 7 7 f f f 7 7 7 7 c b
            b b b b b b b b b b b b b b b b
            . b b . . . . . . . . . . b b .
        `)
        openChest.setPosition(chest.x, chest.y)
        music.powerUp.playUntilDone()
        openChest.setImage(assets.image`emptyChest`)
    })
    //key
    sprites.onOverlap(SpriteKind.Player, SpriteKind.Key, function(player: Sprite, key: Sprite){
        keys++
        key.destroy()
        music.baDing.play()
        player.say("I GOT A KEY!!!", 300)
    })


//levelSetup

function level1Setup() {
    //setScene
    scene.setBackgroundColor(12)
    tiles.setTilemap(tilemap`level1`)
    bob.setPosition(16 * 3, 16 * 3)
    //alien1
    spawnAlien(5, 16, 0)
    //alien2
    spawnAlien(15 , 5, 0)
    //bobsFriend
    spawnNPC(28 , 5.5 , 1)
    //shopHelper
    spawnNPC(26 , 12 , 2)
    //alien3
    spawnAlien(45, 25, 1)
    //alien4
    spawnAlien(51, 18, 1)
    //alien5 
    spawnAlien(59, 24, 1)
    //alien6
    spawnAlien(60, 13, 1)
    //chest1
    spawnChest(5, 18.5, 1)
    //chest2:Health
    spawnChest(45, 13, 2)
    //chest3
    spawnChest(60, 25, 1)
    //chest4
    spawnChest(5.5, 24.5, 1)
    //gate1
    spawnGate(45 , 35.5)
    //bigAlien.spawn
    spawnBigAlien(52.5, 2.5)
    //doogInTheHome
    spawnNPC(41, 34, 3)
    //mon-key
    for(let i = 5; i < 28; i++){
        spawnNPC(i, 37, 4)
    }
    
        

}





//runGame


level1Setup()

//backgroundMusic
let song = music.createSong(assets.song`Background Music`)
music.setVolume(40)
music.play(song, music.PlaybackMode.LoopingInBackground)

//boss.Music
let song2 = music.createSong(assets.song`bossMusic`)




