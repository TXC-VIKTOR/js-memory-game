const dimension = 150
const imgStart = 1 + Math.floor(Math.random() * 100)
const imgs = []
let firstCard = null
let secondCard = null
let lockBoard = false
let moves = 0
let matchedCount = 0
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
    board.innerHTML = "";
    shuffle(cards);
    firstCard = null
    secondCard = null
    lockBoard = false
    moves = 0
    matchedCount = 0

    cards.forEach((imgUrl) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.dataset.value = imgUrl;
        card.style.setProperty("--card-image", `url("${imgUrl}")`);
        board.appendChild(card);
        card.addEventListener('click', () => handleCardClick(card));
    });

}

initGame();

