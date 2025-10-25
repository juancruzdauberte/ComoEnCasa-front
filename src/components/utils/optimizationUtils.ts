/**
 * UTILIDADES DE RENDIMIENTO - Como En Casa
 * Archivo de helpers y constantes para optimización
 */

// ================================
// TIMING FUNCTIONS OPTIMIZADAS
// ================================
export const TIMING = {
  fast: 150,        // Interacciones rápidas (hover, click)
  normal: 250,      // Transiciones estándar
  slow: 400,        // Animaciones con énfasis
  modal: 300,       // Modales y overlays
} as const;

export const EASING = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',      // Material Design
  entrance: 'cubic-bezier(0, 0, 0.2, 1)',      // Elementos que entran
  exit: 'cubic-bezier(0.4, 0, 1, 1)',          // Elementos que salen
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Efecto rebote
} as const;

// ================================
// CLASES DE OPTIMIZACIÓN
// ================================
export const OPTIMIZATION_CLASSES = {
  // GPU Acceleration
  gpuAccelerated: 'gpu-accelerated',
  
  // Transiciones optimizadas
  transitionGpu: 'transition-gpu',
  transitionFast: 'transition-gpu duration-fast',
  transitionNormal: 'transition-gpu duration-normal',
  
  // Hover effects
  hoverLift: 'hover-lift',
  
  // Focus
  focusRing: 'focus-ring',
  
  // Imágenes
  imgOptimized: 'img-optimized',
  
  // Scrollbar
  scrollbarThin: 'scrollbar-thin',
} as const;

// ================================
// ANIMACIONES PREDEFINIDAS
// ================================
export const ANIMATIONS = {
  fadeIn: 'animate-fadeIn',
  slideUp: 'animate-slideUp',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  scaleIn: 'animate-scale-in',
  pulseSlow: 'animate-pulse-slow',
  expandWidth: 'animate-expandWidth',
} as const;

// ================================
// HELPERS DE CLASE
// ================================

/**
 * Combina clases de optimización con clases personalizadas
 */
export const withOptimization = (
  baseClasses: string,
  optimizations: (keyof typeof OPTIMIZATION_CLASSES)[]
): string => {
  const optClasses = optimizations.map(opt => OPTIMIZATION_CLASSES[opt]).join(' ');
  return `${baseClasses} ${optClasses}`.trim();
};

/**
 * Genera clases para un botón optimizado
 */
export const optimizedButton = (variant: 'primary' | 'secondary' | 'danger' = 'primary'): string => {
  const base = 'px-4 py-2 rounded-lg font-semibold transition-gpu duration-fast focus-ring gpu-accelerated';
  
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  
  return `${base} ${variants[variant]}`;
};

/**
 * Genera clases para un card optimizado
 */
export const optimizedCard = (): string => {
  return withOptimization(
    'rounded-xl shadow-lg border-2 border-gray-300/30 bg-white hover:shadow-2xl',
    ['gpuAccelerated', 'transitionFast', 'hoverLift']
  );
};

/**
 * Genera clases para un input optimizado
 */
export const optimizedInput = (): string => {
  return 'px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-black transition-gpu duration-fast focus-ring';
};

// ================================
// PERFORMANCE UTILITIES
// ================================

/**
 * Debounce optimizado para eventos de scroll/resize
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle optimizado para eventos continuos
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Request Animation Frame wrapper para animaciones suaves
 */
export const rafThrottle = <T extends (...args: any[]) => any>(
  func: T
): ((...args: Parameters<T>) => void) => {
  let rafId: number | null = null;
  
  return (...args: Parameters<T>) => {
    if (rafId) return;
    
    rafId = requestAnimationFrame(() => {
      func(...args);
      rafId = null;
    });
  };
};

/**
 * Detecta si el usuario prefiere movimiento reducido
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Obtiene duración de animación basada en preferencias del usuario
 */
export const getAnimationDuration = (duration: keyof typeof TIMING): number => {
  return prefersReducedMotion() ? 0 : TIMING[duration];
};

// ================================
// INTERSECTION OBSERVER UTILITIES
// ================================

/**
 * Configuración optimizada para lazy loading
 */
export const lazyLoadConfig: IntersectionObserverInit = {
  root: null,
  rootMargin: '50px',
  threshold: 0.01,
};

/**
 * Configuración para animaciones al scroll
 */
export const scrollAnimationConfig: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

// ================================
// CSS-IN-JS HELPERS
// ================================

/**
 * Genera style object para animaciones con will-change
 */
export const withWillChange = (
  properties: ('transform' | 'opacity' | 'scroll-position')[]
): React.CSSProperties => {
  return {
    willChange: properties.join(', '),
  };
};

/**
 * Genera style object para GPU acceleration
 */
export const withGPU = (): React.CSSProperties => {
  return {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    perspective: 1000,
  };
};

// ================================
// CONSTANTS PARA COMPONENTES
// ================================

export const CARD_SHADOW = {
  sm: 'shadow-sm hover:shadow-md',
  md: 'shadow-md hover:shadow-lg',
  lg: 'shadow-lg hover:shadow-2xl',
  xl: 'shadow-xl hover:shadow-2xl',
} as const;

export const BORDER_RADIUS = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
} as const;

export const TRANSITION_CLASSES = {
  colors: 'transition-colors duration-fast',
  transform: 'transition-transform duration-fast',
  all: 'transition-all duration-fast',
  gpu: 'transition-gpu duration-fast',
} as const;

// ================================
// EXPORTS
// ================================

export default {
  TIMING,
  EASING,
  OPTIMIZATION_CLASSES,
  ANIMATIONS,
  CARD_SHADOW,
  BORDER_RADIUS,
  TRANSITION_CLASSES,
  withOptimization,
  optimizedButton,
  optimizedCard,
  optimizedInput,
  debounce,
  throttle,
  rafThrottle,
  prefersReducedMotion,
  getAnimationDuration,
  lazyLoadConfig,
  scrollAnimationConfig,
  withWillChange,
  withGPU,
};
