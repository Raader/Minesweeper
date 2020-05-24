class MineSweeper {
    constructor(width, height, mineCount, gameOverCallback, onCellOpen, forbiddenCell) {
        this.widht = width;
        this.height = height;
        this.mineCount = mineCount;
        this.cells = [];
        this.gameOverCallback = gameOverCallback;
        this.openCellCount = 0;
        this.gameOver = false;
        this.onCellOpen = onCellOpen;
        this.forbiddenCell = forbiddenCell;
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
            }
        }
    };
    placeMines = () => {
        const indexes = [];
        const fb = this.forbiddenCell.row * this.height + this.forbiddenCell.col;
        const fbRow = this.forbiddenCell.row;
        const fbCol = this.forbiddenCell.col;
        const fbs = [fb];
        const fcs = [this.forbiddenCell]
        this.getNeighbors(fbRow, fbCol).forEach((item) => {
            if (item) {
                fbs.push((item.row * this.height) + item.col);
            }
        });
        this.getNeighbors(fbRow, fbCol).forEach((item) => {
            fcs.push(item);
        })
        console.log(fcs);
        const placeMine = () => {
            function check(row, col) {
                for (let cl of fcs) {
                    if (cl.row === row && cl.col === col) {
                        return true;
                    }
                }
                return false;
            }
            while (true) {
                let index = Math.floor(Math.random() * (this.height * this.widht));
                let row = Math.floor(index / parseInt(this.widht));
                let col = index % parseInt(this.widht);
                if (((this.widht * this.height) - this.mineCount > 8) && check(row, col)) {
                    continue;
                }
                if (!this.cells[row][col].isMine) {
                    this.cells[row][col].isMine = true;
                    break;
                }
            }
        }
        for (let i = 0; i < this.mineCount; i++) {

            placeMine();
        }
        //console.log(this.forbiddenCell);
        //console.log(this.getNeighbors(fbRow, fbCol));

    };
    getNeighbors = (row, col) => {
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
        return neighbors;
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
    openButton = (row, col) => {
        this.cells[row][col].open = true;
        if (this.cells[row][col].isMine) {
            this.onCellOpen(row, col, "💣")
            this.gameOver = true;
            this.gameOverCallback(true);
            return;
        } else {
            this.openCellCount++;
            this.onCellOpen(row, col, this.cells[row][col].mineCount === 0 ? "" : this.cells[row][col].mineCount);
            let cell = this.cells[row][col];
            if (cell.mineCount === 0) {
                for (let neighbor of cell.neighbors) {
                    if (!neighbor.isMine && !neighbor.open) {
                        this.openButton(neighbor.row, neighbor.col);
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