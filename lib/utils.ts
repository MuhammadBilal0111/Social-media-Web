import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// we are defining the utility functions

export const isBase64Image = (imageData:string) => {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webpg);base64,/;
  return base64Regex.test(imageData);
};
