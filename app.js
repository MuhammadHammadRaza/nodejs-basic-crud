const getUsers = () => {
    axios.get('https://hello-world-crud.herokuapp.com/users')
        .then(response => {
            showUsers(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
const showUsers = users => {
    const tableBody = document.querySelector("#showData");
    tableBody.innerHTML = "";
    // let renderData = users.map(({ name, email, address, _id }, index) => {
    users.map(({ name, email, address, _id }, index) => {
        tableBody.innerHTML += `<tr'>
                    <th scope="row">${index + 1}</th>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${address}</td>
                    <td><i onClick="deleteUser('${_id}')" class="fas fa-trash me-2"></i><i onClick="getUser('${_id}',this, '${index}', '${name}', '${email}', '${address}')" class="far fa-edit"></i></td>
                </tr>`
    });
    // tableBody.innerHTML = renderData.join();
}
const editingUser = id => {
    editUserDB(id, userName, email, address);
}
const getUser = (id, e, index, name, email, address) => {
    let tableRow = e.parentNode.parentNode;
    tableRow.innerHTML = `<tr id="${index}">
    <th scope="row">${index + 1}</th>
    <td><input type="text" class="form-control" id="${id}-name" value="${name}"></td>
    <td><input type="text" class="form-control" id="${id}-email" value="${email}"></td>
    <td><input type="text" class="form-control" id="${id}-address" value="${address}"></td>
    <td><button onClick="editUserDB('${id}')" class="btn btn-warning">Edit</button>
    <button onclick="cancel(this, '${index}', '${id}', '${name}', '${email}', '${address}')" class="btn btn-danger">Cancel</button></td>
</tr>`
}
const cancel = (e, index, id, name, email, address) => {
    const getttingTR = e.parentNode.parentNode;
    getttingTR.innerHTML = `
    <th scope="row">${index + 1}</th>
    <td>${name}</td>
    <td>${email}</td>
    <td>${address}</td>
    <td><i onClick="deleteUser('${id}')" class="fas fa-trash me-2"></i><i onClick="getUser('${id}',this, '${index}', '${name}', '${email}', '${address}')" class="far fa-edit"></i></td>
    `
}
const editUserDB = (id) => {
    let name = document.getElementById(`${id}-name`).value, email = document.getElementById(`${id}-email`).value, address = document.getElementById(`${id}-address`).value;
    axios.put(`https://hello-world-crud.herokuapp.com/user/${id}`, { name, email, address }).then(res => {
        showMessage("User Updated Successfully");
        getUsers();
    });
}
const setUser = () => {
    let userName = document.querySelector("#inputName"), email = document.querySelector("#inputEmail"), address = document.querySelector("#inputAddress");
    (userName.value, email.value, address.value) ? submitData(userName.value, email.value, address.value) : showMessage("All Fields Are Required");
    userName.value = "", email.value = "", address.value = "";
}
const submitData = (name, email, address) => {
    axios.post('https://hello-world-crud.herokuapp.com/user', { name, email, address })
        .then(response => {
            getUsers();
            showMessage("User Created Successfully");
        })
        .catch(err => {
            console.log(err);
        })
}
const deleteUser = id => {
    axios.delete(`https://hello-world-crud.herokuapp.com/user/${id}`).then(() => {
        showMessage("User Deleted Successfully");
        document.querySelector("#edit").style.display = "none";
        document.querySelector("#submitBtn").style.display = "inline";
        getUsers()
    });
}
const showMessage = message => {
    const messageTag = document.querySelector("#message");
    messageTag.textContent = message;
    messageTag.style.display = "inline";
    setTimeout(() => {
        messageTag.innerText = "";
        messageTag.style.display = "none";
    }, 3000)
}
getUsers();