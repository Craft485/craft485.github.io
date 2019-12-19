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
    for(i=0; i<allAcheivments.length; i++) {
        let currentChev = allAcheivments[i]
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
        let currentBuilding = buildings[i] //currentBuilding is an obj from the array in saveGameData()
        let cost = currentBuilding.cost*currentBuilding.amountOwned
        let owned = currentBuilding.amountOwned

        if(cost!==0) {
            document.getElementById(currentBuilding.short + "Cost").innerHTML = cost
        }
        document.getElementById(currentBuilding.short + "AmountOwned").innerHTML = owned
    }
    for(i=0;i<achievments.length;i++) {
        let currentChev = achievments[i] //currentChev is an object
        let isOwned = currentChev.owned
        let chevName = achievments[i] //same obj name, so we can do something a little strange to get the result want

        chevName.owned = isOwned
    }
    for(i=0;i<allUpgrades.length;i++) {
        let currentUpgradeIndex = upgrades[i]
        currentUpgradeIndex.owned = currentUpgradeIndex.owned
        let effect = currentUpgradeIndex.effec
        currentUpgradeIndex.affectedBuilding.dashPointsEarnedPerSecond+=Math.ceil((effect/100)*currentUpgradeIndex.affectedBuilding.dashPointsEarnedPerSecond)
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
    for(i=0;i<allAcheivments.length;i++) { //store all achievment values
        achievmentArray.push(allAcheivments[i])
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
console.warn("This game is still in HEAVY BETA!!" + "\n" + "Please be mindfull of any bugs or issues you may run into.")