const saveGameData = function () {
    let savedGameData = window.localStorage.getItem("RGFzaCBOZXQ=")

    if (!savedGameData) {
        alert("Something went wrong, thats all we know. \n Couldn't fetch saved game data")
        return
    } else {
        for (i in buildings) {
            user.buildings[i] = buildings[i]
        }
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
    // for (i in achievements) {
    //     const a = achievements[i]
    //     a.earn()
    // }
}

window.onload = () => {
    console.warn("Be carful when messing with any code, there may be unintended consequences")
    document.getElementsByClassName("btn-main")[0].onclick = earnDashPoint
    setInterval(() => {
        update()
    }, 1000)
    setInterval(() => {
        saveGameData()
    }, 10000)
    console.info("Version: pre-alpha 0.2.8")
}