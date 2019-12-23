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

            chev.onclick = ()=>{this.showDescription()}

            this.owned = true
            
            this.notify(this.displayName)
        }
    }
    
    this.notify = (displayName)=>{
        let notifDisplay = document.getElementById("notificationBarWrapper")
    
        let newNotif = document.createElement('div')
        newNotif.setAttribute('style', "color: gold; border-style: solid; border-width: medium; text-align: center") 

        let newNotif_Text = document.createElement('p')
        newNotif_Text.innerHTML = displayName

        let newNotif_Title = document.createElement("h1")
        newNotif_Title.innerHTML = "New Achievment Unlocked!"
    
        newNotif.appendChild(newNotif_Title)
        newNotif.appendChild(newNotif_Text)

        notifDisplay.appendChild(newNotif)
    
        setTimeout(()=>{
            notifDisplay.removeChild(newNotif)
        }, 3000)
    }

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

var soManyMessages = new acheivment("SoManyMessages", SendAMessage, 10, "So Many Messages", "Send(have) 50 messages")
var toManyMessages = new acheivment("ToManyMessages", SendAMessage, 50, "To Many Messages", "Send(have) 100 messages")
var WayToManyNow = new acheivment("WayToManyNow!!", SendAMessage, 100, "Way To Many Now!", "Send(have) 150 messages")
var thatsALottaMessages = new acheivment("ThatsALottaMessages", SendAMessage, 150, "That\'s a Lotta Messages", "Send(have) 200 messages")
var borderlineSpam = new acheivment("BorderlineSpam", SendAMessage, 200, "Borderline Spam", "Send(have) 300 messages")

var IReadIt = new acheivment("IReadIt", ReadRulebook, 10, "I Read It", "Read the rulebook 10 times")
var anotherRead = new acheivment("AnotherRead", ReadRulebook, 50, "Another Read", "Read rulebook 50 times")
var scholar = new acheivment("Scholar", ReadRulebook, 100, "Scholar", "Read rulebook 100 times")
var whensTheTest = new acheivment("Whensthetest", ReadRulebook, 150, "When's the test?", "Read rulebook 150 times")
var photographicMemory = new acheivment("PhotographicMemory", ReadRulebook, 200, "Photographic Memory", "Read rulebook 200 times")

var rolePlusPlus = new acheivment("RolesPlusPlus", selfRoles, 10, "Roles++", "Have 10 self roles")
var youGetARole = new acheivment("YouGetARole", selfRoles, 50, "You get a role!", "Have 50 self roles")
var anExtraRole = new acheivment("AnExtraRole", selfRoles, 100, "An Extra Role Won't Hurt", "Have 100 self roles")
var maybeToMany = new acheivment("MaybeToMany", selfRoles, 150, "Maybe to many now", "Have 150 roles")
var rolesGalore = new acheivment("RolesGalore", selfRoles, 200, "Roles Galore!", "Have 200 self roles")

var cookiezz = new acheivment("Cookiez", tatsuCookiesRep, 10, "Cookies!", "Have 10 Tatsus")
var repAnyone = new acheivment("RepAnyone", tatsuCookiesRep, 50, "Rep Anyone?", "Have 50 Tatsus")
var cookiesWithSideOfRep = new acheivment("CookiesWithSideOfRep", tatsuCookiesRep, 100, "Cookies With a Side of Rep", "Have 100 Tatsus")
var baking = new acheivment("Baking", tatsuCookiesRep, 150, "Baking 100", "Have 150 Tatsus")
var mrPopular = new acheivment("MrPopular", tatsuCookiesRep, 200, "Mr. Popular", "Have 200 Tatsus")

var allAchievments = [
    soManyMessages, toManyMessages, WayToManyNow, thatsALottaMessages, borderlineSpam,
    IReadIt, anotherRead, scholar, whensTheTest, photographicMemory,
    rolePlusPlus, youGetARole, anExtraRole, maybeToMany, rolesGalore,
    cookiezz, repAnyone, cookiesWithSideOfRep, baking, mrPopular
    //obj/constructor class
]