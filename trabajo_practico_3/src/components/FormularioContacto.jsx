import { useContext } from "react";
import UsuarioContext from "../context/UsuarioContext";

const FormularioContacto = () => {

  const {name} = useContext(UsuarioContext);

  return (
    <>
      <form method="post" action=""></form>
    </>
  )
}

export default FormularioContacto;

//<form method="post" action="https://formspree.io/f/meqydgbq">