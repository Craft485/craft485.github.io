//var buildingsOwned = 0

class building{constructor(name, shortName, cost, earnPerSecond){
    this.name = name
    this.short = shortName
    this.cost = cost
    this.dashPointsEarnedPerSecond = earnPerSecond

    this.buy = ()=>{
        dashPoints -= this.cost //take away cost value
        this.cost += Math.floor(this.cost + (0.05 * this.cost)) //increase cost by +5%
        document.getElementById(shortName + "Cost").innerHTML = this.cost //change the displayed cost
        dashPointsPerSecond += this.dashPointsEarnedPerSecond //add dpps value
        
    }
}}