const $grid = document.querySelector(".grid");

fetch("https://hp-api.onrender.com/api/characters")
  .then((answer) => {
    return answer.json();
  })
  .then ((data) => {
    const characters = data;
    console.log(characters);
  })