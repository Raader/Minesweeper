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
let height;
let width;
let mineCount;
let mineSweeper;

function InitGame() {

    if (parseInt(mineInput.value) > (heightInput.value * widhtInput.value)) {
        alert("can't generate more than width * height mines");
        return
    } else if ((heightInput.value < parseInt(heightInput.min) || heightInput.value > parseInt(heightInput.max)) ||
        (widhtInput.value < parseInt(widhtInput.min) || widhtInput.value > parseInt(widhtInput.max)) ||
        (mineInput.value < parseInt(mineInput.min) || mineInput.value > parseInt(mineInput.max))) {
        //alert(`field must be at least ${heightInput.min} tall and ${widhtInput.min} wide`);
        alert(`values must be within these ranges.
            width:${widhtInput.min}-${widhtInput.max} 
            height:${heightInput.min}-${heightInput.max} 
            mine count:${mineInput.min}-${mineInput.max}`);
        return;
    }
    mineSweeper = null;
    height = parseInt(heightInput.value);
    width = parseInt(widhtInput.value);
    mineCount = parseInt(mineInput.value);
    generateButtons(heightInput.value, widhtInput.value, gTable);

    function onGameOver(result) {
        const delay = 250;

        function showMines() {
            for (let row = 0; row < mineSweeper.height; row++) {
                for (let col = 0; col < mineSweeper.widht; col++) {
                    if (mineSweeper.cells[row][col].isMine) {
                        buttons[row][col].disabled = "disabled";
                        buttons[row][col].innerHTML = "💣";
                        buttons[row][col].style.backgroundColor = "#EC7063";
                    }
                }
            }
        }

        if (result) {
            showMines();
            setTimeout(() => {
                modal.style.display = "block";
                modalText.innerHTML = "Lose";
            }, delay);
        } else {
            setTimeout(() => {
                modal.style.display = "block";
                modalText.innerHTML = "Win";
            }, delay);
        }
    }

    function onCellOpen(row, col, text) {
        let button = buttons[row][col];
        button.innerHTML = text;
        const colors = ["Blue", "orange", "red"]
        const cIndex = parseInt(text) - 1;
        let color = cIndex != NaN && cIndex < colors.length ? colors[cIndex] : "black";
        button.style.color = color;
        if (mineSweeper.cells[row][col].isMine) {
            button.style.backgroundColor = "#EC7063";
        }
        button.disabled = "disabled";
    }

    for (let row = 0; row < heightInput.value; row++) {
        for (let col = 0; col < widhtInput.value; col++) {
            buttons[row][col].addEventListener("click", () => {
                console.log("click");
                if (mineSweeper) {
                    mineSweeper.openButton(row, col);
                } else {
                    mineSweeper = new MineSweeper(width, height, mineCount, onGameOver, onCellOpen, {
                        row: row,
                        col: col
                    });
                    mineSweeper.openButton(row, col);
                }
            });
            buttons[row][col].addEventListener("contextmenu", (e) => {
                e.preventDefault();
                buttons[row][col].innerHTML = buttons[row][col].innerHTML === "🚩" ? "" : "🚩";
                return false;
            }, false);
        }
    }

}

function changeInputValues(width, height, mineCount) {
    heightInput.value = height;
    widhtInput.value = width;
    mineInput.value = mineCount;
}
const easyButton = document.querySelector("#easy");
const normalButton = document.querySelector("#normal");
const hardButton = document.querySelector("#hard");
const extremeButton = document.querySelector("#extreme");
generateButton.addEventListener("click", InitGame);
easyButton.addEventListener("click", () => {
    changeInputValues(9, 9, 10)
});
normalButton.addEventListener("click", () => {
    changeInputValues(16, 16, 40)
});
hardButton.addEventListener("click", () => {
    changeInputValues(30, 16, 99)
});
extremeButton.addEventListener("click", () => {
    changeInputValues(widhtInput.max, heightInput.max, mineInput.max)
});
InitGame();

const modal = document.querySelector("#gameOverMenu");
const modalText = document.querySelector("#modal-text");
const retryButton = document.querySelector("#retryButton");
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
        InitGame();
    }
}
retryButton.addEventListener("click", () => {
    modal.style.display = "none";
    InitGame()
})