import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Award } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: 'tiffins & preludes' | 'lunch & mains' | 'nectars & sweets';
  description: string;
  pairings: string;
  ingredients: string[];
  notes: string;
  isVeg: boolean;
  image: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'ghee-roast',
    name: 'Ghee Roast Dosa',
    price: '₹280',
    category: 'tiffins & preludes',
    description: 'Crisp golden rice crepe roasted with pure hand-churned cow ghee, served with ginger and fresh coconut chutneys.',
    pairings: 'Best paired with hot, slow-brewed decoction Filter Coffee',
    ingredients: ['Fermented Rice Batter', 'Clarified Ghee', 'Fresh Coconut', 'Ginger chutney'],
    notes: 'A traditional breakfast prelude focusing on outer crispness and butter lactic tones.',
    isVeg: true,
    image: 'tiffin_dosa.png'
  },
  {
    id: 'medu-vada',
    name: 'Medu Vada Rings',
    price: '₹220',
    category: 'tiffins & preludes',
    description: 'Golden deep-fried black gram lentil doughnuts, spiced with crushed black peppercorns and green curry leaves.',
    pairings: 'Best paired with lentil-vegetable Sambar broth',
    ingredients: ['Black Gram Lentils', 'Curry Leaves', 'Black Pepper', 'Fresh Ginger'],
    notes: 'Intensely crispy on the outside, fluffy inside, designed to ground the palate.',
    isVeg: true,
    image: 'tiffin_vada.png'
  },
  {
    id: 'saffron-idli',
    name: 'Kanjipuram Saffron Idli',
    price: '₹240',
    category: 'tiffins & preludes',
    description: 'Fluffy steamed rice-lentil cakes spiced with ginger, black peppercorns, and saffron threads, served with gun powder podi ghee.',
    pairings: 'Best paired with refreshing Mint-Coriander Chutney',
    ingredients: ['Steamed Rice Batter', 'Podi Ghee', 'Black Pepper', 'Saffron Threads'],
    notes: 'A soft, aromatic prelude highlighting earthy spice nodes and ghee richness.',
    isVeg: true,
    image: 'tiffin_idli.png'
  },
  {
    id: 'keema-samosa',
    name: 'Keema Samosa Pockets',
    price: '₹320',
    category: 'tiffins & preludes',
    description: 'Crisp flaky pastry pockets stuffed with minced grass-fed lamb spiced with green cardamom, cloves, and fresh mint.',
    pairings: 'Best paired with tangy Sweet Tamarind Nectar',
    ingredients: ['Flaky Pastry Crust', 'Minced Lamb Keema', 'Fresh Mint', 'Gharana Spices'],
    notes: 'Intensely savory and crunchy, with a warm cardamom spice finish.',
    isVeg: false,
    image: 'tiffin_samosa.png'
  },
  {
    id: 'nizami-biryani',
    name: 'Hyderabadi Dum Biryani',
    price: '₹650',
    category: 'lunch & mains',
    description: 'Royal grass-fed mutton slow-cooked in a sealed brass handi with aged basmati, saffron layers, fresh mint, and cardamom.',
    pairings: 'Served with cool cucumber Salan and spiced curd raita',
    ingredients: ['Aged Basmati Rice', 'Grass-fed Mutton', 'Kashmiri Saffron', 'Fresh Mint & Cilantro'],
    notes: 'Our signature feast, bringing woody charcoal smoke and deep spices into alignment.',
    isVeg: false,
    image: 'feast_biryani.png'
  },
  {
    id: 'shahi-paneer',
    name: 'Paneer Shahi Malai',
    price: '₹480',
    category: 'lunch & mains',
    description: 'Fresh handmade cottage cheese cubes cooked in a royal rich gravy of ground cashews, saffron, and cardamoms.',
    pairings: 'Served with tandoor-baked garlic naan bread',
    ingredients: ['Handmade Paneer', 'Cashew Paste', 'Green Cardamom', 'Saffron Threads'],
    notes: 'A rich vegetarian main, displaying cashew cream sweetness and aromatic alignment.',
    isVeg: true,
    image: 'feast_paneer.png'
  },
  {
    id: 'prawn-curry',
    name: 'Malabar Prawn Curry',
    price: '₹580',
    category: 'lunch & mains',
    description: 'Fresh bay prawns simmered in an aromatic coastal gravy of fresh coconut milk, kokum extract, and mustard seed tempering.',
    pairings: 'Best paired with steamed white Ponni rice',
    ingredients: ['Bay Prawns', 'Coconut Milk', 'Kokum Extract', 'Mustard Seeds'],
    notes: 'A coastal main highlighting sweet coconut tones balanced with sharp kokum sourness.',
    isVeg: false,
    image: 'feast_prawn.png'
  },
  {
    id: 'jackfruit-haleem',
    name: 'Jackfruit Dum Haleem',
    price: '₹420',
    category: 'lunch & mains',
    description: 'A royal vegetarian stew of broken wheat, lentils, and young jackfruit slow-cooked for eight hours with clarified butter and cloves.',
    pairings: 'Best paired with fresh tandoor-baked Roti bread',
    ingredients: ['Young Jackfruit', 'Broken Wheat & Lentils', 'Pure Ghee', 'Cloves & Cinnamon'],
    notes: 'Rich, pasty texture packed with slow-cooked wheat protein and intense clove aroma.',
    isVeg: true,
    image: 'feast_haleem.png'
  },
  {
    id: 'mysore-pak',
    name: 'Mysore Pak Gold',
    price: '₹220',
    category: 'nectars & sweets',
    description: 'A royal sweet fudge made of roasted chickpea flour, hot clarified butter (ghee), and sugar, finished with edible silver leaf.',
    pairings: 'Best paired with warm cardamom-infused Masala Chai',
    ingredients: ['Textured Chickpea Flour', 'Cow Ghee', 'Refined Sugar', 'Silver Vark'],
    notes: 'A melt-in-the-mouth heritage dessert dating back to the Mysore Palace kitchens.',
    isVeg: true,
    image: 'nectar_sweets.png'
  },
  {
    id: 'masala-chai',
    name: 'Royal Masala Chai',
    price: '₹150',
    category: 'nectars & sweets',
    description: 'Premium black tea leaves simmered slowly with fresh ginger, green cardamom pods, and cloves, served tableside in clay pots.',
    pairings: 'Served with spiced lentil biscuits',
    ingredients: ['Assam Black Tea', 'Fresh Ginger', 'Cardamom Pods', 'Whole Cloves'],
    notes: 'An aromatic final beverage that brings comforting spices and milk sweetness into harmony.',
    isVeg: true,
    image: 'sweet_chai.png'
  },
  {
    id: 'payasam-bowl',
    name: 'Elaneer Payasam Bowl',
    price: '₹250',
    category: 'nectars & sweets',
    description: 'Sweet coconut milk pudding made with tender coconut pulp, flavored with crushed green cardamom and finished with gold leaf.',
    pairings: 'Best paired with warm Rose petal infusion',
    ingredients: ['Tender Coconut Pulp', 'Coconut Milk', 'Green Cardamom', 'Edible Gold Leaf'],
    notes: 'A cooling dessert showcasing the delicate milky sweetness of fresh tender coconut.',
    isVeg: true,
    image: 'sweet_payasam.png'
  },
  {
    id: 'mango-lassi',
    name: 'Royal Mango Lassi',
    price: '₹220',
    category: 'nectars & sweets',
    description: 'Thick double-cream yogurt whipped with sweet ripe Alphonso mango pulp, saffron stamens, and chopped pistachio nuts.',
    pairings: 'Served alongside warm cardamom biscuits',
    ingredients: ['Alphonso Mango Pulp', 'Double-Cream Yogurt', 'Saffron Stamens', 'Pistachio Nuts'],
    notes: 'A thick, rich nectar bringing mango sweetness and yogurt lactic sharpness into alignment.',
    isVeg: true,
    image: 'sweet_lassi.png'
  }

