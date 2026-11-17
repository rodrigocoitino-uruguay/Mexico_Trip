import type { Actividad } from '../../../domain/types';
import type { Traduccion } from './tipos';

/** Las horas ('9:00–13:30') no se traducen acá: la app las muestra en formato 12 h al leerlas. */
export const ACTIVIDADES_EN: Traduccion<Actividad> = {
  // ── Thu 2/11 ─────────────────────────────────────────────
  '2027-02-11-01': {
    titulo: 'Ride to Carrasco airport',
    descripcion: 'You leave home on Thursday night for the Copa flight at 3:06 a.m. on Friday 2/12.',
    comoLlegar: 'Arrange the overnight ride (it is in Bookings).',
  },

  // ── Fri 2/12 ─────────────────────────────────────────────
  '2027-02-12-01': {
    titulo: 'Landing at AICM',
    descripcion: 'Immigration and a bank ATM. Copa usually operates from Terminal 1; confirm.',
    costoTexto: 'ATM fee MXN 35 to 100 est.',
  },
  '2027-02-12-02': {
    titulo: 'Ride to the hostel in the Centro Histórico',
    descripcion: 'Metrobús Line 4, Quetzalcóatl route, the bus that says Amajac.',
    comoLlegar: 'Metrobús Line 4 (Quetzalcóatl route, Amajac), 40 to 50 min. Alternative: Uber, 30 to 50 min.',
    costoTexto: 'MXN 30 plus card MXN 15 est.; Uber MXN 150 to 250 est.',
  },
  '2027-02-12-03': {
    titulo: 'Check-in, shower and nap',
    descripcion: 'A 40-minute nap at most.',
  },
  '2027-02-12-04': {
    titulo: 'Short walk around the Centro',
    descripcion: 'Madero street, the Zócalo, the Cathedral from the outside.',
    comoLlegar: 'On foot.',
    costoTexto: 'Free',
  },
  '2027-02-12-05': {
    titulo: 'Light dinner',
    descripcion: 'Tacos at Los Cocuyos or El Huequito; churros at El Moro.',
    comoLlegar: 'On foot.',
    costoTexto: 'MXN 150 to 250 est.',
  },
  '2027-02-12-06': {
    titulo: 'Early to bed',
    descripcion: 'Lots of water and no alcohol today: you are at 2,240 m (7,350 ft).',
  },

  // ── Sat 2/13 ─────────────────────────────────────────────
  '2027-02-13-01': {
    titulo: 'Breakfast at the hostel',
    descripcion: 'Included at Massiosare.',
    costoTexto: 'Included',
  },
  '2027-02-13-02': {
    titulo: 'National Museum of Anthropology',
    descripcion: 'The Teotihuacán, Mexica, Oaxaca and Maya halls. Saturday is less crowded than Sunday.',
    comoLlegar: 'Metrobús Line 7 along Reforma to the Antropología stop, or Metro Auditorio.',
    costoTexto: 'MXN 210; transport MXN 6',
  },
  '2027-02-13-03': {
    titulo: 'Tacos at El Califa de León',
    descripcion:
      'Stand-up taquería in San Rafael, with a Michelin star since 2024 (verify). Alternative: street stalls in front of the museum.',
    comoLlegar: 'Uber, 15 min.',
    costoTexto: 'MXN 200 to 300 est.; Uber MXN 90 est.',
  },
  '2027-02-13-04': {
    titulo: 'Rest at the hostel',
    comoLlegar: 'Metro San Cosme to Bellas Artes.',
    costoTexto: 'MXN 5',
  },
  '2027-02-13-05': {
    titulo: 'Pulque at Las Duelistas',
    descripcion: 'Closes early.',
    comoLlegar: 'On foot.',
    costoTexto: 'MXN 50 to 80 est.',
  },
  '2027-02-13-06': {
    titulo: 'Suadero and longaniza tacos at Los Cocuyos',
    comoLlegar: 'On foot.',
    costoTexto: 'MXN 120 to 180 est.',
  },
  '2027-02-13-07': {
    titulo: 'Mezcal at Bósforo',
    descripcion: 'If you still have energy, jazz at Zinco.',
    comoLlegar: 'On foot; Uber back if it is late.',
    costoTexto: 'Mezcal MXN 120 to 200 each est.',
  },

  // ── Sun 2/14 ─────────────────────────────────────────────
  '2027-02-14-01': {
    titulo: 'Breakfast at El Cardenal',
    descripcion: 'Palma 23: hot chocolate, conchas with cream.',
    comoLlegar: 'On foot.',
    costoTexto: 'MXN 250 to 350 est.',
  },
  '2027-02-14-02': {
    titulo: 'Templo Mayor and its museum',
    descripcion: 'Sunday is free for Mexicans: get in at 9 sharp.',
    comoLlegar: 'On foot.',
    costoTexto: 'MXN 210',
  },
  '2027-02-14-03': {
    titulo: 'Metropolitan Cathedral and the Zócalo',
    comoLlegar: 'On foot.',
    costoTexto: 'Free',
  },
  '2027-02-14-04': {
    titulo: 'Murals',
    descripcion:
      'Palacio Nacional if there is a slot (sign-up with passport at Moneda 4 from 10 a.m.) or the Antiguo Colegio de San Ildefonso.',
    costoTexto: 'Free; San Ildefonso MXN 50 est.',
  },
  '2027-02-14-05': {
    titulo: 'Set lunch (comida corrida)',
    descripcion: 'At a fonda in the Centro, or Café de Tacuba.',
    costoTexto: 'MXN 120 to 180 est.; Tacuba MXN 300 to 450 est.',
  },
  '2027-02-14-06': {
    titulo: 'Casa de los Azulejos, Palacio Postal, Bellas Artes and the Alameda',
    descripcion: 'Bellas Artes from the outside.',
    comoLlegar: 'On foot.',
    costoTexto: 'Free',
  },
  '2027-02-14-07': {
    titulo: 'Rest at the hostel',
  },
  '2027-02-14-08': {
    titulo: 'Tacos al pastor at El Huequito',
    comoLlegar: 'On foot.',
    costoTexto: 'MXN 150 to 200 est.',
  },
  '2027-02-14-09': {
    titulo: 'Salón Los Ángeles',
    descripcion:
      'Lerdo 206, Guerrero neighborhood: danzón, salsa and cumbia with live orchestras since 1937. On Sundays it opens at 5 p.m. You can go just to watch. If you are not in the mood, the night stays free. Heads up: it is Valentine’s Day and restaurants fill up at night.',
    comoLlegar: 'Uber, 10 min, round trip.',
    costoTexto: 'Entry MXN 100; Uber MXN 70 to 100 each way est.',
  },

  // ── Mon 2/15 ─────────────────────────────────────────────
  '2027-02-15-01': {
    titulo: 'Quick breakfast',
    descripcion: 'Pan dulce bought the day before at Pastelería Ideal (16 de Septiembre 18).',
    costoTexto: 'MXN 40 to 80 est.',
  },
  '2027-02-15-02': {
    titulo: 'To the Terminal del Norte',
    comoLlegar: 'Metro to Autobuses del Norte (line 5) or Uber.',
    costoTexto: 'MXN 5; Uber MXN 90 to 130 est.',
  },
  '2027-02-15-03': {
    titulo: 'Bus to "Pirámides"',
    descripcion: 'Autobuses Teotihuacán; ask to get off at Gate 1. Bay 8, leaves every 15 to 20 min.',
    comoLlegar: '1 h.',
    costoTexto: 'MXN 75 each way, cash',
  },
  '2027-02-15-04': {
    titulo: 'Teotihuacán archaeological site',
    descripcion:
      'Ciudadela and Temple of Quetzalcóatl, Avenue of the Dead, Pyramid of the Sun, Plaza of the Moon, Palace of Quetzalpapálotl and the museum (opens at 9:00 a.m.). Climbing the pyramids is not allowed.',
    comoLlegar: 'Enter through Gate 1 and leave through Gate 2 or 3.',
    costoTexto: 'MXN 210',
  },
  '2027-02-15-05': {
    titulo: 'Lunch outside Gate 2',
    descripcion: 'A local restaurant outside Gate 2. (La Gruta, inside a cave, MXN 500+.)',
    costoTexto: 'MXN 150 to 250 est.',
  },
  '2027-02-15-06': {
    titulo: 'Bus back',
    descripcion: 'From Gate 2.',
    comoLlegar: '1 h.',
    costoTexto: 'MXN 75',
  },
  '2027-02-15-07': {
    titulo: 'Rest and pack your bag',
  },
  '2027-02-15-08': {
    titulo: 'Quiet dinner',
    descripcion:
      'Pozole or tacos; mezcal optional. (With a high budget: Azul Histórico, Isabel la Católica 30, MXN 450 to 700.)',
    costoTexto: 'MXN 200 to 350 est.',
  },

  // ── Tue 2/16 ─────────────────────────────────────────────
  '2027-02-16-01': {
    titulo: 'To AICM',
    descripcion: 'Fly from AICM (MEX), not from AIFA.',
    comoLlegar: 'Metrobús Line 4 from the Centro or Uber.',
    costoTexto: 'MXN 30; Uber MXN 150 to 250 est.',
  },
  '2027-02-16-02': {
    titulo: 'Flight MEX → MID',
    descripcion: '2 h. Coffee and bread at the airport.',
    costoTexto: 'MXN 1,300 to 2,300 with carry-on; coffee and bread MXN 80 to 120',
  },
  '2027-02-16-03': {
    titulo: 'Mérida airport to the Centro',
    descripcion: 'Va y Ven bus, Airport route; ticket at the ADO counter.',
    costoTexto: 'MXN 45',
  },
  '2027-02-16-04': {
    titulo: 'Drop your bag and eat at Lucas de Gálvez',
    descripcion: 'Lucas de Gálvez Market: cochinita, panuchos, salbutes.',
    costoTexto: 'MXN 100 to 150 est.',
  },
  '2027-02-16-05': {
    titulo: 'Nap and laundry',
    descripcion: 'A nap (86 to 91 °F) and clothes to the laundromat.',
    costoTexto: 'MXN 100 to 150 est.',
  },
  '2027-02-16-06': {
    titulo: 'Plaza Grande',
    descripcion: 'San Ildefonso Cathedral, Castro Pacheco murals in the Government Palace, Casa de Montejo.',
    comoLlegar: 'On foot.',
    costoTexto: 'Free',
  },
  '2027-02-16-07': {
    titulo: 'Uxmal ticket at the TAME terminal',
    descripcion: "Buy tomorrow's round-trip ticket to Uxmal.",
    comoLlegar: 'TAME terminal, Calle 69 x 68 and 70.',
    costoTexto: 'MXN 200',
  },
  '2027-02-16-08': {
    titulo: 'Dinner at La Reina Itzalana',
    descripcion: 'Parque de Santiago: panuchos, salbutes, lime soup.',
    costoTexto: 'MXN 120 to 180 est.',
  },
  '2027-02-16-09': {
    titulo: 'Remembranzas Musicales',
    descripcion: 'Popular dancing with an orchestra in Parque de Santiago.',
    costoTexto: 'Free',
  },
  '2027-02-16-10': {
    titulo: 'Cantina La Negrita or La Fundación Mezcalería',
    descripcion: 'La Negrita (Calle 62 x 49) or mezcal at La Fundación Mezcalería. Marquesita for dessert.',
    costoTexto: 'MXN 150 to 250 est.; marquesita MXN 40 to 60',
  },

  // ── Wed 2/17 ─────────────────────────────────────────────
  '2027-02-17-01': {
    titulo: 'Breakfast at Taquería La Lupita',
    descripcion: 'Cochinita tacos and torta, Mercado de Santiago.',
    costoTexto: 'MXN 90 to 140 est.',
  },
  '2027-02-17-02': {
    titulo: 'Bus to Uxmal',
    descripcion: 'Second-class bus (SUR line). Departures are around 6:00, 8:00 and 9:00 a.m.: confirm the day before.',
    comoLlegar: 'TAME terminal; 1 h 15 min; drops you a 10-minute walk from the entrance.',
    costoTexto: 'Paid the day before',
  },
  '2027-02-17-03': {
    titulo: 'Uxmal',
    descripcion: 'Pyramid of the Magician, Nunnery Quadrangle, Governor’s Palace, Great Pyramid.',
    costoTexto: 'MXN 586',
  },
  '2027-02-17-04': {
    titulo: 'Lunch brought from Mérida',
    descripcion: 'A torta, fruit, water. (Uxmal restaurants charge MXN 250 to 400.)',
    costoTexto: 'MXN 80 to 120 est.',
  },
  '2027-02-17-05': {
    titulo: 'Wait for the bus back',
    descripcion: 'On the roadside, with a 20-minute margin (it passes around 3:30 and 5:00 p.m.).',
  },
  '2027-02-17-06': {
    titulo: 'Mérida: shower, sorbet and Paseo de Montejo',
    descripcion: 'Shower, sorbet at Sorbetería Colón and Paseo de Montejo at sunset.',
    costoTexto: 'Sorbet MXN 50 to 70',
  },
  '2027-02-17-07': {
    titulo: 'Dinner at La Chaya Maya',
    descripcion: 'Calle 55 x 60 and 62: poc chuc, queso relleno, lime soup.',
    costoTexto: 'MXN 250 to 400 est.',
  },
  '2027-02-17-08': {
    titulo: 'Video mapping "Diálogos del Conquistador"',
    descripcion: 'At the Casa de Montejo.',
    costoTexto: 'Free',
  },

  // ── Thu 2/18 ─────────────────────────────────────────────
  '2027-02-18-01': {
    titulo: 'Breakfast at the hostel',
    descripcion: 'Included at Casa Garza.',
    costoTexto: 'Included',
  },
  '2027-02-18-02': {
    titulo: 'Bus to Izamal',
    descripcion: 'Autobuses del Centro (Calle 46 x 65 and 67, every hour) or Noreste (Calle 67 x 50).',
    comoLlegar: '1 h 15 to 1 h 40.',
    costoTexto: 'MXN 44 to 50',
  },
  '2027-02-18-03': {
    titulo: 'Izamal',
    descripcion:
      'Convent of San Antonio de Padua, built on top of a pyramid; the Kinich Kakmó pyramid; yellow streets. Ask to leave your backpack at the terminal or the restaurant.',
    comoLlegar: 'On foot.',
    costoTexto: 'Free',
  },
  '2027-02-18-04': {
    titulo: 'Lunch at Kinich',
    descripcion:
      'Calle 27 #299: relleno negro, queso relleno, handmade tortillas. Cheap alternative: the municipal market.',
    costoTexto: 'MXN 300 to 450 est.; market MXN 80 to 120 est.',
  },
  '2027-02-18-05': {
    titulo: 'Oriente bus from Izamal to Valladolid',
    descripcion: 'Also leaves at 3:44 and 6:25 p.m.',
    comoLlegar: '2 h 30.',
    costoTexto: 'MXN 95 to 105',
  },
  '2027-02-18-06': {
    titulo: 'Check-in in Valladolid',
    comoLlegar: 'On foot from the terminal.',
  },
  '2027-02-18-07': {
    titulo: 'Main square, San Servacio and the Calzada de los Frailes',
    descripcion:
      'Main square, the San Servacio church and the Calzada de los Frailes to the Convent of San Bernardino de Siena.',
    comoLlegar: 'On foot.',
    costoTexto: 'Free',
  },
  '2027-02-18-08': {
    titulo: 'Dinner at the Municipal Bazaar or El Mesón del Marqués',
    descripcion: 'Food stalls at the Municipal Bazaar or El Mesón del Marqués.',
    costoTexto: 'MXN 100 to 150 est.; Mesón MXN 300 to 450 est.',
  },
  '2027-02-18-09': {
    titulo: 'Video mapping at the convent',
    descripcion: 'On the convent façade (time unconfirmed).',
    costoTexto: 'Free',
  },

  // ── Fri 2/19 ─────────────────────────────────────────────
  '2027-02-19-01': {
    titulo: 'Fruit and bread before the colectivo',
    descripcion: 'Hostel breakfast usually starts after 7.',
  },
  '2027-02-19-02': {
    titulo: 'Colectivo to Chichén Itzá',
    descripcion: 'Leaves every 30 min from 7 a.m.',
    comoLlegar: 'From Calle 39 between 44 and 46; 45 min.',
    costoTexto: 'MXN 40 to 50 each way, cash',
  },
  '2027-02-19-03': {
    titulo: 'Chichén Itzá at opening',
    descripcion:
      'El Castillo, Ball Court, Temple of the Warriors, Sacred Cenote, Observatory. The tours from Cancún arrive from 10. Certified guide at the entrance: share one with other travelers.',
    costoTexto: 'MXN 697, single payment at the ticket office; guide MXN 1,000 to 1,300 per group est.',
  },
  '2027-02-19-04': {
    titulo: 'Colectivo back',
    descripcion: 'The last one leaves around 4:30 p.m.',
    comoLlegar: '45 min.',
    costoTexto: 'MXN 40 to 50',
  },
  '2027-02-19-05': {
    titulo: 'Lunch at the Municipal Market',
    descripcion: 'Lomitos de Valladolid, longaniza.',
    costoTexto: 'MXN 90 to 140 est.',
  },
  '2027-02-19-06': {
    titulo: 'Nap',
  },
  '2027-02-19-07': {
    titulo: 'Cenote Oxmán',
    descripcion:
      'At the Hacienda San Lorenzo Oxmán: open to the sky, about 20 m (65 ft) below ground level, with roots hanging down to the water, a rope swing and the hacienda pool afterwards. By then the tour groups have left.',
    comoLlegar: 'Hostel bike, 5 km; by taxi, agree on the ride back because there are no taxis waiting at the hacienda.',
    costoTexto:
      'Entry MXN 150 (there is a MXN 250 pass with consumption); bike MXN 100 to 150 est.; taxi MXN 70 to 80 each way. Cash.',
  },
  '2027-02-19-08': {
    titulo: 'Mayan cuisine dinner',
    descripcion: 'IX CAT IK or El Atrio del Mayab.',
    costoTexto: 'IX CAT IK MXN 350 to 500 est.; El Atrio del Mayab MXN 250 to 350 est.',
  },

  // ── Sat 2/20 ─────────────────────────────────────────────
  '2027-02-20-01': {
    titulo: 'Ek Balam and Cenote X’Canché (+USD 56)',
    descripcion:
      'Colectivo at 7:15 a.m. from Calle 44 between 35 and 37; visit from 8 to 10 (you can still climb the Acropolis according to 2026 reports); Cenote X’Canché 1.5 km away, and the 2:10 p.m. ADO, which reaches Cancún at 5:40 p.m. If activated, it replaces the morning in Valladolid.',
    comoLlegar: 'Colectivo from Calle 44 between 35 and 37, 30 to 40 min.',
    costoTexto: 'Colectivo MXN 50 to 70 each way; entry MXN 691; X’Canché MXN 90 to 170',
  },
  '2027-02-20-02': {
    titulo: 'Unhurried breakfast at the hostel',
    descripcion: 'Included at La Candelaria.',
    costoTexto: 'Included',
  },
  '2027-02-20-03': {
    titulo: 'Convent of San Bernardino de Siena, inside',
    descripcion: 'And the Calzada de los Frailes in the morning light.',
    costoTexto: 'MXN 40 est.',
  },
  '2027-02-20-04': {
    titulo: 'Coffee, market and pick up your backpack',
    descripcion: 'Buy something at the market for the bus.',
    costoTexto: 'MXN 60 to 100 est.; food for the bus MXN 120 to 180',
  },
  '2027-02-20-05': {
    titulo: 'ADO from Valladolid to downtown Cancún',
    descripcion: 'Confirm the exact time when you buy the ticket.',
    comoLlegar: 'From the ADO terminal (Calle 39 x 46); 2 h 15 to 2 h 30.',
    costoTexto: 'MXN 270 to 420',
  },
  '2027-02-20-06': {
    titulo: 'Arrival in Cancún',
    descripcion:
      'On Quintana Roo time, which is 1 h ahead. If the team is in the hotel zone, it is 20 to 30 more minutes by R-1 city bus or taxi.',
  },

  // ── Sun 2/21 and Mon 2/22 ───────────────────────────────
  '2027-02-21-01': {
    titulo: 'Playa del Carmen with the team',
    descripcion: 'Weekend with the team in Playa del Carmen (to be confirmed with friends). No detailed plan.',
    costoTexto: 'Weekend: USD 175 for 3 nights (estimate, unverified)',
  },
  '2027-02-22-01': {
    titulo: 'Playa del Carmen with the team',
    descripcion: 'Weekend with the team in Playa del Carmen (to be confirmed with friends). No detailed plan.',
    costoTexto: 'Weekend: USD 175 for 3 nights (estimate, unverified)',
  },

  // ── Retreat in Cozumel ───────────────────────────────────
  '2027-02-23-01': {
    titulo: 'Transfer Cancún → Cozumel',
    descripcion: 'Paid by the company. In February there are "nortes" and the ferry can be canceled because of wind.',
  },
  '2027-02-23-02': {
    titulo: 'Company retreat',
    descripcion: 'Lodging and food paid by the company.',
  },
  '2027-02-24-01': {
    titulo: 'Company retreat',
    descripcion: 'Lodging and food paid by the company.',
  },
  '2027-02-25-01': {
    titulo: 'Company retreat',
    descripcion: 'Lodging and food paid by the company.',
  },
  '2027-02-26-01': {
    titulo: 'Night in Cancún',
    descripcion: 'The retreat ends. You pay for this night yourself: the company does not cover it.',
    costoTexto: 'USD 55',
  },
  '2027-02-27-01': {
    titulo: 'Night in Cancún',
    descripcion: 'Hostel and food.',
    costoTexto: 'USD 50, hostel and food (estimate)',
  },
  '2027-02-28-01': {
    titulo: 'LATAM flight Cancún → Montevideo',
    descripcion: 'Light fare, carry-on only. 12 h 30 min with one stop in Lima. Lands Monday 3/1 at 6:40 a.m.',
    costoTexto: 'Paid by the company',
  },
  '2027-03-01-01': {
    titulo: 'Arrival in Montevideo',
    descripcion: 'Approved day off.',
  },
};
