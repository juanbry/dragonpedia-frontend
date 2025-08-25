import React from 'react';
import { Link } from 'react-router-dom';
import { Character } from '../features/characters/charactersApi'; // 1. Importa el tipo Character

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <Link to={`/personajes/${character.id}`}>
      <div className="p-4 bg-gray-800 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 flex flex-col items-center justify-center cursor-pointer">
        <img
          src={character.image}
          alt={character.name}
          className="object-contain w-full max-h-[150px] max-w-[120px] mb-4 rounded-md"
        />
        <h3 className="text-lg font-bold text-white text-center">{character.name}</h3>
        <p className="text-sm text-gray-400 text-center">Raza: {character.race}</p>
      </div>
    </Link>
  );
};

export default CharacterCard;