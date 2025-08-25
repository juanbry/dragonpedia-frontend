// src/components/CharacterList.tsx

import React, { useState, useEffect } from 'react';
import { useGetCharactersQuery } from '../features/characters/charactersApi';
import CharacterCard from './CharacterCard';
import SearchBar from './SearchBar';
import { Character, CharactersResponse } from '../features/characters/charactersApi';

const CharacterList = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetCharactersQuery({ page, limit: 10 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (data) {
      const responseData = data as CharactersResponse;
      const characters: Character[] = responseData.items;
      const totalItems = responseData.meta.totalItems;
      const limit = responseData.meta.itemsPerPage;
      const calculatedTotalPages = Math.ceil(totalItems / limit);

      setTotalPages(calculatedTotalPages);
      
      const sortedData = [...characters].sort((a, b) => a.name.localeCompare(b.name));
      const filtered = sortedData.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
  }, [data, searchTerm]);

  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(event.target.value);
    if (!isNaN(newPage) && newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (isLoading) return <div className="text-center text-white">Cargando personajes...</div>;

  if (error) {
    if ('data' in error) {
      const apiError = error.data as { message: string };
      return <div className="text-center text-red-500">Error: {apiError.message}</div>;
    }
    return <div className="text-center text-red-500">Ocurrió un error inesperado.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={setSearchTerm} />
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((character: Character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        ) : (
          <div className="text-center text-white col-span-full">No se encontraron personajes.</div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-yellow-500 text-gray-900 font-bold rounded-lg disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Anterior
        </button>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="page-input" className="text-white">Página</label>
          <input
            id="page-input"
            type="number"
            value={page}
            onChange={handlePageChange}
            min="1"
            max={totalPages > 0 ? totalPages : 1}
            className="w-16 text-center bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-white">de {totalPages}</span>
        </div>

        <button
          onClick={() => setPage(prevPage => prevPage + 1)}
          disabled={page === totalPages || totalPages === 0}
          className="px-4 py-2 bg-yellow-500 text-gray-900 font-bold rounded-lg disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CharacterList;