import React, { useEffect, useState } from 'react'

const CONFIG = {
  brand: {
    name: "II International Congress on Health and Addictions",
    short: "ICHA",
    tagline: "Science, clinical practice and policy for healthier digital and substance use behaviors",
    primaryColor: "#115E59",
    accentColor: "#0EA5E9",
  },
  event: {
    startDate: "2025-12-11",
    endDate: "2025-12-12",
    city: "Elche, Spain",
    venue: "Universidad Miguel Hernández · Edif. La Valona",
    earlyBirdDeadline: "2025-11-20T23:59:59+01:00",
    modality: "Presencial con streaming bajo demanda",
  },
  ctas: {
    primary: "Inscríbete ahora",
    secondary: "Enviar comunicación",
  },
  highlights: [
    { label: "2 días", help: "de ciencia aplicada" },
    { label: "+60 ponentes", help: "internacionales y nacionales" },
    { label: "+300 asistentes", help: "investigación y clínica" },
    { label: "12 países", help: "red de colaboración" },
  ],
  tracks: [
    { title: "Clínica y Salud", desc: "Intervenciones basadas en evidencia y prevención." },
    { title: "Adicciones Conductuales", desc: "Pantallas, gaming, redes sociales y compras." },
    { title: "Sustancias", desc: "Alcohol, cannabis y comorbilidad ansioso‑depresiva." },
    { title: "Tecnología y Datos", desc: "IA responsable, evaluación digital y ética." },
  ],
  speakers: [
    { name: "Prof. A. Martínez", role: "Keynote · Digital Wellbeing", org: "U. Europea", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=320&q=60" },
    { name: "Dr. R. Chen", role: "Keynote · Substance Use", org: "U. Toronto", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=320&q=60" },
    { name: "Prof. M. Brand", role: "Plenary · Behavioral Addictions", org: "U. Duisburg-Essen", img: "https://images.unsplash.com/photo-1541534401786-2077eed87a72?w=320&q=60" },
    { name: "Dra. G. López", role: "Plenary · Family & Teens", org: "INID-UMH", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=320&q=60" },
  ],
  pricing: {
    currency: "€",
    earlyBirdEndsHint: "Hasta el 20 de noviembre",
    tiers: [
      { name: "Estudiante", early: 60, standard: 90, perks: ["Acceso a todas las sesiones", "Certificado de asistencia", "Libro digital de resúmenes"] },
      { name: "Profesional", early: 140, standard: 190, perks: ["Acceso completo", "Certificado de créditos", "Networking y café"] },
      { name: "Online", early: 80, standard: 110, perks: ["Streaming en directo", "Grabaciones 30 días", "Certificado online"] },
    ],
    notes: "IVA incluido. Descuentos para grupos a partir de 5 personas. Política de devoluciones hasta 30 días antes del evento.",
  },
  workshops: [
    { title: "Taller precongreso: Prevención del abuso de pantallas en adolescentes", seats: 40, time: "11 dic · 10:00‑13:00", badge: "Cupos limitados" },
    { title: "Taller: Evaluación breve de consumo de alcohol en Atención Primaria", seats: 35, time: "12 dic · 08:30‑10:30", badge: "Práctico" },
  ],
  faq: [
    { q: "¿El registro incluye certificado?", a: "Sí. Se emite certificado de asistencia o presentación tras el cierre del congreso." },
    { q: "¿Puedo presentar un póster?", a: "Sí. La convocatoria de trabajos está abierta hasta el 31 de octubre. Revisa las normas de envío." },
    { q: "¿Habrá traducción simultánea?", a: "Sesiones plenarias con traducción EN‑ES. Resto de salas en el idioma del ponente." },
    { q: "¿Formas de pago?", a: "Tarjeta de crédito o débito. Para transferencias o facturación a institución, contáctanos." },
  ],
  logos: {
    sponsors: [
      { alt: "UMH", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Logo_Universidad_Miguel_Hern%C3%A1ndez.svg/320px-Logo_Universidad_Miguel_Hern%C3%A1ndez.svg.png" },
      { alt: "INID", src: "https://dummyimage.com/200x80/ededed/222.png&text=INID" },
      { alt: "PREVENGO", src: "https://dummyimage.com/200x80/ededed/222.png&text=PREVENGO" },
    ],
  },
  contact: {
    email: "info@icha-congress.org",
    phone: "+34 600 000 000",
  },
}

function useCountdown(targetIso) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })
  useEffect(() => {
    if (!targetIso) return
    const target = new Date(targetIso).getTime()
    const tick = () => {
      const now = Date.now()
      const diff = Math.max(0, target - now)
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      setTimeLeft({ days, hours, minutes })
    }
    tick()
    const id = setInterval(tick, 1000 * 60)
    return () => clearInterval(id)
  }, [targetIso])
  return timeLeft
}

export default function App() {
  const { days, hours, minutes } = useCountdown(CONFIG.event.earlyBirdDeadline)
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
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

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-teal-900 to-sky-700">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=60&w=1400')] bg-cover bg-center opacity-20" aria-hidden="true"></div>
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

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <p className="text-center text-sm font-medium text-gray-500">Con el aval de</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-6 items-center justify-items-center">
            {CONFIG.logos.sponsors.map((l, i) => (
              <img key={i} src={l.src} alt={l.alt} className="h-10 object-contain" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      <section id="ponentes" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Ponentes magistrales</h2>
              <p className="mt-2 text-gray-600">Autoridad científica para decidir tu asistencia con confianza</p>
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

      <section id="programa" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold">Itinerarios científicos</h2>
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

      <section id="talleres" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold">Talleres precongreso</h2>
            <span className="text-sm text-gray-600">Cupos limitados</span>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CONFIG.workshops.map((w) => (
              <div key={w.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{w.title}</h3>
                  <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 ring-1 ring-teal-200">{w.badge}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{w.time} · {w.seats} plazas</p>
                <a href="#registro" className="mt-4 inline-flex rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800">Reservar plaza</a>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section id="convocatoria" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Convocatoria de trabajos</h2>
              <p className="mt-3 text-gray-700">Envío de resúmenes hasta el 31 de octubre. Ejes temáticos alineados con los itinerarios científicos. Revisión por pares ciega y publicación en libro de resúmenes con ISBN.</p>
              <ul className="mt-4 list-disc pl-5 text-sm text-gray-700 space-y-2">
                <li>Resumen entre 200 y 300 palabras</li>
                <li>Estructura IMRyD y palabras clave</li>
                <li>Modalidades: comunicación oral y póster</li>
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

      <section id="sede" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl sm:text-3xl font-bold">Sede y alojamiento</h2>
          <p className="mt-2 text-gray-700">{CONFIG.event.venue}. Ofertas especiales en hotel sede. Habitaciones limitadas.</p>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 overflow-hidden rounded-2xl ring-1 ring-gray-200">
              <div className="aspect-[16/9] w-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-500">Mapa de Google embebido aquí</span>
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

      <div className="fixed inset-x-0 bottom-0 z-50 bg-white/95 p-3 shadow md:hidden">
        <a href="#registro" className="inline-flex w-full items-center justify-center rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white shadow hover:bg-sky-600">{CONFIG.ctas.primary}</a>
      </div>
    </div>
  )
}

function formatDateRange(start, end) {
  if (!start || !end) return "[Fecha]"
  try {
    const s = new Date(start)
    const e = new Date(end)
    const opts = { day: "2-digit", month: "long", year: "numeric" }
    const sStr = s.toLocaleDateString("es-ES", opts)
    const eStr = e.toLocaleDateString("es-ES", opts)
    if (sStr === eStr) return sStr
    return `${sStr} · ${eStr}`
  } catch {
    return "[Fecha]"
  }
}
