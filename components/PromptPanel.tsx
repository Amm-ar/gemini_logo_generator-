import React from 'react';
import type { AspectRatio } from '../types';

interface PromptPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  isLoading: boolean;
  onGenerate: () => void;
}

const aspectRatios: AspectRatio[] = ["1:1", "16:9", "9:16", "4:3", "3:4"];

// FIX: Define a dedicated interface for AspectRatioButton props.
// This helps TypeScript correctly interpret props for a React component,
// especially regarding special props like `key`.
interface AspectRatioButtonProps {
  value: AspectRatio;
  selected: boolean;
  onClick: (value: AspectRatio) => void;
}

const AspectRatioButton = ({ value, selected, onClick }: AspectRatioButtonProps) => {
  const baseClasses = "flex-1 text-center py-2 px-3 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800";
  const selectedClasses = "bg-green-500 text-white shadow";
  const unselectedClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-yellow-500";
  
  return (
    <button
      onClick={() => onClick(value)}
      className={`${baseClasses} ${selected ? selectedClasses : unselectedClasses}`}
    >
      {value}
    </button>
  );
};

export const PromptPanel: React.FC<PromptPanelProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  isLoading,
  onGenerate,
}) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/50 space-y-6 sticky top-24">
      <div>
        <label htmlFor="prompt" className="block text-lg font-semibold mb-2 text-gray-200">
          Your Creative Brief
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the logo you want to create..."
          rows={12}
          className="w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 resize-y"
        />
      </div>

      <div>
        <label className="block text-lg font-semibold mb-3 text-gray-200">
          Aspect Ratio
        </label>
        <div className="flex items-center gap-2">
          {aspectRatios.map((ratio) => (
            <AspectRatioButton
              key={ratio}
              value={ratio}
              selected={aspectRatio === ratio}
              onClick={setAspectRatio}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:from-green-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Generate Logos
          </>
        )}
      </button>
    </div>
  );
};