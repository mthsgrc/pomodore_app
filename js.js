/* eslint-env es6 */

const playBtn = document.querySelector(".play-btn");
const resetBtn = document.querySelector(".reset-btn");
const setBtn = document.querySelector(".set-btn");

//create pomodore obj
let pomodore = {};

// values for pomodore work and rest
pomodore.totalSeconds = 1500;
pomodore.restSeconds = 300;


//run initial pomodore set up
initialPomodore();



//set up values for pomodore, and insert into DOM
function initialPomodore() {

    // get the display of valuew (minutes and seconds)
    pomodore.minutes = document.getElementById("display-minutes");
    pomodore.seconds = document.getElementById("display-seconds");

    // calculate remaining time
    let seconds = pomodore.totalSeconds;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    // update HTML
    pomodore.minutes.innerHTML = ("0" + minutes).slice(-2);
    pomodore.seconds.innerHTML = ("0" + seconds).slice(-2);

}


//click event listener to start pomodore timer
playBtn.addEventListener("click", () => {
    // Hides play button
    playBtn.style.visibility = "hidden";

    if (pomodore.totalSeconds > 0) {
        pomodore.ticker = setInterval(() => {

            //stop if end time has passed
            pomodore.totalSeconds--;
            if (pomodore.totalSeconds <= 0) {
                clearInterval(pomodore.ticker);
                pomodore.totalSeconds = 0;
                startRest();
            }

            // calculate remaining time

            let seconds = pomodore.totalSeconds;
            let minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;

            // update HTML
            pomodore.minutes.innerHTML = ("0" + minutes).slice(-2);
            pomodore.seconds.innerHTML = ("0" + seconds).slice(-2);

        }, 1000);
    }
});


function startRest() {
    if (pomodore.restSeconds > 0) {
        pomodore.ticker = setInterval(() => {

            //stop if end time has passed
            pomodore.restSeconds--;
            if (pomodore.restSeconds <= 0) {
                clearInterval(pomodore.ticker);
                pomodore.restSeconds = 0;
            }

            // calculate remaining time

            let seconds = pomodore.restSeconds;
            let minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;

            // update HTML
            pomodore.minutes.innerHTML = ("0" + minutes).slice(-2);
            pomodore.seconds.innerHTML = ("0" + seconds).slice(-2);

        }, 1000);
    }
}

// reset/stops pomodore
resetBtn.addEventListener("click", () => {
    //stop setInterval function on counter
    clearInterval(pomodore.ticker);

    pomodore.totalSeconds = 1500;
    pomodore.restSeconds = 300;
    //set up pomodore initial values
    initialPomodore();
    //start btn visible again
    playBtn.style.visibility = "visible";

});

setBtn.addEventListener("click", () => {
    clearInterval(pomodore.ticker);

    let totalTime = prompt("Set Total Work Time:", "25");
    let restTime = prompt("Set Rest Time:", "5");

    totalTime *= 60;
    restTime *= 60;

    pomodore.totalSeconds = totalTime;
    pomodore.restSeconds = restTime;

    initialPomodore();

});