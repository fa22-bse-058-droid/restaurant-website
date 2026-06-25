import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { api } from '@/services/api';
import { useCart } from '@/hooks/useCart';
import Footer from '@/components/Footer';

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: string;
  discount_price: string | null;
  current_price: number;
  image: string | null;
  category: number;
  category_name: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await api.getCategories();
        setCategories(cats);
        const items = await api.getFoodItems();
        setFoodItems(items);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = async (itemId: number) => {
    try {
      await addToCart(itemId, 1);
      setAddedItems((prev) => new Set(prev).add(itemId));
      setTimeout(() => {
        setAddedItems((prev) => {
          const next = new Set(prev);
          next.delete(itemId);
          return next;
        });
      }, 1500);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const filteredItems = foodItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category_name.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f6f6e9] pt-24">
      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-sm tracking-[0.2em] uppercase text-[#dfbfbf] font-medium">
              Our Menu
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-[#4c4c17] mt-2">
              Taste the <span className="italic">Extraordinary</span>
            </h1>
            <p className="mt-4 text-[#4c4c17]/60 max-w-lg mx-auto">
              Seasonal ingredients, timeless techniques, and a passion for flavor in every dish.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4c4c17]/40" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white rounded-full border border-[#4c4c17]/10 text-[#4c4c17] placeholder:text-[#4c4c17]/40 focus:ring-2 focus:ring-[#4c4c17]/20 outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#4c4c17]/60" />
              <span className="text-sm text-[#4c4c17]/60">{filteredItems.length} items</span>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-2 justify-center"
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#4c4c17] text-[#f6f6e9]'
                  : 'bg-white text-[#4c4c17]/70 hover:bg-[#4c4c17]/5'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.slug
                    ? 'bg-[#4c4c17] text-[#f6f6e9]'
                    : 'bg-white text-[#4c4c17]/70 hover:bg-[#4c4c17]/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                  <div className="h-48 bg-[#e5e5e5] rounded-xl" />
                  <div className="mt-4 h-4 bg-[#e5e5e5] rounded w-3/4" />
                  <div className="mt-2 h-3 bg-[#e5e5e5] rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.image || '/images/img-9.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.discount_price && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-[#dfbfbf] text-[#4c4c17] text-xs font-bold rounded-full">
                          SALE
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs text-[#dfbfbf] font-medium uppercase tracking-wider">
                            {item.category_name}
                          </span>
                          <h3 className="font-display text-xl font-semibold text-[#4c4c17] mt-1">
                            {item.name}
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="font-display text-lg font-bold text-[#4c4c17]">
                            ${item.current_price}
                          </span>
                          {item.discount_price && (
                            <span className="block text-sm text-[#4c4c17]/40 line-through">
                              ${item.price}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-[#4c4c17]/60 line-clamp-2">
                        {item.description}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddToCart(item.id)}
                        className={`mt-4 w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                          addedItems.has(item.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-[#4c4c17] text-[#f6f6e9] hover:bg-[#4c4c17]/90'
                        }`}
                      >
                        {addedItems.has(item.id) ? (
                          <>Added to Cart</>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Add to Cart
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!isLoading && filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-[#4c4c17]/60 text-lg">No dishes found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
