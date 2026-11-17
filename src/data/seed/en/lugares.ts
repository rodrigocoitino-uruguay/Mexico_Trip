import type { Lugar } from '../../../domain/types';
import type { Traduccion } from './tipos';

export const LUGARES_EN: Traduccion<Lugar> = {
  // ── Atracciones ──────────────────────────────────────────
  'l-antropologia': {
    nombre: 'National Museum of Anthropology',
    entrada: 'MXN 210',
    horario: 'Tue to Sun, 9 a.m. to 6 p.m.; closed Mondays',
    consejo: '4 h on your own. Start with the Teotihuacán and Mexica halls.',
  },
  'l-templo-mayor': {
    nombre: 'Templo Mayor and museum',
    entrada: 'MXN 210',
    horario: 'Tue to Sun, 9 a.m. to 5 p.m.; closed Mondays',
    consejo: 'Sunday is free for Mexicans and it gets crowded from 11.',
  },
  'l-palacio-nacional': {
    nombre: 'Palacio Nacional (Rivera murals)',
    direccion: 'Moneda 4',
    entrada: 'Free',
    horario: 'Guided tour only; sign-up from 10 a.m. at Moneda 4, with passport. They can suspend it without notice',
    consejo: 'Ask for a slot by email at visitas_guiadas@hacienda.gob.mx. If there is no slot: San Ildefonso.',
  },
  'l-san-ildefonso': {
    nombre: 'Antiguo Colegio de San Ildefonso',
    entrada: 'MXN 50 est.',
    consejo: 'Orozco murals. The alternative if there is no slot at the Palacio Nacional.',
  },
  'l-catedral-zocalo': { nombre: 'Metropolitan Cathedral and Zócalo', entrada: 'Free' },
  'l-teotihuacan': {
    nombre: 'Teotihuacán',
    entrada: 'MXN 210',
    horario: 'Every day, 8 a.m. to 5 p.m.; last entry 4:30 p.m.; museums 9 a.m. to 4:30 p.m.',
    consejo:
      'By bus, on your own. Guide at the gate MXN 800 to 1,000 per group est. Reopened with heavier security after a shooting on 4/20/2026; the Pyramid of the Moon was closed until further notice according to April press.',
  },
  'l-plaza-grande': {
    nombre: 'Plaza Grande in Mérida',
    entrada: 'Free',
    consejo: 'San Ildefonso Cathedral, Castro Pacheco murals in the Government Palace, Casa de Montejo.',
  },
  'l-paseo-montejo': {
    nombre: 'Paseo de Montejo',
    entrada: 'Free',
    consejo: 'At sunset, after Uxmal.',
  },
  'l-uxmal': {
    nombre: 'Uxmal',
    entrada: 'MXN 586 (105 INAH + 481 state)',
    horario: 'Every day, 8 a.m. to 5 p.m.; last entry 4:00 p.m.',
    consejo: 'By bus, on your own. Tour only if you want to add Kabah, MXN 900 to 1,300 est.',
  },
  'l-izamal': {
    nombre: 'Izamal: Kinich Kakmó and convent',
    entrada: 'Free for now',
    horario: 'Daytime; hours unverified',
    consejo: 'On your own. The Convent of San Antonio de Padua is built on top of a pyramid.',
  },
  'l-san-bernardino': {
    nombre: 'Convent of San Bernardino de Siena',
    entrada: 'MXN 40 est.',
    consejo: 'Thursday from the outside, at the end of the Calzada de los Frailes; Saturday inside, in the morning light.',
  },
  'l-chichen': {
    nombre: 'Chichén Itzá',
    entrada: 'MXN 697, single payment',
    horario: 'Every day, 8 a.m. to 5 p.m.; ticket office until 4 p.m. Tickets only at the ticket office',
    consejo:
      'Certified guide MXN 1,000 to 1,300 per group est.: share it. The site has little signage. It closed for 13 days between May and June 2026 over a dispute with artisans and reopened on 6/1: check the news the week before.',
  },
  'l-oxman': {
    nombre: 'Cenote Oxmán',
    direccion: 'Hacienda San Lorenzo Oxmán',
    entrada: 'MXN 150 (250 pass with consumption)',
    horario: 'Every day, 8 a.m. to 6 p.m. (other guides say 5 p.m.)',
    consejo: 'Cash.',
  },
  'l-ek-balam': {
    nombre: 'Ek Balam',
    entrada: 'MXN 691 (210 INAH + 481 state); one agency already lists MXN 709',
    horario: 'Every day, 8 a.m. to 5 p.m.; last entry 4:00 p.m.',
    consejo: '2 h on your own.',
  },
  'l-xcanche': {
    nombre: 'Cenote X’Canché',
    entrada: 'MXN 90 to 170',
    consejo: '1.5 km from Ek Balam.',
  },

  // ── Comida ───────────────────────────────────────────────
  'l-cocuyos': {
    nombre: 'Los Cocuyos',
    direccion: 'Bolívar 57',
    entrada: 'MXN 120 to 180 est.',
    consejo: 'Suadero and longaniza tacos.',
  },
  'l-huequito': {
    nombre: 'El Huequito',
    direccion: 'Ayuntamiento 21',
    entrada: 'MXN 150 to 200 est.',
    consejo: 'Tacos al pastor.',
  },
  'l-el-moro': { nombre: 'El Moro', consejo: 'Churros.' },
  'l-califa': {
    nombre: 'El Califa de León',
    direccion: 'Ribera de San Cosme 56',
    entrada: 'MXN 200 to 300 est.',
    consejo: 'Stand-up taquería in San Rafael, with a Michelin star since 2024 (verify).',
  },
  'l-cardenal': {
    nombre: 'El Cardenal',
    direccion: 'Palma 23',
    entrada: 'MXN 250 to 350 est.',
    horario: 'Opens at 8 a.m.; later there is a line',
    consejo: 'Hot chocolate and conchas with cream.',
  },
  'l-tacuba': {
    nombre: 'Café de Tacuba',
    direccion: 'Tacuba 28',
    entrada: 'MXN 300 to 450 est.',
  },
  'l-dulceria-celaya': { nombre: 'Dulcería de Celaya' },
  'l-ideal': {
    nombre: 'Pastelería Ideal',
    direccion: '16 de Septiembre 18',
    entrada: 'MXN 40 to 80 est.',
    consejo: 'Buy the pan dulce the day before for Monday 15 breakfast.',
  },
  'l-azul-historico': {
    nombre: 'Azul Histórico',
    direccion: 'Isabel la Católica 30',
    entrada: 'MXN 450 to 700',
    consejo: 'With a high budget, for Monday dinner.',
  },
  'l-la-gruta': {
    nombre: 'La Gruta (Teotihuacán)',
    entrada: 'MXN 500+',
    consejo: 'Restaurant inside a cave.',
  },
  'l-lucas-galvez': {
    nombre: 'Lucas de Gálvez Market',
    entrada: 'MXN 100 to 150 est.',
    consejo: 'Cochinita, panuchos, salbutes.',
  },
  'l-reina-itzalana': {
    nombre: 'La Reina Itzalana',
    direccion: 'Parque de Santiago',
    entrada: 'MXN 120 to 180 est.',
    consejo: 'Panuchos, salbutes, lime soup.',
  },
  'l-lupita': {
    nombre: 'Taquería La Lupita',
    direccion: 'Mercado de Santiago',
    entrada: 'MXN 90 to 140 est.',
    consejo: 'Cochinita tacos and tortas.',
  },
  'l-sorbeteria-colon': { nombre: 'Sorbetería Colón', entrada: 'MXN 50 to 70' },
  'l-chaya-maya': {
    nombre: 'La Chaya Maya',
    direccion: 'Calle 55 x 60 and 62',
    entrada: 'MXN 250 to 400 est.',
    consejo: 'Poc chuc, queso relleno, lime soup.',
  },
  'l-kinich': {
    nombre: 'Kinich',
    direccion: 'Calle 27 #299, Izamal',
    entrada: 'MXN 300 to 450 est.',
    consejo: 'Relleno negro, queso relleno, handmade tortillas.',
  },
  'l-mercado-izamal': {
    nombre: 'Izamal Municipal Market',
    entrada: 'MXN 80 to 120 est.',
    consejo: 'The cheap alternative to Kinich.',
  },
  'l-bazar': { nombre: 'Municipal Bazaar (food stalls)', entrada: 'MXN 100 to 150 est.' },
  'l-meson-marques': { nombre: 'El Mesón del Marqués', entrada: 'MXN 300 to 450 est.' },
  'l-mercado-valladolid': {
    nombre: 'Valladolid Municipal Market',
    entrada: 'MXN 90 to 140 est.',
    consejo: 'Lomitos de Valladolid, longaniza.',
  },
  'l-ixcatik': { nombre: 'IX CAT IK', entrada: 'MXN 350 to 500 est.', consejo: 'Mayan cuisine.' },
  'l-atrio-mayab': { nombre: 'El Atrio del Mayab', entrada: 'MXN 250 to 350 est.' },

  // ── Noche ────────────────────────────────────────────────
  'l-duelistas': {
    nombre: 'Las Duelistas',
    direccion: 'Aranda 28',
    entrada: 'MXN 50 to 80 est.',
    consejo: 'Pulque. Closes early.',
  },
  'l-bosforo': {
    nombre: 'Bósforo',
    direccion: 'Luis Moya 31',
    entrada: 'Mezcal MXN 120 to 200 each est.',
    consejo: 'Mezcal. Take an Uber back if it is late.',
  },
  'l-zinco': { nombre: 'Zinco', consejo: 'Jazz, if you still have energy after Bósforo.' },
  'l-salon-los-angeles': {
    nombre: 'Salón Los Ángeles',
    direccion: 'Lerdo 206, Guerrero neighborhood',
    entrada: 'MXN 100 at the door',
    horario: 'Tuesdays and Sundays, 5 to 10 p.m.',
    consejo:
      'Danzón, salsa and cumbia with live orchestras since 1937. Confirm the day’s lineup on Instagram, @salonlosangeles. Arrive and leave by Uber or DiDi.',
  },
  'l-remembranzas': {
    nombre: 'Remembranzas Musicales',
    direccion: 'Parque de Santiago',
    entrada: 'Free',
    horario: 'Tuesdays, 8 p.m.',
    consejo: 'Popular dancing with an orchestra.',
  },
  'l-negrita': {
    nombre: 'Cantina La Negrita',
    direccion: 'Calle 62 x 49',
    entrada: 'MXN 150 to 250 est.',
  },
  'l-fundacion-mezcaleria': {
    nombre: 'La Fundación Mezcalería',
    consejo: 'Mezcal, the alternative to La Negrita.',
  },
  'l-dialogos': {
    nombre: 'Video mapping "Diálogos del Conquistador"',
    direccion: 'Casa de Montejo',
    entrada: 'Free',
    horario: 'Wednesdays, 8:30 p.m.',
  },
  'l-videomapping-valladolid': {
    nombre: 'Video mapping at the Convent of San Bernardino',
    entrada: 'Free',
    horario: '9:00 p.m. (time unconfirmed)',
    consejo: 'On the convent façade.',
  },
};
