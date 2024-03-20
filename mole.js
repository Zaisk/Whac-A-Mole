let currMoleTile;
let currPlantTile;
let score = 0;
let highScore = 0;
let gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    hideMoleAndPlant();
    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    mole.classList.add("mole");

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id === num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    hideMoleAndPlant();
    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";
    plant.classList.add("plant");

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id === num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function hideMoleAndPlant() {
    if (currMoleTile && currMoleTile.firstChild) {
        currMoleTile.firstChild.classList.add("mole-hide");
        setTimeout(() => { currMoleTile.innerHTML = ""; }, 250);
    }
    if (currPlantTile && currPlantTile.firstChild) {
        currPlantTile.firstChild.classList.add("plant-hide");
        setTimeout(() => { currPlantTile.innerHTML = ""; }, 250);
    }
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this === currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score.toString();
    } else if (this === currPlantTile) {
        if (score > highScore) {
            highScore = score;
        }
        document.getElementById("score").innerText = "GAME OVER: Score " + score.toString();
        document.getElementById("highScore").innerText = "High Score: " + highScore.toString();
        gameOver = true;
        document.getElementById("board").onclick = resetGame;
    }
}

function resetGame() {
    gameOver = false;
    score = 0;
    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("highScore").innerText = "High Score: " + highScore.toString();
    document.getElementById("board").onclick = null;
    currMoleTile = null;
    currPlantTile = null;
    let tiles = document.getElementById("board").childNodes;
    tiles.forEach(tile => {
        tile.innerHTML = "";
    });
}
