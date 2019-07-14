var credits = 0; //dev values
var CPS = 0; //Credits Per Second
function addCredit() {
    credits++;
    document.getElementById("Credits").innerHTML = credits + " Credits";
}
function BU() { //BU: Building Update block
    if(BinarySystem.owned > 0) {
        document.getElementById("BinarySystemCost").innerHTML = "Cost: " + BinarySystem.cost;
        document.getElementById("BinarySystemOwned").innerHTML = "Owned: " + BinarySystem.owned;
    }
    if(Calculator.owned > 0) {
        document.getElementById("CalculatorCost").innerHTML = "Cost: " + Calculator.cost;
        document.getElementById("CalculatorOwned").innerHTML = "Owned: " + Calculator.owned;
    }
    if(B2.owned > 0) {
        document.getElementById("B2Cost").innerHTML = "Cost: " + B2.cost;
        document.getElementById("B2Owned").innerHTML = "Owned: " + B2.owned;
    }
    if(B3.owned > 0) {
        document.getElementById("B3Cost").innerHTML = "Cost: " + B3.cost;
        document.getElementById("B3Owned").innerHTML = "Owned: " + B3.owned;
    }
    if(B4.owned >0) {
        document.getElementById("B4Cost").innerHTML = "Cost: " + B4.cost;
        document.getElementById("B4Owned").innerHTML =  "Owned: " + B4.owned;
    }
}
function UU() { //UU: Upgrade Update block
    
    if(U1.preReq.owned >= U1.preReqAmount && U1.owned == false) {
        U1.show(U1.name);
    }
    if(U2.preReq.owned >= U2.preReqAmount && U2.owned == false) {
        U2.show(U2.name);
    }
}

function chevCheck() {  //checks req for chevs
    C1.earn(name);
    C2.earn(C2.name);
    // S1.special(0);
    // S2.special(1);
}
function loop() { //loop block
    credits += CPS;
    BU();
    UU();
    chevCheck();
    document.getElementById("Credits").innerHTML = credits + " Credits";
    document.getElementById("CPS").innerHTML = "Credits per Second: " + CPS;
    window.setTimeout("loop()", 1000);
}
loop();