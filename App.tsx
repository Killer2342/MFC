
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import MenuCard from './components/MenuCard';
import AdminPanel from './components/AdminPanel';
import Cart from './components/Cart';
import { Product, Category, CartItem } from './types';

const INITIAL_PRODUCTS: Product[] = [
  // DEALS (From Page 4 & 5)
  { id: 'deal1', name: 'MFC Special Deal 1', description: '1 Chota Pizza, 2 Zinger Burgers, 6 Wings, 1 Litre Drink', price: 1249, category: Category.DEALS, image: 'https://picsum.photos/seed/mfc_deal1/300/300', isDeal: true, isPopular: true },
  { id: 'deal2', name: 'MFC Special Deal 2', description: '1 Medium Pizza, 1 Patty Burger, 6 Nuggets, 1.5 Litre Drink', price: 1499, category: Category.DEALS, image: 'https://picsum.photos/seed/mfc_deal2/300/300', isDeal: true },
  { id: 'deal3', name: 'MFC Special Deal 3', description: '1 Large Pizza, 1 Zinger Burger, 1 Chicken Paratha, 6 Wings, 1 Litre Drink', price: 2149, category: Category.DEALS, image: 'https://picsum.photos/seed/mfc_deal3/300/300', isDeal: true, isPopular: true },
  { id: 'deal4', name: 'MFC Special Deal 4', description: '1 XL Pizza, 1 Zinger Burger, 6 Wings, 1 Paratha Roll, 1 Litre Drink', price: 2449, category: Category.DEALS, image: 'https://picsum.photos/seed/mfc_deal4/300/300', isDeal: true },
  { id: 'deal5', name: 'MFC Special Deal 5', description: '2 Small Pizzas, 1 Medium Pizza, 6 Wings, 1 Litre Drink', price: 2249, category: Category.DEALS, image: 'https://picsum.photos/seed/mfc_deal5/300/300', isDeal: true },
  { id: 'deal6', name: 'MFC Special Deal 6', description: '1 Medium Pizza, 2 Chicken Shawarma, 2 Zinger Burgers, 1 Litre Drink', price: 1949, category: Category.DEALS, image: 'https://picsum.photos/seed/mfc_deal6/300/300', isDeal: true, isPopular: true },

  // BURGERS (From Page 2)
  { id: 'br1', name: 'Zinger Burger', description: 'Signature MFC Crispy Chicken Fillet', price: 299, category: Category.BURGERS, image: 'https://picsum.photos/seed/mfc_br1/300/300', isPopular: true },
  { id: 'br2', name: 'Zinger Cheese Burger', description: 'MFC Crispy Fillet with extra cheese', price: 349, category: Category.BURGERS, image: 'https://picsum.photos/seed/mfc_br2/300/300' },
  { id: 'br3', name: 'Patty Burger', description: 'Classic chicken patty', price: 220, category: Category.BURGERS, image: 'https://picsum.photos/seed/mfc_br3/300/300' },
  { id: 'br4', name: 'Patty Pizza Burger', description: 'Unique pizza-style flavored patty burger', price: 270, category: Category.BURGERS, image: 'https://picsum.photos/seed/mfc_br4/300/300' },
  { id: 'br5', name: 'Double Zinger Burger', description: 'Two crispy fillets for double the crunch', price: 449, category: Category.BURGERS, image: 'https://picsum.photos/seed/mfc_br5/300/300', isPopular: true },
  { id: 'br6', name: 'Zinger Pizza Burger', description: 'Zinger fillet with pizza toppings', price: 449, category: Category.BURGERS, image: 'https://picsum.photos/seed/mfc_br6/300/300' },
  { id: 'br7', name: 'Tandoori Burger', description: 'Flame-grilled tandoori flavor', price: 249, category: Category.BURGERS, image: 'https://picsum.photos/seed/mfc_br7/300/300' },
  { id: 'br8', name: 'Chicken Burger', description: 'Simple and delicious chicken burger', price: 199, category: Category.BURGERS, image: 'https://picsum.photos/seed/mfc_br8/300/300' },
  { id: 'br9', name: 'Beef Burger', description: 'Juicy beef patty with MFC sauce', price: 449, category: Category.BURGERS, image: 'https://picsum.photos/seed/mfc_br9/300/300' },

  // SHAWARMA (From Page 2)
  { id: 'sh1', name: 'Chicken Shawarma', description: 'Authentic spiced chicken wrap', price: 180, category: Category.SHAWARMA, image: 'https://picsum.photos/seed/mfc_sh1/300/300' },
  { id: 'sh2', name: 'Cheese Shawarma', description: 'Creamy cheese with shawarma chicken', price: 180, category: Category.SHAWARMA, image: 'https://picsum.photos/seed/mfc_sh2/300/300' },
  { id: 'sh3', name: 'BBQ Shawarma', description: 'Smoky BBQ chicken shawarma', price: 230, category: Category.SHAWARMA, image: 'https://picsum.photos/seed/mfc_sh3/300/300' },
  { id: 'sh4', name: 'Zinger Shawarma', description: 'Crispy zinger pieces inside shawarma', price: 250, category: Category.SHAWARMA, image: 'https://picsum.photos/seed/mfc_sh4/300/300', isPopular: true },

  // ROLL PARATHA (From Page 3)
  { id: 'rp1', name: 'Zinger Paratha', description: 'Crispy zinger in fresh paratha', price: 299, category: Category.ROLL_PARATHA, image: 'https://picsum.photos/seed/mfc_rp1/300/300' },
  { id: 'rp2', name: 'Zinger Cheese Paratha', description: 'Extra cheese crispy roll', price: 349, category: Category.ROLL_PARATHA, image: 'https://picsum.photos/seed/mfc_rp2/300/300' },
  { id: 'rp3', name: 'Tandoori Paratha', description: 'Spicy tandoori chicken roll', price: 249, category: Category.ROLL_PARATHA, image: 'https://picsum.photos/seed/mfc_rp3/300/300' },
  { id: 'rp4', name: 'BBQ Paratha', description: 'Smoky grilled chicken roll', price: 249, category: Category.ROLL_PARATHA, image: 'https://picsum.photos/seed/mfc_rp4/300/300' },
  { id: 'rp5', name: 'MFC Special King Paratha', description: 'The ultimate monster roll', price: 499, category: Category.ROLL_PARATHA, image: 'https://picsum.photos/seed/mfc_rp5/300/300', isPopular: true },

  // CRISPY CHICKEN (From Page 3)
  { id: 'cc1', name: 'MFC Wings (12 Pc)', description: 'Crispy golden fried wings', price: 599, category: Category.CRISPY_CHICKEN, image: 'https://picsum.photos/seed/mfc_cc1/300/300' },
  { id: 'cc2', name: 'Nuggets (12 Pc)', description: 'Bite-sized chicken nuggets', price: 549, category: Category.CRISPY_CHICKEN, image: 'https://picsum.photos/seed/mfc_cc2/300/300' },
  { id: 'cc3', name: 'Hot Shot (12 Pc)', description: 'Spicy crispy chicken pops', price: 599, category: Category.CRISPY_CHICKEN, image: 'https://picsum.photos/seed/mfc_cc3/300/300' },
  { id: 'cc4', name: 'Chicken Candy', description: 'Special sweet & spicy chicken treats', price: 199, category: Category.CRISPY_CHICKEN, image: 'https://picsum.photos/seed/mfc_cc4/300/300' },
  { id: 'cc5', name: 'Albaik Chicken Broast (Full)', description: 'Full Albaik style broasted chicken', price: 2249, category: Category.CRISPY_CHICKEN, image: 'https://picsum.photos/seed/mfc_cc5/300/300', isPopular: true },

  // PIZZA (From Page 5 & 6)
  { id: 'pz1', name: 'Chicken Tikka Pizza (Large)', description: 'Available in S, M, L, XL sizes', price: 1299, category: Category.PIZZA, image: 'https://picsum.photos/seed/mfc_pz1/300/300' },
  { id: 'pz2', name: 'Chicken Fajita Pizza (Large)', description: 'Available in S, M, L, XL sizes', price: 1299, category: Category.PIZZA, image: 'https://picsum.photos/seed/mfc_pz2/300/300' },
  { id: 'pz3', name: 'MFC Special Pizza (Large)', description: 'MFC Signature flavor with extra toppings', price: 1399, category: Category.PIZZA, image: 'https://picsum.photos/seed/mfc_pz3/300/300', isPopular: true },
  { id: 'pz4', name: 'Crown Crust Pizza (Large)', description: 'Cheese crown crust for premium taste', price: 1399, category: Category.PIZZA, image: 'https://picsum.photos/seed/mfc_pz4/300/300' },
  { id: 'pz5', name: 'Bihari Kabab Pizza (Large)', description: 'Authentic Bihari kabab toppings', price: 1399, category: Category.PIZZA, image: 'https://picsum.photos/seed/mfc_pz5/300/300' },

  // SIDES (From Page 3)
  { id: 'sd1', name: 'MFC Fries (Large)', description: 'Golden crispy potato fries', price: 299, category: Category.SIDES, image: 'https://picsum.photos/seed/mfc_sd1/300/300' },
  { id: 'sd2', name: 'Loaded Fries (Full)', description: 'Fries with MFC special toppings and cheese', price: 549, category: Category.SIDES, image: 'https://picsum.photos/seed/mfc_sd2/300/300', isPopular: true },
  { id: 'sd3', name: 'Crispy Fries (Large)', description: 'Extra crunch potato fries', price: 599, category: Category.SIDES, image: 'https://picsum.photos/seed/mfc_sd3/300/300' },

  // PLATTER (From Page 4)
  { id: 'pt1', name: 'MFC Half Platter', description: '1 Pizza X-Large, 2 Zinger Burgers, 1 Patty Burger, 1 Paratha Roll, 3 Wings, 1.5L Drink', price: 2749, category: Category.PLATTER, image: 'https://picsum.photos/seed/mfc_pt1/300/300' },
  { id: 'pt2', name: 'MFC Full Platter', description: '1 Pizza Large, 3 Zinger Burgers, 2 Patty Burgers, 2 Paratha Rolls, 6 Wings, 2L Drink', price: 4999, category: Category.PLATTER, image: 'https://picsum.photos/seed/mfc_pt2/300/300', isPopular: true },

  // PASTA (From Page 4)
  { id: 'pa1', name: 'Chicken Pasta', description: 'Creamy chicken white sauce pasta', price: 450, category: Category.PASTA, image: 'https://picsum.photos/seed/mfc_pa1/300/300' },
  { id: 'pa2', name: 'Crispy Pasta', description: 'Pasta topped with MFC crispy chicken strips', price: 550, category: Category.PASTA, image: 'https://picsum.photos/seed/mfc_pa2/300/300' }
];

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<Category | 'Popular'>(Category.DEALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let list = products;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    
    if (activeCategory === 'Popular') {
      return list.filter(p => p.isPopular);
    }
    
    return list.filter(p => p.category === activeCategory);
  }, [products, activeCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setActiveCategory(newProduct.category);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#E4002B] selection:text-white">
      <Header 
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat as Category);
          setSearchQuery('');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section - Hidden during active search for cleaner look */}
      {!searchQuery && (
        <section className="bg-white py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-[#E4002B] rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center overflow-hidden relative shadow-2xl">
              <div className="md:w-1/2 z-10 text-center md:text-left">
                <span className="text-white font-black text-[10px] uppercase tracking-[0.4em] mb-4 block bg-black/20 inline-block px-3 py-1 rounded-full">Mezban Fast Food Cafe</span>
                <h2 className="text-5xl md:text-8xl font-black text-white italic uppercase leading-[0.8] mb-6 tracking-tighter">
                  CRUNCHY <br /> & <br /> JUICY.
                </h2>
                <p className="text-white text-opacity-90 text-sm md:text-lg mb-8 max-w-sm font-medium">
                  Deliciously crafted menu with MFC secret recipes. Free delivery on orders above RS 1000!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button className="bg-white text-[#E4002B] px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all transform hover:scale-105 shadow-xl">
                    Order Now
                  </button>
                  <button 
                    onClick={() => setActiveCategory(Category.DEALS)}
                    className="bg-black text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-[#E4002B] transition-all transform hover:scale-105 shadow-xl"
                  >
                    Hot Deals
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
                 <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl transform scale-125"></div>
                 <img 
                   src="https://picsum.photos/seed/mfc_hero_final/600/400" 
                   alt="MFC Signature Items" 
                   className="rounded-3xl shadow-2xl transform rotate-2 relative z-10 w-full max-w-md border-4 border-white/20"
                 />
                 <div className="absolute -top-6 -right-6 w-36 h-36 bg-yellow-400 rounded-full flex flex-col items-center justify-center border-8 border-[#E4002B] shadow-2xl animate-bounce z-20">
                    <span className="text-[#E4002B] font-black text-3xl italic leading-none">MFC</span>
                    <span className="text-black font-black text-[10px] uppercase tracking-widest mt-1">Tasty</span>
                 </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Scroller */}
      <section className="sticky top-20 z-40 bg-[#f8f8f8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
            {/* Popular Filter */}
            <button
              onClick={() => {
                setActiveCategory('Popular');
                setSearchQuery('');
              }}
              className={`flex-shrink-0 px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-[0.15em] transition-all flex items-center space-x-2 ${
                activeCategory === 'Popular' && !searchQuery
                ? 'bg-yellow-400 text-black shadow-xl transform scale-105 ring-4 ring-yellow-400/20' 
                : 'bg-white text-gray-500 hover:text-yellow-600 border border-gray-100'
              }`}
            >
              <span>⭐</span>
              <span>Popular</span>
            </button>

            {Object.values(Category).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery('');
                }}
                className={`flex-shrink-0 px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-[0.15em] transition-all ${
                  activeCategory === cat && !searchQuery
                  ? 'bg-[#E4002B] text-white shadow-xl transform scale-105 ring-4 ring-[#E4002B]/20' 
                  : 'bg-white text-gray-500 hover:text-[#E4002B] border border-gray-100'
                }`}
              >
                {cat === Category.DEALS ? '🔥 ' + cat : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[#E4002B] font-black text-[10px] uppercase tracking-[0.3em] block mb-2">
              {searchQuery ? 'Search Results' : 'Exclusive MFC Menu'}
            </span>
            <h2 className="text-4xl font-black text-gray-900 uppercase italic leading-none tracking-tighter">
              {searchQuery ? `"${searchQuery}"` : activeCategory}
            </h2>
          </div>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#E4002B]"
            >
              Clear Search
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
            <div className="text-6xl mb-6 grayscale opacity-30">🍗</div>
            <h3 className="text-xl font-black text-gray-300 uppercase italic tracking-widest">No Items Found</h3>
            <p className="text-gray-400 text-xs mt-2 uppercase font-bold">
              {searchQuery ? 'Try searching for something else!' : 'Try selecting another category!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map(product => (
              <MenuCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-12 h-10 bg-[#E4002B] flex items-center justify-center rounded-md mr-3">
                <span className="text-white font-black text-xl italic">MFC</span>
              </div>
              <div>
                <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-none">Mezban</h1>
                <span className="text-[10px] font-bold text-[#E4002B] uppercase tracking-[0.2em]">Food Cafe</span>
              </div>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-widest font-bold italic leading-relaxed">
              "Amjad Khan Tower near Mir Jani Bungla, Bannu City. Quality you can taste."
            </p>
          </div>
          <div>
            <h4 className="font-black uppercase text-[10px] tracking-[0.2em] mb-8 text-gray-600">Contact MFC</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest">
              <li>0334-5050765</li>
              <li>0928-625050</li>
              <li>Free Delivery > RS 1000</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-[10px] tracking-[0.2em] mb-8 text-gray-600">Explore</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest">
              <li><button onClick={() => setActiveCategory(Category.PIZZA)}>Pizzas</button></li>
              <li><button onClick={() => setActiveCategory(Category.BURGERS)}>Burgers</button></li>
              <li><button onClick={() => setActiveCategory(Category.DEALS)}>Hot Deals</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase text-[10px] tracking-[0.2em] mb-8 text-gray-600">Visit Us</h4>
            <p className="text-gray-400 text-xs font-bold uppercase leading-relaxed">
              Amjad Khan Tower<br/>
              Near Mir Jani Bungla<br/>
              Bannu City
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-gray-900 text-center">
          <p className="text-gray-600 text-[9px] uppercase font-black tracking-[0.4em]">
            © {new Date().getFullYear()} MEZBAN FAST FOOD CAFE (MFC). ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        onAddProduct={handleAddProduct}
      />
      
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
};

export default App;
