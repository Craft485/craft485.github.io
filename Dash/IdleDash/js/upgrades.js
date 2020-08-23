class Upgrade {
    /**
     * 
     * @param {String} name 
     * @param {String} desc 
     * @param {Number[]} cost 
     * @param {Building} buildingToEffect 
     * @param {Number} multiplier 
     * @param {Number} requiredBuildingAmount
     */
    constructor (name, desc, cost, buildingToEffect, multiplier, requiredBuildingAmount) {
        this.name = name
        this.desc = desc
        this.cost = {dp: cost[0], rp: cost[1]}
        this.building = buildingToEffect
        this.effect = multiplier
        this.imgSrc = `./images/upgrades/${this.name}.PNG`
        this.buildingAmount = requiredBuildingAmount
        this.owned = false
        this.earned = false
    }
    buy () {
        if (!this.owned && this.earned) {
            this.owned = true
            Game._DashPoints -= this.cost.dp
            Game._RepPoints -= this.cost.rp
            this.building.perSecond.dp
            this.building.perSecond.rp
        }
    }
    earn () {
        if(!this.earned && this.building.owned >= this.buildingAmount){
            this.earned = true
            // Get container
            const container = document.getElementById('upgrade-disp')
            if (container.classList.contains("locked")) container.classList.remove("locked")
            // Create upgrade DOM element
            let upgrade = document.createElement('button')
            upgrade.id = `${this.name}Disp`
            upgrade.className = "upgrade"

            upgrade.innerText = `${this.name}\nCost:\n${this.cost.dp}\n${(this.cost.rp > 0 ? this.cost.rp+"\n" : "")}`

            upgrade.onclick = this.buy()

            container.appendChild(upgrade)
            // Tooltip things
            $(`button#${this.name}Disp`).tooltip({
                html: true,
                trigger: 'hover',
                placement: 'right',
                //offset: 20,
                container: container,
                title: `${this.name}<br>Cost:<br>${this.cost.dp}<br>${(this.cost.rp > 0 ? this.cost.rp+"<br>" : "")}<small>${this.desc}</small>`
            })
            console.log(container.lastChild)
        }
    }
}

const rule0 = new Upgrade("Rule-0", "Mods may handle situations and make decisions as they see fit. If there’s a problem caused by this please contact the Kitten Overseers.", [50, 0], rulebook, 1.05, 10)

let upgradeList = [
    rule0
]