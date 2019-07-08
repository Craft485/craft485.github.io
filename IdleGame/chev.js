var chevsOwned = 0
class Chev {constructor(name, req, reqAmount) {
        this.name = name;
        this.req = req;
        this.reqAmount = reqAmount;
        this.owned = false;
        this.totalChevs = 2;
        this.earn = function() {
            if(req.owned >= reqAmount && this.owned == false) {
                chevsOwned++;
                this.owned = true;
                this.show(name);
                alert("Chev earned: " + this.reqAmount + " " + this.name);
                document.getElementById("chevTitle").innerHTML = "ACHEVEMENTS Unlocked: " + chevsOwned + "/" + this.totalChevs;
            }
        }
        this.show = function(name) {
            var node = document.getElementById(name);
            var d = document.createAttribute("style");
            d.value = "visibility: visible";
            node.setAttributeNode(d); //document.getElementById(name).createAttribute("style").value = "visibility: hidden";
        }
        this.sEarn = function() {
            this.owned = true;
            this.show(name);
            alert("Shadow chev earned: " + this.name);
        }
        this.special = function(number) {
            this.number = number;
            if(this.number == 0 && this.owned == false) {
                var max = Math.ceil(500);
                var min = Math.floor(1);
                var z = Math.floor(Math.random() * (max - min + 1) + min); 
                if(z = 42) {
                    BX.owned = 99999;
                    S1.sEarn();
                }
            }
            if(this.number == 1 && this.owned != true) {
                if(credits >= 1000000000) {
                    BX.owned = 9999;
                    S2.sEarn()
                }
            }
        }
    }
}
//normal chevs
var C1 = new Chev("C1", B1, 5);
var C2 = new Chev("C2", B2, 5);
var C3 = new Chev("C2", B4, 100);
//special chevs
var S1 = new Chev("S1", BX, 9999); //1 in 500 every second to get
var S2 = new Chev("S2", BX, 9999);