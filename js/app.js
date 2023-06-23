'use strict';
let allCards = [];
let cardNames = [ 'boxcat', 'dishwasher', 'fetcher', 'gamer','licker', 'monorail', 'puppyeye', 'snuggler'];
let cardsContainer= document.getElementById('cards-display');
let displayPlay = document.getElementById('game-space');
let allPlayerData = [];
let activePlayer;
let matches = 8;

let activeCard = null;
let activeId = null;

function getPlayers(){
  let previousPlayerArray = localStorage.getItem('playerArr');
  let playerArray = JSON.parse(previousPlayerArray);
  for(let i=0; i<playerArray.length; i++){
    allPlayerData.push(playerArray[i]);
  }
}
function currentPlayer(){
  activePlayer = allPlayerData.pop();
}
getPlayers();
currentPlayer();

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
  let cardElementArray = document.querySelectorAll('.card');
  if(activeCard === null){ // Runs if not card has been selected
    activeId = recentlyClickedId;
    activeCard = cardName; 
  } else if(activeCard !== null){ // Runs if there has been a card selected
    if(activeCard === cardName && recentlyClickedId != activeId){ // Runs if user selected correct card
      for(let i = 0; i < cardElementArray.length; i++){
        if(cardElementArray[i].getAttribute('data-name') == activeCard){
          setTimeout(function(){
            cardElementArray[i].style.visibility = 'hidden';
          }, 1000);
        }
      }
      matches--;
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
function updateTally(usr){
  let player = usr.user;
  let nameContainer = document.getElementById('name');
  nameContainer.textContent = `Player : ${player}`;
  let renderedMoves = usr.moves;
  let movesContainer = document.getElementById('tally');
  movesContainer.textContent =`Moves : ${renderedMoves}`;
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
  activePlayer.moves +=1;
  updateTally(activePlayer);
  if(matches===0){
    let addBtn = document.getElementById('end-button');
    let congratBtn = document.createElement('button');
    congratBtn.textContent = 'Congrats! Click Here To See Score!';
    addBtn.appendChild(congratBtn);
    congratBtn.setAttribute('onclick', "window.location.href='score.html';");
    saveScores();
  }
}
renderGame();

function saveScores(){
  console.log('save scores ran.............');
  allPlayerData.push(activePlayer);
  let playerDataString = JSON.stringify(allPlayerData);
  localStorage.setItem('playerArr', playerDataString);
}

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