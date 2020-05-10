class achievement {
    constructor (
            name=new String, 
            index=new Number, 
            icon=new String, 
            requiredBuilding=new building, 
            buildingAmount=new Number, 
            requiredCurrency= new Array, 
            description=new String
        ) {
        this.name = name
        this.owned = false
        this.req = !requiredBuilding ? requiredCurrency : buildingAmount
        this.index = index
        this.icon = !icon ? "../images/chevNoImage" : icon
        this.desc = description

        this.earn = function () {
            if (this.owned && (this.req >= requiredBuilding.owned || (this.req[0] >= user.dashPoints && this.req[1] >= user.repPoints))) {
                this.owned = true
                const self = document.getElementsByClassName("achieve")[index]
                self.src = this.icon
                self.setAttribute("data-toggle", "tooltip")
                self.setAttribute("data-placement", "top")
                self.setAttribute("title", this.desc)
            }
        }
    }
}

const achievements = []