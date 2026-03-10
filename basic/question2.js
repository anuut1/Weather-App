const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
btn1.count = 0;
btn1.addEventListener("click", function () {
    this.count++;
    document.getElementById("count1").innerText = this.count;
});
btn2.count = 0;
btn2.addEventListener("click", () => {
    btn2.count++;
    document.getElementById("count2").innerText = btn2.count;
});
btn3.count = 0;
btn3.addEventListener("click", increase);

function increase() {
    this.count++;
    document.getElementById("count3").innerText = this.count;
}
