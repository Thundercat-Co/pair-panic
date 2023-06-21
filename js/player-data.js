'use strict';

let startForm = document.getElementById('startGameForm');
let allPlayers = [];

function Player(user, setScore){
  this.user = user;
  this.moves =0;
  this.setScore = setScore;
  allPlayers.push(this);
}
// Player.prototype.loadPlayers = function(){
//   let previousPlayerArray = localStorage.getItem('playerArray');
//   let reconstructedPlayer;
//   previousPlayerArray = JSON.parse(previousPlayerArray);
//   for(let i = 0; i<previousPlayerArray.length; i++){
//     reconstructedPlayer = new Player(previousPlayerArray[i].user);
//     reconstructedPlayer.moves = previousPlayerArray[i].moves;
//     reconstructedPlayer.setScore = previousPlayerArray[i].setScore;
//     this.allPlayers.push(reconstructedPlayer);
//   }
//   return;
// };

function handleClick(event){
  let name = event.target.name.value;
  let oldArray = localStorage.getItem('playerArray');
  if(oldArray){
    allPlayers = JSON.parse(oldArray);
  }
  new Player(name);
  let allPlayersString = JSON.stringify(allPlayers);
  localStorage.setItem('playerArray', allPlayersString);
  event.preventDefault();
}
new Player('Genevieve', 16);
new Player('Drew', 20);
new Player('Justin', 22);
new Player('Ari', 25);

startForm.addEventListener('submit', handleClick);
// startButton.addEventListener('submit', handleSubmit)
// So we don't get confused: SSGP
//  stringify ---> js to local storage/JSON
//  parse -------> local storage/JSON to js
// JSON.stringify() A common use of JSON is to exchange data to/from a web server.
// When sending data to a web server, the data has to be a string. 
//Convert a JavaScript object into a string with JSON.stringify()