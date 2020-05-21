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


class MineSweeper {
    constructor(width, height, mineCount, buttons) {
        this.init(width, height, mineCount, buttons);
    }

    initButtons = () => {
        for (let row = 0; row < this.height; row++) {
            this.cells[row] = [];
            for (let col = 0; col < this.widht; col++) {
                this.cells[row][col] = {
                    row: row,
                    col: col,
                    isMine: false,
                    mineCount: 0,
                    neighbors: [],
                    open: false
                };
                let button = this.buttons[row][col];
                button.addEventListener("click", () => {
                    this.openButton(button, row, col);
                });
            }
        }
    }

    placeMines = () => {
        const grids = [];
        while (true) {
            let index = Math.floor((Math.random() * (this.height * this.widht)));
            if (!grids.includes(index)) {
                grids.push(index);
            }
            if (grids.length === this.mineCount) {
                break;
            }
        }
        for (let grid of grids) {
            let row = Math.floor(grid / this.widht);
            let col = grid % parseInt(this.widht);
            this.cells[row][col].isMine = true;
        }
    }
    calculateMines = () => {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.widht; col++) {
                let cell = this.cells[row][col];
                if (cell.isMine) {
                    continue;
                }
                let count = 0;
                let neighbors = [
                    this.cells[row + 1] ? this.cells[row + 1][col] : undefined,
                    this.cells[row] ? this.cells[row][col + 1] : undefined,
                    this.cells[row + 1] ? this.cells[row + 1][col + 1] : undefined,
                    this.cells[row - 1] ? this.cells[row - 1][col] : undefined,
                    this.cells[row] ? this.cells[row][col - 1] : undefined,
                    this.cells[row - 1] ? this.cells[row - 1][col - 1] : undefined,
                    this.cells[row + 1] ? this.cells[row + 1][col - 1] : undefined,
                    this.cells[row - 1] ? this.cells[row - 1][col + 1] : undefined,
                ]
                for (let neighbor of neighbors) {
                    if (neighbor) {
                        cell.neighbors.push(neighbor);
                        if (neighbor.isMine) {
                            count++;

                        }
                    }
                }
                cell.mineCount = count;
            }
        }
    }

    openButton = (button, row, col) => {
        button.style = "border: 0";
        button.disabled = "disabled";
        this.cells[row][col].open = true;
        if (this.cells[row][col].isMine) {
            button.innerHTML = "X";
        } else {
            button.innerHTML = this.cells[row][col].mineCount === 0 ? "" : this.cells[row][col].mineCount;
            let cell = this.cells[row][col];
            if (cell.mineCount === 0) {
                for (let neighbor of cell.neighbors) {
                    let b = this.buttons[neighbor.row][neighbor.col];
                    if (!neighbor.isMine && !neighbor.open) {
                        this.openButton(b, neighbor.row, neighbor.col);
                    }
                }
            }
        }

        //this.play(row, col);
    }

    play = (row, col) => {
        console.log(this.cells[row][col]);
    }

    init(width, height, mineCount, buttons) {
        this.widht = width;
        this.height = height;
        this.mineCount = mineCount;
        this.cells = [];
        this.buttons = buttons;
        this.initButtons();
        this.placeMines();
        this.calculateMines();
    }
}
let mineSweeper;

function InitGame() {
    generateButtons(heightInput.value, widhtInput.value, mineInput.value, gTable);
    mineSweeper = new MineSweeper(widhtInput.value, heightInput.value, 40, buttons);
}
generateButton.addEventListener("click", InitGame);
InitGame();