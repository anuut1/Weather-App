// console.log("Welcome to first javascript lesson");
// console.log("Hi I'm anushree");//next line me print hota hai
// age=24;
// FullName= "Tony Stark";
// price=99.9;
// console.log(FullName);
// x=null;
// y=undefined;
// console.log(x);

// let name="tony stark";
// let totalPrice=100;
// console.log(totalPrice); 
// console.log(name);

// const student={
//     FullName:"Anushree",
//     age:20,
//     cgpa:8.9,
//     isPass:true

// };
// student["age"]=student["age"]+1;
// console.log(student.age);
// console.log(student["age"]);

// let a=5;
// let b=6;
// console.log(a+b);
// console.log(a**b);//exponent

// alert("hello");
// prompt("Hello");
// for(let i=1;i<=5;i++){
//     console.log("apna college");
// }

//for-of loop
// for(let val of strVar){

// }
// let str="Anushree";
// str.length;
// str[0],str[1]

// let obj={
//     price:900,
//     name:"Anushree"
// };
// let output=`the total price of the object is ${obj.price} and the name of the owner is ${obj.name}`;
// console.log(output);//backticks
//str.slice(start,end)
//str.concat(str2)
//str.replace(old,new)
//str.charAt()


// let fruits=['apple','banana','grapes','nimbu'];
// console.log(fruits.length);

// let items=[250,645,300,900,50];
// let k=0;
// for(let i of items){
//     console.log(`value at ${k} is ${i}`);
//     let offer=val/10;
//     items[k]=items[k]-offer;
//     console.log(`value after offer ${items[i]}`);
//     k++;
// }
//push pop toString concat unshift(add to start) shift(delete from start and return)
//slice(start,end)(no change in original array) splice(add,remove,replace)(start,delcount,newelement)(change in original array)

// function myfunction(){
//     console.log("welcome to function lecture of javascript");
//     console.log("we are learning JS :)");
// }
// myfunction();

//forEach Higher order function  
// "abc".toUpperCase();

// let arr=['Pune','Delhi','Kolkata'];
// arr.forEach(function PrintVal(val){
//     console.log(val);
// });
// arr.forEach((val)=>{
//     console.log(val);
// })

// arr.forEach((val,idx,arr)=>{
//     console.log(val.toUpperCase())
// });

arr=[1,2,3,5,8,9];

// let calSquare=(val)=>{
//     console.log(val**2);
// }

// arr.forEach(calSquare);


//maps create a new array
// let newarr=arr.map((val)=>{
//     return val*2;
// })

// console.log(newarr);

// let newArr=arr.filter((val)=>{
//     if(val%2==0){
//         return val;
//     }
// })
// console.log(newArr);


// const arr1=[1,2,3,4];
// const output=arr1.reduce((result,currentValue) => {
//     // return result+currentValue
//     return result>currentValue ? result : currentValue;
// });
// console.log(output);


// let arr=[97,98,67,89,56,90,99];
// let val=arr.filter((val)=>{
//     return val>90;
// })
//  windows.console.log("hello");
// console.dir(window.document);

// let head=document.getElementById("heading");//h4
// console.dir(head);

// let c=document.getElementsByClassName("para");
// console.dir(c);

// let para=document.getElementsByTagName("p");
// console.dir(para);
 
// let elements=document.querySelector('p');
// console.dir(elements);//fisrt element

// let element=document.querySelectorAll('p');
// console.dir(element);

// let q=document.querySelectorAll(".para")//class ka naam likhna ho toh
// let i=document.querySelectorAll("#heading");//id selector

//DOM manipulation
//text node
//comment node
//elements node

// console.dir(document.body.firstChild);
// let d=document.querySelector("div");
// console.dir(d);
//innerText
//innerHTML
//textContent return textual content even fro hidden elements
// let h2=document.querySelector("h2");
// h2.innerText=h2.innerText + " from Apna College students";
// console.dir(h2.innerText);

// let b=document.querySelectorAll(".box");
// console.log(b[0]);
// b[0].innerText="new addition";
// b[1].innerText="new idea";
// b[2].innerText="new something";
// let j=1;
// for(box of b){
//     box.innerText=`new unique idea ${j}`;
//     j++;
// }


//Attribute.
// let div=document.querySelector("div");
// console.log(div);
// let id=div.getAttribute("id");
// console.log(id);
// let nm=div.getAttribute("name");
// console.log(nm);
// let para=document.querySelector("p");
// console.log(para.setAttribute('class','newClass'));

// //style
// div.style.backgroundColor="blue";
// div.style.fontSize="26px";

//insert elements
// let newbt=document.createElement("button");
// newbt.innerText="click me";
// console.log(newbt);
// div.prepend(newbt);//first
// div.append(newbt);//last
// div.before(newbt);//div start hone se just phle
// div.after(newbt);

// para.remove();


// let newbutt=document.createElement("button");
// newbutt.innerText="Click Me";
// newbutt.style.backgroundColor="red";
// newbutt.style.color="white";
// let body=document.querySelector("body");
// body.prepend(newbutt);
 
// let p=document.querySelector('p');
// p.setAttribute("class","newClass");

// p.classList.add("newClass");
// p.classList.remove("hello");


