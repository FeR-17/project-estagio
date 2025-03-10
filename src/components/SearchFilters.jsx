import React from 'react';
import { Search } from 'lucide-react';

export function SearchFilters({ filters, onFilterChange }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar números..."
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Filtrar por Local</option>
            <option value="Câmara">Câmara</option>
            <option value="Escola">Escola</option>
            <option value="Turismo">Turismo</option>
            <option value="Biblioteca">Biblioteca</option>
          </select>
        </div>
      </div>
    </div>
  );
}