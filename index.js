const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winningPositions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

initGame();
// lets create a function to initialise the game



function initGame(){
    currPlayer="X";
    gameGrid=["","","","","","","","",""];
    // ui pe bhi empty krna hoga boxes ko
    boxes.forEach((box,index)=>{
        box.innerText="";
        // boxes[index].style.pointerEvents="all";
        box.style.pointerEvents="all";
        // one more thing is missing

        // method1
        // box.classList.remove("win");

        // method2
        box.classList=`box box${index+1}`; // wapis se pehle wale css properties jo thi inki unko reapply kr diya 
        
    });
    // newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currPlayer}`;
}  


boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>handleClick(index));
});

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currPlayer;
        gameGrid[index]=currPlayer;
        boxes[index].style.pointerEvents="none";
        // swap the turn
        swapTurn();
        // check the win conditions
        checkGameOver();
    }

    

}


function swapTurn(){
    if(currPlayer==='X'){
        currPlayer="O";
    }
    else{
        currPlayer="X";
    }

    // ui update
    gameInfo.innerText=`Current Player - ${currPlayer}`;
}

function checkGameOver(){
    // newGameBtn.classList.add("active");
    let ans="";
    // below if conditions checks that all boxes { winning ones } must be non empty and same 
    winningPositions.forEach((position)=>{
        if( (( gameGrid[position[0]]!="" ) && ( gameGrid[position[1]]!="" ) && ( gameGrid[position[2]]!="" )) && ( (gameGrid[position[0]]==gameGrid[position[1]]) &&  (gameGrid[position[1]]==gameGrid[position[2]])   ) ){

            // who is the winner ?
            if(gameGrid[position[0]]=='X'){
                ans='X';
            }
            else{
                ans='O';
            }

            // now the winner is known , I need to display the boxes of winning positions as green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");


        }
    });


    // winner exists
    if(ans!=''){
        gameInfo.innerText="Winner Player - " + `${ans}`;
        boxes.forEach((box,index)=>{
            box.style.pointerEvents="none";
        });
        return;
    }

    // game tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=""){
            fillCount++;
        }
    });

    if(fillCount==9 && ans==""){
        gameInfo.innerText="Game Tied";
    }




}

newGameBtn.addEventListener("click",initGame);



