let users = []
function handleNewUser() {
    event.preventDefault()

    const inputName = document.getElementById("name")

    const inputAge = document.getElementById("age")

    const inputEmail = document.getElementById("email")

    const inputTelephone = document.getElementById("telephone")

    const newUser = {
        name: inputName.value,
        age: inputAge.value,
        email: inputEmail.value,
        telephone: inputTelephone.value
    }
    users.push(newUser)

    addUserToTable()
    inputName.value = ""
    inputAge.value = ""
    inputEmail.value = ""
    inputTelephone.value = ""
}

function addUserToTable() {
    const tbody = document.querySelector("table tbody") 
    tbody.innerHTML = ""
    for(let user of users) {
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.telephone}</td>
        `
        tbody.appendChild(tr)
    }
    console.log("tbody: ", tbody)

}