const $grid = document.querySelector(".grid");

fetch("https://hp-api.onrender.com/api/characters")
  .then((answer) => {
    return answer.json();
  })
  .then ((data) => {
    const characters = data;
    console.log(characters);

    characters.forEach((character) => {
    
      //Modificar dato del estado de los personajes
      let estado
      if (character.alive == true) {
        estado = "Vivo";
      } else {
        estado = "Muerto";
      }
    });
  })