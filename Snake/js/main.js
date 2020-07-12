"use strict"
const apple = "apple",
    snake = "snake";

document.addEventListener("DOMContentLoaded", () => {
    var gridDiv = document.querySelector("div.grid");

    function Bind100Divs() {
        for (let i = 0; i < 100; i++) {
            var innerDiv = document.createElement("div");

            gridDiv.appendChild(innerDiv);
        }
    } Bind100Divs();


    const SQUARES = document.querySelectorAll(".grid div"),
        width = 10;

    var displayScore = document.querySelector(".score span"),
        btnStart = document.querySelector("button.start"),
        currentIndex = 0,  // First div in the grid
        appleIndex = 0, // First div in the grid 
        currentSnake = [2, 1, 0]; /* The div in grid being 2 (or the HEAD),
                                     and 0 being the end (Tail, with all 1's being the body)*/

    var direction = 1,
        score = 0,
        speed = .9,
        intervalTime = 0,
        interval = 0;

    function StartGame() {
        currentSnake.forEach(index => SQUARES[index].classList.remove(snake));
        SQUARES[appleIndex].classList.remove(apple);

        clearInterval(interval);
        score = 0;
        RandomApple();
        direction = 1;
        displayScore.textContent = score;
        intervalTime = 700;
        currentSnake = [2, 1, 0];
        currentIndex = 0;

        currentSnake.forEach(index => SQUARES[index].classList.add(snake));
        interval = setInterval(moveOutcomes, intervalTime);
    }

    // Function that deals with ALL the outcomes of the Snake
    function moveOutcomes() {
        // Deals with snake hitting border and snake hitting self
        if (currentSnake[0] + width >= (width * width) && direction === width || // If snake hits bottom
            currentSnake[0] % width === (width - 1) && direction === 1 || // If snake hits right wall
            currentSnake[0] % width === 0 && direction === (-1) || // If snake hits left wall
            (currentSnake[0] - width) < 0 && direction === (-width) || // If snake hits top
            SQUARES[currentSnake[0] + direction].classList.contains(snake)) // If snake hits self
        {
            return clearInterval(interval);
        }

        const TAIL = currentSnake.pop(); // Removes last item of the array and shows it
        SQUARES[TAIL].classList.remove(snake); // Removes class of snake from the TAIL
        currentSnake.unshift(currentSnake[0] + direction);  // Gives direction to the HEAD of the array


        // Deals with snake getting apple
        if (SQUARES[currentSnake[0]].classList.contains(apple)) {

            SQUARES[currentSnake[0]].classList.remove(apple);
            SQUARES[TAIL].classList.add(snake);
            currentSnake.push(TAIL);
            RandomApple();
            ++score;
            displayScore.textContent = score;
            clearInterval(interval);

            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }

        SQUARES[currentSnake[0]].classList.add(snake);

    }

    function ControlTheSnake(e) {
        SQUARES[currentIndex].classList.remove(snake);

        switch (e.keyCode) {
            case 39:
                direction = 1;
                break;
            case 38:
                direction = (-width);
                break;
            case 37:
                direction = (-1);
                break
            case 40:
                direction = width;
        }

    }

    function RandomApple() {
        do {
            appleIndex = Math.floor(Math.random() * SQUARES.length);
        } while (SQUARES[appleIndex].classList.contains(snake));
        
        SQUARES[appleIndex].classList.add(apple);
    }

    document.addEventListener("keyup", ControlTheSnake);
    btnStart.addEventListener("click", StartGame);
});