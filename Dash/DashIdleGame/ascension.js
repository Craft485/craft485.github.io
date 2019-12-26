var beePoints = 0

function calcBeePoints() {
    //every 50 dashPoints = 1 bee point
    beePoints += Math.round(dashPoints/50)
    //every 25 rep points = 1 bee point
    beePoints += Math.round(repPoints/25)
    /*formulas subject to change*/
}

class ascensionUpgrade{constructor(name=String, affectedBuilding=Object, baseCost=Array(2), description=String, elementName=String) {
    this.name = name
    this.building = affectedBuilding
    this.dashPointsCost = baseCost[1]
    this.repPointsCost = baseCost[2]
    this.desc = description
    this.elementName = elementName

    this.costDisplayed = this.dashPointsCost + " Dash Points and " + this.repPointsCost + " Rep Points" 

    this.buy = _=> {
        if (dashPoints >= this.dashPointsCost && repPoints >= this.repPointsCost) {
            dashPoints -= this.dashPointsCost
        }
    }

    this.load = _=> {
        document.getElementById(this.elementName).innerHTML = this.name
        document.getElementById(this.elementName + "Desc").innerHTML = this.desc

        document.getElementById(this.elementName + "Cost").innerHTML = this.costDisplayed
        document.getElementById(this.elementName + "Affect").innerHTML
    }

}}

var moreFingers = new ascensionUpgrade("More Fingers", SendAMessage, [], "Grow More Fingers To Send More Messages!", "")

var allAscensionUpgrades = [

]