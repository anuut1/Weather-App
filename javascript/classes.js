 const url="https://cat-fact.herokuapp.com/facts";
//  let promise=fetch(url);
//  console.log(promise);
let factpara=document.querySelector(".f");
let but=document.querySelector("#but")
const getFacts= async()=>{
    let response=await fetch(url);
    console.log(response);
    let data=await response.json();
    factpara.innerText=data[0].text;
}
but.addEventListener("click",getFacts);

//ajax is asynchronous js and xml
//json is javascript object notation

