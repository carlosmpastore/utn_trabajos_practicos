import { useContext } from "react";
import UsuarioContext from "../context/UsuarioContext";

const Portfolio = () => {

  const {name} = useContext(UsuarioContext);

  return (
    <div>
      {name ? <p>Bienvenido, {name}!</p> : null}
      <div className="proyectos-container">
        <a href="#">
          <img src="https://cdn.freecodecamp.org/testable-projects-fcc/images/tribute.jpg" alt="imagen de proyecto pagina web tributo" />
          <p>Pagina Tributo</p>
        </a>
        <a href="#">
          <img src="https://cdn.freecodecamp.org/testable-projects-fcc/images/random-quote-machine.png" alt="imagen de proyecto pagina web generador de frases random" />
          <p>Pagina Generadora de Frases Random</p>
        </a>
        <a href="#">
          <img src="https://cdn.freecodecamp.org/testable-projects-fcc/images/calc.png" alt="imagen de proyecto pagina web calculadora JavaScript" />
          <p>Pagina Calculadora en JavaScript</p>
        </a>
        <a href="#">
          <img src="https://cdn.freecodecamp.org/testable-projects-fcc/images/map.jpg" alt="imagen de proyecto pagina web mapa de datos mundial" />
          <p>Pagina Mapa de Datos Mundial</p>
        </a>
        <a href="#">
          <img src="https://cdn.freecodecamp.org/testable-projects-fcc/images/wiki.png" alt="imagen de proyecto pagina web wiki viewer" />
          <p>Pagina Wiki Viewer</p>
        </a>
        <a href="#">
          <img src="https://cdn.freecodecamp.org/testable-projects-fcc/images/tic-tac-toe.png" alt="imagen de proyecto pagina web Ta-Te-Ti" />
          <p>Pagina Ta-Te-Ti</p>
        </a>
      </div>
    </div>
  );
};

export default Portfolio;