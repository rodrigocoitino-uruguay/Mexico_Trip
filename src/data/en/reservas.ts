import type { Contacto, Decision, InfoSeccion, Pendiente, PlanB } from '../../domain/types';

export type TextosPendiente = Partial<Pick<Pendiente, 'titulo' | 'detalle'>>;

export const PENDIENTES_EN: Record<string, TextosPendiente> = {
  'p-vuelo-merida': {
    titulo: 'Buy the flight Mexico City (MEX) → Mérida',
    detalle: 'Tue, Feb 16, departing between 8:30 and 10:30 a.m., with a 10 kg carry-on.',
  },
  'p-hostel-cdmx': {
    titulo: 'Book the hostel in Mexico City',
    detalle: 'Feb 12 to 16, with free cancellation.',
  },
  'p-hostels-yucatan': {
    titulo: 'Book hostels in Mérida and Valladolid',
    detalle: 'Mérida Feb 16 to 18 and Valladolid Feb 18 to 20.',
  },
  'p-palacio-nacional': {
    titulo: 'Email to request a National Palace slot',
    detalle: 'To visitas_guiadas@hacienda.gob.mx.',
  },
  'p-seguro': {
    titulo: 'Buy the travel insurance',
    detalle: 'Feb 11 to Mar 1.',
  },
  'p-carrasco': {
    titulo: 'Arrange the overnight ride to Carrasco airport',
    detalle: 'For the 3:06 a.m. flight on Fri, Feb 12.',
  },
  'p-esim-visitax-banco': {
    titulo: 'eSIM, Visitax and bank notice',
    detalle: 'Buy the eSIM, pay the Visitax (visitax.gob.mx, save the QR) and tell the bank about the trip.',
  },
  'p-salon': {
    titulo: 'Confirm the Sunday, Feb 14 dancing at Salón Los Ángeles',
    detalle: 'On Instagram, @salonlosangeles.',
  },
  'p-noticias': {
    titulo: 'Check the news on Chichén Itzá and Teotihuacán',
    detalle: 'The week before the trip.',
  },
  'p-finde-cancun': {
    titulo: 'Verify or adjust the weekend budget line (Cancún and Playa del Carmen)',
    detalle: 'USD 175, estimate not verified.',
  },
  'p-tame-uxmal': {
    titulo: 'Wednesday round-trip bus to Uxmal',
    detalle: 'Tue, Feb 16 in the afternoon, at the TAME terminal in Mérida.',
  },
  'p-ado-cancun': {
    titulo: 'Ticket Valladolid → Cancún for Saturday, Feb 20',
    detalle: 'Tue, Feb 16 or Wed, Feb 17, at the ADO counter or app.',
  },
  'p-taquillas': {
    titulo: 'Tickets at the ticket office on the same day',
    detalle: 'Anthropology Museum, Templo Mayor, Teotihuacán, Uxmal, Chichén Itzá and Cenote Oxmán (no advance booking).',
  },
};

export type TextosDecision = Partial<Pick<Decision, 'titulo' | 'detalle'>>;

export const DECISIONES_EN: Record<string, TextosDecision> = {
  'd-seguro': {
    titulo: 'Travel insurance',
    detalle:
      'Get quotes from Protege tu Viaje and BSE Viajeros, with USD 40,000 or more in medical coverage and no deductible; estimated USD 40 to 80 for 19 days.',
  },
  'd-vuelo-merida': {
    titulo: 'Buy the Mérida flight now or wait for the payments',
    detalle: 'Front USD 70 to 90 if the payment has not come in yet.',
  },
};

export type TextosContacto = Partial<Pick<Contacto, 'nombre' | 'rol'>>;

