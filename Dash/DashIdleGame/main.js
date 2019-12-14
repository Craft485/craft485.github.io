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
        //currentUpgradeIndex is an obj
        let currentUpgradeIndex = upgrades[i]
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

function tick() {
    addDashPointsPerSecond() //updates both dash points and dp per second
    checkForUpgrades() //check for any avalible upgrades
    checkForAcheivments() //check if we can earn any acheivments
    setTimeout(()=>{
        tick()
    }, 1000)
}
tick()