import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCharacterByIdQuery } from '../features/characters/charactersApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { CommentSection } from '../components/CommentSection';

const CharacterDetail = () => {
  const { id } = useParams();
  
  const { data: character, error, isLoading } = useGetCharacterByIdQuery(id as string, {
    skip: !id,
  });
  
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  if (isLoading) return <div className="text-center text-white min-h-screen bg-blue-950 flex items-center justify-center">Cargando detalles...</div>;
  
  if (error) {
    if ('status' in error) {
      const apiError = error as FetchBaseQueryError;
      return <div className="text-center text-red-500">Error: {apiError.status}</div>;
    } else {
      const serializedError = error as SerializedError;
      return <div className="text-center text-red-500">Error: {serializedError.message || 'Error desconocido'}</div>;
    }
  }

  if (!character) {
    return <div className="text-center text-red-500 min-h-screen bg-blue-950 flex items-center justify-center">Personaje no encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-blue-950 py-10 text-white flex justify-center items-center">
      <div className="bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-4xl mx-auto flex flex-col lg:flex-row lg:space-x-8 h-[90vh]">
        
        <div className="flex-1 flex justify-center items-center p-6 lg:p-8">
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full h-auto max-h-96 lg:max-h-full object-contain rounded-md" 
          />
        </div>

        <div className="flex-1 p-6 lg:p-8 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 tracking-wide drop-shadow-lg">
              {character.name}
            </h1>
            <button
              onClick={handleGoBack}
              className="py-2 px-4 bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors duration-300 hover:bg-orange-600"
            >
              VOLVER
            </button>
          </div>
          
          <div className="space-y-2 mb-4">
            <p className="text-gray-400">Raza: <span className="text-white font-bold">{character.race}</span></p>
            <p className="text-gray-400">Ki: <span className="text-white font-bold">{character.ki}</span></p>
            <div className="text-gray-400 mt-2">Descripción: 
              <div className="bg-gray-700 p-2 mt-1 rounded-md max-h-24 overflow-y-auto">
                <p className="text-white text-sm">{character.description}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex-grow">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">Comentarios</h3>
            <CommentSection postId={character.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;