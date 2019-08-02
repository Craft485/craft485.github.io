var credits = 0; 
var totalCreds = 0;
var qc = 0;
var qcReq=100000000;
var CPS = 0; //Credits Per Second
function addCredit() {
    credits++;
    document.getElementById("Credits").innerHTML = credits + " Credits";
}
function addQC() {
    if(credits>=qcReq) {
        qc++
        document.getElementById("qcAmountDisplay").innerHTML = qc
    }
}
function pres() {
    credits=0
    CPS=0
    CPS += (qc*(Math.floor(credits/2)))
    BinarySystem.owned=0
    Calculator.owned=0
    CM.owned=0
}
function tryPres() {
    if(qc>0) {
        pres()
    }
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
    if(CM.owned > 0) {
        document.getElementById("CMCost").innerHTML = "Cost: " + CM.cost;
        document.getElementById("CMOwned").innerHTML = "Owned: " + CM.owned;
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
    totalCreds += credits;
    BU();
    UU();
    chevCheck();
    addQC()
    document.getElementById("Credits").innerHTML = credits + " Credits";
    document.getElementById("CPS").innerHTML = "Credits per Second: " + CPS;
    window.setTimeout("loop()", 1000);
}
loop();