function generateButtons(height, widht, mineCount, table) {
    table.innerHTML = "";
    console.log("generating");
    for (let i = 0; i < height; i++) {
        gTable.insertRow();
        for (let t = 0; t < widht; t++) {
            let button = document.createElement("button");
            button.innerHTML = "";
            button.className = "game-button";
            let cell = gTable.rows[i].insertCell();
            cell.appendChild(button);
        }
    }
}

function InitGame() {
    generateButtons(heightInput.value, widhtInput.value, 0, gTable);
}
let gTable = document.getElementsByClassName("game-table")[0];
const heightInput = document.querySelector("#heightInput");
const widhtInput = document.querySelector("#widhtInput");
const generateButton = document.getElementById("generateButton");


generateButton.addEventListener("click", InitGame);
InitGame();