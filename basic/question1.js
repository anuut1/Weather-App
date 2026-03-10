const button = document.getElementById("btn");

button.addEventListener("click", ()=> {
    const name = document.getElementById("username").value.trim();
    const message = document.getElementById("message");

    if (name.length > 3) {
        message.innerText = `Welcome to the site ${name}`;
    } else {
        message.innerText = "Name must be more than 3 characters!";
    }
});
