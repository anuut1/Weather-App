// let but=document.querySelector('#btn1');
// but.onclick=(evt)=>{
//     // console.log(evt);
//     // console.log(evt.type);
//     // console.log(evt.target);
//     // console.log(evt.clientX,evt.clientY);//building game

//     btn1.addEventListener('click',()=>{
//         console.log("button 1 was clicked-handler 1");
//     })
//     // btn1.addEventListener('click' ,()=>{
//     //     console.log("button1 was clicked-handler2");
        
//     // })
//     const handler3=()=>{
//         console.log("button1 was clicked-handler2");
        
//     };

    
//     btn1.removeEventListener('click',handler3);
// }
// let div=document.querySelector('div');
// div.onmouseover=(e)=>{
    
//     console.log("you are inside div");
// }

//toggle button
let butt=document.querySelector("#but1");
let Currmode='Light';
butt.addEventListener('click',()=>{
    if(Currmode==='Light'){
        Currmode='Dark';
        document.querySelector("body").style.backgroundColor="black";
    }else{
        Currmode='Light';
        document.querySelector("body").style.backgroundColor="white";
    }
    console.log(Currmode);
})


