var dashPoints = 0
var dashPointsPerSecond = 0
//var neatPoints = 0
//var repPoints

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
    for(i=0; i<upgrades.length; i++) {
        let currentUpgradeIndex = upgrades[i]
        if(currentUpgradeIndex.owned===false 
        && currentUpgradeIndex.amountOwned>=currentUpgradeIndex.reqInt) {
            currentUpgradeIndex.earnUpgrade()
        }
    }
}

function tick() {
    addDashPointsPerSecond() //updates both dash points and dp per second
    checkForUpgrades() //check for any avalible upgrades
    setTimeout(()=>{
        tick()
    }, 1000)
}
tick()