export const CONTACTOS_EN: Record<string, TextosContacto> = {
  'c-copa': { rol: 'Outbound flight (Fri, Feb 12)' },
  'c-latam': { rol: 'Return flight (Sun, Feb 28)' },
  'c-aerolinea-merida': { nombre: 'Airline Mexico City → Mérida', rol: 'Flight on Tue, Feb 16 (pending)' },
  'c-hostel-cdmx': { nombre: 'Hostel in Mexico City', rol: 'Lodging Feb 12 to 16' },
  'c-hostel-merida': { nombre: 'Hostel in Mérida', rol: 'Lodging Feb 16 to 18' },
  'c-hostel-valladolid': { nombre: 'Hostel in Valladolid', rol: 'Lodging Feb 18 to 20' },
  'c-seguro': { nombre: 'Travel insurance', rol: 'Medical assistance (still to buy)' },
  'c-empresa': { nombre: 'Company', rol: 'Retreat in Cozumel' },
  'c-palacio-nacional': { nombre: 'National Palace, guided visits', rol: 'Slot for the murals' },
};

export type TextosPlanB = Partial<Pick<PlanB, 'si' | 'entonces'>>;

export const PLAN_B_EN: Record<string, TextosPlanB> = {
  'b-01': {
    si: 'Rain or strong cold on Monday in Mexico City',
    entonces:
      'Teotihuacán moves to Saturday. On Sunday, Templo Mayor at 9 and the Anthropology Museum in the afternoon. On Monday, the Cathedral, markets and the Soumaya Museum (open every day, not verified).',
  },
  'b-02': {
    si: 'Teotihuacán closes or there is an alert',
    entonces:
      'Tlatelolco archaeological zone and the Basilica of Guadalupe (Monday hours not verified). It cannot move to Tuesday because of the flight.',
  },
  'b-03': {
    si: 'No slot at the National Palace',
    entonces: 'Orozco murals at San Ildefonso or the Diego Rivera Mural Museum, next to the Alameda.',
  },
  'b-04': {
    si: 'Salón Los Ángeles is not open, or you do not feel like going',
    entonces: 'Free night: Bellas Artes and Madero Street lit up, and a mezcal at Bósforo.',
  },
  'b-05': {
    si: 'The Mérida flight is delayed or canceled',
    entonces: 'There are several daily flights from three airlines; ask for the next one. Uxmal still works on Wednesday.',
  },
  'b-06': {
    si: 'The bus to Uxmal is full',
    entonces: 'Earlier or later departure; as a last resort, an agency tour from the hostel.',
  },
  'b-07': {
    si: 'You miss the 2:10 p.m. bus in Izamal',
    entonces: 'Others leave at 3:44 and 6:25 p.m. For an easy day, take the direct ADO Mérida → Valladolid (2 h 15) and skip Izamal.',
  },
  'b-08': {
    si: 'Chichén Itzá closes',
    entonces: 'Friday morning becomes Ek Balam; Cenote Oxmán stays in the afternoon.',
  },
  'b-09': {
    si: 'Rain or a “norte” in Yucatán',
    entonces: 'In heavy rain, swap Oxmán for X’kekén and Samulá, which are cave cenotes. Watch out for wet stone at the ruins.',
  },
  'b-10': {
    si: 'Upset stomach',
    entonces:
      'Oral rehydration and rest. Pharmacy with a doctor’s office (MXN 50 to 80 est.) or the insurance telehealth service. Thursday becomes direct ADO and a siesta.',
  },
  'b-11': {
    si: 'Altitude or tiredness in Mexico City',
    entonces: 'Trim the afternoons: Califa de León, the murals and the dance hall go, not the main sites.',
  },
  'b-12': {
    si: 'The budget runs over mid-week',
    entonces: 'Cut food and the dance hall; the remaining tickets are the essential ones.',
  },
};

export type TextosInfo = Partial<Pick<InfoSeccion, 'titulo' | 'items'>>;

