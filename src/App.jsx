import React from 'react';
import Header from './components/Header';
import MealToggle from './components/MealToggle';
import MenuGrid from './components/MenuGrid';
import CartPanel from './components/CartPanel';

const sampleMenu = () => {
  const day = new Date().getDay();
  const rotate = (arr) => arr.map((a, i) => arr[(i + day) % arr.length]);

  const morning = rotate([
    {
      id: 'm1',
      name: 'Veggie Omelette Bowl',
      price: 6.99,
      cal: 420,
      desc: 'Fluffy eggs, spinach, tomatoes, and cheddar with toast.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'm2',
      name: 'Masala Poha',
      price: 4.99,
      cal: 350,
      desc: 'Flattened rice tossed with veggies, peanuts, and spices.',
      image: 'https://images.unsplash.com/photo-1659260943552-386a67f7cf8b?ixid=M3w3OTkxMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjIxOTIwMDh8&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'
    },
    {
      id: 'm3',
      name: 'Paratha & Curd',
      price: 5.49,
      cal: 500,
      desc: 'Whole wheat paratha served with fresh curd and pickle.',
      image: 'https://images.unsplash.com/photo-1683533738338-19b9a22c6405?ixid=M3w3OTkxMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjIxOTIwMDl8&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'
    },
    {
      id: 'm4',
      name: 'Granola Yogurt Cup',
      price: 3.99,
      cal: 300,
      desc: 'Creamy yogurt, crunchy granola, honey, and berries.',
      image: 'https://images.unsplash.com/photo-1719077519310-ecc29df7fad5?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxHcmFub2xhJTIwWW9ndXJ0JTIwQ3VwfGVufDB8MHx8fDE3NjIxOTIwMTB8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'
    }
  ]);

  const evening = rotate([
    {
      id: 'e1',
      name: 'Grilled Chicken Bowl',
      price: 9.49,
      cal: 680,
      desc: 'Marinated chicken, herbed rice, roasted veggies, garlic dip.',
      image: 'https://images.unsplash.com/photo-1688940738506-acfe9334bf5c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxHcmlsbGVkJTIwQ2hpY2tlbiUyMEJvd2x8ZW58MHwwfHx8MTc2MjE5MjAxMHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'
    },
    {
      id: 'e2',
      name: 'Paneer Tikka Wrap',
      price: 7.99,
      cal: 620,
      desc: 'Charred paneer, sauces, salad in a soft tortilla.',
      image: 'https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?ixid=M3w3OTkxMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjIxOTIwMTF8&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'
    },
    {
      id: 'e3',
      name: 'Veg Biryani',
      price: 8.49,
      cal: 700,
      desc: 'Fragrant basmati rice with veggies, spices, and raita.',
      image: 'https://images.unsplash.com/photo-1659260943552-386a67f7cf8b?ixid=M3w3OTkxMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjIxOTIwMDh8&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'
    },
    {
      id: 'e4',
      name: 'Pasta Arrabbiata',
      price: 7.49,
      cal: 640,
      desc: 'Spicy tomato sauce, olives, herbs, and parmesan.',
      image: 'https://images.unsplash.com/photo-1602198905362-b0ff3630686d?ixid=M3w3OTkxMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjIxOTIwMTJ8&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'
    }
  ]);

  return { morning, evening };
};

export default function App() {
  const [slot, setSlot] = React.useState('morning');
  const [cart, setCart] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const menu = React.useMemo(() => sampleMenu(), []);
  const items = slot === 'morning' ? menu.morning : menu.evening;

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setOpen(true);
  };

  const inc = (id) => setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  const dec = (id) => setCart((prev) => prev.flatMap((p) => (p.id === id ? (p.qty > 1 ? [{ ...p, qty: p.qty - 1 }] : []) : [p])));
  const remove = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const handleCheckout = (payload) => {
    // In a full app, send to backend for order creation and payment.
    // Here we just show a success toast-like banner.
    const method = payload.payment === 'cod' ? 'Cash on Delivery' : 'Online Payment';
    alert(`Order placed for ${payload.slot} slot via ${method}!\nWe will deliver to: ${payload.address}`);
    setCart([]);
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-orange-50">
      <Header onCartOpen={() => setOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border px-3 py-1 text-xs text-gray-600 shadow-sm">
            Fresh menu daily • Morning and Evening plans
          </div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Eat well every day, morning and evening
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Pick your daily meals, pay online or in cash on delivery, and get hot, homestyle food at your door.
          </p>
        </section>

        <section className="space-y-4">
          <MealToggle value={slot} onChange={setSlot} />
          <MenuGrid items={items} onAdd={addToCart} />
        </section>
      </main>

      <CartPanel
        open={open}
        items={cart}
        onClose={() => setOpen(false)}
        onInc={inc}
        onDec={dec}
        onRemove={remove}
        onCheckout={handleCheckout}
      />

      <footer className="mt-16 py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FreshBite — Serving happiness daily.
      </footer>
    </div>
  );
}
