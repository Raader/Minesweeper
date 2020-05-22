const buttons = [];

function generateButtons(height, widht, mineCount, table) {
    table.innerHTML = "";
    console.log("generating");
    for (let i = 0; i < height; i++) {
        gTable.insertRow();
        buttons[i] = [];
        for (let t = 0; t < widht; t++) {
            let button = document.createElement("button");
            button.innerHTML = "";
            button.className = "game-button";
            buttons[i][t] = button;
            let cell = gTable.rows[i].insertCell();
            cell.appendChild(button);
        }
    }
}



let gTable = document.getElementsByClassName("game-table")[0];
const heightInput = document.querySelector("#heightInput");
const widhtInput = document.querySelector("#widhtInput");
const mineInput = document.querySelector("#mineInput");
const generateButton = document.getElementById("generateButton");


let mineSweeper;

function InitGame() {
    generateButtons(heightInput.value, widhtInput.value, mineInput.value, gTable);
    mineSweeper = new MineSweeper(widhtInput.value, heightInput.value, parseInt(mineInput.value), buttons, (result) => {
        if (result) {
            alert("Lose");
            InitGame();
        } else {
            alert("win");
            InitGame();
        }
    });
}
generateButton.addEventListener("click", InitGame);
InitGame();