var Game = {
    Version: "Pre-Alpha 0.5.8",
    methods: {
        RTF: function () {
            user.dashPoints = 100000000
            user.dashPointsPerSecond = 100000
            user.repPoints = 100000000
            user.repPointsPerSecond = 100000
        }
    }
}

const saveGameData = function () {
    let savedGameData = window.localStorage.getItem("RGFzaCBOZXQ=")

    if (!savedGameData) {
        alert("Something went wrong, thats all we know. \n Couldn't fetch saved game data")
        return
    } else {
        for (i in buildings) user.buildings[i] = buildings[i]
        for (i in upgrades) user.upgrades[i] = upgrades[i]
        window.localStorage.setItem("RGFzaCBOZXQ=", JSON.stringify(user))
    }
}

const earnDashPoint = function () {
    user.dashPoints++
    document.getElementById("dp").innerText = user.dashPoints
}

const update = function () {
    // Update currency values
    user.dashPoints += user.dashPointsPerSecond
    user.repPoints += user.repPointsPerSecond
    document.getElementById("dp").innerText = user.dashPoints
    document.getElementById("rp").innerText = user.repPoints
    for (i in upgrades) upgrades[i].earn() 
    // for (i in achievements) achievements[i].earn()
}

window.onload = () => {
    console.warn("Be careful when messing with any code, there may be unintended consequences")
    document.getElementsByClassName("btn-main")[0].onclick = earnDashPoint
    setInterval(() => {
        update()
    }, 1000)
    setInterval(() => {
        saveGameData()
    }, 10000)
    console.info("Version: "+Game.Version)
}