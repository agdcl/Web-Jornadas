import React, { useEffect, useState } from "react";

// II International Congress on Health and Addictions
// Conversion‑focused landing page
// Edit the CONFIG object below to personalize quickly

const CONFIG = {
  brand: {
    name: "II International Congress on Health and Addictions",
    short: "ICoHA",
    tagline: "From current research to better health",
    primaryColor: "#115E59", // teal-800
    accentColor: "#FCAE1E", // sky-500
  },
  event: {
    // Replace with your real dates and timezone
    startDate: "2025-12-11", // YYYY-MM-DD
    endDate: "2025-12-12",
    city: "Elche, Spain",
    venue: "Universidad Miguel Hernández · Edif. La Valona",
    earlyBirdDeadline: "2025-11-20T23:59:59+01:00",
    modality: "Presencial",
  },
  ctas: {
    primary: "Inscríbete ahora",
    secondary: "Enviar comunicación",
  },
  highlights: [
    { label: "2 días", help: "de ciencia basada en la evidencia" },
    { label: "+10 ponentes", help: "internacionales y nacionales" },
    { label: "+300 asistentes", help: "eventos anteriores" },
    ],
  tracks: [
    { title: "Mesa 1", desc: "Más allá del rendimiento: La salud en el deporte" },
    { title: "Mesa 2", desc: "Estigma y adicciones" },
    { title: "Mesa 3", desc: "Menores y uso de la tecnología" },
    { title: "Mesa 4", desc: "Innovaciones y retos en el tramiento de las adicciones" },
  ],
  speakers: [
    { name: "Dr. Gregor Burkhart", role: "Keynote · Psicología Ambiental", org: " European Union Drugs Agency EUDA", img: "https://lh3.googleusercontent.com/sitesv/AICyYdbuRJBredRS0wyrxhNJoPx85ShUhm8HrPzDSG9_X9kPVgkbmDCf2OgwDyrV4jDhqUF5SPPLTwgT0gu3XTCfy2rmbofOrNC0-A5s_nvacOurHD5o0a0PIG2FOf-0Omir9snlUMn-cY3AapZxvXLAoOFOJX-uWtUgBqSto-hrzvJyfmU-bIMf1laRRrUpRer21RKQ98Bu-L4xboReNAiP-4c27k1THG5bz8zfKzg=w1280" },
    { name: "D. Luís Hidalgo", role: "Mesa 1 · Nutrición, salud y rendimiento deportivo", org: "Decano del Colegio Oficial de Dietistas- Nutricionistas de la Región de Murcia", img: "https://estaticos-cdn.prensaiberica.es/clip/a93416d0-ba2e-4795-b3a9-22a001a8da10_16-9-discover-aspect-ratio_default_0.webp" },
    { name: "Dr. Sergio Fernández-Artamendi", role: "Mesa 2 · Cannabis, salud mental y estigma", org: "U. Sevilla", img: "https://www.adictalia.es/wp-content/uploads/2024/07/Sergio-Fernandez-Artamendi-e1720098062975.jpg" },
    { name: "Dra.  Ana López Durán", role: "Mesa 3 ·  Uso de APPs para dejar de fumar", org: "U. Santiago de Compostela", img: "https://www.lavozdegalicia.es/default/2021/09/17/00121631901183215120503/Foto/SS20C8F1_1.jpg" },
  ],
  pricing: {
    currency: "€",
    earlyBirdEndsHint: "Hasta el 20 de noviembre",
    tiers: [
      { name: "Estudiante", early: 10, standard: 20, perks: ["Acceso a todas las sesiones", "Certificado de asistencia", "Libro digital de resúmenes"] },
      { name: "Profesional", early: 15, standard: 30, perks: ["Acceso completo", "Certificado de créditos", "Networking y café" ] },
      
    ],
    notes: "IVA incluido.",
  },
  workshops: [
    { title: "Taller precongreso: Prevención del abuso de pantallas en adolescentes", seats: 40, time: "11 dic · 10:00‑13:00", badge: "Cupos limitados" },
    { title: "Taller: Evaluación breve de consumo de alcohol en Atención Primaria", seats: 35, time: "12 dic · 08:30‑10:30", badge: "Práctico" },
  ],
  faq: [
    { q: "¿El registro incluye certificado?", a: "Sí. Se emite certificado de asistencia o presentación tras el cierre del congreso." },
    { q: "¿Puedo presentar un póster?", a: "Sí. La convocatoria de trabajos está abierta hasta el 31 de noviembre. Revisa las normas de envío." },
    { q: "¿Se otorgan créditos por asistencia?", a: "Sí. Se otrogarán 1,5 créditos de libre configuración por la asistencia." },
    { q: "¿Formas de pago?", a: "Tarjeta de crédito o débito." },
  ],
  logos: {
    sponsors: [
      { alt: "UMH", src: "https://comunicacion.umh.es/files/2017/12/LOGO-ART-PRINCIPAL-IMPRESION-FONDO-BLANCOexportado.jpg" },
      { alt: "INID", src: "https://inid.umh.es/images/logo_inid_horizontal.jpg" },
      { alt: "UCAB", src: "https://scontent-mad1-1.xx.fbcdn.net/v/t39.30808-6/300434391_611149044048113_3628385706789117918_n.png?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=thB5sX0qM1MQ7kNvwESTxTo&_nc_oc=AdmPqvUH_Qhr0vy2kaUw1P-T_wKGnweAyNzyiFSX02WFmVZ6oy3NMAckl68rNh8dix0&_nc_zt=23&_nc_ht=scontent-mad1-1.xx&_nc_gid=WrIknNW0ctCye4ZnhZ8TRQ&oh=00_Affw2hrYu5sC6PJYTPIps7V1f87R--TqRhBw6MRIbcxXRA&oe=68FC019E" },
      { alt: "PREVENGO", src: "https://prevengo.umh.es/sites/default/files/logo_prevengo_0.png" },
    ],
  },
  contact: {
    email: "info@icoha.org",
    phone: "+34 966 658 526",
  },
};

