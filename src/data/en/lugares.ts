import type { Dia, Lugar } from '../../domain/types';

export type TextosDia = Partial<Pick<Dia, 'titulo' | 'resumen' | 'nocheTexto' | 'clima' | 'costoNota'>>;

const CLIMA_CDMX =
  'Mornings of 6 to 9 °C (43 to 48 °F) and afternoons of 22 to 24 °C (72 to 75 °F). You are at 2,240 m (7,350 ft): water, a light dinner and little alcohol for the first 48 h.';
const CLIMA_YUCATAN = '30 to 33 °C (86 to 91 °F). Hat, sunscreen and 2 liters of water at the ruins.';
const CLIMA_NORTES = 'In February there are “nortes”: the ferry can be canceled because of wind.';
const PLAYA_RESUMEN = 'To be confirmed: the idea is to spend Sunday and Monday in Playa del Carmen instead of Cancún.';
const PLAYA_NOCHE = 'Playa del Carmen, with the team (to be confirmed)';
const PLAYA_COSTO = 'Weekend: USD 175 for 3 nights (Cancún estimate, not verified for Playa del Carmen).';

export const DIAS_EN: Record<string, TextosDia> = {
  '2027-02-11': { titulo: 'Leaving Montevideo', nocheTexto: 'On the plane (Copa, stop in Panama)' },
  '2027-02-12': { titulo: 'Arrival in Mexico City, easy day', clima: CLIMA_CDMX },
  '2027-02-13': { titulo: 'National Museum of Anthropology and a night in the Center', clima: CLIMA_CDMX },
  '2027-02-14': { titulo: 'Historic Center and dance hall', clima: CLIMA_CDMX },
  '2027-02-15': { titulo: 'Teotihuacán', clima: CLIMA_CDMX },
  '2027-02-16': { titulo: 'Flight to Mérida and a night of danzón', clima: CLIMA_YUCATAN },
  '2027-02-17': { titulo: 'Uxmal', clima: CLIMA_YUCATAN },
  '2027-02-18': { titulo: 'Izamal on the way to Valladolid', clima: CLIMA_YUCATAN },
  '2027-02-19': { titulo: 'Chichén Itzá and a cenote', clima: CLIMA_YUCATAN },
  '2027-02-20': {
    titulo: 'Morning in Valladolid and bus to Cancún',
    nocheTexto: 'Cancún, with the team',
    clima: CLIMA_YUCATAN,
  },
  '2027-02-21': {
    titulo: 'Playa del Carmen with the team',
    resumen: PLAYA_RESUMEN,
    nocheTexto: PLAYA_NOCHE,
    costoNota: PLAYA_COSTO,
  },
  '2027-02-22': {
    titulo: 'Playa del Carmen with the team',
    resumen: PLAYA_RESUMEN,
    nocheTexto: PLAYA_NOCHE,
    costoNota: PLAYA_COSTO,
  },
  '2027-02-23': { titulo: 'Retreat in Cozumel', nocheTexto: 'Cozumel, retreat (paid by the company)', clima: CLIMA_NORTES },
  '2027-02-24': { titulo: 'Retreat in Cozumel', nocheTexto: 'Cozumel, retreat (paid by the company)', clima: CLIMA_NORTES },
  '2027-02-25': { titulo: 'Retreat in Cozumel', nocheTexto: 'Cozumel, retreat (paid by the company)', clima: CLIMA_NORTES },
  '2027-02-26': {
    titulo: 'Night in Cancún',
    nocheTexto: 'Cancún (only if the company does not cover it)',
    clima: CLIMA_NORTES,
    costoNota: 'USD 55, only if the company does not cover the night.',
  },
  '2027-02-27': {
    titulo: 'Night in Cancún',
    nocheTexto: 'Cancún (hostel)',
    costoNota: 'USD 50, hostel and food (estimate).',
  },
  '2027-02-28': { titulo: 'Flight home', nocheTexto: 'On the plane (LATAM, stop in Lima)' },
  '2027-03-01': { titulo: 'Arrival in Montevideo' },
};

