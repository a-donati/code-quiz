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

let tableHeading = `<tr>
<th>Initials</th>
<th>Score</th>
</tr>`
listofscores.innerHTML = tableHeading;
// for each person and score, returns a table row with the inserted data
allScores.forEach(person => {
    let tableRow = document.createElement("tr"); 
    tableRow.innerHTML = `<td>${person.initials}</td><td>${person.score}</td>`;
    listofscores.appendChild(tableRow);
 })

// click return button to go back to start of the quiz
returnBtn.addEventListener("click",function(){
    location.href="index.html"
} )




