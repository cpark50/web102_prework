/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)
// console.log(GAMES_JSON);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
      var gameName = games[i].name;
      var gameDesc = games[i].description;
      var gameImg = games[i].img;
      var div = document.createElement('div');
      div.className = 'game-card';
      div.innerHTML = 
          '<h1>'+gameName+'</h1>'+
          '<p>'+gameDesc+'</p>'+
          '<img src="'+gameImg+'" class="game-img"/>';
      gamesContainer.append(div);
    }
        // create a new div element, which will become the game card
        // add the class game-card to the list
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        // append the game to the games-container

}

addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const totalBackers = GAMES_JSON.reduce((total, game) => {return total + game.backers}, 0);
// use reduce() to count the number of total contributions by summing the backers
contributionsCard.innerHTML = totalBackers.toLocaleString('en-US')
// set the inner HTML using a template literal and toLocaleString to get a number with commas
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((total, game) => {return total + game.pledged}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = '$'+totalPledged.toLocaleString('en-US');
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = totalGames.toLocaleString('en-US');

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);
    addGamesToPage(unfundedGames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);
  addGamesToPage(fundedGames);


}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}
const allButton = document.getElementById("all-btn");
allButton.addEventListener('click', showAllGames);
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener('click', filterUnfundedOnly);
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener('click', filterFundedOnly);


// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);


// create a string that explains the number of unfunded games using the ternary operator
//A total of $100,000 has been raised. Currently 1 game remains unfunded. we need your help to fund these amazing games!
let displayUnfunded = 'A total of $'+totalPledged.toLocaleString()+' has been raised. Currently '+unfundedGames.length +' games remain unfunded. we need your help to fund these amazing games!';
console.log(displayUnfunded);
descriptionContainer.append(displayUnfunded);

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [first, second, ...rest] = sortedGames;
console.log(first);
console.log(second);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstName = first.name;
const secondName = second.name;
console.log(firstName);
console.log(secondName);
// do the same for the runner up item