export type TextosLugar = Partial<Pick<Lugar, 'nombre' | 'direccion' | 'entrada' | 'horario' | 'consejo'>>;

export const LUGARES_EN: Record<string, TextosLugar> = {
  // ── Atracciones ──────────────────────────────────────────
  'l-antropologia': {
    nombre: 'National Museum of Anthropology',
    horario: 'Tue to Sun, 9 a.m. to 6 p.m.; closed Monday',
    consejo: '4 h on your own. Start with the Teotihuacán and Mexica halls.',
  },
  'l-templo-mayor': {
    nombre: 'Templo Mayor and museum',
    horario: 'Tue to Sun, 9 a.m. to 5 p.m.; closed Monday',
    consejo: 'Sunday is free for Mexican citizens and it fills up from 11.',
  },
  'l-palacio-nacional': {
    nombre: 'National Palace (Rivera murals)',
    entrada: 'Free',
    horario: 'Guided tour only; sign-up from 10 a.m. at Moneda 4, with passport. They can suspend it without notice',
    consejo: 'Request a slot by email at visitas_guiadas@hacienda.gob.mx. If there is no slot: San Ildefonso.',
  },
  'l-san-ildefonso': {
    nombre: 'Antiguo Colegio de San Ildefonso',
    consejo: 'Orozco murals. It is the alternative if there is no slot at the National Palace.',
  },
  'l-catedral-zocalo': { nombre: 'Metropolitan Cathedral and Zócalo', entrada: 'Free' },
  'l-teotihuacan': {
    nombre: 'Teotihuacán',
    horario: 'Every day, 8 a.m. to 5 p.m.; last entry 4:30 p.m.; museums 9 a.m. to 4:30 p.m.',
    consejo:
      'By bus on your own. Guide at the gate MXN 800 to 1,000 per group est. It reopened with reinforced security after a shooting on Apr 20, 2026; the Pyramid of the Moon was closed until further notice according to April press.',
  },
  'l-plaza-grande': {
    nombre: 'Plaza Grande, Mérida',
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
    consejo: 'By bus on your own. Tour only if you want to add Kabah, MXN 900 to 1,300 est.',
  },
  'l-izamal': {
    nombre: 'Izamal: Kinich Kakmó and convent',
    entrada: 'Free for now',
    horario: 'Daytime; hours not verified',
    consejo: 'On your own. The Convent of San Antonio de Padua is built on top of a pyramid.',
  },
  'l-san-bernardino': {
    nombre: 'Convent of San Bernardino de Siena',
    consejo: 'Thursday from the outside at the end of Calzada de los Frailes; Saturday from the inside, in the morning light.',
  },
  'l-chichen': {
    nombre: 'Chichén Itzá',
    entrada: 'MXN 697, single payment',
    horario: 'Every day, 8 a.m. to 5 p.m.; ticket office until 4 p.m. Tickets only at the ticket office',
    consejo:
      'Certified guide MXN 1,000 to 1,300 per group est.: share one. The site has little signage. It closed for 13 days between May and June 2026 over a dispute with artisans and reopened on Jun 1: check the news the week before.',
  },
  'l-oxman': {
    nombre: 'Cenote Oxmán',
    entrada: 'MXN 150 (250 pass with food and drink)',
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
  'l-cocuyos': { consejo: 'Suadero and longaniza tacos.', entrada: 'MXN 120 to 180 est.' },
  'l-huequito': { consejo: 'Tacos al pastor.', entrada: 'MXN 150 to 200 est.' },
  'l-el-moro': { consejo: 'Churros.' },
  'l-califa': {
    entrada: 'MXN 200 to 300 est.',
    consejo: 'Stand-up taquería in San Rafael, with a Michelin star since 2024 (to be verified).',
  },
  'l-cardenal': {
    entrada: 'MXN 250 to 350 est.',
    horario: 'Opens at 8 a.m.; later there is a line',
    consejo: 'Hot chocolate and conchas with cream.',
  },
  'l-tacuba': { entrada: 'MXN 300 to 450 est.' },
  'l-dulceria-celaya': {},
  'l-ideal': {
    entrada: 'MXN 40 to 80 est.',
    consejo: 'Buy the sweet bread the day before for Monday, Feb 15 breakfast.',
  },
  'l-azul-historico': {
    entrada: 'MXN 450 to 700',
    consejo: 'On a bigger budget, for Monday dinner.',
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
    entrada: 'MXN 120 to 180 est.',
    consejo: 'Panuchos, salbutes, lime soup.',
  },
  'l-lupita': {
    entrada: 'MXN 90 to 140 est.',
    direccion: 'Santiago Market',
    consejo: 'Cochinita tacos and torta.',
  },
  'l-sorbeteria-colon': { entrada: 'MXN 50 to 70' },
  'l-chaya-maya': {
    direccion: 'Calle 55 between 60 and 62',
    entrada: 'MXN 250 to 400 est.',
    consejo: 'Poc chuc, queso relleno, lime soup.',
  },
  'l-kinich': {
    entrada: 'MXN 300 to 450 est.',
    consejo: 'Relleno negro, queso relleno, handmade tortillas.',
  },
  'l-mercado-izamal': {
    nombre: 'Izamal municipal market',
    entrada: 'MXN 80 to 120 est.',
    consejo: 'The cheap alternative to Kinich.',
  },
  'l-bazar': {
    nombre: 'Bazar Municipal (food stalls)',
    entrada: 'MXN 100 to 150 est.',
  },
  'l-meson-marques': { entrada: 'MXN 300 to 450 est.' },
  'l-mercado-valladolid': {
    nombre: 'Valladolid Municipal Market',
    entrada: 'MXN 90 to 140 est.',
    consejo: 'Lomitos de Valladolid, longaniza.',
  },
  'l-ixcatik': {
    entrada: 'MXN 350 to 500 est.',
    consejo: 'Maya cuisine.',
  },
  'l-atrio-mayab': { entrada: 'MXN 250 to 350 est.' },

  // ── Noche ────────────────────────────────────────────────
  'l-duelistas': {
    entrada: 'MXN 50 to 80 est.',
    consejo: 'Pulque. Closes early.',
  },
  'l-bosforo': {
    entrada: 'Mezcal MXN 120 to 200 each est.',
    consejo: 'Mezcal. Uber back if it is late.',
  },
  'l-zinco': { consejo: 'Jazz, if you still have energy after Bósforo.' },
  'l-salon-los-angeles': {
    direccion: 'Lerdo 206, Guerrero neighborhood',
    entrada: 'MXN 100 at the door',
    horario: 'Tuesdays and Sundays, 5 to 10 p.m.',
    consejo:
      'Danzón, salsa and cumbia with live orchestras since 1937. Check the day’s lineup on Instagram, @salonlosangeles. Arrive and leave by Uber or DiDi.',
  },
  'l-remembranzas': {
    entrada: 'Free',
    horario: 'Tuesdays, 8 p.m.',
    consejo: 'Popular dance with an orchestra.',
  },
  'l-negrita': {
    direccion: 'Calle 62 between 49',
    entrada: 'MXN 150 to 250 est.',
  },
  'l-fundacion-mezcaleria': { consejo: 'Mezcal, the alternative to La Negrita.' },
  'l-dialogos': {
    nombre: 'Video mapping “Diálogos del Conquistador”',
    entrada: 'Free',
    horario: 'Wednesdays, 8:30 p.m.',
  },
  'l-videomapping-valladolid': {
    nombre: 'Video mapping at the Convent of San Bernardino',
    entrada: 'Free',
    horario: '9:00 p.m. (time not confirmed)',
    consejo: 'On the convent façade.',
  },
};
