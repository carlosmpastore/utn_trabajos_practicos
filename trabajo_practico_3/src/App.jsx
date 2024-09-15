import './styles/App.css'
import UsuarioProvider from './context/UsuarioProvider.jsx';
import Portfolio from './components/Portfolio.jsx';
import FormularioBienvenida from './components/FormularioBienvenida.jsx.jsx';
import FormularioContacto from './components/FormularioContacto.jsx';


function App() {

  return (
    <UsuarioProvider>
      <FormularioContacto />
      <FormularioBienvenida />
      <Portfolio />
    </UsuarioProvider>
  );
};

export default App;

/*
Alternativa chatGPT (lo agregué por cómo trabaja con las props -crea un array con las props y después las introduce a través de la función map para no repetir la etiqueta main-)

"En el componente Main, estás utilizando message como prop para pasar el contenido del mensaje. Esto está bien, pero ten en cuenta que estás utilizando el componente Main varias veces con el mismo prop. Puedes considerar crear un array de mensajes y luego mapearlos para renderizar múltiples instancias de Main."

function App() {
  
  const messages = [
  // Array de mensajes
    "Hello and welcome to my professional portfolio, lynxs!",
    "We offer high-quality web page development services, resulting in websites that are easy to navigate and effective. Our clients are highly satisfied due to the low complaint rate and rapid response customer service.",
    "If you want to make your ideas known worldwide through a webpage, we can make that wish come true. Feel free to contact us!"
  ];

  return (
    <>
      <Header />
      {messages.map((message, index) => (
        <Main key={index} message={message} />
      ))}
      <Footer />
    </>
  );
}

export default App;*/
