var credits = 0; //dev values
var CPS = 0; //Credits Per Second
function addCredit() {
    credits++;
    document.getElementById("Credits").innerHTML = credits + " Credits";
}
function BU() { //BU: Building Update block
    if(B0.owned > 0) {
        document.getElementById("B0Cost").innerHTML = "Cost: " + B0.cost;
        document.getElementById("B0Owned").innerHTML = "Owned: " + B0.owned;
        document.getElementById("CPS").innerHTML = "Credits per Second: " + CPS;
    }
    if(B1.owned > 0) {
        document.getElementById("B1Cost").innerHTML = "Cost: " + B1.cost;
        document.getElementById("B1Owned").innerHTML = "Owned: " + B1.owned;
        document.getElementById("CPS").innerHTML = "Credits per Second: " + CPS;
    }
    if(B2.owned > 0) {
        document.getElementById("B2Cost").innerHTML = "Cost: " + B2.cost;
        document.getElementById("B2Owned").innerHTML = "Owned: " + B2.owned;
        document.getElementById("CPS").innerHTML = "Credits per Second: " + CPS;
    }
    if(B3.owned > 0) {
        document.getElementById("B3Cost").innerHTML = "Cost: " + B3.cost;
        document.getElementById("B3Owned").innerHTML = "Owned: " + B3.owned;
        document.getElementById("CPS").innerHTML = "Credits per Second: " + CPS;
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
/*function SchevCheck() {
    var Q = S1.special();
    if(Q == 42 && S1.owned == false) {
        BX.owned = 501;
        S1.earn();
    }
    var Q = S2.special();
    if( ) {
        BX.owned = 9999999999;
        S2.earn();
    }
}*/
function chevCheck() {  //checks req for chevs
    C1.earn();
    C2.earn();

    //SchevCheck();
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