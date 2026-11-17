import type { InfoSeccion, PlanB } from '../../../domain/types';
import type { Traduccion } from './tipos';

export const INFO_EN: Traduccion<InfoSeccion> = {
  'i-ingreso': {
    titulo: 'Entering Mexico',
    items: [
      'With a Uruguayan passport you do not need a visa for tourist stays of up to 180 days.',
      'Your passport must be valid for the whole stay; airlines usually ask for 6 months.',
      'Immigration may ask for your exit ticket, proof of lodging and proof of funds: keep the LATAM ticket for 2/28, the hostel booking and the retreat invitation on your phone.',
      'At airports the FMM form was replaced by a passport stamp. Check how many days they write down: you need 17.',
      'Quintana Roo Visitax: about MXN 285 per foreigner at visitax.gob.mx; at the Cancún airport it costs MXN 525.',
    ],
  },
  'i-dinero': {
    titulo: 'Money',
    items: [
      'Cash is a must for the Teotihuacán bus, second-class buses, colectivos, markets, street stalls, cenotes and tips: about MXN 7,500 for the week (central plan).',
      'Card for hostels, ADO, the flight, Uber, restaurants and the Chichén Itzá ticket office.',
      'Use bank ATMs (BBVA, Banorte, Santander, Citibanamex, HSBC) inside branches or shopping centers. Decline the currency conversion the ATM offers.',
      'Better 2 large withdrawals than several small ones. MXN 3,000 on arrival is enough. Do not exchange money at the airport.',
      'Tips: 10 to 15% in sit-down restaurants; not expected at stalls and taquerías.',
    ],
  },
  'i-conexion': {
    titulo: 'Connectivity',
    items: [
      '10 GB eSIM for 30 days: USD 16 to 26; pick one that uses the Telcel network (the best in inland Yucatán).',
      'Download offline maps of Mexico City, Mérida and Valladolid.',
    ],
  },
  'i-seguridad': {
    titulo: 'Safety and health',
    items: [
      'Mexico City Centro Histórico: fine by day; at night stick to lit streets with people (Madero, 5 de Mayo, 16 de Septiembre, Regina). Do not walk toward Tepito, La Lagunilla or La Merced.',
      'Salón Los Ángeles (Guerrero neighborhood): arrive and leave by Uber or DiDi.',
      'Metro and Metrobús are safe by day; keep your phone in a front pocket. At night, take an Uber. Do not hail taxis on the street.',
      'Mérida and Valladolid are among the calmest cities in the country; the real risk is the heat: hat, sunscreen and 2 liters of water at the ruins.',
      'Altitude in Mexico City: water, a light dinner and little alcohol for the first 48 h. Mornings of 6 to 9 °C and afternoons of 22 to 24 °C. In Yucatán, 30 to 33 °C.',
      'Bring loperamide and oral rehydration salts. At cenotes, shower before entering and use biodegradable sunscreen or none. Insect repellent for the ruins.',
      'To look after your stomach: busy stalls with food made on the spot, sauces in small amounts, bottled water and no raw seafood on the street.',
    ],
  },
  'i-seguro': {
    titulo: 'Insurance',
    items: [
      'Buy travel insurance for 2/11 to 3/1, before 2/5/2027.',
      'Get quotes from Protege tu Viaje and BSE Viajeros, with USD 40,000 or more of medical coverage and no deductible; estimated USD 40 to 80 for 19 days.',
      'Check with the company whether the retreat includes insurance.',
      'Insurance is separate and does not count toward the USD 1,000 cap.',
    ],
  },
  'i-equipaje': {
    titulo: 'Luggage',
    items: [
      'Real limit: 10 kg carry-on (Viva and Volaris weigh it).',
      'Clothes for 5 days and laundry in Mérida on Tuesday 16.',
      'Two climates: a light jacket and layers for Mexico City; light clothes, a hat and swimwear for Yucatán.',
      'Plug adapter type A/B (127 V).',
      'Padlock, earplugs, eye mask, quick-dry towel and a waterproof pouch for your phone.',
      'A backpack beats a wheeled suitcase. Buy sunscreen there (liquids up to 100 ml in the cabin).',
    ],
  },
  'i-cierres': {
    titulo: 'Closures and events, Feb 12 to 20',
    items: [
      'Monday 2/15: the Anthropology Museum, Templo Mayor, Chapultepec Castle and almost all Mexico City museums are closed.',
      'Sunday 2/14: museums and INAH sites are free for Mexicans and residents (more crowds); Valentine’s Day.',
      'No public holiday falls during the week.',
      'Mérida Carnival 2027: should run from 2/3 to 2/10 and end before you arrive (official dates unconfirmed).',
      'Mérida at night, free: on Tuesdays, Remembranzas Musicales at 8 p.m. in Parque de Santiago; on Wednesdays, "Diálogos del Conquistador" at 8:30 p.m. at the Casa de Montejo.',
      'Chichén Itzá closed for 13 days between May and June 2026 over a dispute with artisans and reopened on 6/1. Check the news the week before.',
      'Teotihuacán reopened with heavier security after a shooting on 4/20/2026; the Pyramid of the Moon was closed until further notice according to April press.',
      'The five main tickets add up to MXN 1,913 (about USD 102) at 2026 rates; they usually rise 4 to 5% in January 2027.',
    ],
  },
};

