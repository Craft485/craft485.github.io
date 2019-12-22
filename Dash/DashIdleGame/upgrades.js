class upgrade{constructor(name, cost, affectedBuilding, affectedBuildingInt, effect, effectText, shortIdName, varName){
    this.name = name
    this.cost = cost
    this.affectedBuilding = affectedBuilding
    this.effect = effect
    this.effectText = effectText
    this.short = shortIdName
    this.varName = varName
    this.reqInt = affectedBuildingInt
    this.owned = false
    this.earned = false
    
    this.buy = ()=>{
        if (dashPoints>=this.cost) {
            if (this.owned===false) {
                dashPoints-=this.cost
                this.affectedBuilding.dashPointsEarnedPerSecond+=Math.ceil((effect/100)*this.affectedBuilding.dashPointsEarnedPerSecond)
                this.owned = true
                console.log("Buying " + this.name + "...")
                this.removeUpgradeListing(document.getElementById(this.short+"Button"))//that looks...fun
            } else {
                return false
            }
        } else { //button was not meant to be clicked, so we need to re add the onclick event listener
            document.getElementById(this.short+"Button").onclick = ()=>{this.buy()}
        }
    }

    this.removeUpgradeListing = (child)=> {
        if(this.owned === true) {
            //get display
            let display = document.getElementById("upgradeDisplay")
            //remove the passed element from the display
            display.removeChild(child)
        }
    }

    this.showUpgrade = ()=>{
        if(this.owned===false) {
            this.earned=true
            let upgradeDisplay = document.getElementById("upgradeDisplay")
            //create the button which will be a wrapper for the rest of the upgrade
            let newUpgrade = document.createElement("button")
            newUpgrade.setAttribute("id", this.short+"Button")
            //give the upgrade a displayed name
            let newUpgradeName = document.createElement("span")
            newUpgradeName.innerHTML = this.name
            //give the upgrade a displayed cost
            let newUpgradeCost = document.createElement("span")
            newUpgradeCost.innerHTML = "Cost: "+this.cost
            //give the upgrade a displayed effect explanation, we gotta let em know what their buying
            let newUpgradeEffect = document.createElement("span")
            newUpgradeEffect.innerHTML = this.effectText
            //appendChild() all 3 of the above elements to the newUpgrade(with <br> for spacing)
            newUpgrade.appendChild(newUpgradeName)
            newUpgrade.appendChild(document.createElement("br"))
            newUpgrade.appendChild(newUpgradeCost)
            newUpgrade.appendChild(document.createElement("br"))
            newUpgrade.appendChild(newUpgradeEffect)
            //append the final product to the display div
            upgradeDisplay.appendChild(newUpgrade)
            //give the  upgrade an onclick event
            document.getElementById(this.short+"Button").onclick = ()=>{this.buy()}
        }
    }

    this.earnUpgrade = ()=> { //might be a useless function here but eh may as well
        if(this.affectedBuilding.amountOwned>=this.reqInt && this.owned===false && this.earned===false) {
            this.showUpgrade()
        }
    }
}}

var fasterTyping = new upgrade("Faster Typing", 20, SendAMessage, 15, 3, "Sending messages are <strong>3%</strong> more effective", "FT", "fasterTyping")

var allUpgrades = [
    fasterTyping
]