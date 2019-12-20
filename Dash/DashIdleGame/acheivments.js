class acheivment{constructor(name, neededBuilding, neededBuildingAmount, displayName, desc){
    this.name = name
    this.displayName = displayName

    this.building = neededBuilding
    this.buildingAmount = neededBuildingAmount

    this.description = desc

    this.owned = false

    this.earn = ()=>{
        if(this.building.amountOwned>=this.buildingAmount && this.owned === false) {
            let iframe = document.getElementById("achievmentIFrame")
            let iframeDoc = iframe.contentDocument || iframe.contentWindow.document //this wont work locally as it is seen as xss
            let chev = iframeDoc.getElementById(this.name)
            chev.innerHTML = this.displayName

            this.owned = true
            
            //this.notify()
        }
    }
    
    /*this.notify = ()=>{
        
    }*/

    this.showDescription = ()=>{
        if(this.owned===true) {
            let newPopUp = document.createElement("div")

            let newPopUpName = document.createElement("p")
            newPopUpName.innerHTML = this.name
            newPopUpName.style="margin-bottom: 0px;"
            //newPopUpName.style
            let newPopUpDesc = document.createElement("p")
            newPopUpDesc.innerHTML = this.description
            newPopUpDesc.style = "margin-bottom: 0px;"
            newPopUp.appendChild(newPopUpName)
            //newPopUp.appendChild(document.createElement("br"))
            newPopUp.appendChild(newPopUpDesc)
            //newPopUp.innerHTML = this.description

            newPopUp.style = "margin-left: 50%; border-style: solid; border-width: thin;"
            newPopUp.setAttribute("id", this.name)

            let notifBar = document.getElementById("notificationBarWrapper")

            notifBar.appendChild(newPopUp)

            setTimeout(_=>{
                notifBar.removeChild(newPopUp)
            }, 3000)

            // alert(this.description)

            //readd onclick event listener(anon arrow function)
            document.getElementById(this.name).onclick = ()=>{this.showDescription()}

            //debugger
        }
    }
}}

var soManyMessages = new acheivment("SoManyMessages", SendAMessage, 50, "So Many Messages", "Send(have) 50 messages")
var toManyMessages = new acheivment("ToManyMessages", SendAMessage, 100, "To Many Messages", "Send(have) 100 messages")
var WayToManyNow = new acheivment("WayToManyNow!!", SendAMessage, 150, "Way To Many Now!", "Send(have) 150 messages")

var allAchievments = [
    soManyMessages, toManyMessages, WayToManyNow
    //obj
]