const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'  

document.addEventListener('DOMContentLoaded', function() {
  fetchImages()
  fetchBreeds()
})

//FETCH DATA-----------------------------------------------------------------------
function fetchImages() {
  fetch(imgUrl)
  .then(response => response.json())
  // .then(json => console.log(json))
  .then(image => {
    image.message.forEach(image => addImage(image))
  })
}

function fetchBreeds() {
  fetch(breedUrl)
  .then(response => response.json())
  // .then(json => console.log(json))
  .then(breed => {

    breeds = Object.keys(breed.message)
    updateBreedList(breeds)
    addBreedSelectListener();
  })
}
//SHOW DATA-----------------------------------------------------------------------
function addImage(imageData) {
  let container = document.querySelector('#dog-image-container')

  img = document.createElement('img')
  img.src = imageData
  container.append(img)
}

function updateBreedList(breedData) {
  let ul = document.querySelector('#dog-breeds');
  removeChildren(ul);
  breedData.forEach(breed => addBreed(breed));
}

function addBreed(breedData) {
  let ul = document.querySelector('#dog-breeds')
  let li = document.createElement('li')
  li.style.cursor = 'pointer'
  li.innerText = breedData
  ul.append(li)
  li.addEventListener('click', updateColor)
}
//MISC----------------------------------------------------------------------------
  function updateColor(event) {
    event.target.style.color = 'blue'
  }

  function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
  }

  function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
      selectBreedsStartingWith(event.target.value);
    });
  }

  function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }
  }