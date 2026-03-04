import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Scissors,
    Calendar,
    Clock,
    User,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    Phone,
    MessageCircle,
    Bell,
    Star,
    MapPin,
    X
} from 'lucide-react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

// --- DATA ---
const BARBERS = [
    {
        id: 1,
        name: 'Mateo',
        specialty: 'Especialista en Degradados',
        rating: 4.9,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1599351431247-f587f2f18363?auto=format&fit=crop&q=80&w=500&h=500'
    },
    {
        id: 2,
        name: 'Adrián',
        specialty: 'Experto en Barbas & Spa',
        rating: 4.8,
        reviews: 98,
        image: 'https://images.unsplash.com/photo-1593526492327-b071f3d5333e?auto=format&fit=crop&q=80&w=500&h=500'
    },
    {
        id: 3,
        name: 'Nico',
        specialty: 'Estilo Clásico & Tijera',
        rating: 5.0,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1621605815841-aa8ae09703f8?auto=format&fit=crop&q=80&w=500&h=500'
    }
];

const SERVICES = [
    { id: 1, name: 'Corte de Cabello', duration: '45 min', price: 25000 },
    { id: 2, name: 'Perfilado de Barba', duration: '30 min', price: 15000 },
    { id: 3, name: 'Corte + Barba', duration: '75 min', price: 35000 },
    { id: 4, name: 'Limpieza Facial', duration: '20 min', price: 12000 },
    { id: 5, name: 'Cejas', duration: '15 min', price: 8000 }
];

const TIME_SLOTS = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

// --- COMPONENTS ---

