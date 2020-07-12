"use strict"

const SQUARES = document.querySelectorAll('.square');
const MOLE = document.querySelectorAll(".mole");

var timeLeft = document.querySelector("#timer"),
    score = document.querySelector("#score");

var result = 0,
    hitPosition,
    timerTimeLeft = timeLeft.textContent,
    isHitOnce;

function RandomSquare() {
    // remove mole class from each div
    SQUARES.forEach(className => className.classList.remove("mole"));


    var position = Math.floor(Math.random() * 9),
        randomPosition = SQUARES[position];

    randomPosition.classList.add("mole");

    // Assign the id of the randomPosition to hitPosition
    isHitOnce = false;
    hitPosition = randomPosition.id;
};


SQUARES.forEach(id => {
    id.addEventListener("mouseup", () => {
        if (id.id === hitPosition && !isHitOnce) {
            ++result;
            score.textContent = result;
            isHitOnce = true;
        }
    })
});

function countDown() {
    timerTimeLeft--;
    timeLeft.textContent = timerTimeLeft;

    if (timerTimeLeft === 0) {
        clearInterval(timerId);
        clearInterval(timerIdMoveMole);
        alert("GAME OVER! Your final score is: " + result);
    }
}

var timerId = setInterval(countDown, 1000);
var timerIdMoveMole = setInterval(RandomSquare, 700);
// moveMole();