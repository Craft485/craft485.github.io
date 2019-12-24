/*
=========
TODO
fix NAN on rpps display -DONE
fix rep and rpps display on load -DONE
add 32x32 graphics for achievement images
add ascension
*/  
var dashPoints = 0 
var dashPointsPerSecond = 0
//var neatPoints = 0
var repPoints = 0
var repPointsPerSecond = 0
//var honey or bee points?

function addDashPoint() {
    dashPoints++
    document.getElementById("dashPointsDisplay").innerHTML = dashPoints
}

function addCurrencyPerSecond() {
    //update DashPoints
    dashPoints += dashPointsPerSecond
    document.getElementById("DPPSDisplay").innerHTML = dashPointsPerSecond
    document.getElementById("dashPointsDisplay").innerHTML = dashPoints

    if(repPointsPerSecond>0) {
        document.getElementById("RPPSDisplay").innerHTML = repPointsPerSecond + " Rep Points per Second||"
        repPoints+=repPointsPerSecond
        document.getElementById("repPointsDisplay").innerHTML = "You have "+repPoints+" Rep Points||"
        document.getElementById("repPointsDisplay").style = "visibility: visible;"
        document.getElementById("RPPSDisplay").style = "visibility: visible"
    }
}

function checkForUpgrades() {
    checkForUpgradesForLoop:
    for(i=0; i<allUpgrades.length; i++) {
        //currentUpgradeIndex is an obj
        let currentUpgradeIndex = allUpgrades[i]
        currentUpgradeIndex.earnUpgrade()
    }
}

function checkForachievements() {
    checkForachievementsForLoop:
    for(i=0; i<allAchievements.length; i++) {
        let currentChev = allAchievements[i]
        currentChev.earn()
    }
}

