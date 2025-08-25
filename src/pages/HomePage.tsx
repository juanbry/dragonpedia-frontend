import React from 'react';
import CharacterList from '../components/CharacterList'; 
import PostForm from '../components/PostForm';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-blue-950 py-10 flex flex-col items-center">
      <h1 className="text-center text-4xl sm:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 mb-6 lg:mb-10 tracking-wider drop-shadow-lg animate-pulse">
        Dragonpedia
        <br />
        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-2 inline-block">
          Wiki para los frikis de Dragon Ball
        </span>
      </h1>
      <div className="w-full max-w-5xl mx-auto px-4">
        {}
        <CharacterList />
      </div>
      <PostForm />
    </div>
  );
};

export default HomePage;