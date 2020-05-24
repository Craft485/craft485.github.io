const parentWrapper = document.getElementById("up-dis")
class upgrade {
    constructor (name=new String, icon=new String, cost=new Array, takeAffectOn=new building, affectChange=new Number, requiredBuildingAmount=new Number, description=new String) {
        this.name = name
        this.icon = icon ? icon : null
        this.cost = cost
        this.owned = false
        this.isShown = false
        this.affectedBuilding = takeAffectOn
        this.requiredBuildingAmount = requiredBuildingAmount
        this.affectChange = affectChange
        this.description = description

        this.buy = function () {
            if (this.cost[0] >= user.dashPoints &&
                this.cost[1] >= user.repPoints &&
                this.isShown && !this.owned) {
                this.owned = true
                user.dashPoints -= this.cost[0]
                user.repPoints -= this.cost[1]
                this.affectedBuilding.dashPointsPerSecond *= this.affectChange
                document.getElementById(this.name).remove()
            }
        }
        this.earn = function () {
            if (user.buildings[this.affectedBuilding].owned >= this.requiredBuildingAmount && !this.isShown) {
                // Parent
                const n = document.createElement("div")
                n.setAttribute("id", this.name)
                // Actual item
                const e = document.createElement("div")
                // Item Info
                let o = document.createElement("span")
                o.innerText = this.name
                e.appendChild(o)
                e.innerHTML += `<span id="${this.name}_DPCost">${this.cost[0]}</span>`
                if (this.cost[1]) e.innerHTML += `<br><span id="${this.name}_RPCost">${this.cost[1]}</span>`
                n.appendChild(e)
                // n.title = `<strong>${this.affectedBuilding}</strong> is +${this.affectChange*100} more effective`
                parentWrapper.appendChild(n)
                n.onmouseenter = () => {
                    const tooltip = document.createElement("div")
                    tooltip.id = this.name+"tp"
                    tooltip.className = "tooltip"
                    tooltip.innerHTML = this.description
                    parentWrapper.appendChild(tooltip)
                    n.onmouseleave = e => tooltip.remove()
                }
                // $(this.name).tooltip({html: true, delay: { "show" : 500, "hide" : 300}})
                this.isShown = true
            }
        }
    }
}

const fingers = new upgrade("Fingers", null, [20,0], message, 5, 10, "Sending messages might be easier with some fingers")

const upgrades = []
for (i in upgrades) {
    if (!user.upgrades[i]) {
        user.upgrades.push(upgrades[i])
    }
}