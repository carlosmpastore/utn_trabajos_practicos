import { useContext } from "react";
import UsuarioContext from "../../context/UsuarioContext";
import Layout from "../../components/Layout/Layout";

const Contacto = () => {
  const {name} = useContext(UsuarioContext);

  return (
    <Layout>
      {name ? <h3>Dejame tu mensaje, {name}</h3> : null}
      <form className="form" method="post" action="https://formspree.io/f/xqazbkld">
        <input id="input-name" type="text" placeholder="Ingresa tu nombre" required />
        <input id="input-email" type="email" placeholder="Ingresa tu correo electronico" required />
        <textarea id="input-message" placeholder="Escribe tu mensaje..." required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </Layout>
  );
};

export default Contacto;