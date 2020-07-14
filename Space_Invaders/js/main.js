"use strict"
//#region VARIABLES

var gridDiv = document.querySelector("div.grid");
const GAME_OVER = "Game Over!",
      YOU_WIN = "You Win!";

//#region CONST_CLASSES

const INVADER_CLASS = "invader",
    SHOOTER_CLASS = "shooter",
    BOOM_CLASS = "boom",
    LASER_CLASS = "laser";

//#endregion

//#endregion

//#region INSERT DIVS

for (let i = 0; i < 225; i++)
    gridDiv.appendChild(document.createElement("div"));

//#endregion

document.addEventListener("DOMContentLoaded", () => {

    const SQUARES = document.querySelectorAll(".grid div");
    const SHOW_RESULT = document.querySelector("#result");

    var width = 15,
        currentShooterIndex = 202,
        currentInvaderIndex = 0,
        InvadersTaken = [],
        result = 0,
        direction = 1,
        invaderId;


    const INVADERS = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ];

    // Draw the invaders
    INVADERS.forEach(invader => SQUARES[currentInvaderIndex + invader].classList.add(INVADER_CLASS))

    // Draw the shooter
    SQUARES[currentShooterIndex].classList.add(SHOOTER_CLASS);

    // Move the shooter along a line
    function MoveShooter(e) {

        SQUARES[currentShooterIndex].classList.remove(SHOOTER_CLASS);

        switch (e.keyCode) {
            case 37:
                if (currentShooterIndex % width !== 0)
                    currentShooterIndex -= 1;
                break;
            case 39:
                if (currentShooterIndex % width < (width - 1))
                    currentShooterIndex += 1;
                break;
        }

        SQUARES[currentShooterIndex].classList.add(SHOOTER_CLASS);
    }

    // Move the shooter
    document.addEventListener("keydown", MoveShooter);

    
    // Move the invaders
    function MoveInvaders() {

        const LEFT_EDGE = INVADERS[0] % width === 0,
            RIGHT_EDGE = INVADERS[INVADERS.length - 1] % width === (width - 1);

        if ((LEFT_EDGE && direction === (-1)) || (RIGHT_EDGE && direction === 1)) {
            direction = width;
        }
        else if (direction === width)
            direction = LEFT_EDGE ? 1 : (-1);

        for (let i = 0; i < INVADERS.length; ++i) {
            SQUARES[INVADERS[i]].classList.remove(INVADER_CLASS);
        }

        for (let i = 0; i < INVADERS.length; ++i) {
            INVADERS[i] += direction;
        }

        for (let i = 0; i < INVADERS.length; ++i) {
            if(!InvadersTaken.includes(i)){
                SQUARES[INVADERS[i]].classList.add(INVADER_CLASS);
            }
        }

        // Decide a game over
        if (SQUARES[currentShooterIndex].classList.contains(INVADER_CLASS, SHOOTER_CLASS)) {
            SHOW_RESULT.textContent = GAME_OVER;
            SQUARES[currentShooterIndex].classList.add(BOOM_CLASS);
            clearInterval(invaderId);
        }

        for (let i = 0; i < INVADERS.length; ++i) {
            if (INVADERS[i] > (SQUARES.length - (width - 1))) {
                SHOW_RESULT.textContent = GAME_OVER;
                clearInterval(invaderId);
            }
        }

        if(InvadersTaken.length == INVADERS.length) {
            SHOW_RESULT.textContent = YOU_WIN;
        }
    }

    invaderId = setInterval(MoveInvaders, 500);

    // Shoot at invader
    function Shoot(e) {
        let laserId,
            currentLaserIndex = currentShooterIndex;

        // Move the laser from the shooter to the alien Invader
        function MoveLaser() {
            SQUARES[currentLaserIndex].classList.remove(LASER_CLASS);
            currentLaserIndex -= width;
            SQUARES[currentLaserIndex].classList.add(LASER_CLASS);

            if (SQUARES[currentLaserIndex].classList.contains(INVADER_CLASS)) {
                SQUARES[currentLaserIndex].classList.remove(LASER_CLASS);
                SQUARES[currentLaserIndex].classList.remove(INVADER_CLASS);

                SQUARES[currentLaserIndex].classList.add(BOOM_CLASS);

                setTimeout(() => SQUARES[currentLaserIndex].classList.remove(BOOM_CLASS), 250);

                clearInterval(laserId);

                var takenInvader = INVADERS.indexOf(currentLaserIndex);

                InvadersTaken.push(takenInvader);
                ++result;
                SHOW_RESULT.textContent = result;
            }

            if (currentLaserIndex < width) {
                clearInterval(laserId);
                setTimeout(() => SQUARES[currentLaserIndex].classList.remove(LASER_CLASS), 100);
            }
        }

        if (e.keyCode == 32) {
            laserId = setInterval(MoveLaser, 100);
        }

    }

    document.addEventListener("keyup", Shoot);
});