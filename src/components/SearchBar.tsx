import React, { useState, useEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      onSearch(inputValue);
    }, 200);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inputValue, onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClearClick = () => {
    setInputValue('');
    onSearch('');
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <div className="flex items-center justify-center mb-8 w-full max-w-xl mx-auto">
      {}
      <div className="flex w-full shadow-lg">
        {}
        <div className="relative w-full">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Busca un personaje por nombre..."
            className="w-full py-3 px-5 pr-12 text-lg rounded-l-full bg-gray-700 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
          />
          {}
          {inputValue && (
            <button
              onClick={handleClearClick}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Borrar búsqueda"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {}
        <button
          onClick={handleSearchClick}
          className="flex items-center justify-center px-5 bg-yellow-500 text-gray-900 rounded-r-full hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-300"
          aria-label="Buscar"
        >
          <BsSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
