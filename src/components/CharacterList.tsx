import React from 'react';
import CharacterCard from './CharacterCard';
import { Character } from '../features/characters/charactersApi';

interface CharacterListProps {
  characters: Character[];
}

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  return (
    <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {characters.length > 0 ? (
        characters.map((character: Character) => (
          <CharacterCard key={character.id} character={character} />
        ))
      ) : (
        <div className="text-center text-white col-span-full">No se encontraron personajes.</div>
      )}
    </div>
  );
};

export default CharacterList;