const StepIndicator = ({ currentStep }) => (
    <div className="flex justify-center gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((step) => (
            <div
                key={step}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${step <= currentStep ? 'bg-[var(--primary)] scale-125' : 'bg-gray-700'
                    }`}
            />
        ))}
    </div>
);

export default function App() {
    const [activeTab, setActiveTab] = useState('client'); // 'client' or 'barber'
    const [currentStep, setCurrentStep] = useState(1);
    const [booking, setBooking] = useState({
        barber: null,
        services: [],
        date: startOfToday(),
        time: null,
        customer: { name: '', phone: '' }
    });
    const [notifications, setNotifications] = useState([]);

    // Mock Notification logic
    const sendToBarber = (appointment) => {
        const newNotif = {
            id: Date.now(),
            text: `Nueva cita: ${appointment.customer.name} - ${appointment.time} con ${appointment.barber.name}`,
            time: new Date().toLocaleTimeString()
        };
        setNotifications([newNotif, ...notifications]);
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const toggleService = (service) => {
        setBooking(prev => {
            const exists = prev.services.find(s => s.id === service.id);
            if (exists) {
                return { ...prev, services: prev.services.filter(s => s.id !== service.id) };
            }
            return { ...prev, services: [...prev.services, service] };
        });
    };

    const calculateTotal = () => booking.services.reduce((acc, s) => acc + s.price, 0);

    const resetBooking = () => {
        setBooking({
            barber: null,
            services: [],
            date: startOfToday(),
            time: null,
            customer: { name: '', phone: '' }
        });
        setCurrentStep(1);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-dark)] text-white">
            {/* Header */}
            <nav className="p-6 flex justify-between items-center glass-panel m-4 absolute top-0 left-0 right-0 z-50">
                <div className="flex items-center gap-2">
                    <Scissors className="text-[var(--primary)]" />
                    <span className="font-heading text-xl font-bold tracking-tighter uppercase italic">Luxury Brother</span>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('client')}
                        className={`text-sm font-semibold ${activeTab === 'client' ? 'text-[var(--primary)]' : 'text-gray-400'}`}
                    >
                        Reservar
                    </button>
                    <button
                        onClick={() => setActiveTab('barber')}
                        className={`text-sm font-semibold flex items-center gap-2 ${activeTab === 'barber' ? 'text-[var(--primary)]' : 'text-gray-400'}`}
                    >
                        Panel Barbero
                        {notifications.length > 0 && (
                            <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                                {notifications.length}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            {activeTab === 'client' && currentStep === 1 && (
                <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden mb-12">
                    <img
                        src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1920"
                        alt="Hero Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 hero-overlay" />
                    <div className="relative z-10 max-w-2xl px-4 animate-fade">
                        <h1 className="text-5xl md:text-8xl font-black font-heading tracking-tighter mb-4 italic uppercase leading-[0.9]">
                            REDEFINE <br /> <span className="text-[var(--primary)]">TU ESTILO</span>
                        </h1>
                        <p className="text-lg text-gray-300 md:text-xl font-light tracking-wide max-w-lg mx-auto mb-10 mt-6">
                            Agenda tu cita en segundos con los mejores artistas de la ciudad. Precisión, lujo y confort en un solo lugar.
                        </p>
                        <button
                            onClick={() => {
                                const el = document.getElementById('booking-section');
                                el?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="btn-primary"
                        >
                            Agendar Ahora
                        </button>
                    </div>
                </section>
            )}

            <main id="booking-section" className={`max-w-4xl mx-auto px-4 py-8 ${activeTab === 'client' && currentStep === 1 ? 'pt-0' : 'pt-32'}`}>
                {activeTab === 'client' ? (
                    <div className="animate-fade">
                        {currentStep < 5 && (
                            <h2 className="section-title">
                                {currentStep === 1 && 'Selecciona tu Artista'}
                                {currentStep === 2 && 'Elige los Servicios'}
                                {currentStep === 3 && 'Agenda tu Fecha'}
                                {currentStep === 4 && 'Tus Datos'}
                            </h2>
                        )}

                        <StepIndicator currentStep={currentStep} />

                        <AnimatePresence mode="wait">
                            {/* Step 1: Barber Selection */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                                >
                                    {BARBERS.map(barber => (
                                        <div
                                            key={barber.id}
                                            onClick={() => { setBooking({ ...booking, barber }); nextStep(); }}
                                            className={`barber-card glass-panel cursor-pointer group hover:border-[var(--primary)] ${booking.barber?.id === barber.id ? 'border-[var(--primary)]' : ''}`}
                                        >
                                            <img src={barber.image} alt={barber.name} className="w-full h-80 object-cover rounded-t-2xl" />
                                            <div className="p-5 relative z-10 -mt-16 bg-gradient-to-t from-black to-transparent pt-20">
                                                <h3 className="text-xl font-bold font-heading">{barber.name}</h3>
                                                <p className="text-gray-400 text-sm mb-2">{barber.specialty}</p>
                                                <div className="flex items-center gap-1 text-[var(--primary)] text-sm">
                                                    <Star size={14} fill="currentColor" />
                                                    <span>{barber.rating}</span>
                                                    <span className="text-gray-500 font-normal">({barber.reviews} reseñas)</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {/* Step 2: Services */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="max-w-xl mx-auto space-y-4"
                                >
                                    {SERVICES.map(service => (
                                        <div
                                            key={service.id}
                                            onClick={() => toggleService(service)}
                                            className={`flex justify-between items-center p-5 glass-panel cursor-pointer border-2 transition-all ${booking.services.find(s => s.id === service.id) ? 'border-[var(--primary)] bg-[var(--accent-glow)]' : 'border-transparent'
                                                }`}
                                        >
                                            <div>
                                                <h4 className="font-bold text-lg">{service.name}</h4>
                                                <p className="text-gray-400 text-sm">{service.duration}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-[var(--primary)]">${service.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="pt-6 flex justify-between items-center">
                                        <button onClick={prevStep} className="btn-outline flex items-center gap-2">
                                            <ChevronLeft size={20} /> Atrás
                                        </button>
                                        <button
                                            disabled={booking.services.length === 0}
                                            onClick={nextStep}
                                            className="btn-primary"
                                        >
                                            Siguiente (${calculateTotal().toLocaleString()})
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Date & Time */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="max-w-2xl mx-auto"
                                >
                                    {/* Horizontal Scroll Date Picker */}
                                    <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                                        {[...Array(7)].map((_, i) => {
                                            const day = addDays(startOfToday(), i);
                                            const isSelected = isSameDay(day, booking.date);
                                            return (
                                                <div
                                                    key={i}
                                                    onClick={() => setBooking({ ...booking, date: day })}
                                                    className={`flex-shrink-0 w-20 h-24 glass-panel border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${isSelected ? 'border-[var(--primary)] bg-[var(--accent-glow)]' : 'border-transparent'
                                                        }`}
                                                >
                                                    <span className="text-xs uppercase text-gray-500">{format(day, 'EEE', { locale: es })}</span>
                                                    <span className="text-xl font-bold">{format(day, 'd')}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Time Grid */}
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 py-8">
                                        {TIME_SLOTS.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => setBooking({ ...booking, time })}
                                                className={`py-3 rounded-lg border-2 transition-all ${booking.time === time ? 'border-[var(--primary)] bg-[var(--primary)] text-black font-bold' : 'border-gray-800 hover:border-gray-600'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="pt-6 flex justify-between items-center">
                                        <button onClick={prevStep} className="btn-outline">Atrás</button>
                                        <button disabled={!booking.time} onClick={nextStep} className="btn-primary">Continuar</button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 4: Customer Info */}
                            {currentStep === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="max-w-md mx-auto glass-panel p-8"
                                >
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Nombre Completo</label>
                                            <input
                                                type="text"
                                                value={booking.customer.name}
                                                onChange={(e) => setBooking({ ...booking, customer: { ...booking.customer, name: e.target.value } })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--primary)] transition-all"
                                                placeholder="Ej: Juan Pérez"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">WhatsApp / Teléfono</label>
                                            <input
                                                type="tel"
                                                value={booking.customer.phone}
                                                onChange={(e) => setBooking({ ...booking, customer: { ...booking.customer, phone: e.target.value } })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--primary)] transition-all"
                                                placeholder="Ej: +57 300 000 0000"
                                            />
                                        </div>

                                        <div className="bg-[var(--primary)]/10 p-4 rounded-xl space-y-2 text-sm">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400">Barbero:</span>
                                                <span className="font-bold">{booking.barber?.name}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-400">Fecha:</span>
                                                <span className="font-bold">{format(booking.date, 'dd MMMM yyyy', { locale: es })} a las {booking.time}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-white/10">
                                                <span className="text-gray-400">Total:</span>
                                                <span className="font-bold text-[var(--primary)] text-lg">${calculateTotal().toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <button onClick={prevStep} className="btn-outline flex-1">Atrás</button>
                                            <button
                                                disabled={!booking.customer.name || !booking.customer.phone}
                                                onClick={() => { sendToBarber(booking); nextStep(); }}
                                                className="btn-primary flex-2"
                                            >
                                                Confirmar Cita
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 5: Success */}
                            {currentStep === 5 && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="max-w-md mx-auto text-center py-12"
                                >
                                    <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <h2 className="text-3xl font-heading font-black mb-4">¡CITA AGENDADA!</h2>
                                    <p className="text-gray-400 mb-8">Gracias {booking.customer.name}, tu cita con {booking.barber?.name} ha sido registrada con éxito. Recibirás un mensaje de confirmación vía WhatsApp.</p>

                                    <div className="space-y-4">
                                        <button className="btn-primary w-full flex justify-center gap-2" onClick={() => window.open(`https://wa.me/${booking.customer.phone}`, '_blank')}>
                                            <MessageCircle size={20} /> Abrir WhatsApp
                                        </button>
                                        <button className="btn-outline w-full" onClick={resetBooking}>Volver al Inicio</button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    /* Barber Panel Mockup */
                    <div className="animate-fade space-y-8">
                        <h2 className="section-title">Panel del Barbero</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass-panel p-6 text-center">
                                <p className="text-gray-400 text-sm mb-1">Citas de Hoy</p>
                                <p className="text-4xl font-black text-[var(--primary)] font-heading">{notifications.length}</p>
                            </div>
                            <div className="glass-panel p-6 text-center">
                                <p className="text-gray-400 text-sm mb-1">Ganancias Estimadas</p>
                                <p className="text-4xl font-black text-green-500 font-heading">$45K</p>
                            </div>
                            <div className="glass-panel p-6 text-center">
                                <p className="text-gray-400 text-sm mb-1">Próxima Cita</p>
                                <p className="text-lg font-bold font-heading">{notifications[0]?.text.split(': ')[1]?.split(' - ')[0] || '---'}</p>
                            </div>
                        </div>

                        <div className="glass-panel p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Bell className="text-[var(--primary)]" />
                                <h3 className="text-xl font-bold font-heading">Notificaciones en Tiempo Real</h3>
                            </div>

                            <div className="space-y-4">
                                {notifications.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">
                                        <User size={48} className="mx-auto mb-4 opacity-20" />
                                        <p>No hay citas agendadas todavía.</p>
                                    </div>
                                ) : (
                                    notifications.map(notif => (
                                        <motion.div
                                            key={notif.id}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            className="p-4 bg-white/5 border-l-4 border-[var(--primary)] rounded-r-xl flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="font-bold">{notif.text}</p>
                                                <p className="text-xs text-gray-500">{notif.time}</p>
                                            </div>
                                            <button className="p-2 hover:bg-white/10 rounded-full text-gray-400">
                                                <CheckCircle2 size={18} />
                                            </button>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => setActiveTab('client')}
                                className="btn-outline"
                            >
                                Cerrar Sesión Panel
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <footer className="mt-20 border-t border-white/5 py-12 transparent">
                <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                            <Scissors className="text-[var(--primary)]" />
                            <span className="font-heading font-black italic uppercase">Luxury Brother</span>
                        </div>
                        <p className="text-gray-500 text-sm">Elevando tu estilo con la precisión que mereces. La barbería urbana por excelencia.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Ubicación</h4>
                        <div className="flex items-center gap-2 justify-center md:justify-start text-gray-400 text-sm">
                            <MapPin size={16} /> Calle 123 #45-67, El Poblado
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Atención</h4>
                        <p className="text-gray-400 text-sm">Lun - Sáb: 9:00 AM - 8:00 PM</p>
                        <p className="text-gray-400 text-sm">Dom: 10:00 AM - 4:00 PM</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
