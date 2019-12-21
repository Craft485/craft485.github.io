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
        /*
        let savedBuildingCostData = gameDataObj.buildings[i].cost
        console.log(savedBuildingData)
        let owned = savedBuildingData.amountOwned
        */
        let cost = liveBuilding.cost * savedBuildingOwnedData
        let dpps = gameDataObj.buildings[i].dashPointsEarnedPerSecond * savedBuildingOwnedData

        liveBuilding.amountOwned = savedBuildingOwnedData
        liveBuilding.cost = cost
        //console.log(liveBuilding)
        if(cost!==0) {
            document.getElementById(liveBuilding.short + "Cost").innerHTML = cost
            //liveBuilding.cost = document.getElementById(liveBuilding.short + "Cost").innerHTML
        }
        document.getElementById(liveBuilding.short + "AmountOwned").innerHTML = savedBuildingOwnedData
        //liveBuilding.amountOwned = document.getElementById(liveBuilding.short + "AmountOwned").innerHTML
        document.getElementById(liveBuilding.short + "DPPS").innerHTML = dpps
    }
    for(i=0;i<achievments.length;i++) {
        let currentChev = allAchievments[i] //currentChev is an object
        let isOwned = currentChev.owned
        let chevName = achievments[i] //same obj name, so we can do something a little strange to get the result want

        chevName.owned = isOwned
    }
    for(i=0;i<upgrades.length;i++) {
        let currentUpgradeIndex = allUpgrades[i]
        currentUpgradeIndex.owned = upgrades[i].owned
        let effect = currentUpgradeIndex.effect
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