const MenuCard: React.FC<{ item: MenuItem; onClick: () => void }> = ({ item, onClick }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.01, 1.01, 1.01)`,
        transition: 'transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease'
      }}
      className="glass-panel p-0 rounded-sm cursor-none select-none text-left flex flex-col justify-between h-[395px] relative group overflow-hidden border border-saffron/15 hover:border-saffron/45 hover:shadow-[0_15px_45px_rgba(255,153,51,0.14)]"
      data-cursor-text="EXPLORE"
    >
      {/* Glare Shine Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-saffron/8 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out pointer-events-none z-10" />

      {/* Card Food Image Header */}
      <div className="w-full h-[155px] overflow-hidden relative border-b border-charcoal/50">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-50" />
      </div>

      {/* Card Content Block */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2.5">
              {/* Indian Food Indicator Badge */}
              <div
                className={`w-3.5 h-3.5 border flex items-center justify-center rounded-[2px] shrink-0 ${
                  item.isVeg ? 'border-green-600 bg-green-950/20' : 'border-red-600 bg-red-950/20'
                }`}
                title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    item.isVeg ? 'bg-green-500 shadow-[0_0_6px_#22c55e]' : 'bg-red-500 shadow-[0_0_6px_#ef4444]'
                  }`}
                />
              </div>
              
              <h4 className="text-base md:text-lg font-serif text-warm-white group-hover:text-saffron transition-colors duration-300">
                {item.name}
              </h4>
            </div>
            <span className="text-xs md:text-sm font-serif text-saffron font-bold tracking-wider">
              {item.price}
            </span>
          </div>
          <p className="text-xs text-warm-white/50 leading-relaxed font-light line-clamp-3">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-charcoal text-[9px] tracking-[0.2em] uppercase text-warm-white/40">
          <span className="group-hover:text-warm-white transition-colors">{item.category}</span>
          <span className="flex items-center gap-1 group-hover:text-saffron transition-colors">
            Spice Notes <Info size={9} />
          </span>
        </div>
      </div>
    </div>
  );
};

