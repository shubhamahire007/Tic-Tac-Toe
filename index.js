const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winnningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//func to start game
function initGame() {
    currPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player -  ${currPlayer} `;
}
initGame();

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currPlayer;
        boxes[index].style.pointerEvents = "none";
        gameGrid[index] = currPlayer;
        SwapPlayer();
        checkGameOver();
    }
}

function SwapPlayer() {
    if (currPlayer === "X") {
        currPlayer = "O";
    }
    else {
        currPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currPlayer} `;
}

function checkGameOver() {
    let ans = "";
    winnningPositions.forEach((position) => {
        // all 3 boxes should be non empty and exactly same in value (X/O)
        // if ((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "") &&
        //     (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]])) {
        if((gameGrid[position[0]] == "X" && gameGrid[position[1]] == "X" && gameGrid[position[2]] == "X") ||
            gameGrid[position[0]] == "O" && gameGrid[position[1]] == "O" && gameGrid[position[2]] == "O") 
        { 
            if (gameGrid[position[0]] === "X")
                ans = "X";
            else
                ans = "O";
            //disable pointer
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if (ans !== "") {
        newGameBtn.classList.add("active");
        gameInfo.innerText = `Winner Player - ${ans}`;
        return;
    }
    
    //check weather game is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++;
    });
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener("click", initGame);