let score = 0
//let highScore = 0
let questionIndex = [
    //obj.questionIndex
]

//document.onload(loadHighScore())

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
    document.getElementById("startBtn").style = "visbility: hidden"
    //hide start button for durration of quiz
}



class question{constructor(questionNum, question, answerA, answerB, answerC, answerD, correctAnswer) {
    this.questionNum = questionNum //question "index"
    this.questionIndex = questionNum
    this.question = question
    this.answers = [ //store all possible answers in array
        answerA, answerB, answerC, answerD
    ]
    this.rightAnswer = correctAnswer //at some point you've seen answer so many times it no longer looks like a word
    this.checkAnswer = (choosenQuestion)=>{ //you start to second guess your spelling
        if(choosenQuestion === this.correctAnswer) { //slowly seeping into madness
            //user got question right
        } else {
            //reject, user was wrong
        } //can I use promises here?
    }
}}

let testQuestion = new question(1, "What does Orteil stand for?", "Head", "Shoulder", "Knees", "Toe", "Toe")

let possibleQuestions = [
    testQuestion
]