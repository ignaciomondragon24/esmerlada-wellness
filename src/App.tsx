import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, ArrowRight, Menu, X, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-emerald)] font-sans selection:bg-[var(--color-emerald)] selection:text-[var(--color-cream)]">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[var(--color-cream)]/90 backdrop-blur-md py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-[var(--color-emerald)] flex items-center justify-center">
              <span className="font-serif text-lg leading-none">E</span>
            </div>
            <span className="font-serif text-2xl tracking-widest uppercase">
              Esmeralda
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
            <a href="#espacios" className="hover:opacity-70 transition-opacity">Espacios</a>
            <a href="#sedes" className="hover:opacity-70 transition-opacity">Sedes</a>
            <a href="#clases" className="hover:opacity-70 transition-opacity">Clases</a>
            <button className="border border-[var(--color-emerald)] px-6 py-2 rounded-full hover:bg-[var(--color-emerald)] hover:text-[var(--color-cream)] transition-colors">
              Reservar
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[var(--color-cream)] pt-24 px-6 flex flex-col gap-8 md:hidden"
          >
            <a href="#espacios" onClick={() => setMobileMenuOpen(false)} className="font-serif text-4xl">Espacios</a>
            <a href="#sedes" onClick={() => setMobileMenuOpen(false)} className="font-serif text-4xl">Sedes</a>
            <a href="#clases" onClick={() => setMobileMenuOpen(false)} className="font-serif text-4xl">Clases</a>
            <button className="bg-[var(--color-emerald)] text-[var(--color-cream)] px-8 py-4 rounded-full text-lg mt-8">
              Reservar tu experiencia
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Fallback */}
        <div className="absolute inset-0 z-0 bg-[#d4c5b9]">
          <img
            src="/4.jpg"
            alt="Esmeralda Wellness Studio"
            className="w-full h-full object-cover opacity-80 mix-blend-multiply"
            onError={(e) => {
              // Fallback if 4.jpg is not available in public folder
              e.currentTarget.src = "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80";
            }}
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
            Un espacio creado para reconectar con tu cuerpo, calmar la mente y elevar tu energía.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <button className="bg-[var(--color-cream)] text-[var(--color-emerald)] px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium hover:bg-white transition-colors flex items-center gap-3 mx-auto">
              Comenzar el ritual <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Sedes Section */}
      <section id="sedes" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Nuestras Sedes</h2>
          <p className="text-opacity-70 max-w-2xl mx-auto font-light">
            Dos espacios diseñados bajo la misma filosofía de bienestar integral y exclusividad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-8 lg:gap-16">
          {/* Sede Leloir */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group cursor-pointer"
          >
            <div className="arch-shape overflow-hidden aspect-[3/4] mb-8 relative bg-[#e8e1d9]">
              <img
                src="/3.jpg"
                alt="Sede Parque Leloir"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <div className="text-center">
              <h3 className="font-serif text-3xl mb-2">Thays Parque Leloir</h3>
              <div className="flex items-center justify-center gap-2 text-sm opacity-70 mb-6">
                <MapPin size={16} />
                <span>Martín Fierro 3361, Ituzaingó</span>
              </div>
              <button className="border border-[var(--color-emerald)] px-8 py-3 rounded-full text-sm tracking-widest uppercase hover:bg-[var(--color-emerald)] hover:text-[var(--color-cream)] transition-colors">
                Reservar Clase
              </button>
            </div>
          </motion.div>

          {/* Sede Puerto Madero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group cursor-pointer"
          >
            <div className="arch-shape overflow-hidden aspect-[3/4] mb-8 relative bg-[#e8e1d9]">
              <img
                src="/2.jpg"
                alt="Sede Puerto Madero"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80";
                }}
              />
              {/* Overlay for Grand Opening */}
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
              <button className="bg-[var(--color-emerald)] text-[var(--color-cream)] px-8 py-3 rounded-full text-sm tracking-widest uppercase hover:bg-[var(--color-emerald-light)] transition-colors opacity-50 cursor-not-allowed">
                Próximamente
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Classes Section */}
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
              {
                title: 'Pilates Reformer',
                desc: 'Fortalece tu centro, mejora tu postura y flexibilidad con la técnica original en nuestros reformers de madera.',
                img: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80'
              },
              {
                title: 'Barre',
                desc: 'Una fusión dinámica de ballet, pilates y yoga que tonifica y esculpe cada músculo de tu cuerpo.',
                img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80'
              },
              {
                title: 'Yoga',
                desc: 'Conecta respiración y movimiento para encontrar equilibrio mental y físico en un ambiente de paz.',
                img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80'
              },
              {
                title: 'Masajes',
                desc: 'Rituales de bienestar exclusivos diseñados para liberar tensiones y restaurar tu energía vital.',
                img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80'
              }
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
                  <img 
                    src={cls.img} 
                    alt={cls.title} 
                    className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <h3 className="font-serif text-2xl mb-3">{cls.title}</h3>
                <p className="font-light text-sm opacity-80 mb-6 flex-grow">
                  {cls.desc}
                </p>
                <button className="self-start border border-[var(--color-cream)] px-6 py-2 rounded-full text-xs tracking-widest uppercase hover:bg-[var(--color-cream)] hover:text-[var(--color-emerald)] transition-colors">
                  Reservar
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-[var(--color-emerald)]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-[var(--color-emerald)] flex items-center justify-center">
              <span className="font-serif text-lg leading-none">E</span>
            </div>
            <span className="font-serif text-xl tracking-widest uppercase">
              Esmeralda
            </span>
          </div>
          
          <div className="flex gap-6 text-sm tracking-widest uppercase">
            <a href="https://instagram.com/thaysparqueleloir" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Instagram size={16} />
              @thaysparqueleloir
            </a>
            <a href="https://instagram.com/esmeralda.wellness" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Instagram size={16} />
              @esmeralda.wellness
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
