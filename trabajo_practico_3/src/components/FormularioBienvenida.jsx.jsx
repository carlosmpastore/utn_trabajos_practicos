import React, { useContext, useState } from 'react';
import UsuarioContext from '../context/UsuarioContext';

const FormularioBienvenida = () => {
  const { setName } = useContext(UsuarioContext);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setName(inputValue);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ingrese su nombre"
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormularioBienvenida;
