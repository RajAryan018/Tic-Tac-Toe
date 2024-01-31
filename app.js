let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const duck = document.getElementById("winner");

let turnO = true;  // playerX, playerO
let clickCount = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    for(let pattern of winPatterns) {
       

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val ) {
                // console.log("Winner", pos1Val);
                boxes[pattern[0]].classList.remove("win");
                boxes[pattern[1]].classList.remove("win");
                boxes[pattern[2]].classList.remove("win");
            }     
        }
    }
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}



boxes.forEach((box) => {
    box.addEventListener("click",() => {
        // console.log("box was clicked");
        if(turnO) { //playerO
            box.innerText = "O";
            box.style.color = "#b0413e";
            turnO =false;
        }
        else { //playerX
            box.innerText = "X";
            box.style.color = "#05299E";
            turnO =true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    duck.style.opacity = "1";
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = `Sorry, It Was a Tie!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(
        //     boxes[pattern[0]].innerText, 
        //     boxes[pattern[1]].innerText, 
        //     boxes[pattern[2]].innerText
        //     );

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val ) {
                // console.log("Winner", pos1Val);
                showWinner(pos1Val);
                boxes[pattern[0]].classList.add("win");
                boxes[pattern[1]].classList.add("win");
                boxes[pattern[2]].classList.add("win");
            }     
        }
    }

    let countb;
    boxes.forEach((box) => {
        if(box!="") {
            countb++;
        }
    });
    if(countb === "9") {
        showDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);



