let gTable = document.getElementsByClassName("game-table")[0];
for (let i = 0; i < 16; i++) {
    gTable.insertRow();
    for (let t = 0; t < 16; t++) {
        let button = document.createElement("button");
        button.innerHTML = "";
        button.className = "game-button";
        let cell = gTable.rows[i].insertCell();
        cell.appendChild(button);
    }
}