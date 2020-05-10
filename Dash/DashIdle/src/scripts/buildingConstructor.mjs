class building {
    constructor (name=new String, image=new String, cost=new Array, dashPointsPerSecond=new Number, repPointsPerSecond=0) {
        this.name = name
        this.image = image ? image : null
        this.owned = 0
        this.cost = cost
        this.dashPointsPerSecond = dashPointsPerSecond
        this.repPointsPerSecond = repPointsPerSecond
        this.buy = () => {
            if (this.cost[0] <= user.dashPoints && this.cost[1] <= user.repPoints) {
                this.owned++
                user.dashPoints -= this.cost[0]
                user.repPoints -= this.cost[1]
                this.cost[0] += Math.round(this.cost[0]*0.25)
                user.dashPointsPerSecond += this.dashPointsPerSecond
                this.cost[1] += Math.round(this.cost[1]*0.25)
                user.repPointsPerSecond += this.repPointsPerSecond
                // No need to update displayed currency values, index.js handles that
                document.getElementById(`${this.name}_DPCost`).innerText = this.cost[0]
                if (this.cost[1]) document.getElementById(`${this.name}_RPCost`).innerText = this.cost[1]
                document.getElementById(`${this.name}_Owned`).innerText = this.owned
                document.getElementById("dpps").innerText = user.dashPointsPerSecond
                document.getElementById("rpps").innerText = user.repPointsPerSecond
            }
        }
    }
}

const message = new building("SendAMessage", null, [15,0], 2, 0)

const buildings = [message]

!function () {
    for (i in buildings) {
        let element = document.getElementById(buildings[i].name+"_ID")
        if (element) element.onclick = _=>buildings[i].buy()
    }
}()

function loadMissingBuildingData() {
    const gameData = JSON.parse(localStorage.getItem("RGFzaCBOZXQ="))
    if (gameData.buildings.length < buildings.length) {
        const parent = document.getElementsByClassName("bd-dis")[0]
        for (i = gameData.buildings.length; i < buildings.length; i++) {
            let building = buildings[i]
            let e = gameData.buildings.find(name => name===building.name)
            if (!e) { 
                user.buildings.push(building)

                let br = document.createElement("br")

                let container = document.createElement("button")
                container.id = building.name+"_ID"
                container.className = "bd"
                container.onclick = `${building.buy()}`
    
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
    
                parent.appendChild(container)
            }
        }
    }
}
loadMissingBuildingData()