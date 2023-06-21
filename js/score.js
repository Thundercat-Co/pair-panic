'use strict';
// send all player array back to local storage with a new key
// get data from local storage
// use a loop to append to scores.html
// possibly display in order of who did the best using .sort() array method?

let userData = [];

function retrieveData(){
  let prevDataArr = localStorage.getItem('playerDataArr');
  let newDataArr = JSON.parse(prevDataArr);
  for(let i=0; i<newDataArr.length; i++){
    userData.push(newDataArr[i]);
    console.log(userData);
  }
}
retrieveData();
