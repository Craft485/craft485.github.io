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
            let iframeDoc = iframe.contentDocument || iframe.contentWindow.document
            let chev = iframeDoc.getElementById(this.name)
            chev.innerHTML = this.displayName

            this.owned = true
            
        }
    }
    
    this.showDescription = ()=>{
        alert(this.description)
        //readd onclick event listener(anon arrow function)
        document.getElementById(this.name).onclick = ()=>{this.showDescription()}
    }
}}

var soManyMessages = new acheivment("SoManyMessages", SendAMessage, 10, "So Many Messages", "Send(have) 10 messages")

var allAcheivments = [
    soManyMessages
    //obj
]