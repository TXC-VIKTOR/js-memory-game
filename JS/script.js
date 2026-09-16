const dimension = 150
const imgStart = 1 + Math.floor(Math.random() * 100)
const imgs = []

for (let i = 0; i < 8; i++) {
    imgs.push(`https://picsum.photos/${dimension}?random=${imgStart + i}`)
}

let cards = [...imgs, ...imgs]

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
console.log(cards);
shuffle(cards);
console.log(cards);