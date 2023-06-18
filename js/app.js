'use strict';
let allCards = [];
let cardNames = ['backside', 'boxcat', 'dishwasher', 'fetcher', 'licker', 'monorail', 'puppyeye', 'snuggler'];
// let pair1 = [];
// let pair2 = [];
let dataList =[...cardNames, ...cardNames];
let cardsDisplay = document.getElementById('cards-display');
let gameState = {
  cardCount: dataList.length,
  activeTile: null,
  awaitingEndOfMove: false,
}
// Construction function for creating card objects
function Card (name, pairStack){
  this.name = name;
  this.image = `img/${name}.png`;
  this.pairStack = pairStack;
  this.push(allCards);
}
// Usingt the construct funtion to create cards for each cardname index
function createCards(){
  for(let i=0; i<16; i++){
    new Card(cardNames[i], '1');
    if(allCards.includes(cardNames[i])){
      new Card(cardNames[i], '2');
    }
  }
  console.log(allCards);
}
//Create card images and setting attributes
function setGame(card){
  let cardImage = document.createElement('img');
  cardImage.classList.add('card');
  cardImage.setAttribute('src', card.image);
  cardImage.setAttribute('data-revealed', false);
  cardImage.addEventListener('click', handleFlip);
  resetCard();
}
function resetCard(){

}

function handleFlip(event){
  const revealed = event.target.getAttribute('data-revealed');
//   let activeTile = null;
//   let awaitingEndOfMove = false;
    if(awaitingEndOfMove || re)
}
//Build Cards
function buildCards(){
  for (let i=0; i<cardCount; i++){
    let randomIndex = Math.floor(Math.random()*dataList);
    let image = dataList[i][randomIndex];
    let card = setGame(image);
    dataList[i].splice(image);
    cardsDisplay.appendChild(card);
  }
}

//create audio functions

createCards();