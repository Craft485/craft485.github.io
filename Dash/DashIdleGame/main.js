var dashPoints = 0
var dashPointsPerSecond = 0
//var neatPoints = 0

function addDashPoint() {
    dashPoints++
    document.getElementById("dashPointsDisplay").innerHTML = dashPoints
}

function addDashPointsPerSecond() {
    dashPoints += dashPointsPerSecond
    document.getElementById("DPPSDisplay").innerHTML = dashPointsPerSecond
    document.getElementById("dashPointsDisplay").innerHTML = dashPoints
}

function tick() {
    addDashPointsPerSecond() //updates both dash points and dp per second
    setTimeout(()=>{
        tick()
    }, 1000)
}
tick()