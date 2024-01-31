/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

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
            '<h1>' + gameName + '</h1>' +
            '<p>' + gameDesc + '</p>' +
            '<img src="' + gameImg + '" class="game-img"/>';

        gamesContainer.append(div);
    }
}
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
const totalBackers = GAMES_JSON.reduce((total, game) => { return total + game.backers }, 0);
contributionsCard.innerHTML = totalBackers.toLocaleString('en-US')
const raisedCard = document.getElementById("total-raised");
const totalPledged = GAMES_JSON.reduce((total, game) => { return total + game.pledged }, 0);
raisedCard.innerHTML = '$' + totalPledged.toLocaleString('en-US');

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

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter((game) => game.pledged >= game.goal);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

allButton.addEventListener('click', showAllGames);
unfundedBtn.addEventListener('click', filterUnfundedOnly);
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
let displayUnfunded = 'A total of $'+totalPledged.toLocaleString()+' has been raised. Currently '+unfundedGames.length +' games remain unfunded. we need your help to fund these amazing games!';

// create a new DOM element containing the template string and append it to the description container
descriptionContainer.append(displayUnfunded);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element

var firstPlace = document.createElement('div');
firstPlace.className = 'game-card';
firstPlace.innerHTML = 
    '<h1>'+first.name+'</h1>'+
    '<p>'+first.description+'</p>'+
    '<img src="'+first.img+'" class="game-img"/>';
firstGameContainer.append(firstPlace);
// do the same for the runner up item
var secondPlace = document.createElement('div');
secondPlace.className = 'game-card';
secondPlace.innerHTML = 
    '<h1>'+second.name+'</h1>'+
    '<p>'+second.description+'</p>'+
    '<img src="'+second.img+'" class="game-img"/>';
secondGameContainer.append(secondPlace);