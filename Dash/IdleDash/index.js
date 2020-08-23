// import * as buildings from './js/buildings.js'

const dpDisp = document.getElementById("dp")

function load() {
    document.getElementsByClassName("button-main")[0].onclick = actionClick
    const save = JSON.parse(window.localStorage.getItem("RGFzaCBOZXQ="))
    // If no save, create one and 
    if (!save) return window.localStorage.setItem("RGFzaCBOZXQ=", JSON.stringify(Game))
    Game = save
    // Game.list = save.list
    if (save.list[0].shown) document.getElementById("build-disp").className = ""
    // Load buildings
    const buildingParent = document.getElementById("build-disp")
    // const upgradeParent = document.getElementById("upgrade-disp")
    for (let i in save.list) {
        if (save.list[i].shown) {
            const building = save.list[i]
            Game.list[i].cost = building.cost
            Game.list[i].owned = building.owned
            Game.list[i].shown = building.shown

            // Create container
            const container = document.createElement("div")
            container.id = `${building.name}Disp`
            container.className = "build"
            container.style = "padding-top: 15px; padding-bottom: 15px;"
            
            if (!building.shown) container.className += " locked"
            
            // Populate said container
            const text = document.createElement("p")
            
            text.innerHTML = `
            <span style="text-align: center;">${building.name}<span><br>
            <button class="build-buy" id="${building.name}Buy">
            Cost:<br/>Dash Points: <span id="${building.name}DPCost">${building.cost.dp}</span> <br/> `
            
            if (building.cost.rp > 0) text.innerHTML += `<span ${(Game.repPoints > 0 ? "" : 'class = "locked"')}>Rep Points: 
            <span id="${building.name}RPCost">${building.cost.rp}</span></span>`
            else text.innerHTML += `<span></span></span>`
            text.innerHTML += `</button>`
            container.appendChild(text)
            // Append to parent
            buildingParent.appendChild(container)
            document.getElementById(`${building.name}Buy`).onclick = Game.list[i].buy
            // Tooltip things
            container.setAttribute('data-toggle', 'tooltip')
            container.setAttribute('data-placement', 'left')
            container.setAttribute('title', `Dash Points Per Second: ${building.perSecond.dp}\n${(building.perSecond.rp > 0 ? `Rep Points Per Second: ${building.perSecond.rp}` : "\n")}Owned: ${building.owned}\n<br><small>${building.desc}</small>`)
            $('[data-toggle="tooltip"]').tooltip({trigger: 'hover', html: true})
        }
    }
    // Load upgrades, this seems dead simple... will it work though? 
    for (i in save.upgrades) upgradeList[i].earn()
}

function save() {
    // Game.buildings = list
    // Game.upgrades = upgradeList
    window.localStorage.setItem("RGFzaCBOZXQ=", JSON.stringify(Game))
    // Create notif
    const container = document.getElementById('notif')
    let notif = document.createElement('div')
    notif.innerText = "Saving..."
    notif.className = "notif-content"
    container.appendChild(notif)
    container.style.visibility = 'visible'
    window.setTimeout(() => {
        container.removeChild(notif)
        container.style.visibility = 'hidden'
    }, 5000)
}

// Check for different unlocks
// Why are you reading this
function attemptEarns() {
    // This function is going to be a mess
    if (Game._DashPoints >= 20 && !(Game.list[0].shown)) {
        Game.list[0].shown = true
        Game.list[0].earn()
        document.getElementById("build-disp").className = ""
    }
    for (let i = 1; i < Game.list.length; i++) {
        const prev = Game.list[i - 1]
        if (prev.owned >= Game.list[i].previousAmount && !(Game.list[i].shown)) Game.list[i].show()
    }
    for (i in upgradeList) upgradeList[i].earn() // Atempt to earn each upgrade (NOT at all efficient but I can come back to this later)
}

function actionClick() {
    Game._DashPoints += Game.dpPerClick
    dpDisp.innerText = new Intl.NumberFormat().format(Math.floor(Game._DashPoints))
}

function updateCurrency() {
    document.getElementById("dpps").innerText = new Intl.NumberFormat().format(Game._DPPerSecond)
    Game._DashPoints += Game._DPPerSecond
    dpDisp.innerText = new Intl.NumberFormat().format(Math.floor(Game._DashPoints))
}

function tick() {
    updateCurrency()
    attemptEarns()
}
/**@todo kms */
setInterval(tick, 1000)
setInterval(save, 60000)

onload = load