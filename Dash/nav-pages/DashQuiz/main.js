let score = 0
//let highScore = 0
let questionIndex = [
    //obj.questionIndex
]
var currentQuestion = " "

//document.onload(loadHighScore())

class question{constructor(questionNum, question, answerA, answerB, answerC, answerD, correctAnswer) {
    //this.questionNum = questionNum 
    this.questionIndex = questionNum //question "index" or its place in the possibleQuestions array
    this.question = question
    this.answers = [ //store all possible answers in array
        answerA, answerB, answerC, answerD//at some point you've seen answer so many times it no longer looks like a word
    ] //you start to second guess your spelling
    this.rightAnswer = correctAnswer //slowly seeping into madness
}}

let question1 = new question(0, "What does Orteil stand for?", "Head", "Shoulder", "Knees", "Toe", "Toe")
let question2 = new question(1, "What month was the Dash Net Forums Discord made?", "December", "Febuary", "April", "Monday", "Febuary")
let question3 = new question(2, "How many stages does Santa go through, including the festive Test Tube?", "15", "5", "10", "7", "15")
let question4 = new question(3, "Which platform is the mobile Cookie Clicker beta available on?", "Steam", "Firefox", "IOS", "Android", "Android")
let question5 = new question(4, "How many staff does the Dash Net Discord have?(Including Orteil)", "10", "4", "14", "11", "14")
let question6 = new question(5, "Which person is at the number one spot for server exp as of Dec 2019?", "Finnquaza", "Zakuro", "Orteil", "xxfillex", "Finnquaza")
let question7 = new question(6, "What colored role is most popular(has the most people using it)", "Radioactive", "Midnight", "Ice", "Robin egg", "Midnight")
let question8 = new question(7, "How many bots does Dash Net have?", "12", "1", "2", "10", "10")
let question9 = new question(8, "What channel do you need the pillow role to view?", "#Lobby", "#Rulebook", "#Cozy", "#Cubic-Wonderland", "#Cozy")
let question10 = new question(9, "What year was Cookie Clicker released?", "2005", "2013", "2019", "2014", "2013")

let possibleQuestions = [
    question1, 
    question2, 
    question3, 
    question4, 
    question5, 
    question6, 
    question7, 
    question8, 
    question9, 
    question10
]

function newGame() {
    let i = Math.floor(Math.random()*possibleQuestions.length)
    let question = possibleQuestions[i]
    let quesDisplay = document.getElementById("questionDisplay")
    quesDisplay.innerHTML = question.question //display first question
    document.getElementById("answerA").innerHTML = question.answers[0]
    document.getElementById("answerB").innerHTML = question.answers[1]
    document.getElementById("answerC").innerHTML = question.answers[2]
    document.getElementById("answerD").innerHTML = question.answers[3]
    //generate answers
    document.getElementById("startBtn").setAttribute("style", "visibility: hidden")
    //hide start button for durration of quiz
    currentQuestion = question
}

function isCheck(e) {
    let chosenAnswer = e
    console.log(possibleQuestions)
    if(chosenAnswer === currentQuestion.rightAnswer) {
        score++
        //delete possibleQuestions[currentQuestion.questionIndex]
        if(possibleQuestions.length==0) {
            gameOver()
        } else {
            newQuestion(possibleQuestions)
            //newGame()
        }
    } else {
        
        alert("That is incorrect! The right answer was " + currentQuestion.rightAnswer)
        if(possibleQuestions.length==0) {
            gameOver()
        } else {
            //newGame()
            newQuestion(possibleQuestions)
        }
    }
}
//World Domination Imposed
function newQuestion() {
    let i = Math.floor(Math.random()*possibleQuestions.length)
    currentQuestion = possibleQuestions[i] //set new question
    document.getElementById("questionDisplay").innerHTML = currentQuestion.question
    document.getElementById("answerA").innerHTML = currentQuestion.answers[0] //set new answers
    document.getElementById("answerB").innerHTML = currentQuestion.answers[1]
    document.getElementById("answerC").innerHTML = currentQuestion.answers[2]
    document.getElementById("answerD").innerHTML = currentQuestion.answers[3]
    //this looks horid I know
}
function gameOver() {
    // set localStorage.score
    alert("You have finished this quiz! Your final score was " + score)
}