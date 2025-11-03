import React from 'react';
import { Sun, Moon } from 'lucide-react';

const MealToggle = ({ value, onChange }) => {
  return (
    <div className="w-full rounded-xl border bg-white shadow-sm p-1 flex items-center gap-1">
      <button
        onClick={() => onChange('morning')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition ${
          value === 'morning' ? 'bg-rose-500 text-white shadow' : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Sun size={18} /> Morning
      </button>
      <button
        onClick={() => onChange('evening')}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition ${
          value === 'evening' ? 'bg-rose-500 text-white shadow' : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Moon size={18} /> Evening
      </button>
    </div>
  );
};

export default MealToggle;
