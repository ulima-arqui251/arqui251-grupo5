import { useEffect, useState } from 'react';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //incluye los datos de las credenciales de inicio
    fetch('http://localhost:3000/api/user', {
      credentials: 'include'
    })
    //obtiene la respuesta y la transforma en formato jston
      .then(res => res.json())
    //Hace que la data obtenga los datos del usuario  
      .then(data => setUser(data.user));
  }, []);

  if (!user) return <p>Cargando o no existe</p>;

  const { displayName, emails, photos, events } = user; // son los nombres que se obtienen del backend

  return (
    <div>
      <h1>Bienvenido!, {displayName}</h1>
      <p><strong>Correo: </strong>{emails[0].value}</p>
      <img src={photos?.[0]?.value} alt="Profile" width={100} style={{ borderRadius: '50%' }} />

      <h2>Eventos futuros de tu calendario</h2>
      <ul>
        {/*Busca dentro de los eventos obtenidos de Google Calendar los eventos*/}
        {events?.map((event, index) => (
          <li key={index}> 
            <strong>{event.summary || 'No posee datos'}</strong><br />
            {event.start?.dateTime || event.start?.date}
          </li>
        ))}
      </ul>

      <a href="http://localhost:3000/logout">Cerrar Sesión</a> {/*Cierra la sesión*/}
    </div>
  );
}

export default Dashboard;