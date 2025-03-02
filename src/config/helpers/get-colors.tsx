import { FastAverageColor } from "fast-average-color";

export const getColorFromImage = async (imageSrc: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const fac = new FastAverageColor();
      try {
        const color = fac.getColor(img);
        resolve(color.rgb); // Devuelve en formato 'rgb(r, g, b)'
      } catch (error) {
        console.error("Error al obtener color:", error);
        reject("grey");
      }
    };

    img.onerror = () => reject("grey");
  });
};
