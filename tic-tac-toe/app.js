let boxes=document.querySelectorAll('.box');
let re=document.querySelectorAll('.reset');
let turnO=true;
let newgamebutt=document.querySelector(".new");
let message=document.querySelector(".message");
let msg=document.querySelector("#message");
const winning=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
const resetGame=()=>{
    turnO=true;
    enableBoxes();
    message.classList.add("hide");
}
boxes.forEach((box)=>{
    box.addEventListener('click',()=>{
        if(turnO){
            box.innerText="O";
            turnO=false;
        }else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    })
})
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const showWinner=(winner)=>{
    msg.innerText=`Congratulations, winner is ${winner}`;
    message.classList.remove("hide");
    disableBoxes();
}
const checkWinner=()=>{
    for(pattern of winning){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1 !="" && pos2 !="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                showWinner(pos1);
            }
        }
        
    }
}
newgamebutt.addEventListener('click',resetGame);
re.addEventListener("click",resetGame);



