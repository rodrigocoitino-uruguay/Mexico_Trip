/**
 * Foto de cada atracción, de Wikimedia Commons (licencias libres; el crédito se muestra debajo).
 * Se cargan por internet al abrir Lugares: sin señal no se ven, y el resto de la ficha sigue igual.
 * `archivo` es el nombre del archivo en Commons, tal cual; `autor` es quien la sacó.
 */
export interface FotoLugar {
  archivo: string;
  url: string;
  autor: string;
}

export const FOTOS: Record<string, FotoLugar> = {
  'l-antropologia': { archivo: 'Detalle del patio central del Museo Nacional de Antropología (México).jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Detalle_del_patio_central_del_Museo_Nacional_de_Antropolog%C3%ADa_(M%C3%A9xico).jpg/960px-Detalle_del_patio_central_del_Museo_Nacional_de_Antropolog%C3%ADa_(M%C3%A9xico).jpg', autor: 'Ictandlaw' },
  'l-templo-mayor': { archivo: 'Ruinas del Templo Mayor - Centro Histórico de la Ciudad de México.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Ruinas_del_Templo_Mayor_-_Centro_Hist%C3%B3rico_de_la_Ciudad_de_M%C3%A9xico.jpg/960px-Ruinas_del_Templo_Mayor_-_Centro_Hist%C3%B3rico_de_la_Ciudad_de_M%C3%A9xico.jpg', autor: 'Juan Carlos Fonseca Mata' },
  'l-palacio-nacional': { archivo: 'View on the staircase with rivera mural palacio nacional.JPG', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/View_on_the_staircase_with_rivera_mural_palacio_nacional.JPG/960px-View_on_the_staircase_with_rivera_mural_palacio_nacional.JPG', autor: 'Kgv88' },
  'l-san-ildefonso': { archivo: 'Patio Principal del Colegio de San Ildefonso.JPG', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Patio_Principal_del_Colegio_de_San_Ildefonso.JPG/960px-Patio_Principal_del_Colegio_de_San_Ildefonso.JPG', autor: 'Patricia Alzuarte Díaz' },
  'l-catedral-zocalo': { archivo: 'Mexico City Zocalo Cathedral.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Mexico_City_Zocalo_Cathedral.jpg/960px-Mexico_City_Zocalo_Cathedral.jpg', autor: 'Jeff Kramer' },
  'l-teotihuacan': { archivo: 'Teotihuacan, Pyramid of the Sun (20064112414).jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Teotihuacan,_Pyramid_of_the_Sun_(20064112414).jpg/960px-Teotihuacan,_Pyramid_of_the_Sun_(20064112414).jpg', autor: 'Arian Zwegers' },
  'l-plaza-grande': { archivo: 'Mérida, Yucatán, Catedral.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/M%C3%A9rida,_Yucat%C3%A1n,_Catedral.jpg/960px-M%C3%A9rida,_Yucat%C3%A1n,_Catedral.jpg', autor: 'Mario Morales Rubí' },
  'l-paseo-montejo': { archivo: 'Paseo de Montejo, Merida Yucatan Mexico 01.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Paseo_de_Montejo,_Merida_Yucatan_Mexico_01.jpg/960px-Paseo_de_Montejo,_Merida_Yucatan_Mexico_01.jpg', autor: 'Nils & Araceli Jonsson' },
  'l-uxmal': { archivo: 'Pirámide del Adivino-Uxmal-Yucatan-Mexico0251.JPG', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Pir%C3%A1mide_del_Adivino-Uxmal-Yucatan-Mexico0251.JPG/960px-Pir%C3%A1mide_del_Adivino-Uxmal-Yucatan-Mexico0251.JPG', autor: 'Poco a poco' },
  'l-izamal': { archivo: 'Templo y Ex Convento Franciscano San Antonio de Padua.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Templo_y_Ex_Convento_Franciscano_San_Antonio_de_Padua.jpg/960px-Templo_y_Ex_Convento_Franciscano_San_Antonio_de_Padua.jpg', autor: 'Andreshbz' },
  'l-san-bernardino': { archivo: 'Iglesia y Ex-Convento San Bernardino de Siena - Valladolid - Yucatan - Mexico - 02.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Iglesia_y_Ex-Convento_San_Bernardino_de_Siena_-_Valladolid_-_Yucatan_-_Mexico_-_02.jpg/960px-Iglesia_y_Ex-Convento_San_Bernardino_de_Siena_-_Valladolid_-_Yucatan_-_Mexico_-_02.jpg', autor: 'Adam Jones' },
  'l-chichen': { archivo: 'Chichen Itza 3.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Chichen_Itza_3.jpg/960px-Chichen_Itza_3.jpg', autor: 'Daniel Schwen' },
  'l-oxman': { archivo: 'Swimming in Oxman Cenote.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Swimming_in_Oxman_Cenote.jpg/960px-Swimming_in_Oxman_Cenote.jpg', autor: 'Bernard Dupont' },
  'l-ek-balam': { archivo: 'EK BALAM.JPG', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/EK_BALAM.JPG/960px-EK_BALAM.JPG', autor: 'Marisol Narváez Quiroz' },
  'l-xcanche': { archivo: 'X-Canche Cenote - Near Ek Balam Archaeological Site - Yucatan - Mexico - 03.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/X-Canche_Cenote_-_Near_Ek_Balam_Archaeological_Site_-_Yucatan_-_Mexico_-_03.jpg/960px-X-Canche_Cenote_-_Near_Ek_Balam_Archaeological_Site_-_Yucatan_-_Mexico_-_03.jpg', autor: 'Adam Jones' },
};

const COMMONS = 'https://commons.wikimedia.org/wiki';

/** Dirección directa de la imagen (960 px de ancho), en el servidor de imágenes de Wikimedia. */
export const urlFoto = (f: FotoLugar): string => f.url;

/** Página del archivo en Commons (autor y licencia). */
export const urlPaginaFoto = (f: FotoLugar): string => `${COMMONS}/File:${encodeURIComponent(f.archivo.replace(/ /g, '_'))}`;
