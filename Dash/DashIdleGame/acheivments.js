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
            
            //this.showDescription()
        }
    }
    
    /*this.notify = ()=>{
        
    }*/

    this.showDescription = ()=>{
        if(this.owned===true) {
            let newPopUp = document.createElement("div")

            let newPopUpName = document.createElement("p")
            newPopUpName.innerHTML = this.name
            //newPopUpName.style
            let newPopUpDesc = document.createElement("p")
            newPopUpDesc.innerHTML = this.description
            newPopUp.appendChild(newPopUpName)
            newPopUp.appendChild(document.createElement("br"))
            newPopUp.appendChild(newPopUpDesc)
            //newPopUp.innerHTML = this.description

            newPopUp.style = "margin-left: 50%;"

            let notifBar = document.getElementById("notificationBarWrapper")

            notifBar.appendChild(newPopUp)

            setTimeout(_=>{
                notifBar.removeChild(newPopUp)
            }, 3000)

            // alert(this.description)

            //readd onclick event listener(anon arrow function)
            document.getElementById(this.name).onclick = ()=>{this.showDescription()}
        }
    }
}}

var soManyMessages = new acheivment("SoManyMessages", SendAMessage, 10, "So Many Messages", "Send(have) 10 messages")

var allAcheivments = [
    soManyMessages
    //obj
]