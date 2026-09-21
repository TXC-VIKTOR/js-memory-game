const dimension = 150
const imgStart = 1 + Math.floor(Math.random() * 100)
const imgs = []
let firstCard = null
let secondCard = null
let lockBoard = false
let moves = 0
let matchedCount = 0

let secondes = 0;
let timerInterval = null;

for (let i = 0; i < 8; i++) {
        imgs.push(`https://picsum.photos/${dimension}?random=${imgStart + i}`)
}


let cards = [...imgs, ...imgs]
const board = document.querySelector("#board")

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}




function initGame() {
    stopTimer();
    board.innerHTML = "";
    shuffle(cards);
    firstCard = null
    secondCard = null
    lockBoard = false
    moves = 0
    matchedCount = 0
    secondes = 0;
    document.getElementById("moves").innerHTML = "moves :" + moves;
    document.getElementById("temps").innerHTML = `Temps : ${formatTime(secondes)}`;
    document.getElementById("win").innerHTML = "";

    cards.forEach((imgUrl) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.dataset.value = imgUrl;
        board.appendChild(card);

        card.addEventListener("click", () => handleCardClick(card));

    });
    startTimer();
}


function handleCardClick(card) {
    if (lockBoard || card.classList.contains("matched") || card === firstCard) {
        return;
    }

    card.innerHTML = `<img src="${card.dataset.value}">`;

    if (firstCard === null) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;
    moves += 1;
    document.getElementById("moves").innerHTML = "moves :" + moves;
    checkMatch();
    checkVictory();
}

function checkMatch() {
    if (firstCard.dataset.value == secondCard.dataset.value) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCount += 2;
        resetTurn();
        return;
    }
    setTimeout(() => {
        firstCard.innerHTML = "";
        secondCard.innerHTML = "";
        resetTurn(); // On débloque le plateau pour le coup suivant
    }, 800);

}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function reset() {
    initGame();
}

function formatTime(sec) {
    let min = String(Math.floor(sec / 60)).padStart(2, '0');
    let sec2 = String(Math.floor(sec % 60)).padStart(2, '0');
    return `${min}:${sec2}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        secondes++;
        document.getElementById("temps").innerHTML = `Temps : ${formatTime(secondes)}`;
    }, 1000);

}

function stopTimer() {
    clearInterval(timerInterval);
}

function checkVictory(){
    if (matchedCount == cards.length){
        stopTimer();
        document.getElementById("win").innerHTML = "GG ";
    }
}

initGame();