class upgrade{constructor(name="", cost=0, affectedBuilding=Object, affectedBuildingInt=0, effect=0, effectText="", shortIdName="", varName=""){
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
            newUpgrade.appendChild(document.createElement("br"))
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
var quickerFingers = new upgrade("Quicker Fingers", 500, SendAMessage, 20, 5, "Sending messages are <strong>5%</strong> more effective", "QF", "quickerFingers")
var fastestFingersInTheWest = new upgrade("Fastest Fingers In The West", 1000, SendAMessage, 30, 10, "Sending messages are <strong>10%</strong> more effective", "FFITW", "fastestFingeresInTheWest")

var readAndDone = new upgrade("Read and Done", 50, ReadRulebook, 5, 3, "Reading Rulebook is <strong>3%</strong> more effective", "RAD", "readAndDone")
var noSpam = new upgrade("No Spam", 70, ReadRulebook, 10, 5, "Reading Rulebook is <strong>5%</strong>", "NS", "noSpam")
var aPingableNick = new upgrade("A Pingable Nick", 200, ReadRulebook, 20, 7, "Reading rulebook is <strong>5%</strong> more effective", "APN", "aPingableNick")

var botsChannel = new upgrade("The #Bots Channel", 70, selfRoles, 5, 3, "Having self roles are <strong>3%</strong> more effective", "BC", "botsChannel")
var cozy = new upgrade("Pillow Role", 200, selfRoles, 10, 5, "Get the pillow role, <strong>+5%</strong> to self roles", "C", "cozy")
var serious = new upgrade("Chip of Life", 500, selfRoles, 20, 10, "Get the Chip of Life role, <strong>+10%</strong> to self roles", "S", "serious")

var betterDough  = new upgrade("BetterDough", 200, tatsuCookiesRep, 5, 3, "Tasus are <strong>3%</strong> more effective", "BD", "betterDough")
var moreSugar = new upgrade("MoreSugar", 700, tatsuCookiesRep, 10, 5, "Tatsus are <strong>5%</strong> more effective", "MS", "moreSugar")
var specialIngredient = new upgrade("SpecialIngredient", 1000, tatsuCookiesRep, 20, 10, "Tatsus are <strong>10%</strong> more effective", "SI", "specialIngredient")

var lobbyVoice = new upgrade("LobbyVoice", 700, voiceChannels, 5, 3, "Voice channels are <strong>3%</strong> more effective", "LV", "lobbyVoice")
var cozyVoice = new upgrade("CozyVoice", 1000, voiceChannels, 10, 5, "Voice channels are <strong>5%</strong> more effective", "CV", "cozyVoice")
var gamingVoice = new upgrade("GamingVoice", 1500, voiceChannels, 20, 10, "Voice channels are <strong>10%</strong> more effective", "GV", "gamingVoice")

//name, cost, affectedBuilding, affectedBuildingInt, effect, effectText, shortIdName, varName


var allUpgrades = [
    fasterTyping, quickerFingers, fastestFingersInTheWest,
    readAndDone, noSpam, aPingableNick,
    botsChannel, cozy, serious,
    betterDough, moreSugar, specialIngredient,
    lobbyVoice, cozyVoice, gamingVoice
]