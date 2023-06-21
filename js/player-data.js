'use strict';

let startForm = document.getElementById('startGameForm');
let allPlayers = [];

function Player(user, setScore){
  this.user = user;
  this.moves =0;
  this.setScore = setScore;
  allPlayers.push(this);
}
new Player('Genevieve', 16);
new Player('Drew', 20);
new Player('Justin', 22);
new Player('Ari', 25);

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

startForm.addEventListener('submit', handleClick);
