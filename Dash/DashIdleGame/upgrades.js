class upgrade{constructor(name, cost, affectedBuilding, effect, effectText, shortIdName, varName){
    this.name = name
    this.cost = cost
    this.affectedBuilding = affectedBuilding
    this.effect = effect
    this.effectText = effectText
    this.short = shortIdName
    this.varName - varName
    this.owned = false
    
    this.buy = ()=>{
        if (this.owned===false) {
            dashPoints-=this.cost
            this.affectedBuilding.dashPointsEarnedPerSecond+=Math.ceil((effect/100)*this.affectedBuilding.dashPointsEarnedPerSecond)
            this.owned = true
            console.log("Buying " + this.name + "...")
            //this.removeUpgradeListing()
        } else {
            return false
        }
    }

    this.removeUpgradeListing = ()=> {
        if(this.owned === true) {
            let parent = document.getElementById("upgradeDisplay");
            var node = document.getElementById(this.name);
            parent.removeChild(node);
        }
    }

    this.showUpgrade = ()=>{
        if(this.owned===false) {
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
}}

var fasterTyping = new upgrade("Faster Typing", 20, SendAMessage, 3, "Sending messages are <strong>3%</strong> more effective", "FT", "fasterTyping")