export const INFO_EN: Record<string, TextosInfo> = {
  'i-ingreso': {
    titulo: 'Entering Mexico',
    items: [
      'With a Uruguayan passport you do not need a visa for tourism of up to 180 days.',
      'The passport must be valid for the whole stay; airlines usually ask for 6 months.',
      'At immigration they may ask for the exit ticket, the lodging reservation and proof of funds: keep the LATAM ticket for Feb 28, the hostel booking and the retreat invitation on your phone.',
      'At airports the FMM form was replaced by a stamp in the passport. Check how many days they write down: you need 17.',
      'Quintana Roo Visitax: about MXN 285 per foreigner at visitax.gob.mx; at the Cancún airport it costs MXN 525.',
    ],
  },
  'i-dinero': {
    titulo: 'Money',
    items: [
      'Cash is a must for the Teotihuacán bus, second-class buses, colectivos, markets, food stalls, cenotes and tips: about MXN 7,500 for the week (central plan).',
      'Card for hostels, ADO, the flight, Uber, restaurants and the Chichén Itzá ticket office.',
      'Bank ATMs (BBVA, Banorte, Santander, Citibanamex, HSBC) inside branches or shopping malls. Decline the currency conversion the ATM offers.',
      'Better 2 large withdrawals than several small ones. Withdrawing MXN 3,000 on arrival is enough. Do not exchange money at the airport.',
      'Tips: 10 to 15% in restaurants with table service; not expected at food stalls and taquerías.',
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
      'Mexico City Historic Center: fine by day; at night, stick to lit, busy streets (Madero, 5 de Mayo, 16 de Septiembre, Regina). Do not walk toward Tepito, La Lagunilla or La Merced.',
      'Salón Los Ángeles (Guerrero neighborhood): arrive and leave by Uber or DiDi.',
      'Metro and Metrobús are safe by day; keep your phone in a front pocket. At night, Uber. Do not take taxis off the street.',
      'Mérida and Valladolid are among the calmest cities in the country; the real risk is the heat: hat, sunscreen and 2 liters of water at the ruins.',
      'Altitude in Mexico City: water, a light dinner and little alcohol for the first 48 h. Mornings of 6 to 9 °C and afternoons of 22 to 24 °C. In Yucatán, 30 to 33 °C.',
      'Bring loperamide and rehydration salts. At cenotes, shower before getting in and use biodegradable sunscreen or none. Repellent for the ruins.',
      'To look after your stomach: busy stalls with food made on the spot, sauces little by little, bottled water and no raw seafood from the street.',
    ],
  },
  'i-seguro': {
    titulo: 'Insurance',
    items: [
      'Buy the travel insurance for Feb 11 to Mar 1, before Feb 5, 2027.',
      'Get quotes from Protege tu Viaje and BSE Viajeros, with USD 40,000 or more in medical coverage and no deductible; estimated USD 40 to 80 for 19 days.',
      'Confirm with the company whether the retreat includes insurance.',
      'Insurance is separate and does not count toward the USD 1,000 cap.',
    ],
  },
  'i-equipaje': {
    titulo: 'Luggage',
    items: [
      'Real limit: 10 kg carry-on (they weigh it at Viva and Volaris).',
      'Clothes for 5 days and laundry in Mérida on Tuesday, Feb 16.',
      'Two climates: light jacket and layers for Mexico City; light clothes, hat and swimsuit for Yucatán.',
      'Type A/B plug adapter (127 V).',
      'Padlock, earplugs, eye mask, quick-dry towel and a waterproof phone pouch.',
      'Better a backpack than a wheeled suitcase. Sunscreen is bought there (liquids up to 100 ml in the cabin).',
    ],
  },
  'i-cierres': {
    titulo: 'Closures and events, Feb 12 to 20',
    items: [
      'Monday, Feb 15: the Anthropology Museum, Templo Mayor, Chapultepec Castle and almost all Mexico City museums are closed.',
      'Sunday, Feb 14: INAH museums and sites are free for Mexican citizens and residents (more people); Valentine’s Day.',
      'No holiday falls during the week.',
      'Mérida Carnival 2027: should run Feb 3 to 10 and end before your arrival (official dates not confirmed).',
      'Mérida at night, free: Tuesday, Remembranzas Musicales at 8 p.m. in Parque de Santiago; Wednesday, “Diálogos del Conquistador” at 8:30 p.m. at the Casa de Montejo.',
      'Chichén Itzá closed for 13 days between May and June 2026 over a dispute with artisans and reopened on Jun 1. Check the news the week before.',
      'Teotihuacán reopened with reinforced security after a shooting on Apr 20, 2026; the Pyramid of the Moon was closed until further notice according to April press.',
      'The five main tickets add up to MXN 1,913 (about USD 102) at 2026 prices; in January 2027 they usually rise 4 to 5%.',
    ],
  },
};
