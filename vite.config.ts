import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      // Adaptación para Fully Kiosk y Android TV box antiguos (Android 7 / Chrome 50+)
      targets: ["defaults", "not IE 11", "Android >= 5", "Chrome >= 50"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // OPTIMIZACIÓN: Server optimizations
  server: {
    hmr: {
      overlay: true,
    },
  },

  // OPTIMIZACIÓN: Dependency optimization
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "zustand",
      "react-icons",
    ],
    // No excluir lucide-react, dejar que Vite lo maneje
  },

  // OPTIMIZACIÓN: CSS optimizations
  css: {
    devSourcemap: false,
  },

  // OPTIMIZACIÓN: Build optimizations (solo para producción)
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["react-icons"],
          utils: ["sonner", "zustand"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false,
  },

  // OPTIMIZACIÓN: esbuild settings
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
