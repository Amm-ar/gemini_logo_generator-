
import React, { useState, useCallback } from 'react';
import { generateLogos } from './services/geminiService';
import { Header } from './components/Header';
import { PromptPanel } from './components/PromptPanel';
import { ImageGallery } from './components/ImageGallery';
import type { AspectRatio } from './types';
import { INITIAL_PROMPT } from './constants';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(INITIAL_PROMPT);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImages([]);

    try {
      const generatedImages = await generateLogos(prompt, aspectRatio);
      setImages(generatedImages);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Failed to generate images: ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <PromptPanel
              prompt={prompt}
              setPrompt={setPrompt}
              aspectRatio={aspectRatio}
              setAspectRatio={setAspectRatio}
              isLoading={isLoading}
              onGenerate={handleGenerate}
            />
          </div>
          <div className="lg:col-span-8">
            <ImageGallery isLoading={isLoading} error={error} images={images} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