export const Menu: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tiffins & preludes' | 'lunch & mains' | 'nectars & sweets'>('tiffins & preludes');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = MENU_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="menu" className="relative w-full min-h-screen section-padding bg-bg-dark z-10 overflow-hidden border-t border-charcoal">
      {/* Background glow effects */}
      <div className="absolute left-1/4 bottom-10 w-[500px] h-[500px] rounded-full bg-copper/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full text-center">
        {/* Section Header */}
        <span className="text-xs uppercase tracking-[0.3em] text-copper mb-6 font-semibold block">
          03 • THE FEAST
        </span>
        <h2 className="text-4xl md:text-6xl font-serif tracking-wide leading-tight mb-16 uppercase">
          Tasting Elements
        </h2>

        {/* Tab Filters */}
        <div className="flex justify-center border-b border-charcoal max-w-2xl mx-auto mb-16">
          {(['tiffins & preludes', 'lunch & mains', 'nectars & sweets'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-xs md:text-sm uppercase tracking-[0.25em] font-medium transition-all relative cursor-none focus:outline-none ${
                activeTab === tab
                  ? tab === 'tiffins & preludes'
                    ? 'text-cardamom-light font-semibold'
                    : tab === 'lunch & mains'
                    ? 'text-saffron font-semibold'
                    : 'text-royal-rose font-semibold'
                  : 'text-warm-white/40 hover:text-warm-white/70'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className={`absolute bottom-0 left-0 w-full h-[2px] ${
                    tab === 'tiffins & preludes'
                      ? 'bg-cardamom-light'
                      : tab === 'lunch & mains'
                      ? 'bg-saffron'
                      : 'bg-royal-rose'
                  }`}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                layout
              >
                <MenuCard item={item} onClick={() => setSelectedItem(item)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to action */}
        <p className="text-xs uppercase tracking-[0.2em] text-warm-white/30 mt-16 font-light">
          Feasts fluctuate daily based on spice harvests, fresh curd yields, and local farming seasons.
        </p>
      </div>

      {/* Glassmorphic Modal Lightbox for Detail View */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 w-full h-full z-50 flex items-center justify-center p-6 bg-bg-dark/95 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="glass-panel w-full max-w-2xl p-0 rounded-sm relative overflow-hidden flex flex-col justify-between"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 text-warm-white/40 hover:text-copper cursor-none p-2 border border-charcoal hover:border-copper/30 rounded-full transition-all z-20"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="w-full h-[220px] overflow-hidden relative">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent" />
              </div>

              <div className="p-8 md:p-12 pt-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-copper mb-2 block font-semibold">
                  Tasting Profile • {selectedItem.category}
                </span>
                
                <h3 className="text-3xl md:text-4xl font-serif tracking-wide text-warm-white mb-6">
                  {selectedItem.name}
                </h3>
                
                <p className="text-sm md:text-base text-warm-white/70 leading-relaxed font-light mb-8">
                  {selectedItem.description}
                </p>

                {/* Key Ingredients */}
                <div className="mb-8">
                  <span className="text-xs uppercase tracking-[0.2em] text-copper/60 font-medium block mb-3">
                    Main Ingredients
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="text-[10px] uppercase tracking-wider text-warm-white bg-charcoal/80 border border-charcoal/40 px-3 py-1.5 rounded-sm"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Saffron/Chai Recommendations */}
                <div className="p-4 bg-copper/5 border border-copper/10 rounded-sm flex gap-3.5 items-start mb-8">
                  <Award className="text-copper shrink-0 mt-0.5" size={18} />
                  <div>
                    <span className="text-xs font-serif text-copper font-medium block">
                      Beverage Alignment
                    </span>
                    <p className="text-xs text-warm-white/60 font-light mt-1">
                      {selectedItem.pairings}
                    </p>
                  </div>
                </div>

                {/* Chef Tasting notes */}
                <div className="flex gap-3.5 items-start">
                  <Award className="text-copper shrink-0 mt-0.5" size={18} />
                  <div>
                    <span className="text-xs font-serif text-copper font-medium block">
                      Ustad's Spice Assembly Note
                    </span>
                    <p className="text-xs text-warm-white/50 leading-relaxed font-light mt-1">
                      {selectedItem.notes}
                    </p>
                  </div>
                </div>
              </div>

              {/* Close prompt at bottom */}
              <div className="p-8 border-t border-charcoal flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-3 text-xs uppercase tracking-widest bg-copper text-bg-dark font-semibold hover:bg-copper-light transition-all rounded-sm cursor-none"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Menu;
