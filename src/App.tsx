import React, { useState, useEffect } from 'react';
import {
  MapPin, Calendar, ArrowRight, Menu, X, Instagram,
  Clock, CheckCircle, ChevronLeft, Sparkles, Leaf, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ─── Datos de horarios ────────────────────────────────────────────────────────
const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

type Level = 'IA' | 'IS' | 'IN';
interface Slot { teacher: string; level: Level }
type ScheduleData = Record<string, Record<string, Slot | null>>;

const SCHEDULE: ScheduleData = {
  '08:00': { Lunes: { teacher: 'Belu', level: 'IA' }, Martes: { teacher: 'Dani', level: 'IS' }, 'Miércoles': { teacher: 'Romi', level: 'IN' }, Jueves: { teacher: 'Belu', level: 'IA' }, Viernes: { teacher: 'Dani', level: 'IS' }, Sábado: { teacher: 'Romi', level: 'IN' } },
  '09:00': { Lunes: { teacher: 'Belu', level: 'IA' }, Martes: { teacher: 'Dani', level: 'IS' }, 'Miércoles': { teacher: 'Romi', level: 'IN' }, Jueves: { teacher: 'Belu', level: 'IA' }, Viernes: { teacher: 'Dani', level: 'IS' }, Sábado: { teacher: 'Romi', level: 'IN' } },
  '10:00': { Lunes: { teacher: 'Belu', level: 'IA' }, Martes: { teacher: 'Dani', level: 'IS' }, 'Miércoles': { teacher: 'Romi', level: 'IN' }, Jueves: { teacher: 'Belu', level: 'IA' }, Viernes: { teacher: 'Dani', level: 'IS' }, Sábado: { teacher: 'Romi', level: 'IN' } },
  '11:00': { Lunes: { teacher: 'Belu', level: 'IA' }, Martes: { teacher: 'Dani', level: 'IS' }, 'Miércoles': { teacher: 'Romi', level: 'IN' }, Jueves: { teacher: 'Belu', level: 'IA' }, Viernes: { teacher: 'Dani', level: 'IS' }, Sábado: { teacher: 'Romi', level: 'IN' } },
  '12:00': { Lunes: { teacher: 'Belu', level: 'IA' }, Martes: { teacher: 'Dani', level: 'IS' }, 'Miércoles': { teacher: 'Romi', level: 'IN' }, Jueves: { teacher: 'Belu', level: 'IA' }, Viernes: { teacher: 'Dani', level: 'IS' }, Sábado: { teacher: 'Romi', level: 'IN' } },
  '16:00': { Lunes: { teacher: 'Dani', level: 'IS' }, Martes: { teacher: 'Romi', level: 'IN' }, 'Miércoles': { teacher: 'Belu', level: 'IA' }, Jueves: { teacher: 'Dani', level: 'IS' }, Viernes: { teacher: 'Romi', level: 'IN' }, Sábado: null },
  '17:00': { Lunes: { teacher: 'Dani', level: 'IS' }, Martes: { teacher: 'Romi', level: 'IN' }, 'Miércoles': { teacher: 'Belu', level: 'IA' }, Jueves: { teacher: 'Dani', level: 'IS' }, Viernes: { teacher: 'Romi', level: 'IN' }, Sábado: null },
  '18:00': { Lunes: { teacher: 'Dani', level: 'IS' }, Martes: { teacher: 'Romi', level: 'IN' }, 'Miércoles': { teacher: 'Belu', level: 'IA' }, Jueves: { teacher: 'Dani', level: 'IS' }, Viernes: { teacher: 'Romi', level: 'IN' }, Sábado: null },
  '19:00': { Lunes: { teacher: 'Dani', level: 'IS' }, Martes: { teacher: 'Romi', level: 'IN' }, 'Miércoles': { teacher: 'Belu', level: 'IA' }, Jueves: { teacher: 'Dani', level: 'IS' }, Viernes: { teacher: 'Romi', level: 'IN' }, Sábado: null },
  '20:00': { Lunes: { teacher: 'Dani', level: 'IS' }, Martes: { teacher: 'Romi', level: 'IN' }, 'Miércoles': { teacher: 'Belu', level: 'IA' }, Jueves: { teacher: 'Dani', level: 'IS' }, Viernes: { teacher: 'Romi', level: 'IN' }, Sábado: null },
};

const LEVEL_CONFIG: Record<Level, { bg: string; text: string; border: string; label: string; dot: string }> = {
  IA: { bg: 'bg-violet-100',      text: 'text-violet-800',       border: 'border-violet-300', label: 'Intermedio Avanzado', dot: 'bg-violet-500' },
  IS: { bg: 'bg-[#A81E2B]/10',    text: 'text-[#A81E2B]',        border: 'border-[#A81E2B]/30', label: 'Intermedio Stott',  dot: 'bg-[#A81E2B]' },
  IN: { bg: 'bg-emerald-50',      text: 'text-emerald-700',      border: 'border-emerald-200', label: 'Inicial',            dot: 'bg-emerald-400' },
};

// ─── Tratamientos faciales ────────────────────────────────────────────────────
const FACIALES = [
  {
    num: '01',
    title: 'Initial Care',
    items: [
      'Limpieza facial',
      'Mascarilla exfoliante',
      'Peeling enzimático',
      'Extracciones manuales',
      'Descongestión e hidratación de la piel',
      'Mascarilla con piedras de jade',
      'Finalización con serum, protección solar y bálsamo labial',
    ],
  },
  {
    num: '02',
    title: 'Ritual Dermaplaning & Glow',
    items: [
      'Higiene profunda con espátula ultrasónica',
      'Activos específicos en rostro, cuello y escote',
      'Peeling de estación (según piel)',
      'Dermaplaning',
      'Extracciones manuales',
      'Descongestión con ozonoterapia',
      'Mascarilla con piedras de jade',
      'Finalización con crema tratante, contorno de ojos, bálsamo labial y protección solar',
    ],
  },
  {
    num: '03',
    title: 'Ritual Glow Therapy',
    items: [
      'Higiene profunda con espátula ultrasónica',
      'Exfoliación química y mecánica',
      'Extracciones manuales',
      'Peeling suave según estación',
      'Aparatología profesional según evaluación',
      'Descongestión + mascarilla con piedras de jade',
      'Masajes en rostro, cuello y escote',
      'Finalización con serum, contorno de ojos, bálsamo labial y protección solar',
      'Armado de rutina facial e indicaciones domiciliarias',
    ],
  },
];

// ─── Modal de reservas ────────────────────────────────────────────────────────
interface BookingData {
  day: string;
  hour: string;
  slot: Slot | null;
  name: string;
  email: string;
  phone: string;
}

function BookingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [booking, setBooking] = useState<BookingData>({ day: '', hour: '', slot: null, name: '', email: '', phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const selectSlot = (day: string, hour: string) => {
    const slot = SCHEDULE[hour]?.[day];
    if (!slot) return;
    setBooking(b => ({ ...b, day, hour, slot }));
    setStep(2);
  };

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!booking.name.trim()) e.name = 'Ingresá tu nombre';
    if (!booking.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email inválido';
    if (!booking.phone.trim()) e.phone = 'Ingresá tu teléfono';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const confirmBooking = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setApiError('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          day: booking.day,
          hour: booking.hour,
          teacher: booking.slot?.teacher ?? '',
          level: booking.slot?.level ?? '',
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'Error al procesar la reserva');
      }
      setStep(4);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Ocurrió un error, intentá de nuevo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.4 }}
        className="bg-[var(--color-cream)] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-[var(--color-emerald)]/10">
          <div>
            {step > 1 && step < 4 && (
              <button onClick={() => setStep(s => (s - 1) as 1 | 2 | 3 | 4)} className="flex items-center gap-1 text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition mb-2">
                <ChevronLeft size={14} /> Volver
              </button>
            )}
            <span className="font-serif text-2xl text-[var(--color-emerald)]">Reservar clase</span>
            {step < 4 && (
              <div className="flex gap-1 mt-3">
                {[1, 2, 3].map(s => (
                  <div key={s} className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-[var(--color-emerald)]' : 'bg-[var(--color-emerald)]/20'}`} />
                ))}
              </div>
            )}
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full border border-[var(--color-emerald)]/20 flex items-center justify-center hover:bg-[var(--color-emerald)] hover:text-[var(--color-cream)] transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="px-8 py-8">
          {/* Step 1: Elegir horario */}
          {step === 1 && (
            <div>
              <p className="text-sm font-light opacity-70 mb-6 tracking-wide">Sede Thays Parque Leloir — Seleccioná un horario disponible</p>

              {/* Leyenda */}
              <div className="flex gap-4 mb-6">
                {(Object.keys(LEVEL_CONFIG) as Level[]).map(l => (
                  <div key={l} className="flex items-center gap-2 text-xs">
                    <span className={`inline-block w-3 h-3 rounded-full ${LEVEL_CONFIG[l].dot}`}></span>
                    <span className="opacity-70">{LEVEL_CONFIG[l].label}</span>
                  </div>
                ))}
              </div>

              {/* Grilla - versión móvil agrupada por día */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left py-2 pr-4 font-medium tracking-widest uppercase opacity-50 w-16">Hora</th>
                      {DAYS.map(d => (
                        <th key={d} className="py-2 px-1 font-medium tracking-widest uppercase opacity-50 text-center">{d.slice(0, 3)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {HOURS.map(hour => (
                      <tr key={hour} className="border-t border-[var(--color-emerald)]/8">
                        <td className="py-2 pr-4 font-mono text-xs opacity-50 font-medium">{hour}</td>
                        {DAYS.map(day => {
                          const slot = SCHEDULE[hour]?.[day];
                          const isSelected = booking.day === day && booking.hour === hour;
                          const cfg = slot ? LEVEL_CONFIG[slot.level] : null;
                          return (
                            <td key={day} className="py-1 px-1">
                              {slot ? (
                                <button
                                  onClick={() => selectSlot(day, hour)}
                                  className={`w-full rounded-lg py-1.5 px-1 text-xs font-medium border transition-all duration-200 ${isSelected ? 'ring-2 ring-[var(--color-emerald)] scale-105' : 'hover:scale-105'} ${cfg!.bg} ${cfg!.text} ${cfg!.border}`}
                                >
                                  {slot.teacher}
                                </button>
                              ) : (
                                <div className="w-full py-1.5 text-center opacity-10 text-xs">—</div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Versión móvil */}
              <div className="md:hidden space-y-6">
                {DAYS.map(day => (
                  <div key={day}>
                    <h4 className="font-medium tracking-widest uppercase text-xs opacity-50 mb-3">{day}</h4>
                    <div className="flex flex-wrap gap-2">
                      {HOURS.map(hour => {
                        const slot = SCHEDULE[hour]?.[day];
                        if (!slot) return null;
                        const cfg = LEVEL_CONFIG[slot.level];
                        const isSelected = booking.day === day && booking.hour === hour;
                        return (
                          <button
                            key={hour}
                            onClick={() => selectSlot(day, hour)}
                            className={`rounded-xl px-3 py-2 text-xs font-medium border transition-all ${isSelected ? 'ring-2 ring-[var(--color-emerald)] scale-105' : ''} ${cfg.bg} ${cfg.text} ${cfg.border}`}
                          >
                            {hour} · {slot.teacher}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Confirmar selección y continuar */}
          {step === 2 && booking.slot && (
            <div>
              <div className="bg-[var(--color-emerald)]/5 rounded-2xl p-6 mb-8 border border-[var(--color-emerald)]/15">
                <p className="text-xs tracking-widest uppercase opacity-50 mb-3">Tu selección</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-emerald)] text-[var(--color-cream)] flex items-center justify-center font-serif text-xl">
                    {booking.slot.teacher[0]}
                  </div>
                  <div>
                    <p className="font-serif text-xl">{booking.slot.teacher}</p>
                    <p className="text-sm opacity-60">{LEVEL_CONFIG[booking.slot.level].label}</p>
                    <p className="text-sm font-medium mt-1">{booking.day} · {booking.hour} hs</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
                <p className="text-xs tracking-widest uppercase text-amber-700 mb-2 font-semibold">Políticas importantes</p>
                <ul className="text-sm text-amber-800 space-y-1.5 font-light">
                  <li>· Cancelaciones hasta <strong>8 horas</strong> antes de la clase</li>
                  <li>· Modificaciones hasta <strong>3 horas</strong> antes (máx. 2 cambios)</li>
                  <li>· La inasistencia fuera de plazo se considera clase utilizada</li>
                </ul>
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full bg-[var(--color-emerald)] text-[var(--color-cream)] py-4 rounded-full text-sm tracking-widest uppercase hover:bg-[var(--color-emerald-light)] transition-colors flex items-center justify-center gap-2"
              >
                Completar datos <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 3: Datos personales */}
          {step === 3 && (
            <div>
              <p className="text-sm font-light opacity-70 mb-8 tracking-wide">Tus datos para confirmar la reserva</p>
              <div className="space-y-5">
                {[
                  { key: 'name', label: 'Nombre completo', type: 'text', placeholder: 'Ej: María González' },
                  { key: 'email', label: 'Email', type: 'email', placeholder: 'hola@ejemplo.com' },
                  { key: 'phone', label: 'Teléfono / WhatsApp', type: 'tel', placeholder: '+54 11 0000 0000' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs tracking-widest uppercase opacity-60 mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={(booking as Record<string, string>)[field.key]}
                      onChange={e => setBooking(b => ({ ...b, [field.key]: e.target.value }))}
                      className={`w-full bg-transparent border rounded-xl px-5 py-3.5 text-sm outline-none transition-colors focus:border-[var(--color-emerald)] placeholder:opacity-30 ${errors[field.key] ? 'border-red-400' : 'border-[var(--color-emerald)]/25'}`}
                    />
                    {errors[field.key] && <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>}
                  </div>
                ))}
              </div>
              {apiError && (
                <p className="text-red-500 text-sm mt-4 text-center">{apiError}</p>
              )}
              <button
                onClick={confirmBooking}
                disabled={loading}
                className="mt-8 w-full bg-[var(--color-emerald)] text-[var(--color-cream)] py-4 rounded-full text-sm tracking-widest uppercase hover:bg-[var(--color-emerald-light)] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Confirmando...' : (<>Confirmar reserva <CheckCircle size={16} /></>)}
              </button>
            </div>
          )}

          {/* Step 4: Confirmación */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 rounded-full bg-[var(--color-emerald)]/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-[var(--color-emerald)]" />
              </div>
              <h3 className="font-serif text-3xl mb-3">¡Reserva confirmada!</h3>
              <p className="text-sm opacity-60 font-light mb-6">
                Te esperamos el <strong className="opacity-100">{booking.day}</strong> a las <strong className="opacity-100">{booking.hour} hs</strong><br />
                con <strong className="opacity-100">{booking.slot?.teacher}</strong> en Thays Parque Leloir.
              </p>
              <p className="text-xs opacity-40 mb-8">Se enviará una confirmación a <span className="underline">{booking.email}</span></p>
              <button
                onClick={onClose}
                className="border border-[var(--color-emerald)] px-8 py-3 rounded-full text-sm tracking-widest uppercase hover:bg-[var(--color-emerald)] hover:text-[var(--color-cream)] transition-colors"
              >
                Cerrar
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── App principal ─────────────────────────────────────────────────────────────
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeTratamiento, setActiveTratamiento] = useState<'faciales' | 'corporal'>('faciales');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquear scroll cuando modal está abierto
  useEffect(() => {
    document.body.style.overflow = bookingOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [bookingOpen]);

  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-emerald)] font-sans selection:bg-[var(--color-emerald)] selection:text-[var(--color-cream)]">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[var(--color-cream)]/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Esmeralda Wellness" className="w-10 h-10" />
            <span className="font-serif text-2xl tracking-widest uppercase">Esmeralda</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
            <a href="#sedes" className="hover:opacity-70 transition-opacity">Sedes</a>
            <a href="#horarios" className="hover:opacity-70 transition-opacity">Horarios</a>
            <a href="#clases" className="hover:opacity-70 transition-opacity">Clases</a>
            <a href="#tratamientos" className="hover:opacity-70 transition-opacity">Tratamientos</a>
            <button
              onClick={() => setBookingOpen(true)}
              className="border border-[var(--color-emerald)] px-6 py-2 rounded-full hover:bg-[var(--color-emerald)] hover:text-[var(--color-cream)] transition-colors"
            >
              Reservar
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[var(--color-cream)] pt-24 px-6 flex flex-col gap-8 md:hidden"
          >
            {['sedes', 'horarios', 'clases', 'tratamientos'].map(id => (
              <a key={id} href={`#${id}`} onClick={() => setMobileMenuOpen(false)} className="font-serif text-4xl capitalize">{id}</a>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); setBookingOpen(true); }}
              className="bg-[var(--color-emerald)] text-[var(--color-cream)] px-8 py-4 rounded-full text-lg mt-8"
            >
              Reservar tu experiencia
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#d4c5b9]">
          <img
            src="/4.PNG"
            alt="Esmeralda Wellness Studio"
            className="w-full h-full object-cover opacity-80 mix-blend-multiply"
            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[var(--color-cream)]/90"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl text-[var(--color-cream)] mb-6 drop-shadow-lg"
          >
            El lujo de<br />sentirse bien.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[var(--color-cream)] text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl mx-auto drop-shadow-md"
          >
            Un espacio para moverse con conciencia, bajar el ritmo y disfrutar cada momento.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <button
              onClick={() => setBookingOpen(true)}
              className="bg-[var(--color-cream)] text-[var(--color-emerald)] px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-white transition-colors flex items-center gap-3"
            >
              Reservar clase <ArrowRight size={18} />
            </button>
            <a
              href="#horarios"
              className="border border-[var(--color-cream)] text-[var(--color-cream)] px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-white/10 transition-colors"
            >
              Ver horarios
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Sedes ──────────────────────────────────────────────────────────── */}
      <section id="sedes" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Nuestras Sedes</h2>
          <p className="opacity-70 max-w-2xl mx-auto font-light">
            Dos espacios diseñados bajo la misma filosofía de bienestar integral y exclusividad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-8 lg:gap-16">
          {/* Leloir */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group cursor-pointer"
          >
            <div className="arch-shape overflow-hidden aspect-[3/4] mb-8 relative bg-[#e8e1d9]">
              <img
                src="/3.PNG"
                alt="Sede Parque Leloir"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"; }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <div className="text-center">
              <h3 className="font-serif text-3xl mb-2">Thays Parque Leloir</h3>
              <div className="flex items-center justify-center gap-2 text-sm opacity-70 mb-6">
                <MapPin size={16} />
                <span>Complejo Thays, Parque Leloir</span>
              </div>
              <button
                onClick={() => setBookingOpen(true)}
                className="border border-[var(--color-emerald)] px-8 py-3 rounded-full text-sm tracking-widest uppercase hover:bg-[var(--color-emerald)] hover:text-[var(--color-cream)] transition-colors"
              >
                Reservar Clase
              </button>
            </div>
          </motion.div>

          {/* Puerto Madero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group cursor-pointer"
          >
            <div className="arch-shape overflow-hidden aspect-[3/4] mb-8 relative bg-[#e8e1d9]">
              <img
                src="/2.PNG"
                alt="Sede Puerto Madero"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-emerald)]/80 to-transparent flex flex-col justify-end p-8 text-[var(--color-cream)]">
                <span className="text-xs tracking-widest uppercase mb-2 font-semibold">Grand Opening</span>
                <span className="font-serif text-4xl">15 de Marzo</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-serif text-3xl mb-2">Puerto Madero</h3>
              <div className="flex items-center justify-center gap-2 text-sm opacity-70 mb-2">
                <MapPin size={16} />
                <span>Rosario Vera Peñaloza 585</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm opacity-70 mb-6 font-medium">
                <Calendar size={16} />
                <span>Reservas habilitadas desde el 15/03</span>
              </div>
              <button className="bg-[var(--color-emerald)] text-[var(--color-cream)] px-8 py-3 rounded-full text-sm tracking-widest uppercase opacity-50 cursor-not-allowed">
                Próximamente
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Grilla de Horarios ─────────────────────────────────────────────── */}
      <section id="horarios" className="py-24 bg-[var(--color-emerald)]/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="text-xs tracking-widest uppercase opacity-50 font-medium">Sede Thays Parque Leloir</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-2 mb-4">Grilla de Horarios</h2>
            <p className="font-light opacity-70 max-w-xl mx-auto">
              Encontrá tu clase ideal. Los colores indican el nivel de cada sesión.
            </p>
          </div>

          {/* Leyenda */}
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                {(Object.keys(LEVEL_CONFIG) as Level[]).map(l => (
                  <div key={l} className="flex items-center gap-2 text-sm">
                    <span className={`inline-block w-3 h-3 rounded-full ${LEVEL_CONFIG[l].dot}`}></span>
                    <span className="font-medium opacity-80">{LEVEL_CONFIG[l].label}</span>
                  </div>
                ))}
              </div>

          {/* Tabla desktop */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-[var(--color-emerald)]/12 bg-[var(--color-cream)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-emerald)]/10">
                  <th className="py-4 px-6 text-left font-medium tracking-widest uppercase text-xs opacity-40 w-24">
                    <Clock size={14} className="inline mr-1" />Hora
                  </th>
                  {DAYS.map(d => (
                    <th key={d} className="py-4 px-3 font-medium tracking-widest uppercase text-xs opacity-60 text-center">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HOURS.map((hour, i) => (
                  <motion.tr
                    key={hour}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="border-b border-[var(--color-emerald)]/6 last:border-0 hover:bg-[var(--color-emerald)]/3 transition-colors"
                  >
                    <td className="py-3 px-6 font-mono text-xs font-semibold opacity-50">{hour}</td>
                    {DAYS.map(day => {
                      const slot = SCHEDULE[hour]?.[day];
                      const cfg = slot ? LEVEL_CONFIG[slot.level] : null;
                      return (
                        <td key={day} className="py-2 px-2 text-center">
                          {slot && cfg ? (
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
                              {slot.teacher}
                            </span>
                          ) : (
                            <span className="text-[var(--color-emerald)]/15 text-lg">—</span>
                          )}
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards móvil */}
          <div className="md:hidden space-y-4">
            {DAYS.map(day => (
              <details key={day} className="bg-[var(--color-cream)] rounded-2xl border border-[var(--color-emerald)]/12 overflow-hidden group">
                <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-medium tracking-widest uppercase text-sm list-none">
                  {day}
                  <span className="opacity-40 group-open:rotate-90 transition-transform inline-block">›</span>
                </summary>
                <div className="px-6 pb-4 space-y-2">
                  {HOURS.map(hour => {
                    const slot = SCHEDULE[hour]?.[day];
                    if (!slot) return null;
                    const cfg = LEVEL_CONFIG[slot.level];
                    return (
                      <div key={hour} className="flex items-center justify-between">
                        <span className="font-mono text-xs opacity-50">{hour}</span>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
                          {slot.teacher}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setBookingOpen(true)}
              className="border border-[var(--color-emerald)] px-8 py-3 rounded-full text-sm tracking-widest uppercase hover:bg-[var(--color-emerald)] hover:text-[var(--color-cream)] transition-colors"
            >
              Reservar mi lugar
            </button>
          </div>
        </div>
      </section>

      {/* ── Disciplinas ────────────────────────────────────────────────────── */}
      <section id="clases" className="bg-[var(--color-emerald)] text-[var(--color-cream)] py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Nuestras Disciplinas</h2>
            <p className="font-light text-lg opacity-80 max-w-2xl mx-auto">
              Más que un entrenamiento, una experiencia integral. Diseñado para quienes buscan un espacio donde el cuerpo se fortalece y la mente descansa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
            {[
              { title: 'Pilates Reformer', desc: 'Fortalece tu centro, mejora tu postura y flexibilidad con la técnica original en nuestros reformers de madera.', img: '/pilates.PNG' },
              { title: 'Barre', desc: 'Una fusión dinámica de ballet, pilates y yoga que tonifica y esculpe cada músculo de tu cuerpo.', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80' },
              { title: 'Yoga', desc: 'Conecta respiración y movimiento para encontrar equilibrio mental y físico en un ambiente de paz.', img: '/yoga.PNG' },
              { title: 'Masajes', desc: 'Rituales de bienestar exclusivos diseñados para liberar tensiones y restaurar tu energía vital.', img: '/masajes.PNG' },
            ].map((cls, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col group"
              >
                <div className="arch-shape overflow-hidden aspect-[3/4] mb-6 relative bg-[#003d33]">
                  <img src={cls.img} alt={cls.title} className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100" />
                </div>
                <h3 className="font-serif text-2xl mb-3">{cls.title}</h3>
                <p className="font-light text-sm opacity-80 mb-6 flex-grow">{cls.desc}</p>
                <button
                  onClick={() => setBookingOpen(true)}
                  className="self-start border border-[var(--color-cream)] px-6 py-2 rounded-full text-xs tracking-widest uppercase hover:bg-[var(--color-cream)] hover:text-[var(--color-emerald)] transition-colors"
                >
                  Reservar
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tratamientos ───────────────────────────────────────────────────── */}
      <section id="tratamientos" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs tracking-widest uppercase opacity-50 font-medium flex items-center justify-center gap-2">
            <Sparkles size={12} /> Exclusivo Puerto Madero
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2 mb-4">Rituales & Tratamientos</h2>
          <p className="font-light opacity-70 max-w-xl mx-auto">
            Protocolos exclusivos orientados a reequilibrar, fortalecer y embellecer desde adentro hacia afuera.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-0 mb-14 bg-[var(--color-emerald)]/6 rounded-full p-1 w-fit mx-auto">
          <button
            onClick={() => setActiveTratamiento('faciales')}
            className={`px-6 py-2.5 rounded-full text-sm tracking-widest uppercase font-medium transition-all ${activeTratamiento === 'faciales' ? 'bg-[var(--color-emerald)] text-[var(--color-cream)]' : 'hover:opacity-70'}`}
          >
            Faciales
          </button>
          <button
            onClick={() => setActiveTratamiento('corporal')}
            className={`px-6 py-2.5 rounded-full text-sm tracking-widest uppercase font-medium transition-all ${activeTratamiento === 'corporal' ? 'bg-[var(--color-emerald)] text-[var(--color-cream)]' : 'hover:opacity-70'}`}
          >
            Corporales
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTratamiento === 'faciales' && (
            <motion.div
              key="faciales"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {FACIALES.map((t, idx) => (
                <motion.div
                  key={t.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border border-[var(--color-emerald)]/15 rounded-3xl p-8 hover:border-[var(--color-emerald)]/40 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="font-mono text-xs opacity-30">[{t.num}]</span>
                    <div className="w-8 h-8 rounded-full bg-[var(--color-emerald)]/8 flex items-center justify-center">
                      <Leaf size={14} className="text-[var(--color-emerald)] opacity-60" />
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl mb-6">{t.title}</h3>
                  <ul className="space-y-2.5">
                    {t.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm font-light opacity-75">
                        <span className="w-1 h-1 rounded-full bg-[var(--color-emerald)]/40 mt-2 shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTratamiento === 'corporal' && (
            <motion.div
              key="corporal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="border border-[var(--color-emerald)]/15 rounded-3xl p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-emerald)]/8 flex items-center justify-center">
                    <Star size={18} className="text-[var(--color-emerald)] opacity-60" />
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl">Ritual Lomi Lomi</h3>
                    <span className="text-sm opacity-50">60 minutos</span>
                  </div>
                </div>
                <p className="font-light opacity-80 mb-8 leading-relaxed text-sm">
                  Técnica tradicional de Hawái caracterizada por movimientos largos, fluidos y rítmicos realizados con manos, antebrazos y codos, imitando el vaivén de las olas del mar.
                </p>
                <div className="bg-[var(--color-emerald)]/5 rounded-2xl p-6">
                  <p className="text-xs tracking-widest uppercase opacity-40 mb-3">Beneficios</p>
                  <ul className="space-y-2.5">
                    {[
                      'Trabaja a nivel emocional y energético',
                      'Libera tensiones profundas acumuladas',
                      'Encuentra equilibrio y armonía interior',
                      'Movimiento continuo que induce un estado meditativo',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm font-light opacity-75">
                        <span className="w-1 h-1 rounded-full bg-[var(--color-emerald)]/40 mt-2 shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Políticas ──────────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-emerald)] text-[var(--color-cream)] py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-3">Políticas de Reserva</h2>
            <p className="font-light opacity-70 text-sm">Para garantizar la experiencia de todos nuestros alumnos</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Clock size={20} />, title: 'Cancelación', desc: 'Las clases pueden cancelarse hasta 8 horas antes del inicio.', color: 'bg-white/10' },
              { icon: <Calendar size={20} />, title: 'Modificación', desc: 'Las reservas pueden modificarse hasta 3 horas antes, con un máximo de 2 cambios por clase.', color: 'bg-white/10' },
              { icon: <CheckCircle size={20} />, title: 'Inasistencia', desc: 'Si no se cumple el plazo y no se asiste, la clase se considerará utilizada.', color: 'bg-white/10' },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`${p.color} border border-white/10 rounded-2xl p-7`}
              >
                <div className="mb-5 opacity-70">{p.icon}</div>
                <h3 className="font-serif text-xl mb-3">{p.title}</h3>
                <p className="text-sm opacity-70 font-light leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="py-12 px-6 md:px-12 border-t border-[var(--color-emerald)]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Esmeralda Wellness" className="w-8 h-8" />
            <span className="font-serif text-xl tracking-widest uppercase">Esmeralda</span>
          </div>
          <div className="flex gap-6 text-sm tracking-widest uppercase">
            <a href="https://instagram.com/thaysparqueleloir" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Instagram size={16} /> @thaysparqueleloir
            </a>
            <a href="https://instagram.com/esmeralda.wellness" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Instagram size={16} /> @esmeralda.wellness
            </a>
          </div>
        </div>
      </footer>

      {/* ── Modal de Reservas ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
