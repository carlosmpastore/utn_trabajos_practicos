import { useContext } from "react";
import UsuarioContext from "../../context/UsuarioContext";
import Layout from "../../components/Layout/Layout";

const Home = () => {
  const {name} = useContext(UsuarioContext);

  return (
    <Layout>
      <section className="Bio">
        <div>
          <img src="https://i.pinimg.com/originals/47/91/f0/4791f027dcad85f85883359daf191c5d.jpg" alt="foto del desarrollador"/>
        </div>
        <div>
        {name ? <h1>Bienvenido, {name}!</h1> : null}
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis a, doloribus nulla optio enim nihil ex debitis culpa maiores, sunt velit cum aliquid beatae dolorum dignissimos rerum quisquam! Quae, ipsa.</p>
        </div>
      </section>
      <section>
        <h2>Proyectos</h2>
        <div className="projects-container">
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
      </section>
    </Layout>
  );
};

export default Home;