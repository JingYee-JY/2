const start = document.querySelector(".startPage");
const game = document.querySelector(".game");
const end = document.querySelector(".end");
const startBtn = document.querySelector(".startbtn");
const retry = document.querySelector(".playAgain");

const screenshotButton = document.querySelector(".screenshot-container");

var tempQuestionList;
var currentQuestion;
var questionLength;
var question;

var answers = document.querySelectorAll(".answer");
var answerArr = [];
var randomQn;
var correctAnswer;
var clicked = false;
//game ended?
let ended = false;

class Question{
    constructor(question, chineseQuestion,answer){
        this.question = question;
        this.answer = answer;
        this.chineseQuestion = chineseQuestion;
    }
}
// Answer ID : Answer Image
var answerList = {
    "A1" : "./assets/img/ducks.png",
    "A2" : "./assets/img/family.png",
    "A3" : "./assets/img/kite.png",
    "A4" : "./assets/img/chat.png",
}

// Question ID : Question, Answer, Answer Image
var questionList = {
    "Q1" : new Question("Scene not found in painting", "kite", "A4"),
}

document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    }, { passive: false });


answers.forEach(element => {
    
    element.addEventListener('click', ()=>{
        Submit(element.id)
    });
});

startBtn.addEventListener("click",StartGame);
retry.addEventListener('click', Retry);
page.addEventListener('click', CloseModal);


function StartGame(){
    //play click sound

    score = 0;
    currentQuestion = 0;
    questionLength = 5;
    ended = false;
    tempQuestionList = JSON.parse(JSON.stringify(questionList));
    InitializingQuestion();

    start.classList.add("hide");
    game.classList.remove("hide");
};


function InitializingQuestion(){
    currentQuestion += 1;
    answerArr = []
    
    // getting the question to be displayed
    question = tempQuestionList[GetQuestion()];

    // Gets the answer after getting the question
    correctAnswer = question.answer;
    
    answerArr.push(correctAnswer);

    // do a loop here to push amount of wrong answers based on how many buttons there are in the html
    for (var i = 0; i < answers.length -1; i++){
        answerArr.push(GetWrongAnswer());
    }

    Display()
};
function Display(){

    // shuffling the answers
    let randomInt = Math.floor(Math.random() * answerArr.length);

    if (randomInt == 0){
        temp = answerArr[0]
        answerArr[0] = answerArr[1]
        answerArr[1] = temp
    }

    answers.forEach(element => {
        element.id = answerArr[element.dataset.button]
        element.innerHTML = `<img src = ${answerList[element.id]}>`    
    });

};
function GetQuestion(){
    // grab an random integer based on the size of the dictionary
    randomQn = "Q" + Math.floor(Math.random() * (Object.keys(questionList).length) + 1); 

    // prevents getting the question if question is null
    if (tempQuestionList[randomQn] == null){
        randomQn = GetQuestion();
    }

    return randomQn;
}

function GetWrongAnswer(){
    
    // grab an random answer based on the size of the dictionary
    let randomAns = "A" + Math.floor(Math.random() * Object.keys(answerList).length + 1);

    // prevents adding the same letters in the answer to the answer list
    if (answerArr.includes(randomAns)){
        randomAns = GetWrongAnswer();
    }

    return randomAns;
};


// answer submitting
function Submit(id){
    if (id == correctAnswer){
        score += 1
        console.log("correct answer");
        page.innerHTML = '<img src="./assets/correct.png" alt="">'

        result.classList.remove("hide");

    }
    else{
        console.log("wrong answer");
        page.innerHTML = '<img src="./assets/tryagain.png" alt="">';

        result.classList.remove("hide");
        clicked = false;
    }
};

function EndGame(){
    // show end menu and retry button
    // hide game menu
    game.classList.add("hide")
    // show end menu
    end.classList.remove("hide")

    clearsnd.play();
    console.log("game ended!")
};


function Retry(){
    //play click sound
    clicksnd.play();
    // recue to beginning
    clicksnd.currentTime = 0;

    // pause all current songs
    winsnd.pause();
    losesnd.pause();
    clearsnd.pause();

    // show start menu
    start.classList.remove("hide")
    // hide end menu
    end.classList.add("hide")


    console.log("restarted!")
};

