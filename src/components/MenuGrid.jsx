import React from 'react';
import { ChevronRight } from 'lucide-react';

const MenuCard = ({ item, onAdd }) => {
  return (
    <div className="group rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold truncate">{item.name}</h3>
            <span className="font-semibold text-rose-600">${item.price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.desc}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-gray-500">{item.cal} kcal</div>
            <button
              onClick={() => onAdd(item)}
              className="inline-flex items-center gap-1 rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-600 active:scale-95 transition"
            >
              Add <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuGrid = ({ items, onAdd }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it) => (
        <MenuCard key={it.id} item={it} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default MenuGrid;
