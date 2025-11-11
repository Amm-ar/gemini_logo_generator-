
import React from 'react';

interface ImageGalleryProps {
  isLoading: boolean;
  error: string | null;
  images: string[];
}

const Spinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center text-gray-400">
    <svg className="animate-spin h-12 w-12 text-green-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <h3 className="text-xl font-semibold text-gray-200">Generating your logos...</h3>
    <p className="mt-2">The AI is working its magic. This might take a moment.</p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="border-l-4 border-red-500 bg-red-900/20 p-6 rounded-r-lg text-red-300" role="alert">
    <h3 className="font-bold text-red-200">Generation Failed</h3>
    <p>{message}</p>
  </div>
);

const Placeholder: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center text-gray-500">
     <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <h3 className="text-xl font-semibold text-gray-300">Your logos will appear here</h3>
    <p className="mt-2">Fill out the brief on the left and click "Generate" to start.</p>
  </div>
);

export const ImageGallery: React.FC<ImageGalleryProps> = ({ isLoading, error, images }) => {
  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return <ErrorDisplay message={error} />;
    }
    if (images.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <div key={index} className="aspect-square bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700/50 transform transition-transform duration-300 hover:scale-105 hover:shadow-green-500/20">
              <img
                src={src}
                alt={`Generated Logo ${index + 1}`}
                className="w-full h-full object-contain p-2"
              />
            </div>
          ))}
        </div>
      );
    }
    return <Placeholder />;
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50 min-h-[60vh] flex items-center justify-center">
      {renderContent()}
    </div>
  );
};
