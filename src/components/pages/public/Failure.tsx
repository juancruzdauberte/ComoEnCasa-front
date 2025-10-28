import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Failure = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-violet-50 to-blue-50">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -top-20 -right-40 w-80 h-80 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>

      {/* Contenedor principal con glassmorphism */}
      <div className="relative z-10 w-full max-w-5xl mx-4">
        <div
          className={`backdrop-blur-xl bg-white/80 shadow-2xl rounded-3xl p-8 md:p-16 border border-white/20 transform transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Logo y decoración */}
            <div className="flex-1 flex flex-col items-center lg:items-start gap-6">
              <div className="relative group">
                <picture className="relative">
                  <img
                    src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1749124735/LogoComoEnCasaRedondo_gwhyxu.png"
                    alt="Como en Casa Logo"
                    loading="lazy"
                    className="h-48 md:h-64 w-auto transform transition duration-500 filter grayscale-[30%]"
                  />
                </picture>
              </div>
            </div>

            {/* Contenido del error */}
            <div className="flex-1 w-full max-w-md space-y-3">
              {/* Icono de error móvil */}
              <div className="lg:hidden flex justify-center mb-6">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-orange-100 shadow-lg animate-bounce-slow">
                  <svg
                    className="w-10 h-10 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              {/* Título y mensaje */}
              <div className="text-center space-y-2 animate-slide-in-right">
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Acceso Denegado
                </h1>
              </div>

              {/* Tarjeta informativa */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-3 space-y-3 animate-fade-in-delayed">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-800">
                      ¿Por qué veo esto?
                    </h3>
                    <p className="text-sm text-gray-600">
                      Tu cuenta de Google no está autorizada para usar este
                      sistema. Solo los usuarios registrados pueden acceder.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="space-y-4 pt-4">
                <button
                  onClick={handleGoBack}
                  className="w-full bg-white/80 backdrop-blur-sm rounded-xl px-8 py-4 shadow-md border border-gray-200 flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:bg-white hover:border-blue-300"
                >
                  <svg
                    className="w-5 h-5 text-gray-600 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span className="text-base font-semibold text-gray-700">
                    Volver Atrás
                  </span>
                </button>
              </div>

              {/* Footer informativo */}
              <div className="pt-6 text-center">
                <p className="text-xs text-gray-500">
                  Código de error:{" "}
                  <span className="font-mono font-semibold">
                    403 - Acceso Prohibido
                  </span>
                </p>
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

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
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

        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 0.3s both;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
