class tile{constructor(name, path, drop){
    this.name = name
    this.path = path
    this.drop = drop
    
}}
var grass = new tile("grass", 'assets\tiles\GrassTile.png', dirt)

class items{constructor(name, icon) {
    this.name = name
    this.icon = icon

}}
var dirt = new items("dirt", 'assets\tiles\GrassTile.png')

class armor{constructor(name, defense, effect=null){
    this.name = name
    this.defense = defense
    this.effect = effect
}}

class weapon{constructor(name){
    this.name = name
}}
var woodSword = new weapon("woodSword")

class enemy{constructor(name, health, rate, lootTable){
    this.name = name
    this.health = health
    //this.armor = armor(type) con(armor=null) by default
    this.rate = rate
    this.lootTable = lootTable
    this.spawnRate = Math.floor(Math.random() * this.rate)
    this.isDead = false
    this.onScreen = 0
    this.drawEnemy = function() {
        if(this.onScreen >= 5) {
            return
        } else {
            
            this.onScreen++
        }
    }
    this.checkSpawn = function(difficulty) {
        if(isNight == true && difficulty != 1) {
            drawEnemy()
        }
    }
}}

var zombie = new enemy("zombie", 5, 5)