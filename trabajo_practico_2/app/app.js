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
      let status;
      if (character.alive == true) {
        status = "Vivo";
      } else {
        status = "Muerto";
      }

      //Asignar una imagen alojada en repositorio local para los objetos que no tengan una
      let imageSrc = character.image;
      if (!imageSrc) {
        imageSrc = "../assets/no_image_character.webp"
      }
    });
  })