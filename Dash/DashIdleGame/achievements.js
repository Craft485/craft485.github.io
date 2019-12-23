class achievement{constructor(name, neededBuilding, neededBuildingAmount, displayName, desc){
    this.name = name
    this.displayName = displayName

    this.building = neededBuilding
    this.buildingAmount = neededBuildingAmount

    this.description = desc

    this.owned = false

    this.earn = ()=>{
        if(this.building.amountOwned>=this.buildingAmount && this.owned === false) {
            let iframe = document.getElementById("AchievementIFrame")
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
        newNotif_Title.innerHTML = "New Achievement Unlocked!"
    
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

var soManyMessages = new achievement("SoManyMessages", SendAMessage, 10, "So Many Messages", "Send(have) 50 messages")
var toManyMessages = new achievement("ToManyMessages", SendAMessage, 50, "To Many Messages", "Send(have) 100 messages")
var WayToManyNow = new achievement("WayToManyNow!!", SendAMessage, 100, "Way To Many Now!", "Send(have) 150 messages")
var thatsALottaMessages = new achievement("ThatsALottaMessages", SendAMessage, 150, "That\'s a Lotta Messages", "Send(have) 200 messages")
var borderlineSpam = new achievement("BorderlineSpam", SendAMessage, 200, "Borderline Spam", "Send(have) 300 messages")

var IReadIt = new achievement("IReadIt", ReadRulebook, 10, "I Read It", "Read the rulebook 10 times")
var anotherRead = new achievement("AnotherRead", ReadRulebook, 50, "Another Read", "Read rulebook 50 times")
var scholar = new achievement("Scholar", ReadRulebook, 100, "Scholar", "Read rulebook 100 times")
var whensTheTest = new achievement("Whensthetest", ReadRulebook, 150, "When's the test?", "Read rulebook 150 times")
var photographicMemory = new achievement("PhotographicMemory", ReadRulebook, 200, "Photographic Memory", "Read rulebook 200 times")

var rolePlusPlus = new achievement("RolesPlusPlus", selfRoles, 10, "Roles++", "Have 10 self roles")
var youGetARole = new achievement("YouGetARole", selfRoles, 50, "You get a role!", "Have 50 self roles")
var anExtraRole = new achievement("AnExtraRole", selfRoles, 100, "An Extra Role Won't Hurt", "Have 100 self roles")
var maybeToMany = new achievement("MaybeToMany", selfRoles, 150, "Maybe to many now", "Have 150 roles")
var rolesGalore = new achievement("RolesGalore", selfRoles, 200, "Roles Galore!", "Have 200 self roles")

var cookiezz = new achievement("Cookiez", tatsuCookiesRep, 10, "Cookies!", "Have 10 Tatsus")
var repAnyone = new achievement("RepAnyone", tatsuCookiesRep, 50, "Rep Anyone?", "Have 50 Tatsus")
var cookiesWithSideOfRep = new achievement("CookiesWithSideOfRep", tatsuCookiesRep, 100, "Cookies With a Side of Rep", "Have 100 Tatsus")
var baking = new achievement("Baking", tatsuCookiesRep, 150, "Baking 100", "Have 150 Tatsus")
var mrPopular = new achievement("MrPopular", tatsuCookiesRep, 200, "Mr. Popular", "Have 200 Tatsus")

var chattingAway = new achievement("ChattingAway", voiceChannels, 10, "Chatting Away", "Have 10 voice channels")
var talkTillTheMorning = new achievement("TalkTillTheMorning", voiceChannels, 50, "Talk Till Morning", "Have 50 voice channels")
var music2 = new achievement("MusicTwo", voiceChannels, 100, "Music 2", "Spend some time in music2, have 100 voice channels")
var streaming = new achievement("Streaming", voiceChannels, 150, "Streaming", "Stream via discord, have 150 voice channels")
var soreThroat = new achievement("SoreThroat", voiceChannels, 200, "Sore Throat", "Have 200 voice channels")

var allAchievements = [
    soManyMessages, toManyMessages, WayToManyNow, thatsALottaMessages, borderlineSpam,
    IReadIt, anotherRead, scholar, whensTheTest, photographicMemory,
    rolePlusPlus, youGetARole, anExtraRole, maybeToMany, rolesGalore,
    cookiezz, repAnyone, cookiesWithSideOfRep, baking, mrPopular,
    chattingAway, talkTillTheMorning, music2, streaming, soreThroat
    //obj/constructor class
]