import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-blue-900 py-6 mt-10">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-white text-sm sm:text-base font-medium mb-2">
          Desarrollado con ❤️ por Juan Carranza
        </p>
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/juan-carranza-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-colors duration-300"
            aria-label="Perfil de LinkedIn"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a
            href="https://github.com/juanbry"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors duration-300"
            aria-label="Perfil de GitHub"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="mailto:juancarranzadev@gmail.com"
            className="text-white hover:text-red-500 transition-colors duration-300"
            aria-label="Enviar correo electrónico"
          >
            <FaEnvelope className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;