export const PLAN_B_EN: Traduccion<PlanB> = {
  'b-01': {
    si: 'Heavy rain or cold on Monday in Mexico City',
    entonces:
      'Teotihuacán moves to Saturday. On Sunday, Templo Mayor at 9 and the Anthropology Museum in the afternoon. Monday: Cathedral, markets and the Museo Soumaya (open every day, unverified).',
  },
  'b-02': {
    si: 'Teotihuacán closes or there is an alert',
    entonces:
      'Tlatelolco archaeological zone and the Basilica of Guadalupe (Monday hours unverified). It cannot move to Tuesday because of the flight.',
  },
  'b-03': {
    si: 'No slot at the Palacio Nacional',
    entonces: 'Orozco murals at San Ildefonso or the Museo Mural Diego Rivera, next to the Alameda.',
  },
  'b-04': {
    si: 'Salón Los Ángeles is not open, or you are not in the mood',
    entonces: 'Free night: Bellas Artes and Madero lit up, and a mezcal at Bósforo.',
  },
  'b-05': {
    si: 'The flight to Mérida is delayed or canceled',
    entonces: 'There are several daily flights on three airlines; ask for the next one. Uxmal still works on Wednesday.',
  },
  'b-06': {
    si: 'The Uxmal bus fills up',
    entonces: 'Take an earlier or later departure; as a last resort, an agency tour from the hostel.',
  },
  'b-07': {
    si: 'You miss the 2:10 p.m. bus in Izamal',
    entonces:
      'Others leave at 3:44 p.m. and 6:25 p.m. For a lighter day, take the direct ADO Mérida → Valladolid (2 h 15) and skip Izamal.',
  },
  'b-08': {
    si: 'Chichén Itzá closes',
    entonces: 'Friday morning switches to Ek Balam; Cenote Oxmán stays in the afternoon.',
  },
  'b-09': {
    si: 'Rain or a "norte" in Yucatán',
    entonces:
      'With heavy rain, swap Oxmán for X’kekén and Samulá, which are cave cenotes. Watch out for wet stone at the ruins.',
  },
  'b-10': {
    si: 'Upset stomach',
    entonces:
      'Oral rehydration and rest. A pharmacy with a doctor’s office (MXN 50 to 80 est.) or the insurance telehealth line. Thursday becomes the direct ADO and a nap.',
  },
  'b-11': {
    si: 'Altitude or tiredness in Mexico City',
    entonces: 'Trim the afternoons: drop El Califa de León, the murals and the dance hall, not the main sites.',
  },
  'b-12': {
    si: 'The budget runs over midweek',
    entonces: 'Cut food and the dance hall; the tickets that remain are the essential ones.',
  },
};
