document.addEventListener('DOMContentLoaded', () => {
fetchDogs();
})

function fetchDogs(){
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogs => addDogsToTheDOM(dogs))
}

let table;

function addDogsToTheDOM(dogs){
    table = document.querySelector('table');

    const form = document.getElementById('dog-form');
    const nameInput = document.querySelector('[name="name"]');
    const breedInput = document.querySelector('[name="breed"]');
    const sexInput = document.querySelector('[name="sex"]');

    let dogId;
    let doggo;
    let dogName;
    let dogBreed;
    let dogSex;
    let editButton;

    dogs.forEach(dog => {
        doggo = document.createElement('tr');

        dogName = document.createElement('td');
        dogName.innerHTML = dog.name;
        dogName.setAttribute('class','name');

        dogBreed = document.createElement('td');
        dogBreed.innerHTML = dog.breed;
        dogBreed.setAttribute('class','breed');

        dogSex = document.createElement('td');
        dogSex.innerHTML = dog.sex;
        dogSex.setAttribute('class','sex');

        editButton = document.createElement('button');
        editButton.innerHTML = 'Edit Dog';

        editButton.addEventListener('click', (e)=> {
            nameInput.value = dog.name;
            breedInput.value = dog.breed;
            sexInput.value = dog.sex;
            dogId = dog.id;
            doggo = (e.target.parentElement);
        })

        doggo.appendChild(dogName);
        doggo.appendChild(dogBreed);
        doggo.appendChild(dogSex);
        doggo.appendChild(editButton);

        table.appendChild(doggo);
        })

        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            updateDog(dogId, (nameInput.value), (breedInput.value), (sexInput.value), doggo);
        })
    }
function updateDog(id, name, breed, sex, dogRow){
    
    const updatedDog = {
        id: id,
        name: name,
        breed: breed,
        sex: sex
    }

    fetch(`http://localhost:3000/dogs/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(updatedDog)
        })
        .then(response => response.json())
        .then(dog => {
            let dogRowName = dogRow.querySelector('.name');
            dogRowName.innerHTML = dog.name;

            let dogRowBreed = dogRow.querySelector('.breed');
            dogRowBreed.innerHTML = dog.breed;

            let dogRowSex = dogRow.querySelector('.sex');
            dogRowSex.innerHTML = dog.sex;
        })
    }