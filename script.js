function savetoCloudStorage(event){
    event.preventDefault();
    const expense = event.target.expenseamount.value;
    const description = event.target.Chdescription.value;
    const category = event.target.Chcategory.value;

    const obj = {
        expense,
        description,
        category
    }

    axios.post("https://crudcrud.com/api/c5b33544f7424d029bfe2359da78198b/AppointmentData",obj)
    .then((respone) => {
        onScreen(respone.data)
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went Wrong </h4> "
        console.log(err)
    })
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/c5b33544f7424d029bfe2359da78198b/AppointmentData")
    .then((response) => {
        for(var i=0; i<response.data.length ; i++) {
            onScreen(response.data[i])
        }
    })
    .catch((error) => {
        console.log(error)
    })
})

function onScreen(detail){
    const parentNode = document.getElementById('users');
    const childHTML = `<li id=${detail.description} > ${detail.expense} - ${detail.description} - ${detail.category}  <button id="edit" onclick=editUser('${detail.description}','${detail.expense}')> Edit </button> <button onclick=deleteUser('${detail.description}')> Delete </button>  </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function deleteUser(Chdescription) {
    localStorage.removeItem(Chdescription);
    removeFromScreen(Chdescription);
}

function removeFromScreen(Chdescription){
    const parentNode = document.getElementById('users');
    const childNodeToDelete = document.getElementById(Chdescription);
    parentNode.removeChild(childNodeToDelete);
}

function editUser(Chdescription,expense){
    document.getElementById('description').value = Chdescription
    document.getElementById('expense').value = expense
    deleteUser(Chdescription)
}
