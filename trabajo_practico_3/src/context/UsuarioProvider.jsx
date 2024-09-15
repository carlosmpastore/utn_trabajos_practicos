import { useState } from "react";
import UsuarioContext from "./UsuarioContext";

const UsuarioProvider = ({children}) => {
  const [name, setName] = useState('');

  return (
    <UsuarioContext.Provider value={{name, setName}}>
      {children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioProvider;