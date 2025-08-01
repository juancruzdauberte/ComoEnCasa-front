import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  const handleLogin = () => {
    return (window.location.href = `${
      import.meta.env.VITE_API_URL
    }/auth/callback`);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-svh">
      <div>
        <picture>
          <img
            src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1749124735/LogoComoEnCasaRedondo_gwhyxu.png"
            alt="logo"
            loading="lazy"
            className="h-48"
          />
        </picture>
      </div>

      <div>
        <h1 className="text-xl text-center">Iniciar Sesión</h1>
        <button
          className="bg-red-500 text-white p-2 font-semibold flex items-center gap-2"
          onClick={handleLogin}
        >
          <FcGoogle /> Continuar con google
        </button>
      </div>
    </section>
  );
};
