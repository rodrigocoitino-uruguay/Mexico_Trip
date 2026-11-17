/**
 * Foto de cada atracción, de Wikimedia Commons (licencias libres; el crédito se muestra debajo).
 * Se cargan por internet al abrir Lugares: sin señal no se ven, y el resto de la ficha sigue igual.
 * `archivo` es el nombre del archivo en Commons, tal cual; `autor` es quien la sacó.
 */
export interface FotoLugar {
  archivo: string;
  autor: string;
}

export const FOTOS: Record<string, FotoLugar> = {
  'l-antropologia': { archivo: 'Detalle del patio central del Museo Nacional de Antropología (México).jpg', autor: 'Ictandlaw' },
  'l-templo-mayor': { archivo: 'Ruinas del Templo Mayor - Centro Histórico de la Ciudad de México.jpg', autor: 'Juan Carlos Fonseca Mata' },
  'l-palacio-nacional': { archivo: 'View on the staircase with rivera mural palacio nacional.JPG', autor: 'Kgv88' },
  'l-san-ildefonso': { archivo: 'Patio Principal del Colegio de San Ildefonso.JPG', autor: 'Patricia Alzuarte Díaz' },
  'l-catedral-zocalo': { archivo: 'Mexico City Zocalo Cathedral.jpg', autor: 'Jeff Kramer' },
  'l-teotihuacan': { archivo: 'Teotihuacan, Pyramid of the Sun (20064112414).jpg', autor: 'Arian Zwegers' },
  'l-plaza-grande': { archivo: 'Mérida, Yucatán, Catedral.jpg', autor: 'Mario Morales Rubí' },
  'l-paseo-montejo': { archivo: 'Paseo de Montejo, Merida Yucatan Mexico 01.jpg', autor: 'Nils & Araceli Jonsson' },
  'l-uxmal': { archivo: 'Pirámide del Adivino-Uxmal-Yucatan-Mexico0251.JPG', autor: 'Poco a poco' },
  'l-izamal': { archivo: 'Templo y Ex Convento Franciscano San Antonio de Padua.jpg', autor: 'Andreshbz' },
  'l-san-bernardino': { archivo: 'Iglesia y Ex-Convento San Bernardino de Siena - Valladolid - Yucatan - Mexico - 02.jpg', autor: 'Adam Jones' },
  'l-chichen': { archivo: 'Chichen Itza 3.jpg', autor: 'Daniel Schwen' },
  'l-oxman': { archivo: 'Swimming in Oxman Cenote.jpg', autor: 'Bernard Dupont' },
  'l-ek-balam': { archivo: 'EK BALAM.JPG', autor: 'Marisol Narváez Quiroz' },
  'l-xcanche': { archivo: 'X-Canche Cenote - Near Ek Balam Archaeological Site - Yucatan - Mexico - 03.jpg', autor: 'Adam Jones' },
};

const COMMONS = 'https://commons.wikimedia.org/wiki';

/** Dirección de la imagen, achicada a 640 px para que cargue rápido en el celular. */
export const urlFoto = (f: FotoLugar): string => `${COMMONS}/Special:FilePath/${encodeURIComponent(f.archivo)}?width=640`;

/** Página del archivo en Commons (autor y licencia). */
export const urlPaginaFoto = (f: FotoLugar): string => `${COMMONS}/File:${encodeURIComponent(f.archivo.replace(/ /g, '_'))}`;
