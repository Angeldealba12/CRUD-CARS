let cars = [{
        name: "718 Cayman",
        model: "2019",
        doors: 5,
        color: "red",
        brand: "Porsche"
    },
    {
        name: "Accord",
        model: "2021",
        doors: 4,
        color: "black",
        brand: "Honda"
    },
    {
        name: "Mazda 2",
        model: "2017",
        doors: 2,
        color: "white",
        brand: "Nissan"
    }
]


let carsInfoDIV = document.getElementById("list-container-child");
let userForm = document.getElementById("form-container")


const rederList = () => {
    carsInfoDIV.innerHTML = "";

    cars.forEach((info, index) => {
        let userItemDiv = document.createElement("div");
        userItemDiv.setAttribute("class", "first-child");
        carsInfoDIV.appendChild(userItemDiv);

        let carsItemName = document.createElement("p");
        let carsItemModel = document.createElement("p");
        let carsItemDoors = document.createElement("p");
        let carsItemColor = document.createElement("p");
        let carsItemBrand = document.createElement("p");

        carsItemName.innerHTML = (`${info.name}`)
        carsItemModel.innerHTML = (` ${info.model}`)
        carsItemDoors.innerHTML = (` ${info.doors}`)
        carsItemColor.innerHTML = (` ${info.color}`)
        carsItemBrand.innerHTML = (` ${info.brand}`)

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

const createUser = event => {
    event.preventDefault();
    let info = {
        name: document.getElementById("name").value,
        model: document.getElementById("model").value,
        doors: document.getElementById("doors").value,
        color: document.getElementById("color").value,
        brand: document.getElementById("brand").value
    };
    cars.push(info);
    renderList();
};

const updateUser = (index, info) => {
    console.log(index);
    console.log(info);
    document.getElementById("name").value = info.name;
    document.getElementById("model").value = info.model;
    document.getElementById("doors").value = info.doors;
    document.getElementById("color").value = info.color;
    document.getElementById("brand").value = info.brand;
}


const deleteUser = index => {
    cars.splice(index, 1);
    renderList();
};

userForm.addEventListener("submit", createUser);
document.addEventListener("DOMcontentLoaded", rederList());
