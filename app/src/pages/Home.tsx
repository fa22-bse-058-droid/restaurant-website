import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';
import Footer from '@/components/Footer';

const galleryImages = [
  '/images/img-1.jpg',
  '/images/img-7.jpg',
  '/images/img-8.jpg',
  '/images/img-9.jpg',
  '/images/img-10.jpg',
  '/images/img-11.jpg',
  '/images/img-12.jpg',
  '/images/img-4.jpg',
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const { scrollYProgress: expProgress } = useScroll({
    target: experienceRef,
    offset: ['start end', 'end start'],
  });
  const expImageScale = useTransform(expProgress, [0, 0.5], [0.8, 1]);
  const expImageRotate = useTransform(expProgress, [0, 0.5], [5, 0]);

  const { scrollYProgress: galleryProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start'],
  });
  const galleryX = useTransform(galleryProgress, [0, 1], ['0%', '-50%']);

  return (
    <div ref={containerRef} className="relative">

      {/* ── Hero Section ── */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative h-screen flex items-center overflow-hidden"
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Text Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm tracking-[0.3em] uppercase text-white/60 mb-4"
          >
            Est. 2024 &mdash; Brooklyn, NY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight max-w-3xl"
          >
            Savory
            <br />
            <span className="italic text-[#dfbfbf]">&</span> Sage
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 text-lg text-white/70 max-w-md"
          >
            Where global flavors meet the comfort of home cooking.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-8 flex gap-4"
          >
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#4c4c17] rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              View Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/reservations"
              className="inline-flex items-center gap-2 px-8 py-3 border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Reserve Table
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1"
          >
            <motion.div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── The Experience Section ── */}
      <section ref={experienceRef} className="relative py-32 bg-[#f6f6e9] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm tracking-[0.2em] uppercase text-[#dfbfbf] font-medium"
              >
                Our Story
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-4xl md:text-5xl font-bold text-[#4c4c17] mt-4 leading-tight"
              >
                Where Every Bite
                <br />
                <span className="italic">Feels Like Home</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-[#4c4c17]/70 leading-relaxed text-lg"
              >
                Inspired by travels across the Mediterranean, Asia, and Latin America,
                our menu celebrates the universal language of comfort food. Each dish
                tells a story of tradition reimagined with modern techniques and the
                freshest seasonal ingredients.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex gap-8"
              >
                <div>
                  <span className="font-display text-3xl font-bold text-[#4c4c17]">50+</span>
                  <p className="text-sm text-[#4c4c17]/60 mt-1">Signature Dishes</p>
                </div>
                <div>
                  <span className="font-display text-3xl font-bold text-[#4c4c17]">4.9</span>
                  <p className="text-sm text-[#4c4c17]/60 mt-1">Customer Rating</p>
                </div>
                <div>
                  <span className="font-display text-3xl font-bold text-[#4c4c17]">12K+</span>
                  <p className="text-sm text-[#4c4c17]/60 mt-1">Happy Guests</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              style={{ scale: expImageScale, rotate: expImageRotate }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/images/img-8.jpg"
                  alt="Signature Dish"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4c4c17]/20 to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-white px-6 py-4 rounded-xl shadow-lg"
              >
                <p className="font-display text-lg font-semibold text-[#4c4c17]">Chef&apos;s Special</p>
                <p className="text-sm text-[#4c4c17]/60">Pan-Seared Duck Breast</p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Gallery Marquee ── */}
      <section ref={galleryRef} className="py-20 bg-[#4c4c17] overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm tracking-[0.2em] uppercase text-[#dfbfbf]">Gallery</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#f6f6e9] mt-2">
            Culinary <span className="italic">Highlights</span>
          </h2>
        </motion.div>

        <motion.div style={{ x: galleryX }} className="flex gap-6 px-6">
          {[...galleryImages, ...galleryImages].map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex-shrink-0 w-[300px] h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Featured Menu Items ── */}
      <section className="py-32 bg-[#f6f6e9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm tracking-[0.2em] uppercase text-[#dfbfbf]">From Our Kitchen</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#4c4c17] mt-2">
              Featured <span className="italic">Dishes</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Truffle Arancini', price: '$14', desc: 'Crispy risotto balls with black truffle', img: '/images/img-10.jpg' },
              { name: 'Wagyu Burger',     price: '$28', desc: 'Premium wagyu with aged cheddar',        img: '/images/img-4.jpg'  },
              { name: 'Lava Cake',        price: '$12', desc: 'Warm chocolate with vanilla ice cream',  img: '/images/img-12.jpg' },
            ].map((dish, i) => (
              <motion.div
                key={dish.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="font-display text-xl font-semibold text-[#4c4c17]">{dish.name}</h3>
                      <span className="font-display text-lg font-bold text-[#dfbfbf]">{dish.price}</span>
                    </div>
                    <p className="mt-2 text-sm text-[#4c4c17]/60">{dish.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3 border border-[#4c4c17] text-[#4c4c17] rounded-full font-medium hover:bg-[#4c4c17] hover:text-[#f6f6e9] transition-all"
            >
              View Full Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Visit Us / Reservation Section ── */}
      <section className="py-32 bg-[#4c4c17] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[20vw] font-display font-bold text-[#f6f6e9] whitespace-nowrap"
          >
            NEIGHBORHOOD SPOT
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm tracking-[0.2em] uppercase text-[#dfbfbf]">Visit Us</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#f6f6e9] mt-4">
                Reserve Your <span className="italic">Table</span>
              </h2>
              <p className="mt-6 text-[#f6f6e9]/70 leading-relaxed">
                Whether it&apos;s an intimate dinner for two or a celebration with friends,
                we&apos;d love to host you. Walk-ins are always welcome, but reservations
                guarantee your spot.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 text-[#f6f6e9]/80">
                  <div className="w-10 h-10 rounded-full bg-[#f6f6e9]/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[#dfbfbf]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Opening Hours</p>
                    <p className="text-xs text-[#f6f6e9]/60">Mon-Sun: 11am - 11pm</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[#f6f6e9]/80">
                  <div className="w-10 h-10 rounded-full bg-[#f6f6e9]/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#dfbfbf]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-xs text-[#f6f6e9]/60">42 Berry St, Brooklyn, NY 11249</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[#f6f6e9]/80">
                  <div className="w-10 h-10 rounded-full bg-[#f6f6e9]/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-[#dfbfbf]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Call Us</p>
                    <p className="text-xs text-[#f6f6e9]/60">(718) 555-0123</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Reservation Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl">
                <h3 className="font-display text-2xl font-semibold text-[#4c4c17] mb-6">Make a Reservation</h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-[#e5e5e5] rounded-xl border-0 text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-[#e5e5e5] rounded-xl border-0 text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 bg-[#e5e5e5] rounded-xl border-0 text-[#4c4c17] focus:ring-2 focus:ring-[#4c4c17]/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Time</label>
                      <select className="w-full px-4 py-3 bg-[#e5e5e5] rounded-xl border-0 text-[#4c4c17] focus:ring-2 focus:ring-[#4c4c17]/20 outline-none transition-all">
                        <option>Select time</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>1:00 PM</option>
                        <option>6:00 PM</option>
                        <option>7:00 PM</option>
                        <option>8:00 PM</option>
                        <option>9:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#4c4c17]/70 mb-1">Guests</label>
                    <select className="w-full px-4 py-3 bg-[#e5e5e5] rounded-xl border-0 text-[#4c4c17] focus:ring-2 focus:ring-[#4c4c17]/20 outline-none transition-all">
                      <option>2 People</option>
                      <option>3 People</option>
                      <option>4 People</option>
                      <option>5-8 People</option>
                      <option>8+ People</option>
                    </select>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-[#4c4c17] text-[#f6f6e9] rounded-xl font-medium hover:bg-[#4c4c17]/90 transition-colors mt-2"
                  >
                    Reserve Now
                  </motion.button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}