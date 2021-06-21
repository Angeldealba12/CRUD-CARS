let cars = [];

let updateFlag = false;
let updateIndex = null;

let carsInfoDIV = document.getElementById("list-container-child");
let userForm = document.getElementById("form-container")

let localStorageArray = JSON.parse(localStorage.getItem("carsStorageArray"));

const carsStorage = () => {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("carsStorageArray", JSON.stringify(cars));
        renderList();
    } else {
        alert("Tu navegador no soporto LocalStorage");
    }
};

const renderList = () => {
    carsInfoDIV.innerHTML = "";
    let carsArray = cars;
    carsArray = JSON.parse(localStorage.getItem("carsStorageArray"));
    if (carsArray === null) {
        carsArray = [];
    } else {
        carsArray.forEach((info, index) => {
            let userItemDiv = document.createElement("div");
            userItemDiv.setAttribute("class", "first-child");
            carsInfoDIV.appendChild(userItemDiv);

            let carsItemName = document.createElement("p");
            let carsItemModel = document.createElement("p");
            let carsItemDoors = document.createElement("p");
            let carsItemColor = document.createElement("p");
            let carsItemBrand = document.createElement("p");

            carsItemName.innerText = `${info.name}`
            carsItemModel.innerText = `${info.model}`
            carsItemDoors.innerText = `${info.doors}`
            carsItemColor.innerText = `${info.color}`
            carsItemBrand.innerText = `${info.brand}`

            userItemDiv.appendChild(carsItemName);
            userItemDiv.appendChild(carsItemModel);
            userItemDiv.appendChild(carsItemDoors);
            userItemDiv.appendChild(carsItemColor);
            userItemDiv.appendChild(carsItemBrand);

            let userButtonDiv = document.createElement("div");
            userButtonDiv.setAttribute("class", "second-child");
            carsInfoDIV.append(userButtonDiv);

            let updateButton = document.createElement("button");
            updateButton.setAttribute("class", "updateButton");
            updateButton.addEventListener("click", () => updateUser(index, info));
            updateButton.setAttribute('id', 'update');
            updateButton.innerText = "Edit";

            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("class", "delete");
            deleteButton.addEventListener("click", () => deleteUser(index));
            deleteButton.setAttribute('id', 'delete');
            deleteButton.innerText = "Delete";

            userButtonDiv.appendChild(updateButton);
            userButtonDiv.appendChild(deleteButton);
        });
    };
};

const createUser = event => {
    event.preventDefault();

    if (updateFlag) {
        let updatedUser = {
            name: document.getElementById("name").value,
            model: document.getElementById("model").value,
            doors: document.getElementById("doors").value,
            color: document.getElementById("color").value,
            brand: document.getElementById("brand").value
        };

        cars[updateIndex] = updatedUser;

        updateFlag = false;
        updateIndex = null;
        carsStorage();
        renderList();
    } else {
        let info = {
            name: document.getElementById("name").value,
            model: document.getElementById("model").value,
            doors: document.getElementById("doors").value,
            color: document.getElementById("color").value,
            brand: document.getElementById("brand").value
        };
        if(localStorageArray == null){
            localStorageArray = [];
        }
        cars.push(...localStorageArray, info);
        carsStorage();
        renderList();
    };
    userForm.reset();
};

const updateUser = (index, info) => {
    let updateCarStorage = JSON.parse(localStorage.getItem("carsStorageArray"));
    cars = updateCarStorage;
    console.log(index);
    console.log(info);
    document.getElementById("name").value = info.name;
    document.getElementById("model").value = info.model;
    document.getElementById("doors").value = info.doors;
    document.getElementById("color").value = info.color;
    document.getElementById("brand").value = info.brand;
    cars.splice(index, 1, info);
    carsStorage();
    updateFlag = true;
    updateIndex = index;
};


const deleteUser = index => {
    let deleteCarStorage = JSON.parse(localStorage.getItem("carsStorageArray"));
    cars = deleteCarStorage;
    cars.splice(index, 1);
    carsStorage();
    renderList();
};

userForm.addEventListener("submit", createUser);
document.addEventListener("DOMcontentLoaded", renderList());