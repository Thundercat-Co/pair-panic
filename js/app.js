'use strict';
let allCards = [];
let cardNames = [ 'boxcat', 'dishwasher', 'fetcher', 'gamer','licker', 'monorail', 'puppyeye', 'snuggler'];
let cardChoices = allCards;
let cardsContainer= document.getElementById('cards-display');

let activeCard = null;
let gameState = {
  cardCount: allCards.length,
  activeTile: null,
  awaitingEndOfMove: false,
  playerHand: [],
  playerWins: [],
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

function buildCard(card){
  let cardDiv = document.createElement('div');
  cardDiv.setAttribute('id', card.uniqueId);
  cardDiv.setAttribute('pair', card.pairStack);
  cardDiv.setAttribute('data-name', card.name);
  cardDiv.addEventListener('click', handleFlip);
  cardDiv.classList.add('card');

  let frontImage = document.createElement('img');
  frontImage.setAttribute('src', card.logo);
  frontImage.setAttribute("id", card.name);
  cardDiv.appendChild(frontImage);

  // let backImage = document.createElement('img');
  // backImage.setAttribute('src', card.image);
  // cardDiv.appendChild(backImage);

  // cardsContainer.appendChild(cardDiv);
  // console.log(cardDiv);
  return cardDiv;
}
// Fucntion has been started for generating random images on the game board, however images are not randomizes
function renderGame(){
  for(let i=0; i<allCards.length; i++){
    cardsContainer.appendChild(buildCard(allCards[i]));
    // buildCard(allCards[i]);
  }
}
renderGame();

function matched(cardName){
  // let card1 = gameState.playerHand[0];
  // let card2 = gameState.playerHand[1];
  // if(card1.getAttribute('name') === card2.getAttribute('name')){
  //   alert('yep, thats right!');
  // }else{
  //   alert('try again!');
  //   card1.classList.remove('flipped');
  //   card2.classList.remove('flipped');
  // }
  // gameState.playerHand = [];
  let cardElementArray = document.querySelectorAll(".card");
 

  if(activeCard === null){ // Runs if not card has been selected
    activeCard = cardName; 
  } else if(activeCard !== null){ // Runs if there has been a card selected
    if(activeCard === cardName){ // Runs if user selected correct card
      // alert('You got it dude');
      
      
      for(let i = 0; i < cardElementArray.length; i++){
        console.log(cardElementArray[i].getAttribute('data-name'), activeCard)
        if(cardElementArray[i].getAttribute('data-name') == activeCard){
          cardElementArray[i].style.visibility = "hidden";
        }
      }
      
      activeCard = null;

    }else{ //Runs if user got wrong card


      let cardImageArray = document.querySelectorAll(".card img")
      setTimeout(function(){
        for(let i = 0; i < cardImageArray.length; i++){
          cardImageArray[i].setAttribute('src','img/backside.png');
        }
      }, 1000);
      
      

      //  let recentlyClickedCard = document.getElementById(cardName)
      //  let previousClickedCard = document.getElementById(activeCard)

      //  setTimeout(function() {
      //   recentlyClickedCard.setAttribute('src','img/backside.png')
      //   previousClickedCard.setAttribute('src','img/backside.png' )
      //  }, 1000)

       activeCard = null;
      //  alert('nah');
    }
  }




}
// Should we assaign the rendering pick
function handleFlip(e){

  //On click we want to show the new image

  const card = document.getElementById(e.target.id);
  for(let i = 0; i < allCards.length; i++){ // Loops through card array 
    if(allCards[i].name === e.target.id){
     
      e.target.setAttribute("src", allCards[i].image);
    }
  }

  matched(e.target.id);

  // console.log(allCards)
  // card.setAttribute("src")

  // gameState.playerHand.push(this);
  // this.classList.add('flipped');
  // this.classList.toggle('flipped');
  // if(gameState.playerHand.length === 2){
  //   setTimeout(matched, 250);
  // }
  // event.preventDefault();
  // let cardStack = this.getAttribute('id');
  // let revealed = this.getAttribute('data-revealed');
  // revealed = true;
  // gameState.playerHand.push(allCards[cardStack]);
  // this.setAttribute('src', allCards[cardStack].image);
  // if(gameState.playerHand.length === 2){
  //   setTimeout(matched, 250);
  // }else{

  // }
}
console.log(gameState.playerHand);


//  <<< ---- Notes Below ---- >>>

// <--------   below code kinda works but is buggy    -------->
// for(let i=0; i<allCards.length; i++){
//   let randomIndex = getRandomIndex();
//   let selectedCard = allCards[randomIndex];
//   let cardsGenerated = [];
//   if(cardsGenerated.includes(selectedCard)){
//     buildCard(allCards[getRandomIndex()]);
//   }else{
//     cardsGenerated.push(selectedCard);
//     cardsContainer.appendChild(buildCard(allCards[i]));
//   }
// }
// <<--- end of code block---->>>


  // <-------    below code kinda works but is buggy  ----->
  // const randomIndex = Math.floor(Math.random()* cardChoices.length);
  // for(let i=0; i<allCards.length; i++){
  //   const randomCard = allCards[randomIndex];
  //   const renderedCard = buildCard(randomCard);
  //   cardChoices.splice(randomIndex, 1);
  //   cardsContainer.appendChild(renderedCard);
  // }
  // <<--- end of code block---->>>


  // <--------  below code kinda does not yet work  -------->
  // function randomCard(){
  //   for (let i=0; i<allCards; i++){
  //     let image = allCards.at(getRandomIndex());
  //     let card = buildCard(image);
  //     dataList[i].splice(image);
  //     cardsDisplay.appendChild(card);
  //   }
  // }
  // <<--- end of code block---->>>
