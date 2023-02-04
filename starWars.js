function getFilms() {
  fetch("https://swapi.dev/api/films/")
  .then(response => response.json())
  .then(response => {
    let films = response.results;
    return films.map((film, index) => {
      console.log(film);
      displayFilms(film, index);
      getBtn();
    })
  })
}

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
  year.innerHTML = `${film.release_date}`;
  let buttonFront = elmt("button", {class: `btn ${index}`});
  buttonFront.innerHTML = "flip";
  let front = elmt("div", {class: "front"}, title, year, buttonFront);
  let director = elmt("p", {class: "producer"});
  director.innerHTML = `${film.director}`;
  let buttonBack = elmt("button", {class: `btn ${index}`});
  buttonBack.innerHTML = "flip";
  let back = elmt("div", {class: "back"}, director, buttonBack);
  let innerDiv = elmt("div", {class: "card", id: `${index}`}, front, back);
  let outerDiv = elmt("div", {class: "cardContainer"}, innerDiv);
  filmsContainer.appendChild(outerDiv);
  return filmsContainer;
}

function getBtn() {
  let buttons = document.querySelectorAll(".btn");
  console.log(buttons);
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].onclick = flipCard;
  }
} 
  
function flipCard(eventObj) {
  // which button was clicked?
  let button = eventObj.target;
  console.log(button);
  let buttonId = button.classList[1];
  console.log(buttonId);
  // pick the card on which the button was clicked.
  let card = document.getElementById(buttonId);
  console.log(card);
  // flip the card on which the button was clicked
  card.classList.toggle("flip");
  if (buttonId === 5) {
    console.log('hello');
  } 
}
getFilms();

 





