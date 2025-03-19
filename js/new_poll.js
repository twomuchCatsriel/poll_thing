// Useful Elements
const pollArea = document.getElementById("pollArea");
const resultsArea = document.getElementById("results");

// Options 
const options = document.getElementsByClassName("options");

// results 
const percentYes = document.getElementById("percentYes");
const percentNo = document.getElementById("percentNo");
const percentMaybe = document.getElementById("percentMaybe");

const totalYes = document.getElementById("totalYes");
const totalNo = document.getElementById("totalNo");
const totalMaybe = document.getElementById("totalMaybe");

// Global Variales 
let answer;

let points = [
    0, // Ja
    0, // Nei
    0, // Kanskje
]
// functions
function showResults()
{
    pollArea.style.display = "none";
    resultsArea.style.display = "inline";
}
  
function addPointsAndSubmit(ans){ // this is also mostly a placeholder 
    let idNum;
    if(ans === options[0].innerHTML){
        idNum = "A";
    } 
    else if (ans === options[1].innerHTML){
        idNum = "B";
    }
    else if (ans === options[2].innerHTML){
        idNum = "C";
    }

    let idObj = {
        answerId: idNum
    }

    console.log(JSON.stringify(idObj))

    fetch("http://192.168.167.15:3000/vote", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(idObj)
    })
    .then((response) => response.json())
    .then((json) => {
        points[0] = json.message.answers.find(answer => answer.id === "A").votes;
        points[1] = json.message.answers.find(answer => answer.id === "B").votes;
        points[2] = json.message.answers.find(answer => answer.id === "C").votes;

        totalYes.innerHTML = points[0];
        totalNo.innerHTML = points[1];
        totalMaybe.innerHTML = points[2];

        let total = (points[0] + points[1] + points[2]);
        percentYes.innerHTML = Math.floor((points[0]/total) * 100);
        percentNo.innerHTML = Math.floor((points[1]/total) * 100);
        percentMaybe.innerHTML = Math.floor((points[2]/total) * 100);

        localStorage.setItem("hasAnswered", "true")
    });
}

for(let i = 0; i < options.length; i++){ // register clicks 2
    options[i].addEventListener("click", () => {
        answer = options[i].innerHTML;

        addPointsAndSubmit(answer)
        showResults();
        console.log(answer); //debug
    })
}