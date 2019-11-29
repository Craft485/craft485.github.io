var dashPoints = 0
var dashPointsPerSecond = 0

function addDashPoint() {
    dashPoints++
    document.getElementById("dashPointsDisplay").innerHTML = dashPoints
}

function addDashPointsPerSecond() {
    dashPoints += dashPointsPerSecond
    document.getElementById("dashPointsDisplay").innerHTML = dashPoints
}

function tick() {
    addDashPointsPerSecond()
    setTimeout(()=>{
        tick()
    }, 1000)
}
tick()