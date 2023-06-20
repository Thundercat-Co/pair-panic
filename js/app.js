'use strict';
let allCards = [];
let cardNames = [ 'boxcat', 'dishwasher', 'fetcher', 'gamer','licker', 'monorail', 'puppyeye', 'snuggler'];
let cardsContainer= document.getElementById('cards-display');

let activeCard = null;
let gameState = {
  cardCount: allCards.length,
  awaitingEndOfMove: false,
  playerHand: [],
};
// Construction function for creating card objects
function Card (name, pairStack, uniqueId){
  this.name = name;
  this.image = `img/${name}.png`;
  this.logo = 'img/backside.png';
  this.pairStack = pairStack;
  this.uniqueId = uniqueId;
  allCards.push(this);
}
// Helper function for randomizing card choice
// function getRandomIndex(){
//   return Math.floor(Math.random()* allCards.length);


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

function buildCard(card){
  let cardDiv = document.createElement('div');
  cardDiv.setAttribute('id', card.uniqueId);
  cardDiv.setAttribute('pair', card.pairStack);
  cardDiv.setAttribute('data-name', card.name);
  cardDiv.addEventListener('click', handleFlip);
  cardDiv.classList.add('card');

  let frontImage = document.createElement('img');
  frontImage.setAttribute('src', card.logo);
  frontImage.setAttribute('id', card.name);
  cardDiv.appendChild(frontImage);


  return cardDiv;
}
// Fucntion has been started for generating random images on the game board, however images are not randomizes
function renderGame(){
  // Shuffle cards using Fisher-Yates shuffle algorithm

  for (let i=allCards.length - 1;i>0;i--) {
    let j = Math.floor(Math.random()* (i+1));
    [allCards[i],allCards[j]]=[allCards[j],allCards[i]];
  }

  for (let i=0; i<allCards.length; i ++){
    cardsContainer.appendChild(buildCard(allCards[i]));
  }
}

renderGame();

function matched(cardName){
  let cardElementArray = document.querySelectorAll('.card');
  if(activeCard === null){ // Runs if not card has been selected
    activeCard = cardName; 
  } else if(activeCard !== null){ // Runs if there has been a card selected
    if(activeCard === cardName){ // Runs if user selected correct card
      for(let i = 0; i < cardElementArray.length; i++){
        console.log(cardElementArray[i].getAttribute('data-name'), activeCard);
        if(cardElementArray[i].getAttribute('data-name') == activeCard){
          cardElementArray[i].style.visibility = 'hidden';
        }
      }
      activeCard = null;
    }else{ //Runs if user got wrong card
      let cardImageArray = document.querySelectorAll('.card img');
      setTimeout(function(){
        for(let i = 0; i < cardImageArray.length; i++){
          cardImageArray[i].setAttribute('src','img/backside.png');
        }
      }, 1000);
      activeCard = null;
    }
  }
}
// Should we assaign the rendering pick
function handleFlip(e){
  const card = document.getElementById(e.target.id);
  for(let i = 0; i < allCards.length; i++){ // Loops through card array 
    if(allCards[i].name === e.target.id){
      e.target.setAttribute('src', allCards[i].image);
    }
  }
  matched(e.target.id);
}

// Fix double click = match
// Fix the form on index
// Create scoring system
// Store score
