const express = require('express'); // Usa express framework de node_modules. Este permite que los datos del código funcionen.
const session = require('express-session'); // Almacena la información del usuario durante la ejecución
const passport = require('passport'); // Autenticación de Node.js
const GoogleStrategy = require('passport-google-oauth20').Strategy; //Importa la autenticación de google
const cors = require('cors'); // Importa cors
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args)); // Importa node-fetch

require('dotenv').config({ path: './servidor.env' }); // Carga las variables del .env

const app = express(); 

// Crea CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Mantiene la sesión durante la ejecución
app.use(session({
  secret: process.env.SESSION_SECRET, // usa la clave secreta 
  resave: false, // Previene el reinicio de sesión
  saveUninitialized: false // No se crea la sesión hasta que no se obtengan los datos del usuario
}));

app.use(passport.initialize()); //incializa los datos de inicio de sesión
app.use(passport.session()); 

// Serializan y deserializan los datos del usuario
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// configura la autenticación AOth de Google
passport.use(new GoogleStrategy({
  // Se obtienen los datos para conectarse al servicio cloud de Google.
  clientID: process.env.GOOGLE_CLIENT_ID, 
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
  callbackURL: '/auth/google/callback' 
}, async function (accessToken, refreshToken, profile, done) {
  try {
    const now = new Date().toISOString(); // Obtiene el tiempo actual
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=3&orderBy=startTime&singleEvents=true&timeMin=${encodeURIComponent(now)}`; // API de Google calendar para obtener los eventos, usa el tiempo para solo mostrar los futuros al actual.
    const res = await fetch(url, {  // Almacena los datos de inicio de sesión
      headers: {
        Authorization: `Bearer ${accessToken}` 
      }
    });
    const calendarData = await res.json(); // Espera a la respuesta y la pone en un json
    profile.events = calendarData.items || []; // Almacena los eventos del calendario
    return done(null, profile); // da el perfil del usuario
  } catch (error) {
    return done(error, null); // retorna error si sucede uno
  }
}));

// Inicia el OAuth de Google
app.get('/auth/google',
  passport.authenticate('google', {
    scope: [
        // obtiene el perfil, email y llama a la api de calendario
      'profile',
      'email',
      'https://www.googleapis.com/auth/calendar.readonly'
    ]
  })
);

// redirige a las pestañas de exito de inicio de sesión o de fallo de inicio
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }), 
  (req, res) => {
    res.redirect('http://localhost:5173'); 
  }
);

// Termina la sesión
app.get('/logout', (req, res) => {
  req.logout(() => res.redirect('http://localhost:5173'));
});

// Da la información del usuario
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user }); // Retorna la información del usuario registrado
  } else {
    res.status(401).json({ user: null }); // Retorna el error 401
  }
});

// Da el puerto en donde se ejecutará
const PORT = 3000;
app.listen(PORT, () => {
  // Muestra que el servidor se ejecuta
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
