const output = document.getElementById("output");

const files = ["user1.json", "user2.json", "user3.json"];

document.getElementById("fetchBtn").addEventListener("click", () => {
    fetch("user1.json")
        .then(response => response.json())
        .then(data => {
            output.innerHTML = `<p>${data.name} - ${data.role}</p>`;
        })
        .catch(err => console.log(err));
});

// const response=await fetch("user1.json");
// const val=await response.json();

document.getElementById("asyncBtn").addEventListener("click", async () => {
    try {
        const response = await fetch("user2.json");
        const data = await response.json();
        output.innerHTML = `<p>${data.name} - ${data.role}</p>`;
    } catch (error) {
        console.log(error);
    }
});


document.getElementById("promiseBtn").addEventListener("click", () => {

    const requests = files.map(file => fetch(file).then(res => res.json()));

    Promise.all(requests)
        .then(results => {
            output.innerHTML = "";

            results.forEach(user => {
                output.innerHTML += `<p>${user.name} - ${user.role}</p>`;
            });
        })
        .catch(error => console.log(error));
});
