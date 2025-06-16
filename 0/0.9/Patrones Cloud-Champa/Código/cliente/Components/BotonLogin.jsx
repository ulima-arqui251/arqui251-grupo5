function BotonLogin() {

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <button onClick={handleLogin}>
      Iniciar Sesión con Google
    </button>
  );
}

export default BotonLogin;
