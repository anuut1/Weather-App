const slider = document.getElementById("slider");

document.addEventListener("DOMContentLoaded", adder);

function adder() {

    fetch("slides.json")
        .then(response => response.json())
        .then(data => {

            data.forEach((item, index) => {

                const slide = document.createElement("div");
                slide.classList.add("slide");

                if (index === 0) {
                    slide.classList.add("active");
                }

                slide.style.backgroundColor = item.bg;

                slide.innerHTML = `
                    <h2>${item.title}</h2>
                    <p>${item.content}</p>
                `;

                slider.appendChild(slide);
            });

            createButtons();
        });
}

function createButtons() {

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "< Prev";
    prevBtn.classList.add("prev");

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next >";
    nextBtn.classList.add("next");

    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);

    prevBtn.addEventListener("click", () => navigate("prev"));
    nextBtn.addEventListener("click", () => navigate("next"));
}

function navigate(direction) {

    const current = document.querySelector(".active");
    current.classList.remove("active");

    let newSlide;

    if (direction === "next") {
        newSlide = current.nextElementSibling;
        if (!newSlide || !newSlide.classList.contains("slide")) {
            newSlide = slider.querySelector(".slide:first-child");
        }
    } else {
        newSlide = current.previousElementSibling;
        if (!newSlide) {
            const slides = slider.querySelectorAll(".slide");
            newSlide = slides[slides.length - 1];
        }
    }

    newSlide.classList.add("active");
}
