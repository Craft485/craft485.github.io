/*
TODO:
add bulk buying
add selling
*/

class building{constructor(name="", shortName="", cost=0, earnPerSecond=0, repPerSecond=0, repCost=0){
    this.name = name
    this.short = shortName
    this.cost = cost
    this.dashPointsEarnedPerSecond = earnPerSecond //dpps
    this.amountOwned = 0
    this.repCost = repCost
    this.repPerSecond = repPerSecond
    //this.earnRep = repPerSecond

    this.buy = ()=> {
        //do we have enough points to buy the building
        if(dashPoints >= this.cost && repPoints >= this.repCost) {
            dashPoints -= this.cost //take away cost value
            repPoints -= this.repCost
            this.cost += Math.floor((1.05 * this.cost)/10) //increase cost
            document.getElementById(this.short + "Cost").innerHTML = this.cost //change the displayed cost
            dashPointsPerSecond += this.dashPointsEarnedPerSecond //add dpps value
            this.amountOwned++
            document.getElementById(this.short + "AmountOwned").innerHTML = this.amountOwned //show how many of this building we have
            document.getElementById(this.short + "DPPS").innerHTML = this.dashPointsEarnedPerSecond * this.amountOwned
            if(this.repPerSecond>0) { //if true, this building uses rep
                repPointsPerSecond += this.repPerSecond
                document.getElementById(this.short + "RPPS").innerHTML = this.repPerSecond * this.amountOwned
                if(this.repCost>0) {
                    this.repCost += Math.floor((1.05 * this.repCost)/10)
                    document.getElementById(this.short + "RCost").innerHTML = this.repCost
                }
            }
        }

    }
    //beta testing function
    this.buy = (x)=>{
        //x is how many we are buying
        for(i=0; i<x; i++) {
            this.buy()//call buy x times
        }
    }
    /*
    this.sell = ()=> { //sell in increments of 1
        if(this.amountOwned > 0) {
            let refund = Math.floor(this.cost - (0.05 / this.cost))/2
            dashPoints += refund //50% refund
            dashPointsPerSecond -= this.dashPointsEarnedPerSecond
            this.amountOwned -= 1
            document.getElementById(this.short + "AmountOwned").innerHTML = this.amountOwned
        }
    } //SELL SELL SELL!!
    */
}}

var SendAMessage = new building("Send a Message", "SAM", 15, 1, 0)
var ReadRulebook = new building("Read Rulebook", "RR", 50, 3, 0)
var selfRoles = new building("Self Roles", "SR", 100, 5, 0)
var tatsuCookiesRep = new building("Tasu's Cookies and Rep", "TCR", 200, 10, 1, 0)
var voiceChannels = new building("Voice Channels", "VC", 500, 15, 2, 10)
//name, shortName, cost, earnPerSecond, repPerSecond=0, repCost=0

var allBuildings = [
    SendAMessage, ReadRulebook, selfRoles, tatsuCookiesRep, voiceChannels
]