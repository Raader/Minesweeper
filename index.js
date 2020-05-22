const buttons = [];

function generateButtons(height, widht, table) {
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
    if (parseInt(mineInput.value) > (heightInput.value * widhtInput.value)) {
        alert("can't generate more than width * height mines");
        return
    } else if (heightInput.value < heightInput.min || widhtInput.value < widhtInput.min) {
        alert("field must be at least 1 row and 1 column");
        return;
    }
    generateButtons(heightInput.value, widhtInput.value, gTable);

    function onGameOver(result) {
        if (result) {
            alert("Lose");
            InitGame();
        } else {
            alert("win");
            InitGame();
        }
    }

    function onCellOpen(row, col, text) {
        let button = buttons[row][col];
        button.innerHTML = text;
        const colors = ["Blue", "orange", "red"]
        const cIndex = parseInt(text) - 1;
        let color = cIndex != NaN && cIndex < colors.length ? colors[cIndex] : "black";
        button.style = `border: 0; color: ${color}`;
        button.disabled = "disabled";
    }
    mineSweeper = new MineSweeper(widhtInput.value, heightInput.value, parseInt(mineInput.value), onGameOver, onCellOpen);
    for (let row = 0; row < mineSweeper.height; row++) {
        for (let col = 0; col < mineSweeper.widht; col++) {
            buttons[row][col].addEventListener("click", () => {
                mineSweeper.openButton(row, col)
            })
        }
    }
}

generateButton.addEventListener("click", InitGame);
InitGame();