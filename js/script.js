const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputMobile = document.getElementById("mobile");
const contIdEdit = document.getElementById("contIdEdit");
const submit = document.getElementById("submit");

const formEmp = document.getElementById("formEmp");
const tableBody = document.querySelector("#example tbody");

class Employee
{
    constructor(id,name,email,mobile)
    {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.id = id;
    }


    storeEmployee()
    {
        const allData = JSON.parse(localStorage.getItem("employees")) ?? [];
        allData.push({id:this.id,name:this.name,email:this.email,mobile:this.mobile});
        localStorage.setItem("employees",JSON.stringify(allData));
        
    }

    showData()
    {
        const trEl = document.createElement("tr");
        trEl.innerHTML = this.showHtmlRow();
        tableBody.appendChild(trEl);
        return this;
    }

    static showAllEmployees()
    {
        if(localStorage.getItem("employees"))
        {

            JSON.parse(localStorage.getItem("employees")).forEach((item)=>{
                let newEmp = new Employee(item.id,item.name,item.email,item.mobile);
                newEmp.showData();
            })
        }
    }

    updateData(id)
    {
        const newItem = {id:id,name:this.name,email:this.email,mobile:this.mobile}
        const updatedData = JSON.parse(localStorage.getItem("employees")).map((item)=> {
                    if(item.id == id)
                    {
                        return newItem;
                    }
                    else
                    {
                        return item
                    }
             
        });
        localStorage.setItem("employees",JSON.stringify(updatedData));
    }




    showHtmlRow(){
        return`
        <td>${this.name}</td>
        <td>${this.email}</td>
        <td>${this.mobile}</td>
        <td class="text-center">
            <button class="btn btn-danger delete" data-id="${this.id}">Delete</button>
            <button class="btn btn-info edit" data-id="${this.id}">Edit</button>
        </td>
        `
    }

    
}

// Show All Data From Local Storage
Employee.showAllEmployees();


// add new item

formEmp.addEventListener("submit",(e)=>
{
    e.preventDefault();
    let nameVal = inputName.value;
    let emailVal = inputEmail.value;
    let mobileVal = inputMobile.value;

    if(!contIdEdit.value)
    {
        let id = Math.floor(Math.random()*1000000);
        const newEmp = new Employee(id,nameVal,emailVal,mobileVal);
        
        newEmp.showData().storeEmployee();
    }
    else
    {
        let id = contIdEdit.value;
        const newEmp = new Employee(id,nameVal,emailVal,mobileVal);
        newEmp.updateData(id);
        submit.value = "Submit";
        tableBody.innerHTML = '';
        Employee.showAllEmployees();
    }

    inputName.value = '';
    inputEmail.value = '';
    inputMobile.value = '';
    
})


// delete item 
tableBody.addEventListener("click",(e)=>{
    
    if(e.target.classList.contains("delete"))
    {
        const id = e.target.getAttribute("data-id");
        const emps = JSON.parse(localStorage.getItem("employees"));
        const newData = emps.filter(item => item.id != id);
        localStorage.setItem("employees",JSON.stringify(newData));
        e.target.parentElement.parentElement.remove();
    }


    else if(e.target.classList.contains("edit"))
    {
        const id = e.target.getAttribute("data-id");
        const item = JSON.parse(localStorage.getItem("employees")).find((item)=> item.id == id);
        inputName.value = item.name;
        inputEmail.value = item.email;
        inputMobile.value = item.mobile;
        contIdEdit.value = item.id;
        submit.value = "Edit Data Of This Employee"

    }
})