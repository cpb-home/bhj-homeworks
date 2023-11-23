const cardSelect = document.querySelector('#select');
let intervalId;

cardSelect.addEventListener('change', (e) => {
    switch(e.target.value) {
        case "junior": 
            intervalId = setInterval(juniorTaskCountdown, 1000);
            cardSelect.disabled = true;
            break;
        
        case "middle":
            intervalId = setInterval(middleTaskCountdown, 1000);
            cardSelect.disabled = true;
            break;
        
        case "senior":
            intervalId = setInterval(seniorTaskCountdown, 1000);
            cardSelect.disabled = true;
    }
})

function juniorTaskCountdown() {
    const juniorSpan = document.getElementById('timer');
    // правильнее - const span = document.querySelector('#timer');
    const startTimerValue = Number(juniorSpan.textContent);
    let juniorCounter = startTimerValue;

    if (juniorCounter == 0) {
        clearInterval(intervalId);
        alert("Вы победили в конкурсе!");
    } else {
        juniorCounter--;
        juniorSpan.textContent = juniorCounter;
    }
}



// Задание с повышенным уровнем сложности #1 (не обязательно)
const 
    middleSpan = document.getElementById('middleTaskTimer'),
    startTimeArr = middleSpan.textContent.split(':'),
    startHour = Number(startTimeArr[0]),
    startMin = Number(startTimeArr[1]),
    startSec = Number(startTimeArr[2]);
    
let 
    hours = startHour,
    minutes = startMin,
    seconds = startSec;

function middleTaskCountdown() {
    if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
        alert("Вы победили в конкурсе 2!");
    } else {
        if (seconds > 59 || seconds < 0 || minutes > 59 || minutes < 0 || hours > 23 || hours < 0) {
            clearInterval(intervalId);
            alert("Получены неверные значения единиц времени!");
        }
        seconds = seconds > 0 ? --seconds : 59;

        minutes = seconds === 59 ? 
            minutes > 0 ? --minutes : 
                hours > 0 ? 59 : minutes
        : minutes;

        hours = hours > 0 ? 
            minutes === 59 && seconds === 59 ? --hours : hours
        : hours;
    }




    middleSpan.textContent = `
        ${hours<10?'0'+hours:hours}:${minutes<10?'0'+minutes:minutes}:${seconds<10?'0'+seconds:seconds}
    `;
    console.log(`${startHour<10?'0'+startHour:startHour}:${startMin}:${startSec}`);
    

}

function seniorTaskCountdown() {
    const seniorSpan = document.getElementById('seniorTaskTimer');
    const startTimerValue = Number(seniorSpan.textContent);
    const link = document.querySelector('.link');
    let seniorCounter = startTimerValue;

    if (seniorCounter == 0) {
        clearInterval(intervalId);
        link.click();
    } else {
        seniorCounter--;
        seniorSpan.textContent = seniorCounter;
    }
}

//middleTaskCountdown();

//setInterval(middleTaskCountdown, 1000);
//setInterval(seniorTaskCountdown, 1000);
//const link = document.querySelector('.link');
// link.addEventListener('click', (e) => {
//     e.preventDefault();
//     let file = './task.js';
//     link.click();
// })
