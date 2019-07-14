class Building { constructor(name, cost, owned=0, factor=1) {
        this.name = name;
        this.cost = cost;
        this.owned = owned;
        this.factor = factor;
        console.log(this.name);
        this.buy = function(count=1) {
            if (credits >= this.cost) {
                credits -= this.cost;
                this.owned++;
                CPS += this.factor;
                this.cost += Math.round(0.25 * this.cost);
                document.getElementById("Credits").innerHTML = credits + " " + "Credits";
                console.log("bought building: " + this.name);
            }
        }
    }
}

class Upgrade { constructor(name, cost, preReq, preReqAmount, effect) {
        this.name = name;
        this.cost = cost;
        this.owned = false;
        this.preReq = preReq;
        this.preReqAmount = preReqAmount;
        this.effect = effect;
        this.buy = function() {
            if(credits >= this.cost) {
                credits -= this.cost;
                preReq.factor += Math.floor(effect * preReq.factor); //take building factor times the passed effect times the uildings current factor(rounding to whole numbers)
                this.owned = true;
                this.remove(this.name);
                document.getElementById("Credits").innerHTML = credits + " " + "Credits";
                console.log("upgrade bought: " + this.name);
            }
        }
        this.remove = function(name) {
            let parent = document.getElementById("upgrades");
            var node = document.getElementById(name);
            //var d = document.createAttribute("style");
            //d.value = "visibility: hidden";
            //node.setAttributeNode(d);
            parent.removeChild(node);
        }
        this.show = function(name) {
            var node = document.getElementById(name);
            var d = document.createAttribute("style");
            d.value = "visibility: visible";
            node.setAttributeNode(d);
        }
    }
}
var BX = new Building("BX", 999999, 0, 0);
//buildings
var BinarySystem = new Building("BinarySystem", 20, 0, 1);
var Calculator = new Building("Calculator", 50, 0, 3);
var B2 = new Building("B2", 80, 0, 5);
var B3 = new Building("B3", 110, 0, 7);
var B4 = new Building("B4", 200, 0, 20);
//upgrades
var U1 = new Upgrade("U1", 100, Calculator, 10, 2);
var U2 = new Upgrade("U2", 150, Calculator, 15, 2);