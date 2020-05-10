// This script sets background values and makes a user instance
let user = {
    dashPoints:0,
    dashPointsPerSecond:0,
    repPoints:0,
    repPointsPerSecond:0,
    buildings:[],
    upgrades:[],
    achievements:[]
}

!function () {
    console.log("Fetching save data...")
    const storedData = window.localStorage.getItem("RGFzaCBOZXQ=")
    // If there is no stored data create a new save
    if (!storedData) {
        window.localStorage.setItem("RGFzaCBOZXQ=", JSON.stringify(user))
        console.log("No data found, creating new save key...")
        l()
    } else {
        // There is a previous save, so load its contents
        const parsedStoredData = JSON.parse(storedData)
        user.dashPoints = parsedStoredData.dashPoints
        user.repPoints = parsedStoredData.repPoints
        user.dashPointsPerSecond = parsedStoredData.dashPointsPerSecond
        user.repPointsPerSecond = parsedStoredData.repPointsPerSecond
        document.getElementById("dpps").innerText = user.dashPointsPerSecond
        document.getElementById("rpps").innerText = user.repPointsPerSecond
        document.getElementById("dp").innerText = user.dashPoints
        document.getElementById("rp").innerText = user.repPoints
        parsedStoredData.buildings.forEach(item => {
            user.buildings.push(item)
        })
        parsedStoredData.upgrades.forEach(item => {
            user.upgrades.push(item)
        })
        l()
    }
    function l() {
        console.log("#2.x-l Loading...")
        for (i in user.buildings) {
            let building = user.buildings[i]

            let br = document.createElement("br")

            let container = document.createElement("button")
            container.id = building.name+"_ID"
            container.className = "bd"

            let owned = document.createElement("span")
            owned.innerText = building.owned
            owned.id = building.name+"_Owned"
            owned.style = "margin: 0;"

            let cost = document.createElement("span")
            cost.innerHTML = `Dash Points: <span id="${building.name+'_DPCost'}">${building.cost[0]}`
            if (building.cost[1] > 0) {
                cost.innerHTML += `
                </span>
                <br>Rep Points: 
                <span id="${building.name+'_RPCost'}">
                ${building.cost[1]}
                </span>`
            } else cost.innerHTML += "</span>"
            cost.id = building.name+"_Cost"
            cost.style = "margin: 0;"

            let o = document.createElement("h3")
            o.innerText=building.name
            let e = document.createElement("p")
            e.innerText="Owned: "
            let n = document.createElement("p")
            n.innerText="Cost: "

            container.appendChild(o)
            container.appendChild(e)
            container.appendChild(owned)
            container.appendChild(br)
            container.appendChild(n)
            container.appendChild(cost)

            let parent = document.getElementsByClassName("bd-dis")[0]

            parent.appendChild(container)
        }
        u()
    }
    function u() {
        console.log("#3.x-u Loading...")
        const parent = document.getElementsByClassName("up-dis")[0]
        for (i in user.upgrades) {
            let upgrade = user.upgrades[i]
            if (upgrade.isShown && !upgrade.owned) {
                let f = document.createElement("div")
                f.setAttribute("id", `${upgrade.name}_dis`)
                f.innerText = `${upgrade.name} \n Cost: ${upgrade.cost}`
                f.onclick = upgrade.buy()
                parent.appendChild(f)
            }
        }
        // a()
    }
    // function a() {
    //     const parent = document.getElementsByClassName("ac-dis")[0]
    //     for (i in user.achievements) {
    //         let b = user.achievements[i]
    //         let c = document.createElement("img")
    //         if (b.earned) {
    //             c.src = b.icon ? b.icon : "../images/noImageFound.png"
    //             c.setAttribute(onfocus, c.showDesc())
    //         } else c.src = "../images/unEarned.png"
    //         parent.appendChild(c)
    //     }
    // }
}()