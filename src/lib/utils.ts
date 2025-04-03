import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ensureHttps(url: string): string {
  return url.startsWith("https://") ? url : `https://${url}`;
}

export function base64ToBlobUrl(base64: string): string | null {
  if (!base64.startsWith("data:image")) return null;

  const byteString = atob(base64.split(",")[1]);
  const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
  const arrayBuffer = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    arrayBuffer[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([arrayBuffer], { type: mimeString });
  return URL.createObjectURL(blob);
}
