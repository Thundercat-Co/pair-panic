'use strict';
let allCards = [];
let cardNames = [ 'boxcat', 'dishwasher', 'fetcher', 'gamer','licker', 'monorail', 'puppyeye', 'snuggler'];
let cardsContainer= document.getElementById('cards-display');
// let allPlayerData = allPlayers;
let allPlayerData = [];
let activePlayer;

let activeCard = null;
let activeId = null;

function getPlayers(){
  let previousPlayerArray = localStorage.getItem('playerArray');
  let playerArray = JSON.parse(previousPlayerArray);
  for(let i=0; i<playerArray.length; i++){
    allPlayerData.push(playerArray[i]);
    // console.log(allPlayerData);
  }
}
function currentPlayer(){
  activePlayer = allPlayerData.slice(-1);
}
getPlayers();
currentPlayer();

// console.log(activePlayer);
// Construction function for creating card objects
function Card (name, pairStack, uniqueId){
  this.name = name;
  this.image = `img/${name}.png`;
  this.logo = 'img/backside.png';
  this.pairStack = pairStack;
  this.uniqueId = uniqueId;
  allCards.push(this);
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

function buildCard(card){
  let cardDiv = document.createElement('div');
  cardDiv.setAttribute('pair', card.pairStack);
  cardDiv.setAttribute('data-name', card.name);
  cardDiv.addEventListener('click', handleFlip);
  cardDiv.classList.add('card');

  let frontImage = document.createElement('img');
  frontImage.setAttribute('src', card.logo);
  frontImage.setAttribute('id', card.name);
  frontImage.setAttribute('data-uniqueId',card.uniqueId);
  cardDiv.appendChild(frontImage);
  return cardDiv;
}
// Fucntion 
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


function matched(cardElement){
  let cardName = cardElement.id;
  let recentlyClickedId = cardElement.dataset.uniqueid;
  // console.log('this is card Element', cardElement);
  let cardElementArray = document.querySelectorAll('.card');
  if(activeCard === null){ // Runs if not card has been selected
    activeId = recentlyClickedId;
    activeCard = cardName; 
  } else if(activeCard !== null){ // Runs if there has been a card selected
    if(activeCard === cardName && recentlyClickedId != activeId){ // Runs if user selected correct card
      for(let i = 0; i < cardElementArray.length; i++){
        // console.log(cardElementArray[i].getAttribute('data-name'), activeCard);
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

// need a function for when the game ends/when there are no more cards to flip

function handleFlip(e){
  const card = document.getElementById(e.target.id);
  for(let i = 0; i < allCards.length; i++){ // Loops through card array 
    if(allCards[i].name === e.target.id){
      e.target.setAttribute('src', allCards[i].image);
    }
  }
  matched(e.target);
  activePlayer[0].moves +=1;
  // console.log(activePlayer[0].moves);
}
renderGame();
// console.log(allPlayerData);

function saveScores(){
  let playerDataString = JSON.stringify(allPlayerData);
  localStorage.setItem('playerDataArr', playerDataString);
  console.log(allPlayerData);
}
saveScores();
// Fix the form on index
// Create scoring system
// Store score
// slow down second flip
// So we don't get confused: SSGP
//  stringify ---> js to local storage/JSON
//  parse -------> local storage/JSON to js
// JSON.stringify() A common use of JSON is to exchange data to/from a web server.
// When sending data to a web server, the data has to be a string. 
//Convert a JavaScript object into a string with JSON.stringify() .