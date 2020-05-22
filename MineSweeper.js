class MineSweeper {
    constructor(width, height, mineCount, buttons, gameOverCallback, onCellOpen) {
        this.widht = width;
        this.height = height;
        this.mineCount = mineCount;
        this.cells = [];
        this.buttons = buttons;
        this.gameOverCallback = gameOverCallback;
        this.openCellCount = 0;
        this.gameOver = false;
        this.onCellOpen = onCellOpen;
        this.initButtons();
        this.placeMines();
        this.calculateMines();
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
    };
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
    };
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
                ];
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
    };
    openButton = (button, row, col) => {
        this.cells[row][col].open = true;
        if (this.cells[row][col].isMine) {
            this.onCellOpen(row, col, "X")
            this.gameOver = true;
            this.gameOverCallback(true);
            return;
        } else {
            this.openCellCount++;
            this.onCellOpen(row, col, this.cells[row][col].mineCount === 0 ? "" : this.cells[row][col].mineCount);
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
        if (this.openCellCount >= (this.widht * this.height) - this.mineCount && !this.gameOver) {
            this.gameOver = true;
            this.gameOverCallback(false);
        }
    };
    play = (row, col) => {
        console.log(this.cells[row][col]);
    };
}