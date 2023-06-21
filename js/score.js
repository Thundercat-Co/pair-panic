'use strict';
// send all player array back to local storage with a new key
// get data from local storage
// use a loop to append to scores.html
// possibly display in order of who did the best using .sort() array method?

let userData = [];
let scoresList = document.getElementById('scores');

function retrieveData(){
  let prevDataArr = localStorage.getItem('playerDataArr');
  let newDataArr = JSON.parse(prevDataArr);
  for(let i=0; i<newDataArr.length; i++){
    userData.push(newDataArr[i]);
  }
}
retrieveData();

function displayDummies(){
  for(let i=0; i<4; i++){
    let listItem = document.createElement('li');
    listItem.textContent = `${userData[i].name}............................................${userData[i].setScore}`;
    scoresList.appendChild(listItem);
  }
  
}
console.log(userData);

// live server http://127.0.0.1:5500/