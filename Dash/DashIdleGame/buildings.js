//var buildingsOwned = 0

class building{constructor(name, shortName, cost, earnPerSecond){
    this.name = name
    this.short = shortName
    this.cost = cost
    this.dashPointsEarnedPerSecond = earnPerSecond //dpps
    this.amountOwned = 0

    this.buy = ()=> {
        dashPoints -= this.cost //take away cost value
        this.cost += Math.floor(1.05 * this.cost) //increase cost by +5%
        document.getElementById(this.short + "Cost").innerHTML = this.cost //change the displayed cost
        dashPointsPerSecond += this.dashPointsEarnedPerSecond //add dpps value
        this.amountOwned++
        document.getElementById(this.short + "AmountOwned").innerHTML = this.amountOwned //show how many of this building we have
        document.getElementById(this.short + "DPPS").innerHTML = this.dashPointsEarnedPerSecond
    }
    this.sell = ()=> { //sell in increments of 1
        if(this.amountOwned > 0) {
            let refund = Math.floor(this.cost - (0.05 / this.cost))/2
            dashPoints += refund //50% refund
            dashPointsPerSecond -= this.dashPointsEarnedPerSecond
            this.amountOwned -= 1
            document.getElementById(this.short + "AmountOwned").innerHTML = this.amountOwned
        }
    }
}}

var SendAMessage = new building("Send a Message", "SAM", 15, 1)