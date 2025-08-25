import React, { useState, useEffect } from 'react';
import CharacterList from '../components/CharacterList';
import PostForm from '../components/PostForm';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { useGetPaginatedCharactersQuery, useGetCharacterSearchQuery } from '../features/characters/charactersApi';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(1); 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      if (searchTerm) {
        setCurrentPage(1);
        setInputPage(1);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const {
    data: paginatedData,
    error: paginatedError,
    isLoading: paginatedIsLoading,
  } = useGetPaginatedCharactersQuery({ page: currentPage, limit: 12 });

  const {
    data: searchData,
    error: searchError,
    isLoading: searchIsLoading,
  } = useGetCharacterSearchQuery(debouncedSearchTerm, { skip: !debouncedSearchTerm });

  const characters = debouncedSearchTerm ? (searchData || []) : (paginatedData?.items || []);
  const isLoading = debouncedSearchTerm ? searchIsLoading : paginatedIsLoading;
  const error = debouncedSearchTerm ? searchError : paginatedError;
  const totalPages = paginatedData?.meta?.totalPages || 0;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputPage(parseInt(value));
    if (!isNaN(parseInt(value)) && parseInt(value) > 0 && parseInt(value) <= totalPages) {
      setCurrentPage(parseInt(value));
    }
  };

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handleButtonClick = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen bg-blue-950 py-10 flex flex-col items-center">
      <h1 className="text-center text-4xl sm:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 mb-6 lg:mb-10 tracking-wider drop-shadow-lg animate-pulse">
        Dragonpedia
        <br />
        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-2 inline-block">
          Wiki para los frikis de Dragon Ball
        </span>
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div className="w-full max-w-5xl mx-auto px-4">
        {isLoading ? (
          <p className="text-white text-center text-xl mt-8">Cargando...</p>
        ) : error ? (
          <p className="text-red-500 text-center text-xl mt-8">
            Error al cargar los personajes.
          </p>
        ) : (
          <CharacterList characters={characters} />
        )}
      </div>

      {}
      {!debouncedSearchTerm && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => handleButtonClick(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-yellow-500 text-gray-900 font-bold rounded-lg disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>
          
          <div className="flex items-center space-x-2">
            <label htmlFor="page-input" className="text-white">Página</label>
            <input
              id="page-input"
              type="number"
              value={inputPage} 
              onChange={handleInputChange} 
              min="1"
              max={totalPages > 0 ? totalPages : 1}
              className="w-16 text-center bg-gray-700 text-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-white">de {totalPages}</span>
          </div>

          <button
            onClick={() => handleButtonClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-yellow-500 text-gray-900 font-bold rounded-lg disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Siguiente
          </button>
        </div>
      )}
      <PostForm />
      <Footer />
    </div>
  );
};

export default HomePage;