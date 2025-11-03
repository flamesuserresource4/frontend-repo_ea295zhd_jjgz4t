import React from 'react';
import { ShoppingCart, MapPin, Phone } from 'lucide-react';

const Header = ({ onCartOpen }) => {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-400 flex items-center justify-center text-white font-bold">
            F
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">FreshBite</h1>
            <p className="text-xs text-gray-500 -mt-0.5">Daily meals, delivered</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-rose-500" />
            <span>Delivering near you</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-rose-500" />
            <span>Support: +1 (555) 123-4567</span>
          </div>
        </div>
        <button
          onClick={onCartOpen}
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50 active:scale-95 transition"
        >
          <ShoppingCart size={18} />
          <span>Cart</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
