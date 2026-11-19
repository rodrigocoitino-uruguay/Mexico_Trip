# México 2027

App web instalable (PWA) para acompañar el viaje a México del **11/2 al 1/3/2027**: itinerario día por día, lugares, reservas, presupuesto, info práctica y plan B.

- **Funciona sin señal** después de la primera carga (Teotihuacán, Uxmal, Chichén y los buses).
- **Tus datos quedan solo en tu dispositivo** (IndexedDB): lo que marcás, notas, gastos y códigos de reserva. El repositorio tiene solo el código y el itinerario.
- **Costo cero**: GitHub Pages, sin servidor ni cuentas.

**App publicada:** https://rodrigocoitino-uruguay.github.io/Mexico_Trip/

---

## 1. Instalarla en el celular

**iPhone (Safari)**

1. Abrí **https://rodrigocoitino-uruguay.github.io/Mexico_Trip/** en **Safari**.
2. Tocá **Compartir** (el cuadrado con la flecha hacia arriba).
3. **Agregar a pantalla de inicio** → **Agregar**.
4. Abrila siempre desde el ícono (dos banderitas de papel picado). Instalada, funciona en modo avión.

**Android (Chrome)**

1. Abrí la dirección en **Chrome**.
2. Menú **⋮** → **Instalar app** (o **Agregar a la pantalla principal**).

Antes de viajar, abrila una vez con conexión y recorré las pestañas: así queda todo guardado en el teléfono.

### Pasar los datos entre el celular y la compu

No hay sincronización automática (como en finanzas). En **Más → Ajustes → Respaldo**:

1. En un dispositivo, **Exportar todo (JSON)** y guardalo (AirDrop, iCloud Drive, mail).
2. En el otro, **Importar un respaldo**. Se combinan: de cada cosa queda el cambio más reciente y lo que borraste queda borrado.

### Pasar los gastos a finanzas

**Más → Presupuesto → Pasar los gastos a finanzas**: poné la cotización del dólar en pesos y tocá **Para finanzas**. En la app de finanzas: **Ajustes → Respaldo → Importar → Combinar**. Quedan en la categoría "México feb 2027", en dólares. Importarlo de nuevo no duplica. Si querés la cotización del BROU de cada fecha: en finanzas, tocá la cotización → **Recalcular**.

También hay **Exportar CSV** para Excel o Sheets.

---

## 2. Qué tiene

| Pestaña | Qué hay |
| --- | --- |
| **Hoy** | Antes del viaje: cuenta regresiva y las 3 tareas más urgentes. Durante: dónde dormís, clima, gasto del día y el día desde la actividad en curso ("Ahora", "Próxima · en 45 min"). |
| **Días** | Del jue 11/2 al lun 1/3. Los días pasados quedan en gris a la izquierda y la lista arranca hoy. Timeline con hora, qué hacer, cómo llegar y costo (con ≈ USD). Marcar hecha o saltada, nota, gasto real, editar, mover a otro día, borrar (con deshacer), agregar y activar opcionales. |
| **Lugares** | Atracciones, comida, noche, alojamiento ("Reservé esta" oculta las otras opciones) y transporte (vuelos tipo boarding pass y tramos con "Lo compré"). Buscador y filtro por ciudad. |
| **Reservas** | Checklist por grupo con fechas límite (rojo vencida, naranja menos de 7 días), progreso, decisiones abiertas y tareas propias. |
| **Más** | Presupuesto (tope USD 1.000, carga rápida, por categoría y por día, escenarios, exportar), info práctica, contactos, plan B y ajustes. |

---

## 3. Corregir el itinerario

Los datos originales están en `src/data/seed/` (un archivo por tema, con tipos de TypeScript). Para corregir algo:

1. Editá el archivo que corresponda.
2. Subí `SEED_VERSION` en `src/data/seed/util.ts`.
3. Publicá (ver abajo). La app actualiza lo que no editaste a mano, sin tocar lo que marcaste, anotaste o reservaste.

---

## 4. Correrla en la computadora

Requisitos: **Node.js 22** (`brew install node@22`).

```bash
npm ci          # instala exactamente las versiones del package-lock
npm run dev     # http://localhost:5174/Mexico_Trip/
npm test        # tests (Vitest)
npm run build   # chequeo de tipos + build en dist/
npm run preview # sirve dist/ (el build real, con modo sin conexión)
```

- Probar en el celular por Wi-Fi: `npm run dev:iphone` y abrir la dirección `Network:` que muestra Vite.
- Simular un día del viaje (también en la app publicada): agregá `?ahora=2027-02-15T10:00-06:00` a la dirección. Arriba aparece un cartel naranja "Simulando…"; tocalo para volver a la fecha real.

Regenerar los íconos (no es parte del build): `npm i --no-save sharp && node scripts/generate-icons.mjs`.

---

## 5. Publicar

Cada `git push` a `main` corre el workflow **"Publicar en GitHub Pages"** (`.github/workflows/deploy.yml`): instala, corre los tests, compila y publica. Si los tests fallan, no publica.

Cuando hay una versión nueva, la app instalada muestra **"Hay una versión nueva · Actualizar"**. Tus datos no se tocan.

Configuración inicial (ya hecha; queda por si hay que repetirla):

1. `gh repo create <usuario>/Mexico_Trip --public`
2. `gh api -X POST repos/<usuario>/Mexico_Trip/pages -f build_type=workflow`
3. Si el repositorio se llama distinto, cambiar `REPO_BASE` en `vite.config.ts`.
4. `git push -u origin main`

---

## 6. Stack y estructura

Vite + React + TypeScript · Tailwind CSS · Dexie (IndexedDB) · Zustand · vite-plugin-pwa (Workbox) · lucide-react · Fraunces e Inter auto-alojadas · Vitest. El mismo stack que la app de finanzas.

```
src/
  app/          shell: navegación (barra inferior / lateral), aviso de actualización
  components/   UI reutilizable: hojas, chips, montos con ≈ USD, papel picado
  data/seed/    el itinerario original (sección 6 del plan), tipado
  db/           IndexedDB: carga del seed, acciones, reservas, gastos, respaldo
  domain/       lógica pura y testeada: tiempo y zonas horarias, actividades, reservas, presupuesto, respaldo
  features/     pantallas: hoy, dias, lugares, reservas, presupuesto, info, ajustes
  lib/          formato, fechas, Maps, archivos
public/icons/   íconos (fuente: scripts/generate-icons.mjs)
```

Seguridad: Content-Security-Policy estricta (la app solo pide archivos a su propio dominio), links de reservas limitados a http(s), CSV protegido contra fórmulas, importación validada y `noindex` para buscadores.
