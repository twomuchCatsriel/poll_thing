// Useful Elements
const pollArea = document.getElementById("pollArea");
const submitButton = document.getElementById("submitButton");
const resultsArea = document.getElementById("results");
const errorMessage = document.getElementById("errorP");

// Options 
const options = document.getElementsByClassName("options");

// Function Definitions
function returnSelectedOption()
{
    for(let i = 0; i < options.length; i++){ // Loop through the options list
        const currentOption = options[i];

        if(options[i].checked){
            return currentOption;
        }
    }
}

function ShowError(state){
    if(state === false){
        errorMessage.style.display = "none";
    } else {
        errorMessage.style.display = "inline";
    }
}

function cancelTimer()
{
    clearTimeout(errorTimeOut);
    ShowError(false);
}

// Global Variables
let errorTimeOut;

// Run 
submitButton.addEventListener("click", () => { // Submit
    const answer = returnSelectedOption();
    if(answer !== undefined){
        console.log(answer.value);
        resultsArea.style.display = "inline"
        pollArea.style.display = "none";
        cancelTimer();
    } else {
        cancelTimer();
        ShowError(true);
        errorTimeOut = setTimeout(ShowError, 5000, false);
    }
})