import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ChefHat, Mail, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#4c4c17] text-[#f6f6e9] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center gap-2 mb-4">
              <ChefHat className="w-6 h-6 text-[#dfbfbf]" />
              <span className="font-display text-lg font-semibold">Savory & Sage</span>
            </Link>
            <p className="text-sm text-[#f6f6e9]/70 leading-relaxed">
              A neighborhood gem serving globally-inspired comfort food since 2024.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Menu', 'About', 'Reservations'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-sm text-[#f6f6e9]/70 hover:text-[#dfbfbf] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-[#f6f6e9]/70">
                <MapPin className="w-4 h-4 text-[#dfbfbf]" />
                42 Berry St, Brooklyn, NY
              </li>
              <li className="flex items-center gap-2 text-sm text-[#f6f6e9]/70">
                <Phone className="w-4 h-4 text-[#dfbfbf]" />
                (718) 555-0123
              </li>
              <li className="flex items-center gap-2 text-sm text-[#f6f6e9]/70">
                <Mail className="w-4 h-4 text-[#dfbfbf]" />
                hello@savoryandsage.com
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-display text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-[#f6f6e9]/10 flex items-center justify-center hover:bg-[#dfbfbf]/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-[#f6f6e9]/10 text-center"
        >
          <p className="text-sm text-[#f6f6e9]/50">
            &copy; 2024 Savory & Sage. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
