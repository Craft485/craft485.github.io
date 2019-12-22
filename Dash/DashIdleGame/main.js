var dashPoints = 0
var dashPointsPerSecond = 0
//var neatPoints = 0
//var repPoints
//var honey or bee points?

function addDashPoint() {
    dashPoints++
    document.getElementById("dashPointsDisplay").innerHTML = dashPoints
}

function addDashPointsPerSecond() {
    dashPoints += dashPointsPerSecond
    document.getElementById("DPPSDisplay").innerHTML = dashPointsPerSecond
    document.getElementById("dashPointsDisplay").innerHTML = dashPoints
}

function checkForUpgrades() {
    checkForUpgradesForLoop:
    for(i=0; i<allUpgrades.length; i++) {
        //currentUpgradeIndex is an obj
        let currentUpgradeIndex = allUpgrades[i]
        currentUpgradeIndex.earnUpgrade()
    }
}

function checkForAcheivments() {
    checkForAcheivmentsForLoop:
    for(i=0; i<allAchievments.length; i++) {
        let currentChev = allAchievments[i]
        currentChev.earn()
    }
}

function loadSavedGameData() {
    let gameDataObj = JSON.parse(window.localStorage.getItem('gameData')) //parse the stored string
    let gameDataArray = gameDataObj.standardData

    let buildings = gameDataObj.buildings
    let achievments = gameDataObj.achievments
    let upgrades = gameDataObj.upgrades
    for(i=0;i<buildings.length;i++) {
        let liveBuilding = allBuildings[i] //current constructor obj
        let savedBuildingOwnedData = gameDataObj.buildings[i].amountOwned

        if(savedBuildingOwnedData===0) {
            //backend cost doesn't need changed since it'll be the base value
            document.getElementById(liveBuilding.short + "Cost").innerHTML = liveBuilding.cost
        } else {
            cost = liveBuilding.cost //base cost
            for (i=0; i<savedBuildingOwnedData; i++) {
                // process cost as though a single building has been purchased
                cost += Math.floor((1.05 * cost)/2)
            }
            document.getElementById(liveBuilding.short + "Cost").innerHTML = cost //visibly set
            liveBuilding.cost = cost //set live backend value
        }

        let dpps = gameDataObj.buildings[i].dashPointsEarnedPerSecond * savedBuildingOwnedData
        liveBuilding.amountOwned = savedBuildingOwnedData
        
        document.getElementById(liveBuilding.short + "AmountOwned").innerHTML = savedBuildingOwnedData
        document.getElementById(liveBuilding.short + "DPPS").innerHTML = dpps
    }
    for(i=0;i<achievments.length;i++) {
        let currentChev = allAchievments[i] //currentChev is an object
        let isOwned = currentChev.owned
        let chevName = achievments[i] //same obj name, so we can do something a little strange to get the result want

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
    dashPoints=gameDataArray[0]
    dashPointsPerSecond=gameDataArray[1]

    saveGameData()
}
function saveGameData() {
    //recursive localStorage save function that gets called every minute
    let gameData = [
        dashPoints, dashPointsPerSecond //store dash points total and dpps
    ]

    let buildingArray = []
    let achievmentArray = []
    let upgradeArray = []
    for(i=0;i<allBuildings.length;i++) { //store all building values
        buildingArray.push(allBuildings[i])
    }
    for(i=0;i<allAchievments.length;i++) { //store all achievment values
        achievmentArray.push(allAchievments[i])
    }
    for(i=0;i<allUpgrades.length;i++) { //store all upgrade values
        upgradeArray.push(allUpgrades[i])
    }

    var gameDataObj = {}
    gameDataObj.standardData = gameData
    gameDataObj.buildings = buildingArray
    gameDataObj.achievments = achievmentArray
    gameDataObj.upgrades = upgradeArray

    window.localStorage.setItem('gameData', JSON.stringify(gameDataObj))

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

function tick() {
    addDashPointsPerSecond() //updates both dash points and dp per second
    checkForUpgrades() //check for any avalible upgrades
    checkForAcheivments() //check if we can earn any acheivments
    setTimeout(()=>{
        tick()
    }, 1000)
}
tick()
checkSaveData()
console.warn("NOTICE:"+"\n"+"This game is still in HEAVY BETA!!" + "\n" + 
"Please be mindfull of any bugs or issues you may run into." + "\n" + 
"Please be careful when playing around with the code, it's not the best code in the world")