
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="p-4 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          <span className="bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text">
            AI Logo Generator
          </span>
        </h1>
      </div>
    </header>
  );
};
