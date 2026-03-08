import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function toKebabCase(str) {
  return str
    .toLowerCase()
    .trim()
    // Normalize Vietnamese diacritics to ASCII equivalents
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    // Replace spaces and special characters with hyphens
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    // Remove multiple consecutive hyphens
    .replace(/-+/g, "-")
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, "");
}