function loadSavedGameData() {
    let gameDataObj = JSON.parse(window.localStorage.getItem('gameData')) //parse the stored string
    let gameDataArray = gameDataObj.standardData

    let buildings = gameDataObj.buildings
    let Achievements = gameDataObj.Achievements
    let upgrades = gameDataObj.upgrades
    for(i=0;i<buildings.length;i++) {
        let liveBuilding = allBuildings[i] //current constructor obj
        let savedBuildingOwnedData = gameDataObj.buildings[i].amountOwned

        if(savedBuildingOwnedData===0) {
            //backend cost doesn't need changed since it'll be the base value
            document.getElementById(liveBuilding.short + "Cost").innerHTML = liveBuilding.cost
        } else {
            cost = liveBuilding.cost //base cost
            let repCost
            liveBuilding.repCost>0 ? repCost=liveBuilding.repCost : repCost = "unknown"
            //let repCost = liveBuilding.repCost
            for (e=0; e<savedBuildingOwnedData; e++) { //using e because this is in another for loop using i
                // process cost as though a single building has been purchased
                cost += Math.floor((1.05 * cost)/10)
                if(liveBuilding.repCost>0) {
                    //building uses rep, so we need to calculate the rep cost
                    repCost += Math.floor((1.05 * repCost)/10)
                }
            }
            //this is around the point where I could feel my sanity slipping, not slowly either
            if(liveBuilding.repCost>0) {
                document.getElementById(liveBuilding.short + "RCost").innerHTML = repCost
                liveBuilding.repCost = repCost
            }
            document.getElementById(liveBuilding.short + "Cost").innerHTML = cost //visibly set
            liveBuilding.cost = cost //set live backend value
        }
        let dpps = gameDataObj.buildings[i].dashPointsEarnedPerSecond * savedBuildingOwnedData
        liveBuilding.amountOwned = savedBuildingOwnedData
        
        document.getElementById(liveBuilding.short + "AmountOwned").innerHTML = savedBuildingOwnedData
        document.getElementById(liveBuilding.short + "DPPS").innerHTML = dpps

        if(liveBuilding.repPerSecond>0) { //the current building gives rep, so we need to load that
            let rpps = liveBuilding.repPerSecond * liveBuilding.amountOwned
            //console.log(rpps)
            //part of the loading is done here, the other part is up where we calculate costs
            document.getElementById(liveBuilding.short + "RPPS").innerHTML = rpps
        }
    }
    //thats a big for loop dear god lets not do that again
    //for>if/if/else>if/for>if... oh no
    for(i=0;i<gameDataObj.Achievements.length;i++) {
        let currentChev = allAchievements[i] //currentChev is an object
        let isOwned = currentChev.owned
        let chevName = Achievements[i] //same obj name, so we can do something a little strange to get the result want

        chevName.owned = isOwned
    }
    for(i=0;i<upgrades.length;i++) {
        let currentUpgradeIndex = allUpgrades[i] //live obj
        currentUpgradeIndex.owned = upgrades[i].owned //set the live obj to the owned value of the stored
        let effect = currentUpgradeIndex.effect //get the effect of the stored obj
        let e = currentUpgradeIndex.affectedBuilding.dashPointsEarnedPerSecond
        e+=Math.ceil((effect/100)*e) //apply the effect to the building
    }

    document.getElementById("dashPointsDisplay").innerHTML = gameDataArray[0]
    document.getElementById("DPPSDisplay").innerHTML = gameDataArray[1]
    document.getElementById("repPointsDisplay").innerHTML = gameDataArray[2]
    document.getElementById("RPPSDisplay").innerHTML = gameDataArray[3]
    dashPoints=gameDataArray[0]
    dashPointsPerSecond=gameDataArray[1]
    repPoints = gameDataArray[2]
    repPointsPerSecond = gameDataArray[3]

    if(repPoints>0 || repPointsPerSecond>0) { //if we have rep we need to show the values
        document.getElementById("repPointsDisplay").style = "visibility: visible"
        document.getElementById("RPPSDisplay").style = "visibility: visible"
    }

    saveGameData()
}
function saveGameData() {
    //recursive localStorage save function that gets called every minute
    let gameData = [
        dashPoints, dashPointsPerSecond, //store dash points total and dpps
        repPoints, repPointsPerSecond
    ]

    let buildingArray = []
    let AchievementArray = []
    let upgradeArray = []
    for(i=0;i<allBuildings.length;i++) { //store all building values
        buildingArray.push(allBuildings[i])
    }
    for(i=0;i<allAchievements.length;i++) { //store all Achievement values
        AchievementArray.push(allAchievements[i])
    }
    for(i=0;i<allUpgrades.length;i++) { //store all upgrade values
        upgradeArray.push(allUpgrades[i])
    }

    var gameDataObj = {}
    gameDataObj.standardData = gameData
    gameDataObj.buildings = buildingArray
    gameDataObj.Achievements = AchievementArray
    gameDataObj.upgrades = upgradeArray

    window.localStorage.setItem('gameData', JSON.stringify(gameDataObj))

    saveNotif()

    setTimeout(()=>{
        saveGameData()
    }, 60000)
}
function checkSaveData() {
    let e = window.localStorage.getItem('gameData')
    //console.log(e)
    if(e==null||e==undefined) { //game has never been saved before
        saveGameData()
    } else { //else game has been saved before
        loadSavedGameData()
    }
}

function saveNotif() {
    let notifDisplay = document.getElementById("notificationBarWrapper")

    let newNotif = document.createElement('div')
    newNotif.innerHTML = "Saving..."
    newNotif.setAttribute('style', "color: gold; border-style: solid; border-width: medium; text-align: center") 

    notifDisplay.appendChild(newNotif)

    setTimeout(()=>{
        notifDisplay.removeChild(newNotif)
    }, 3000)
}

function tick() {
    addCurrencyPerSecond() //updates both dash points and dp per second
    checkForUpgrades() //check for any avalible upgrades
    checkForachievements() //check if we can earn any achievements
    setTimeout(()=>{
        tick()
    }, 1000)
}
tick()
/*
=================================
WORLD DOMINATION IMPOSED YOU PECC
=================================
have a nice day 💠
*/
checkSaveData()
console.warn("NOTICE:"+"\n"+"This game is still in HEAVY BETA!!" + "\n" + 
"Please be mindfull of any bugs or issues you may run into." + "\n" + 
"Please be careful when playing around with the code, it's not the best code in the world")