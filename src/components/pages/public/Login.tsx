import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  const handleLogin = () => {
    return (window.location.href = `${
      import.meta.env.VITE_API_URL
    }/auth/callback`);
  };

  return (
    <section className="flex items-center justify-center min-h-svh">
      <div className="bg-black/5 shadow-lg rounded-sm px-20 py-16 w-full max-w-4xl flex items-center justify-between gap-8">
        <div>
          <picture>
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1749124735/LogoComoEnCasaRedondo_gwhyxu.png"
              alt="logo"
              loading="lazy"
              className="h-56"
            />
          </picture>
        </div>

        <div className="flex flex-col gap-10">
          <h1 className="text-5xl text-center font-bold">Iniciar Sesión</h1>
          <button
            className="bg-white p-2 font-semibold flex items-center justify-center gap-2 w-full rounded shadow-sm transition duration-200
             hover:bg-gray-100 "
            onClick={handleLogin}
          >
            <FcGoogle size={30} />
            <p className="text-xl">Continuar con google</p>
          </button>
        </div>
      </div>
    </section>
  );
};
