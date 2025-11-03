import React from 'react';
import { X, Plus, Minus, CreditCard, Wallet } from 'lucide-react';

const CartPanel = ({ open, items, onClose, onInc, onDec, onRemove, onCheckout }) => {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const delivery = items.length > 0 ? 2.5 : 0;
  const total = subtotal + delivery;

  return (
    <div
      className={`fixed inset-0 z-30 ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl border-l transform transition-transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Order</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[55vh] overflow-auto">
          {items.length === 0 && (
            <div className="text-sm text-gray-500">Your cart is empty.</div>
          )}
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-3 border rounded-lg p-2">
              <img src={it.image} alt={it.name} className="h-14 w-14 rounded-md object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{it.name}</p>
                  <span className="text-rose-600 font-semibold">${(it.price * it.qty).toFixed(2)}</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <button onClick={() => onDec(it.id)} className="h-7 w-7 rounded-md border flex items-center justify-center hover:bg-gray-50">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm w-6 text-center">{it.qty}</span>
                  <button onClick={() => onInc(it.id)} className="h-7 w-7 rounded-md border flex items-center justify-center hover:bg-gray-50">
                    <Plus size={14} />
                  </button>
                  <button onClick={() => onRemove(it.id)} className="ml-auto text-xs text-gray-500 hover:text-rose-600">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Delivery</span>
            <span className="font-medium">${delivery.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold">
            <span>Total</span>
            <span className="text-rose-600">${total.toFixed(2)}</span>
          </div>

          <CheckoutForm disabled={items.length === 0} onCheckout={onCheckout} />
        </div>
      </aside>
    </div>
  );
};

const CheckoutForm = ({ disabled, onCheckout }) => {
  const [payment, setPayment] = React.useState('online');
  const [address, setAddress] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [slot, setSlot] = React.useState('morning');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (disabled) return;
        onCheckout({ payment, address, phone, slot });
      }}
      className="space-y-3"
    >
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="text-xs text-gray-600">Delivery address</label>
          <textarea
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            rows={2}
            placeholder="Street, City, Zip"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-xs text-gray-600">Phone</label>
          <input
            type="tel"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="e.g. 5551234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setSlot('morning')}
          className={`rounded-lg border px-3 py-2 text-sm flex items-center justify-center gap-2 ${
            slot === 'morning' ? 'border-rose-500 text-rose-600 bg-rose-50' : 'hover:bg-gray-50'
          }`}
        >
          Morning
        </button>
        <button
          type="button"
          onClick={() => setSlot('evening')}
          className={`rounded-lg border px-3 py-2 text-sm flex items-center justify-center gap-2 ${
            slot === 'evening' ? 'border-rose-500 text-rose-600 bg-rose-50' : 'hover:bg-gray-50'
          }`}
        >
          Evening
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setPayment('online')}
          className={`rounded-lg border px-3 py-2 text-sm flex items-center justify-center gap-2 ${
            payment === 'online' ? 'border-rose-500 text-rose-600 bg-rose-50' : 'hover:bg-gray-50'
          }`}
        >
          <CreditCard size={16} /> Online
        </button>
        <button
          type="button"
          onClick={() => setPayment('cod')}
          className={`rounded-lg border px-3 py-2 text-sm flex items-center justify-center gap-2 ${
            payment === 'cod' ? 'border-rose-500 text-rose-600 bg-rose-50' : 'hover:bg-gray-50'
          }`}
        >
          <Wallet size={16} /> Cash on delivery
        </button>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="w-full rounded-lg bg-rose-600 text-white py-2.5 text-sm font-medium hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Place order
      </button>
    </form>
  );
};

export default CartPanel;
