import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Users, Check } from 'lucide-react';
import Footer from '@/components/Footer';

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f6f6e9]">
      {/* Hero */}
      <section className="relative pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm tracking-[0.2em] uppercase text-[#dfbfbf] font-medium"
          >
            Reservations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-6xl font-bold text-[#4c4c17] mt-4"
          >
            Book Your <span className="italic">Table</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[#4c4c17]/70 max-w-lg mx-auto"
          >
            Reserve your spot for an unforgettable dining experience. Walk-ins always welcome!
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-display text-xl font-semibold text-[#4c4c17] mb-6">Restaurant Info</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#f6f6e9] rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-[#4c4c17]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#4c4c17]">Address</p>
                      <p className="text-sm text-[#4c4c17]/60">42 Berry Street<br />Brooklyn, NY 11249</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#f6f6e9] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-[#4c4c17]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#4c4c17]">Hours</p>
                      <p className="text-sm text-[#4c4c17]/60">
                        Mon-Thu: 11am - 10pm<br />
                        Fri-Sat: 11am - 11pm<br />
                        Sun: 10am - 9pm
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#f6f6e9] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-[#4c4c17]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#4c4c17]">Contact</p>
                      <p className="text-sm text-[#4c4c17]/60">(718) 555-0123<br />hello@savoryandsage.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-12 shadow-sm text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Check className="w-8 h-8 text-green-600" />
                  </motion.div>
                  <h2 className="font-display text-2xl font-semibold text-[#4c4c17]">Reservation Confirmed!</h2>
                  <p className="mt-2 text-[#4c4c17]/60">
                    We&apos;ve sent a confirmation to your email. See you soon!
                  </p>
                </motion.div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="font-display text-2xl font-semibold text-[#4c4c17] mb-6">Make a Reservation</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Name</label>
                        <div className="relative">
                          <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4c4c17]/30" />
                          <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your full name"
                            required
                            className="w-full pl-11 pr-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          required
                          className="w-full px-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4c4c17]/30" />
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="(555) 123-4567"
                            required
                            className="w-full pl-11 pr-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Guests</label>
                        <select
                          value={form.guests}
                          onChange={(e) => setForm({ ...form, guests: e.target.value })}
                          className="w-full px-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] focus:ring-2 focus:ring-[#4c4c17]/20 outline-none"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People</option>
                          <option value="3">3 People</option>
                          <option value="4">4 People</option>
                          <option value="5">5-8 People</option>
                          <option value="8">8+ People</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4c4c17]/30" />
                          <input
                            type="date"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                            required
                            className="w-full pl-11 pr-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] focus:ring-2 focus:ring-[#4c4c17]/20 outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Time</label>
                        <div className="relative">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4c4c17]/30" />
                          <select
                            value={form.time}
                            onChange={(e) => setForm({ ...form, time: e.target.value })}
                            required
                            className="w-full pl-11 pr-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] focus:ring-2 focus:ring-[#4c4c17]/20 outline-none"
                          >
                            <option value="">Select time</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="19:00">7:00 PM</option>
                            <option value="20:00">8:00 PM</option>
                            <option value="21:00">9:00 PM</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Special Requests (optional)</label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        placeholder="Allergies, special occasions, seating preferences..."
                        rows={3}
                        className="w-full px-4 py-3 bg-[#f6f6e9] rounded-xl text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none resize-none"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      className="w-full py-4 bg-[#4c4c17] text-[#f6f6e9] rounded-xl font-medium hover:bg-[#4c4c17]/90 transition-colors"
                    >
                      Confirm Reservation
                    </motion.button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
