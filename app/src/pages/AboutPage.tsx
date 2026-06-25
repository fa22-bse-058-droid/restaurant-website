import { motion } from 'framer-motion';
import { Award, Heart, Leaf, UtensilsCrossed } from 'lucide-react';
import Footer from '@/components/Footer';

const values = [
  {
    icon: Leaf,
    title: 'Fresh & Local',
    description: 'We source our ingredients from local farms and suppliers, ensuring the freshest seasonal produce in every dish.',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every dish is crafted with passion and attention to detail, bringing warmth and comfort to your table.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Global Flavors',
    description: 'Our menu draws inspiration from culinary traditions around the world, reimagined with modern techniques.',
  },
  {
    icon: Award,
    title: 'Quality First',
    description: 'We never compromise on quality, from ingredient selection to plating and presentation.',
  },
];

const team = [
  { name: 'Marcus Chen', role: 'Executive Chef', image: '/images/img-5.jpg' },
  { name: 'Sofia Rivera', role: 'Pastry Chef', image: '/images/img-8.jpg' },
  { name: 'James Wright', role: 'Head Sommelier', image: '/images/img-2.jpg' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f6f6e9]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm tracking-[0.2em] uppercase text-[#dfbfbf] font-medium"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl font-bold text-[#4c4c17] mt-4 leading-tight"
          >
            Our Story, Our
            <br />
            <span className="italic">Passion</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-[#4c4c17]/70 max-w-2xl mx-auto leading-relaxed"
          >
            Savory & Sage was born from a simple belief: that great food brings people together.
            Founded in 2024 in the heart of Brooklyn, we set out to create a space where global
            flavors meet the warmth of home cooking.
          </motion.p>
        </div>
      </section>

      {/* Image Banner */}
      <section className="py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl overflow-hidden h-64">
              <img src="/images/img-3.jpg" alt="Interior" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden h-64">
              <img src="/images/img-6.jpg" alt="Patio" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden h-64">
              <img src="/images/img-1.jpg" alt="Food" className="w-full h-full object-cover" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm tracking-[0.2em] uppercase text-[#dfbfbf] font-medium">Our Values</span>
            <h2 className="font-display text-4xl font-bold text-[#4c4c17] mt-2">
              What Drives <span className="italic">Us</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#f6f6e9] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-[#4c4c17]" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#4c4c17]">{value.title}</h3>
                <p className="mt-2 text-sm text-[#4c4c17]/60 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 bg-[#4c4c17]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm tracking-[0.2em] uppercase text-[#dfbfbf] font-medium">The Team</span>
            <h2 className="font-display text-4xl font-bold text-[#f6f6e9] mt-2">
              Meet Our <span className="italic">Chefs</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4c4c17]/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-xl font-semibold text-[#f6f6e9]">{member.name}</h3>
                    <p className="text-sm text-[#dfbfbf]">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
