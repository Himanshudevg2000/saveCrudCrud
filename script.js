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

    axios.post("https://crudcrud.com/api/a6aac3f42be14153a7402ebe5ff4e785/AppointmentData",obj)
    .then((respone) => {
        onScreen(respone.data)
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something went Wrong </h4> "
        console.log(err)
    })
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/a6aac3f42be14153a7402ebe5ff4e785/AppointmentData")
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
    const childHTML = `<li id=${detail._id} > ${detail.expense} - ${detail.description} - ${detail.category}
    <button onclick = "editUser('${detail.description}', '${detail.expense}','${detail._id}')"> Edit </button> 
    <button onclick=deleteUser('${detail._id}')> Delete </button>  </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

function deleteUser(detailId) {
    axios.delete(`https://crudcrud.com/api/a6aac3f42be14153a7402ebe5ff4e785/AppointmentData/${detailId}`)
    .then((response) => {
        removeFromScreen(detailId)
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> Nothing to delete </h4> "
        console.log(err)
    })
}

function removeFromScreen(detailId){
    const parentNode = document.getElementById('users');
    const childNodeToDelete = document.getElementById(detailId);
    parentNode.removeChild(childNodeToDelete);
}

function editUser(Chdescription,expenseamount,detailId){
    document.getElementById('description').value = Chdescription
    document.getElementById('expense').value = expenseamount
    deleteUser(detailId)
}