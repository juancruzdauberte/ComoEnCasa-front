import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export const Login = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = () => {
    setIsAuthenticating(true);
    return (window.location.href = `${
      import.meta.env.VITE_API_URL
    }/auth/callback`);
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-violet-50 via-blue-50 to-violet-100">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -top-20 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-violet-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Contenedor principal con glassmorphism */}
      <div className="relative z-10 w-full max-w-6xl mx-4">
        <div className="backdrop-blur-xl bg-white/80 shadow-2xl rounded-3xl p-8 md:p-16 border border-white/20 transform transition-all duration-500 hover:scale-[1.01] hover:shadow-3xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Logo y marca */}
            <div className="flex-1 flex flex-col items-center lg:items-start gap-6 animate-fade-in">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-violet-400 to-blue-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition duration-500"></div>
                <picture className="relative">
                  <img
                    src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1749124735/LogoComoEnCasaRedondo_gwhyxu.png"
                    alt="Como en Casa Logo"
                    loading="lazy"
                    className="h-48 md:h-64 w-auto transform transition duration-500 group-hover:scale-105"
                  />
                </picture>
              </div>

              <div className="text-center lg:text-left space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Bienvenido de vuelta
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Gestiona tu negocio con facilidad
                </p>
              </div>
            </div>

            {/* Formulario de login */}
            <div className="flex-1 w-full max-w-md space-y-8 animate-slide-in-right">
              <div className="text-center space-y-3">
                <h1 className="text-4xl md:text-5xl font-extrabold text-black bg-clip-text">
                  Iniciar Sesión
                </h1>
                <p className="text-gray-600">
                  Accede a tu cuenta de forma segura
                </p>
              </div>

              {/* Botón de Google mejorado con spinner */}
              <div className="space-y-4">
                <button
                  className="relative w-full group"
                  onClick={handleLogin}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  disabled={isAuthenticating}
                >
                  {/* Fondo con gradiente animado */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl blur transition duration-300 ${
                      isAuthenticating
                        ? "opacity-40 animate-pulse"
                        : "opacity-25 group-hover:opacity-40"
                    }`}
                  ></div>

                  {/* Botón principal */}
                  <div
                    className={`relative bg-white rounded-xl px-8 py-4 shadow-lg border border-gray-200 flex items-center justify-center gap-4 transition-all duration-300 ${
                      isAuthenticating
                        ? "cursor-not-allowed opacity-90"
                        : "group-hover:shadow-xl group-hover:scale-[1.02] group-hover:border-violet-300 cursor-pointer"
                    }`}
                  >
                    {/* Spinner de carga */}
                    {isAuthenticating ? (
                      <>
                        <div className="relative">
                          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                          <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-t-blue-400 rounded-full animate-spin-slow"></div>
                        </div>
                        <span className="text-lg md:text-xl font-semibold text-gray-700 animate-pulse">
                          Autenticando...
                        </span>
                      </>
                    ) : (
                      <>
                        {/* Icono de Google con animación */}
                        <div className="relative">
                          <FcGoogle
                            size={32}
                            className={`transform transition-all duration-300 ${
                              isHovered && "scale-110"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                            isHovered ? "text-black font-bold" : "text-gray-800"
                          }`}
                        >
                          Continuar con Google
                        </span>
                      </>
                    )}
                  </div>
                </button>
              </div>

              {/* Elementos decorativos adicionales */}
              <div className="relative ">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-gray-500 backdrop-blur-sm rounded-full">
                    Seguro y protegido
                  </span>
                </div>
              </div>

              {/* Iconos de seguridad */}
              <div className="flex justify-center gap-6 pt-4 opacity-60">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs text-gray-600">Encriptado</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs text-gray-600">Verificado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos personalizados para animaciones */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </section>
  );
};
