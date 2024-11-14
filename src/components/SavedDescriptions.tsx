import React from 'react';
import { ArrowUpCircle, Trash2, Copy } from 'lucide-react';

interface SavedDescriptionsProps {
  descriptions: string[];
  onSelect: (description: string) => void;
  onDelete: (index: number, isSaved: boolean) => void;
}

export const SavedDescriptions: React.FC<SavedDescriptionsProps> = ({ descriptions, onSelect, onDelete }) => {
  if (descriptions.length === 0) return null;

  const handleCopy = async (description: string) => {
    await navigator.clipboard.writeText(description);
  };

  return (
    <div className="space-y-2 flex-1 overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-700">Saved Descriptions</h2>
      <div className="space-y-2 overflow-y-auto max-h-[200px] pr-2 scrollbar-thin">
        {descriptions.map((description, index) => (
          <div
            key={index}
            className="group bg-white/60 rounded-lg p-4 hover:bg-white/80 transition-colors"
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-600 font-mono truncate hover:whitespace-normal hover:overflow-visible">
                {description}
              </p>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onSelect(description)}
                  className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                  title="Use this description"
                >
                  <ArrowUpCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleCopy(description)}
                  className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(index, true)}
                  className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                  title="Delete from saved"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};