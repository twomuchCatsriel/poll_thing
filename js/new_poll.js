// Useful Elements
const pollArea = document.getElementById("pollArea");
const resultsArea = document.getElementById("results");

// Options 
const options = document.getElementsByClassName("options");


// results 
const percentYes = document.getElementById("percentYes");
const percentNo = document.getElementById("percentNo");
const percentMaybe = document.getElementById("percentMaybe");

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
    if(ans === "Ja"){
        points[0] += 1;
    } 
    else if (ans === "Nei"){
        points[1] += 1;
    }
    else if (ans === "Kanskje"){
        points[2] += 1;
    }

    fetch("http://192.168.167.15:3000/votes", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: ans.JSON
    })
    .then(response => response.json())
    .then(response => console.log(JSON.stringify(response)))

    let total = (points[0] + points[1] + points[2]);
    percentYes.innerHTML = Math.floor((points[0]/total) * 100);
    percentNo.innerHTML = Math.floor((points[1]/total) * 100);
    percentMaybe.innerHTML = Math.floor((points[2]/total) * 100);
}

for(let i = 0; i < options.length; i++){ // register clicks 
    options[i].addEventListener("click", () => {
        answer = options[i].innerHTML;
        addPointsAndSubmit(answer);
        showResults();
        console.log(answer); //debug
    })
}