const closeButton = document.querySelector(".close");
const background = document.querySelector(".background");
const bottomBackground = document.querySelectorAll(".bottom-background");
const gameContainer = document.querySelector(".game-container");
const end = document.querySelector(".end");
const endMessage = document.querySelector(".end-message");
const screenshotButton = document.querySelector(".screenshot-container");
const termsAndCondiions = document.querySelector("small");
const instruction = document.querySelector(".instructions");

const start = document.querySelector(".start");
const game = document.querySelector(".game");
const startBtn = document.querySelector(".start-button");



var tempQuestionList;
var currentQuestion;
var questionLength;
var question;

var answers = document.querySelectorAll(".answer");
var answerArr = [];
var randomQn;
var correctAnswer;
//game ended?
let ended = false;

class Question {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
    }
}
// Answer ID : Answer Image
var answerList = {
    "A1": "./assets/img/ducks.png",
    "A2": "./assets/img/family.png",
    "A3": "./assets/img/kite.png",
    "A4": "./assets/img/chatting.png",
}

// Question ID : Question, Answer
var questionList = {
    "Q1": new Question("Which scene is not found in the painting?", "A3"),
}

document.addEventListener('dblclick', function (event) {
    event.preventDefault();
}, { passive: false });


answers.forEach(element => {

    element.addEventListener('click', () => {
        Submit(element.id);
    });
});

startBtn.addEventListener("click", StartGame);


function StartGame() {

    tempQuestionList = JSON.parse(JSON.stringify(questionList));
    InitializingQuestion();

    start.classList.add("hide");
    game.classList.remove("hide");
    closeButton.classList.remove("hide");
};


function InitializingQuestion() {
    currentQuestion += 1;
    answerArr = []

    // getting the question to be displayed
    question = tempQuestionList[GetQuestion()];

    instruction.classList.remove("hidden");
    instruction.innerHTML = `<p class='resultText'>${question.question}</p>`;

    // Gets the answer after getting the question
    correctAnswer = question.answer;

    answerArr.push(correctAnswer);

    // do a loop here to push amount of wrong answers based on how many buttons there are in the html
    for (var i = 0; i < answers.length - 1; i++) {
        answerArr.push(GetWrongAnswer());
    }

    Display()
};
function Display() {

    // shuffling the answers
    let randomInt = Math.floor(Math.random() * answerArr.length);

    if (randomInt == 0) {
        temp = answerArr[0]
        answerArr[0] = answerArr[1]
        answerArr[1] = temp
    }

    answers.forEach(element => {
        element.id = answerArr[element.dataset.button]
        element.innerHTML = `<img src = ${answerList[element.id]}>`
    });

};
function GetQuestion() {
    // grab an random integer based on the size of the dictionary
    randomQn = "Q" + Math.floor(Math.random() * (Object.keys(questionList).length) + 1);

    // prevents getting the question if question is null
    if (tempQuestionList[randomQn] == null) {
        randomQn = GetQuestion();
    }

    return randomQn;
}

function GetWrongAnswer() {

    // grab an random answer based on the size of the dictionary
    let randomAns = "A" + Math.floor(Math.random() * Object.keys(answerList).length + 1);

    // prevents adding the same letters in the answer to the answer list
    if (answerArr.includes(randomAns)) {
        randomAns = GetWrongAnswer();
    }

    return randomAns;
};


// answer submitting
function Submit(id) {
    if (id == correctAnswer) {
        // change to end screen
        // hide game screen
        // open end screen
        game.classList.add("hide");
        end.classList.remove("hide");
        closeButton.classList.add("hide");

        $(".owl-carousel").owlCarousel({
            loop: false,
            lazyLoad: true,
            nav: false,
            autoplay: false,
            margin: 10,
            autoplayTimeout: 10000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                }
            }
        })

        document.body.style.overflow = "initial";
        document.body.style.background = "none";

        background.classList.add("hide");
        bottomBackground.forEach(element => {
            element.classList.add("hide");
        })

        screenshotButton.style.background = "#CE0E2D";

        screenshotButton.innerHTML = `<img src="./assets/img/camera.png" alt="camera"><p>Take a <b>screenshot</b> of this page to redeem an Amazing Sketchbook at the Gallery's Keppel Centre for Art Education! While stocks last.</p>`
        termsAndCondiions.innerHTML = `Limited to 1 redemption per person, from 3 Dec 2022 to 31 Jan 2023.`

        endMessage.innerHTML = "<h2>Well Done!</h2>";

        screenshotButton.removeEventListener('click', playAgain);

        // Screenshot Button
        screenshotButton.addEventListener('click', () => {
            const screenshotTarget = document.body;

            html2canvas(screenshotTarget).then((canvas) => {

                let a = document.createElement("a");
                a.download = "screenshot.png";
                a.href = canvas.toDataURL("image/png");
                a.click();
            })
        });

    }
    else {
        // change to end screen
        // hide game screen
        // open end screen
        game.classList.add("hide");
        end.classList.remove("hide");
        closeButton.classList.add("hide");

        $(".owl-carousel").owlCarousel({
            loop: false,
            lazyLoad: true,
            nav: false,
            autoplay: false,
            margin: 10,
            autoplayTimeout: 10000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                }
            }
        })

        document.body.style.overflow = "initial";
        document.body.style.background = "none";

        background.classList.add("hide");
        bottomBackground.forEach(element => {
            element.classList.add("hide");
        })

        endMessage.innerHTML = "<h2>Try Again!</h2>";

        screenshotButton.innerHTML = '<img src="./assets/img/playagain.png" style="max-width: 300px;">'

        screenshotButton.removeEventListener('click', playAgain);

        // Screenshot Button
        screenshotButton.addEventListener('click', playAgain);

    }
};


function playAgain() {
    window.location.reload();
}


function EndGame() {
    // show end menu and retry button
    // hide game menu
    game.classList.add("hide")
    // show end menu
    end.classList.remove("hide")
};




startBtn.addEventListener('dblclick', function (event) {
    event.preventDefault();
});

closeButton.addEventListener("click", () => {
    window.location.reload();
})

/*prevent double tag zoom*/
document.addEventListener('dblclick', function (event) {
    event.preventDefault();
}, { passive: false });


window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}


/* Carousel code*/

let paintingData = [
    {
        title: "Singapore River",
        artist: "Chen Chong Swee",
        information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Mauris et lobortis quam. In volutpat efficitur dictum. " +
            "Nunc vel arcu id lectus iaculis pretium nec quis nulla. " +
            "Phasellus dictum laoreet odio, et tempor risus cursus a. " +
            "Nulla facilisi. Morbi congue ultricies quam sed consectetur. Sed " +
            "eleifend pulvinar mauris in interdum. Pellentesque.",
    },

    {
        title: "Life by the River",
        artist: "Liu Kang",
        information: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
            "Mauris et lobortis quam. In volutpat efficitur dictum. " +
            "Nunc vel arcu id lectus iaculis pretium nec quis nulla. " +
            "Phasellus dictum laoreet odio, et tempor risus cursus a. " +
            "Nulla facilisi. Morbi congue ultricies quam sed consectetur. Sed " +
            "eleifend pulvinar mauris in interdum. Pellentesque.",
    },
];