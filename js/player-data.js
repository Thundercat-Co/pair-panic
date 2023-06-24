'use strict';

let startForm = document.getElementById('startGameForm');
let allPlayers = [];

// Constructs player object
function Player(user, setScore){ 
  this.user = user;
  this.moves =0;
  this.setScore = setScore;
  allPlayers.push(this);
}

// Dummy data - players
new Player('Genevieve', 16);
new Player('Drew', 20);
new Player('Justin', 22);
new Player('Ari', 25);

// Instantiates new player object when user inputs their name, then directs user to game page
function handleClick(event){
  let name = event.target.name.value;
  let oldArray = localStorage.getItem('playerArr');
  if(oldArray){
    allPlayers = JSON.parse(oldArray);
  }
  new Player(name);
  let allPlayersString = JSON.stringify(allPlayers);
  localStorage.setItem('playerArr', allPlayersString);
  event.preventDefault();
}

startForm.addEventListener('submit', handleClick);
