// Handle client-side HTTP errors
const handleError = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  } else {
    return response.json();
  }
}

function getFilms() {
  fetch("https://swapi.dev/api/films/")
  .then(handleError)
  .then(response => {
    let films = response.results;
    console.log(films);
    films.map((film, index) => {
      displayFilms(film, index);
      let planets = film.planets;
      planets.forEach(planet => {
        fetch(planet)
        .then(handleError)
        .then(response => {
          let planetName = response.name;
          getPlanet(planetName, index);
          getBtn();
        })
      })  
    })
  })
  .catch(error => {
    console.error(error);
  })
}

// helper function for creating dom elements
function elmt(name, attrs, ...children) {
  let domElement = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    domElement.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    domElement.appendChild(child);
  }
  return domElement;
}

let filmsContainer = elmt("div", {class: "movieContainer"});
document.body.appendChild(filmsContainer);

function displayFilms(film, index) {
  let title = elmt("h1", {class: "title"});
  let year = elmt("p", {class: "year"});
  title.innerHTML = `${film.title}`;
  year.innerHTML = `-${film.release_date.split("-")[0]}-`;
  let buttonFront = elmt("button", {class: `btn ${index}`});
  buttonFront.innerHTML = "flip";
  let front = elmt("div", {class: "front"}, title, year, buttonFront);
  let director = elmt("p", {class: "director"});
  let headerOne = elmt("p", {class: "header"});
  let headerTwo = elmt("p", {class: "header"});
  headerOne.innerHTML = "Director";
  headerTwo.innerHTML = "Planets";
  director.innerHTML = `${film.director}`;
  let buttonBack = elmt("button", {class: `btn ${index}`});
  buttonBack.innerHTML = "flip";
  let back = elmt("div", {class: `back ${index}`}, headerOne, director, buttonBack, headerTwo);
  let innerDiv = elmt("div", {class: "card", id: `${index}`}, front, back);
  let outerDiv = elmt("div", {class: "cardContainer"}, innerDiv);
  filmsContainer.appendChild(outerDiv);
  return filmsContainer;
}

function getPlanet(name, index) {
  // get all the planets
  let planet = elmt("p", {class: "planet"});
  let header = elmt("p", {class: "header"});
  header.innerHTML = "Planets";
  // match planets to each film
  let card = document.getElementById(`${index}`);
  let back = card.childNodes[1];
  // display planets at the back of the card
  if (`${index}`) {
    planet.innerHTML = `${name}`;
    back.appendChild(planet);
  }
}

function getBtn() {
  let buttons = document.querySelectorAll(".btn");
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].onclick = flipCard;
  }
} 
  
function flipCard(eventObj) {
  // which button was clicked?
  let button = eventObj.target;
  let buttonId = button.classList[1];
  // pick the card on which the button was clicked.
  let card = document.getElementById(buttonId);
  // flip the card on which the button was clicked
  card.classList.toggle("flip");
}

getFilms();
