import { useEffect, useState } from 'react';
import BotonLogin from '../Components/BotonLogin';
import Dashboard from '../Components/Dashboard';

function App() {
  const [iniciado, setIniciado] = useState(false);
  useEffect(() => {
    //llama al backend para obtener los datos del usuario
    fetch('http://localhost:3000/api/user', {
      credentials: 'include'
    })
    //obtiene la respuesta del envio de datos
      .then(res => res.json())
    //Hace que la data obtenga los datos del usuario  
      .then(data => {
        setIniciado(!!data.user);
      });
  }, []);
  return (
    <div>
      <h1>Aplicación de inicio de Sesión</h1>
      {iniciado ? <Dashboard /> : <BotonLogin />}  {/* si inició sesión, pasa a Dashboard, sino, al login. Se usaría Route si se necesitaran más locaciones */}
    </div>
  );
}
export default App;