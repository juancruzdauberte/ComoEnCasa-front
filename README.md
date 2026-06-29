# ComoEnCasa - Frontend

Bienvenido a la documentación del frontend de **ComoEnCasa**. Este proyecto es una plataforma moderna construida con React diseñada para ofrecer una experiencia de usuario fluida y eficiente en la gestión de reservas y servicios.

> ⚠️ **Aviso de Privacidad**: Este es un proyecto de código cerrado (source-available para uso interno). No está permitida la clonación pública ni la colaboración externa sin autorización expresa.

## 💻 Stack Tecnológico

El proyecto está construido sobre las siguientes tecnologías y librerías clave:

### Core & Build

- **[React 19](https://react.dev/)**: Biblioteca principal para la interfaz de usuario.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático para mayor robustez y mantenibilidad.
- **[Vite](https://vitejs.dev/)**: Entorno de desarrollo ultrarrápido y bundler.

### Estado y Datos

- **[Zustand](https://github.com/pmndrs/zustand)**: Gestión de estado global ligero y escalable.
- **[TanStack Query](https://tanstack.com/query/latest)**: Manejo potente de estado asíncrono y caché de servidor.
- **[Axios](https://axios-http.com/)**: Cliente HTTP para comunicación con el backend.

### UI & Estilos

- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de utilidades para diseño rápido y responsivo.
- **[Radix UI](https://www.radix-ui.com/)**: Primitivas de componentes accesibles y sin estilos.
- **[Lucide React](https://lucide.dev/)**: Colección de iconos vectoriales consistentes.
- **Sonner**: Notificaciones toast elegantes y personalizables.

### Enrutamiento

- **[React Router DOM](https://reactrouter.com/)**: Gestión de navegación client-side.

## 📂 Arquitectura del Proyecto

La estructura del código fuente (`/src`) sigue una organización modular:

```text
src/
├── components/      # Componentes de UI reutilizables
│   ├── pages/       # Vistas de la aplicación
│   │   ├── admin    # Panel de administración
│   │   ├── user     # Área de usuario autenticado
│   │   └── public   # Páginas de acceso público
│   └── ui/          # Componentes base (botones, inputs, etc.)
├── services/        # Capa de integración con API externa
├── store/           # Stores globales de Zustand
├── hooks/           # Custom hooks para lógica compartida
├── config/          # Configuraciones globales (ej. Axios)
└── layouts/         # Estructuras de diseño base (Headers, Sidebars)
```
