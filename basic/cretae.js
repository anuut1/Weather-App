// const val = {
//     num: 9
// };
// const main = createElement('div', document.body, '');
// const output = createElement('div', main, '');

// for (let i = 0; i < val.num; i++) {
//     const but = createElement('button', main, `Button ${i + 1}`);
//     but.total = 0;
//     but.classList.add('btn');
//     but.addEventListener("click", function() {
//         this.total++;
//         output.innerHTML = `${this.textContent} : (${this.total})`;
//     })

// }



// const listoutput=createElement('div',main,'');

// const all = createElement('button', main, 'All totals');
// all.addEventListener("click", () => {
//     const btns = document.querySelectorAll('.btn');
//     listoutput.innerHTML='';
//     const ul=createElement('ul',listoutput,'');
//     btns.forEach(btns=>{
//         createElement('li',ul,`${btns.textContent}:${btns.total}`);
//     });
// });
// function createElement(eleT, parent, html) {
//     let ele = document.createElement(eleT);
//     ele.innerHTML = html;
//     return parent.appendChild(ele);
// };


function getCheese() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const cheese = "🧀";
            resolve(cheese);
        }, 2000);
    })
}

function makeDough(cheese) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const dough = cheese + "🍩";
            // resolve(dough);
            reject('dough is not ready');
        }, 2000);
    })
}

function bakePizza(dough) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pizza = dough + "🍕";
            resolve(pizza);
        }, 2000);
    })
}

async function orderPizza() {
    try {
        const cheese = await getCheese();
        console.log('Here is the cheese', cheese);
        const dough = await makeDough(cheese);
        console.log('Here is the dough', dough);
        const pizza = await bakePizza(dough);
        console.log('Pizza is ready', pizza);
    }
    catch(err) {
        console.log('error occured', err);
    }
    finally{
        console.log('process ended');
    }
}

orderPizza();