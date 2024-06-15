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

    //Agregar al div de clase .grid un div con clase .card para cada objeto del API
    $grid.innerHTML += `<div class="card">
    <img src="${imageSrc}" alt="foto de ${character.name}">
    <h4>${character.name}</h4>
    <p>Género: ${character.gender}</p>
    <p>Especie: ${character.species}</p>
    <p>Casa: ${character.house}</p>
    <p>Estado: ${status}</p>
    </div>`;
  });
});