function useCountdown(targetIso) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  useEffect(() => {
    if (!targetIso) return;
    const target = new Date(targetIso).getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft({ days, hours, minutes });
    };
    tick();
    const id = setInterval(tick, 1000 * 60);
    return () => clearInterval(id);
  }, [targetIso]);
  return timeLeft;
}

export default function CongressLanding() {
  const { days, hours, minutes } = useCountdown(CONFIG.event.earlyBirdDeadline);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar with early bird urgency */}
      <div className="w-full bg-teal-900 text-white text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-4">
          <p className="font-medium">{CONFIG.brand.short} · {CONFIG.event.city} · {formatDateRange(CONFIG.event.startDate, CONFIG.event.endDate)}</p>
          <p aria-live="polite" className="flex items-center gap-2">
            <span className="hidden sm:inline">Tarifa temprana</span>
            <span className="rounded-full bg-white/10 px-2 py-1">{CONFIG.pricing.earlyBirdEndsHint}</span>
            <span>Termina en {days}d {hours}h {minutes}m</span>
            <a href="#registro" className="ml-3 inline-flex items-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-white">{CONFIG.ctas.primary}</a>
          </p>
        </div>
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-teal-900 to-sky-700">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=60&w=1400')] bg-cover bg-center opacity-20" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
          <div className="max-w-3xl text-white">
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">{CONFIG.brand.name}</h1>
            <p className="mt-4 text-lg sm:text-xl text-white/90">{CONFIG.brand.tagline}</p>
            <ul className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CONFIG.highlights.map((h) => (
                <li key={h.label} className="rounded-xl bg-white/10 p-3">
                  <p className="text-xl font-bold">{h.label}</p>
                  <p className="text-sm text-white/90">{h.help}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#registro" className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">{CONFIG.ctas.primary}</a>
              <a href="#convocatoria" className="inline-flex items-center justify-center rounded-xl border border-white/70 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">{CONFIG.ctas.secondary}</a>
            </div>
            <p className="mt-3 text-sm text-white/80">{CONFIG.event.modality}. Sede: {CONFIG.event.venue}</p>
          </div>
        </div>
      </section>

      {/* Logos as social proof */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <p className="text-center text-sm font-medium text-gray-500">Organizado por</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 items-center justify-items-center">
            {CONFIG.logos.sponsors.map((l, i) => (
              <img key={i} src={l.src} alt={l.alt} className="h-10 object-contain" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section id="ponentes" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Ponentes magistrales</h2>
              <p className="mt-2 text-gray-600"></p>
            </div>
            <a href="#programa" className="hidden sm:inline text-sky-700 font-semibold hover:underline">Ver programa</a>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONFIG.speakers.map((s) => (
              <article key={s.name} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
                <img src={s.img} alt={s.name} className="h-40 w-full rounded-xl object-cover" loading="lazy" />
                <h3 className="mt-4 text-lg font-semibold">{s.name}</h3>
                <p className="text-sm text-gray-600">{s.role}</p>
                <p className="text-sm text-gray-500">{s.org}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section id="programa" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold">Mesas científicas</h2>
          <p className="mt-2 text-gray-600">Selecciona tu recorrido por áreas clave</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONFIG.tracks.map((t) => (
              <div key={t.title} className="rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Pricing */}
      <section id="tarifas" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold">Inscripción</h2>
          <p className="mt-2 text-gray-600">Tarifa temprana disponible. {CONFIG.pricing.earlyBirdEndsHint}</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONFIG.pricing.tiers.map((tier) => (
              <div key={tier.name} className="relative rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="absolute -top-3 right-4 rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-800 ring-1 ring-sky-200">Anticípate</div>
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-3">
                  <p className="text-3xl font-extrabold">{CONFIG.pricing.currency}{tier.early}</p>
                  <p className="text-sm text-gray-500 line-through">{CONFIG.pricing.currency}{tier.standard}</p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {tier.perks.map((p, i) => (
                    <li key={i} className="flex items-start gap-2"><span aria-hidden>✓</span><span>{p}</span></li>
                  ))}
                </ul>
                <a href="#registro" className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-600">{CONFIG.ctas.primary}</a>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">{CONFIG.pricing.notes}</p>
        </div>
      </section>

      {/* Call for papers */}
      <section id="convocatoria" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Convocatoria de trabajos</h2>
              <p className="mt-3 text-gray-700">Envío de resúmenes hasta el 31 de octubre. Ejes temáticos alineados con los itinerarios científicos. Revisión por pares ciega y publicación en libro de resúmenes en número especial de la revista científica <a href="https://www.haaj.org/?journal=haaj&page=index"> Health and Addictions/Salud y Drogas (HAAJ) ISSN: 1578-5319/ISSNe 1988-205X</a> </p>
              <ul className="mt-4 list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Resumen entre 200 y 300 palabras</li>
                <li>Estructura IMRyD y palabras clave</li>
                <li>Modalidad: póster</li>
              </ul>
              <a href="#registro" className="mt-6 inline-flex items-center rounded-xl bg-teal-700 px-5 py-2.5 font-semibold text-white hover:bg-teal-800">Enviar resumen</a>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h3 className="text-lg font-semibold">Criterios de evaluación</h3>
              <ol className="mt-3 list-decimal pl-5 text-sm text-gray-700 space-y-1">
                <li>Rigor metodológico y claridad</li>
                <li>Relevancia clínica y social</li>
                <li>Originalidad y contribución</li>
                <li>Coherencia con el programa</li>
              </ol>
              <p className="mt-4 text-sm text-gray-600">Notificación en 10 días tras la recepción. Presentaciones aceptadas deben confirmar inscripción en plazo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Venue */}
      <section id="sede" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold">Sede y alojamiento</h2>
          <p className="mt-2 text-gray-700">{CONFIG.event.venue}</p>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 overflow-hidden rounded-2xl ring-1 ring-gray-200">
              <div className="aspect-[16/9] w-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500"> Mapa de Google embebido aquí</span>
              </div>
            </div>
            <div className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200">
              <h3 className="text-lg font-semibold">Cómo llegar</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>Tren: Estación Alicante‑Elche</li>
                <li>Aeropuerto: Alicante‑Elche Miguel Hernández</li>
                <li>Bus urbano y lanzaderas al campus</li>
              </ul>
              <a href="#registro" className="mt-6 inline-flex rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800">Reservar hotel sede</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials near pricing to reduce risk perception */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold">Qué dicen los asistentes</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <figure key={i} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
                <blockquote className="text-sm text-gray-800">“Excelente equilibrio entre evidencia y práctica. La red de contactos fue decisiva para mis proyectos.”</blockquote>
                <figcaption className="mt-4 text-xs text-gray-600">Participante 2024 · Psicología Clínica</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ and contact */}
      <section id="faq" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Preguntas frecuentes</h2>
              <p className="mt-2 text-gray-600">Resolvemos objeciones antes del pago</p>
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {CONFIG.faq.map((f, idx) => (
                  <details key={idx} className="group rounded-2xl border border-gray-200 p-5 open:bg-gray-50">
                    <summary className="cursor-pointer select-none font-semibold text-gray-900">{f.q}</summary>
                    <p className="mt-2 text-sm text-gray-700">{f.a}</p>
                  </details>
                ))}
              </div>
              <div className="mt-8 rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200">
                <p className="text-sm text-gray-700">¿Duda concreta o facturación a institución? Escríbenos a <a className="text-sky-700 hover:underline" href={`mailto:${CONFIG.contact.email}`}>{CONFIG.contact.email}</a> o llámanos al {CONFIG.contact.phone}.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section id="registro" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Regístrate en {CONFIG.brand.short}</h2>
              <p className="mt-2 text-gray-700">Completa 4 campos. Pago seguro por tarjeta. Factura automática.</p>
              <ul className="mt-4 list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Incluye acceso a todas las sesiones, certificados y libro de resúmenes</li>
                <li>Cancelación sin coste hasta 30 días antes</li>
                <li>Descuento por grupo aplicable en el checkout</li>
              </ul>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert("Registro enviado. Conecta aquí tu pasarela de pago."); }} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <div className="grid grid-cols-1 gap-4">
                <label className="text-sm">Nombre y apellidos<input required className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-sky-500" /></label>
                <label className="text-sm">Email institucional<input required type="email" className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-sky-500" /></label>
                <label className="text-sm">Categoría<select className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-sky-500"><option>Estudiante</option><option>Profesional</option><option>Online</option></select></label>
                <label className="text-sm">País<input className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-sky-500" /></label>
                <button type="submit" className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-teal-700 px-4 py-3 font-semibold text-white hover:bg-teal-800">Pagar e inscribirme</button>
                <p className="text-xs text-gray-500">Al continuar aceptas la política de privacidad y condiciones de participación.</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="font-semibold">{CONFIG.brand.short}</p>
            <p className="mt-2 text-sm text-white/80">{CONFIG.event.city} · {formatDateRange(CONFIG.event.startDate, CONFIG.event.endDate)}</p>
          </div>
          <div>
            <p className="font-semibold">Contacto</p>
            <p className="mt-2 text-sm text-white/80"><a href={`mailto:${CONFIG.contact.email}`} className="hover:underline">{CONFIG.contact.email}</a><br />{CONFIG.contact.phone}</p>
          </div>
          <div>
            <p className="font-semibold">Legal</p>
            <ul className="mt-2 space-y-1 text-sm text-white/80">
              <li><a href="#" className="hover:underline">Política de privacidad</a></li>
              <li><a href="#" className="hover:underline">Condiciones</a></li>
              <li><a href="#" className="hover:underline">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/70">© {new Date().getFullYear()} {CONFIG.brand.short}</div>
      </footer>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white/95 p-3 shadow md:hidden">
        <a href="#registro" className="inline-flex w-full items-center justify-center rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white shadow hover:bg-sky-600">{CONFIG.ctas.primary}</a>
      </div>
    </div>
  );
}

function formatDateRange(start, end) {
  if (!start || !end) return "[Fecha]";
  try {
    const s = new Date(start);
    const e = new Date(end);
    const opts = { day: "2-digit", month: "long", year: "numeric" };
    const sStr = s.toLocaleDateString("es-ES", opts);
    const eStr = e.toLocaleDateString("es-ES", opts);
    if (sStr === eStr) return sStr;
    return `${sStr} · ${eStr}`;
  } catch {
    return "[Fecha]";
  }
}
