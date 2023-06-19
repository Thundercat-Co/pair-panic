'use strict';
let allCards = [];
let cardNames = [ 'boxcat', 'dishwasher', 'fetcher', 'gamer','licker', 'monorail', 'puppyeye', 'snuggler'];
let cardChoices = allCards;
let cardsContainer= document.getElementById('cards-display');

let gameState = {
  cardCount: allCards.length,
  activeTile: null,
  awaitingEndOfMove: false,
  playerHand: [],
};
// Construction function for creating card objects
function Card (name, pairStack, uniqueId){
  this.name = name;
  this.image = `img/${name}.png`;
  this.pairStack = pairStack;
  this.uniqueId = uniqueId;
  allCards.push(this);
}
// Helper function for randomizing card choice
function getRandomIndex(){
  return Math.floor(Math.random()* allCards.length);
}
// Usingt the construct funtion to create cards for each cardname index
function createPair(){
  for(let i=0; i<cardNames.length; i++){
    new Card(cardNames[i], '1', i);
  } 
  for(let i=0; i<cardNames.length; i++){
    new Card(cardNames[i], '2', 8+i);
  }
}
createPair();

function setGame(card){
  let cardImage = document.createElement('img');
  cardImage.classList.add('card');
  cardImage.setAttribute('src', `${card.image}`);
  cardImage.setAttribute('id', `${card.uniqueId}`);
  cardImage.setAttribute('pair', `${card.pairStack}`);
  cardImage.setAttribute('data-revealed', false);
  cardImage.addEventListener('click', handleFlip);
  return cardImage;
  // returning card Image instead of appending
}
// Fucntion has been started for generating random images on the game board, however images are not randomizes
function renderGame(){
  // <<---- Working rendered code, however not randomized---->>
  for(let i=0; i<allCards.length; i++){
    cardsContainer.appendChild(setGame(allCards[i]));
  }


  //  <<< ---- Notes Below ---- >>>

  // <--------   below code kinda works but is buggy    -------->
  // for(let i=0; i<allCards.length; i++){
  //   let randomIndex = getRandomIndex();
  //   let selectedCard = allCards[randomIndex];
  //   let cardsGenerated = [];
  //   if(cardsGenerated.includes(selectedCard)){
  //     setGame(allCards[getRandomIndex()]);
  //   }else{
  //     cardsGenerated.push(selectedCard);
  //     cardsContainer.appendChild(setGame(allCards[i]));
  //   }
  // }
  // <<--- end of code block---->>>


  // <-------    below code kinda works but is buggy  ----->
  // const randomIndex = Math.floor(Math.random()* cardChoices.length);
  // for(let i=0; i<allCards.length; i++){
  //   const randomCard = allCards[randomIndex];
  //   const renderedCard = setGame(randomCard);
  //   cardChoices.splice(randomIndex, 1);
  //   cardsContainer.appendChild(renderedCard);
  // }
  // <<--- end of code block---->>>


  // <--------  below code kinda does not yet work  -------->
  // function randomCard(){
  //   for (let i=0; i<allCards; i++){
  //     let image = allCards.at(getRandomIndex());
  //     let card = setGame(image);
  //     dataList[i].splice(image);
  //     cardsDisplay.appendChild(card);
  //   }
  // }
  // <<--- end of code block---->>>

}
renderGame();

function matched(){
  let pair1 = gameState.playerHand[0].name;
  let pair2 = gameState.playerHand[1].name;
  if(pair1 === pair2){
    alert('yep, thats right!');
    console.log(`this is the first pair ${pair1}, this is the second pair ${pair2}`);
  }else{
    alert('try again!');
  }
}

function handleFlip(){
  // event.preventDefault();
  let cardStack = this.getAttribute('id');
  let revealed = this.getAttribute('data-revealed');
  gameState.playerHand.push(allCards[cardStack]);
  this.setAttribute('src', allCards[cardStack].image);
  if (gameState.playerHand.length === 2) {
    setTimeout(matched, 250);
  }else{

  }
}
console.log(gameState.playerHand);
