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
const generateButton = document.getElementById("generateButton");

function InitGame() {
    generateButtons(heightInput.value, widhtInput.value, 0, gTable);
}
generateButton.addEventListener("click", InitGame);
InitGame();

class MineSweeper {
    constructor(width, height, mineCount, buttons) {
        this.widht = width;
        this.height = height;
        this.mineCount = mineCount;
        this.cells = [];
        this.buttons = buttons;
        this.initButtons();
    }

    initButtons = () => {
        for (let row = 0; row < this.height; row++) {
            this.cells[row] = [];
            for (let col = 0; col < this.widht; col++) {
                this.cells[row][col] = {
                    row: row,
                    col: col,
                    isMine: false,
                    mineCount: 0
                };
                let button = this.buttons[row][col];
                button.addEventListener("click", () => {
                    this.openButton(button, row, col);
                });
            }
        }
    }

    placeMines() {
        const grids = [];
        while (true) {
            let row = Math.floor((Math.random() * this.height) + 1);
            let col = Math.floor((Math.random() * this.widht) + 1);
            let grid = {
                row: row,
                col: col
            }
            if (!grids.includes(grid)) {
                grids.push(grid);
            }
            if (grids.length === this.mineCount) {
                break;
            }
        }
        grids.forEach((item) => {
            this.cells[item.row][item.col].isMine = true;
        });
        console.log(this.cells);
    }


    openButton = (button, row, col) => {
        button.style = "border: 0";
        button.disabled = "disabled";
        this.play(row, col);
    }

    play = (row, col) => {
        console.log(this.cells[row][col]);
    }
}

const mineSweeper = new MineSweeper(widhtInput.value, heightInput.value, 0, buttons);