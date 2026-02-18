import { jwtDecode } from "jwt-decode";
import type { User } from "../types/types";

export function isTokenNearExpiry(
  token: string,
  seconds: number = 30,
): boolean {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    const now = Math.floor(Date.now() / 1000);
    return exp - now < seconds;
  } catch {
    return true;
  }
}

export function decodeToken(token: string | undefined): User | null {
  if (!token) return null;
  const payloadBase64 = token?.split(".")[1];
  const fixedBase64 = payloadBase64.padEnd(
    payloadBase64.length + ((4 - (payloadBase64.length % 4)) % 4),
    "=",
  );

  const decodedPayload = atob(fixedBase64);
  const payload = JSON.parse(decodedPayload);
  const user: User = {
    rol: payload.rol,
    email: payload.email,
    avatar: payload.avatar,
  };

  return user;
}

export const formatTimeForInput = (time: string | null) => {
  if (!time) return "";
  return time.slice(0, 5);
};

export const formattedAmount = (amount: number | null) => {
  return Number(amount).toLocaleString("es-AR");
};

export function toLocalDateStringUTC3(date: string) {
  const d = new Date(date);
  d.setHours(d.getHours() - 3);
  return d.toISOString().split("T")[0];
}

export const playNotificationSound = () => {
  try {
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Configuración del sonido (un "ding" agradable)
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(500, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      1000,
      ctx.currentTime + 0.1,
    );

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.5);
  } catch (error) {
    console.error("Error al reproducir sonido:", error);
  }
};
