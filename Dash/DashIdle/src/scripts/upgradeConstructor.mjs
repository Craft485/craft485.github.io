const parentWrapper = document.getElementById("up-dis")
class upgrade {
    constructor (name=new String, icon=new String, cost=new Array, takeAffectOn=new building, affectChange=new Number, requiredBuildingAmount=new Number) {
        this.name = name
        this.icon = icon.length > 0 ? icon : null
        this.cost = cost
        this.owned = false
        this.isShown = false
        this.affectedBuilding = takeAffectOn
        this.requiredBuildingAmount = requiredBuildingAmount
        this.affectChange = affectChange

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
                const n = document.createElement("div")
                n.setAttribute("id", this.name)
                const e = document.createElement("div")
                e.innerText = `${this.name} \n Cost: ${this.cost}`
                n.appendChild(e)
                parentWrapper.appendChild(n)
                this.isShown = true
            }
        }
    }
}

const upgrades = []