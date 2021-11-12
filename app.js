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
        tableBody.innerHTML += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${address}</td>
                    <td><i onClick="deleteUser('${_id}')" class="fas fa-trash me-2"></i><i onClick="getUser('${_id}',this)" class="far fa-edit"></i></td>
                </tr>`
    });
    // tableBody.innerHTML = renderData.join();
}
const editingUser = id => {
    editUserDB(id, userName, email, address);
}
const getUser = (id, e) => {
    let userName = document.querySelector("#inputName"), email = document.querySelector("#inputEmail"), address = document.querySelector("#inputAddress"), editBtn = document.querySelector("#edit"), submitBtn = document.querySelector("#submitBtn");
    let tableRow = e.parentNode.parentNode;
    let tableRowData = tableRow.childNodes
    userName.value = tableRowData[3].textContent, email.value = tableRowData[5].textContent, address.value = tableRowData[7].textContent;
    editBtn.style.display = "inline";
    submitBtn.style.display = "none";
    editBtn.setAttribute("onClick", `editUserDB('${id}')`)
}
const editUserDB = (id) => {
    let userName = document.querySelector("#inputName"), email = document.querySelector("#inputEmail"), address = document.querySelector("#inputAddress");
    const updatedInfo = {};
    if (userName.value) { updatedInfo.name = userName.value }
    if (email.value) { updatedInfo.email = email.value }
    if (address.value) { updatedInfo.address = address.value }
    axios.put(`https://hello-world-crud.herokuapp.com/user/${id}`, updatedInfo).then(res => {
        userName.value = "", email.value = "", address.value = "";
        showMessage("User Updated Successfully");
        getUsers();
        document.querySelector("#edit").style.display = "none";
        document.querySelector("#submitBtn").style.display = "inline";
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