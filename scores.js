let listofscores = document.getElementById("listofscores");
let allScores;
let returnBtn = document.querySelector(".returnBtn")

// if nothing in localStorage, returns an empty array
if (localStorage.getItem("allScores") === null) {
    allScores = [];
} else {
    allScores = JSON.parse(localStorage.getItem("allScores"));
    console.log(allScores)};
// returns key/value pairs
allScores.map(score => {
    console.log(score);
});
// returns intials and score into list item and joins data into one array
listofscores.innerHTML = allScores.map(score => {
    return `<li class="high-score">${score.initials}-${score.score}</li>`;
}).join("");

// click return button to go back to start of the quiz
returnBtn.addEventListener("click",function(){
    location.href="index.html"
} )




