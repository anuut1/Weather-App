
const numberOfButtons = 9;


const mainContainer = document.createElement("div");
document.body.appendChild(mainContainer);

const buttonContainer = document.createElement("div");
mainContainer.appendChild(buttonContainer);

const resultContainer = document.createElement("div");
mainContainer.appendChild(resultContainer);


function createElement(type, parent, text) {
    const element = document.createElement(type);
    element.textContent = text;
    parent.appendChild(element);
    return element;
}


for (let i = 1; i <= numberOfButtons; i++) {

    const btn = createElement("button", buttonContainer, "Button #" + i);

    btn.classList.add("btn");
    btn.count = 0;

    btn.addEventListener("click", function () {
        this.count++;

        const output = createElement(
            "p",
            resultContainer,
            this.textContent + " = " + this.count
        );
    });
}

const totalBtn = createElement("button", buttonContainer, "All Totals");

totalBtn.addEventListener("click", function () {

    const allButtons = document.querySelectorAll(".btn");

    const list = createElement("ul", resultContainer, "");

    
    allButtons.forEach(function (button) {
        const li = document.createElement("li");
        li.textContent = button.textContent + " = " + button.count;
        li.style.backgroundColor = window.getComputedStyle(button).backgroundColor;
        list.appendChild(li);
    });
});
