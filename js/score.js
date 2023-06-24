'use strict';
let userData = [];
let scoresList = document.getElementById('scores');

function retrieveData(){ // Retieves player data from local storage
  let prevDataArr = localStorage.getItem('playerArr');
  let newDataArr = JSON.parse(prevDataArr);
  for(let i=0; i<newDataArr.length; i++){
    userData.push(newDataArr[i]);
  }
}
retrieveData();

function displayScores(){ //Displays player name and score on score board
  for(let i=0; i<4; i++){
    let listItem = document.createElement('li');
    listItem.textContent = `${userData[i].user}............................................${userData[i].setScore}`;
    scoresList.appendChild(listItem);
  }
  for(let i=4; i<userData.length; i++){
    let listItem = document.createElement('li');
    listItem.textContent = `${userData[i].user}............................................${userData[i].moves}`;
    scoresList.appendChild(listItem);
  }

}
displayScores();

console.log(userData);
