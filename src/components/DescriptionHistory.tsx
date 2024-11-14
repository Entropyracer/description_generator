import React from 'react';
import { ArrowUpCircle, Trash2, Copy } from 'lucide-react';

interface DescriptionHistoryProps {
  history: string[];
  onSelect: (description: string) => void;
  onDelete: (index: number, isSaved: boolean) => void;
}

export const DescriptionHistory: React.FC<DescriptionHistoryProps> = ({ history, onSelect, onDelete }) => {
  if (history.length === 0) return null;

  const handleCopy = async (description: string) => {
    await navigator.clipboard.writeText(description);
  };

  return (
    <div className="space-y-2 flex-1 overflow-hidden">
      <h2 className="text-lg font-semibold text-gray-700">Recent History</h2>
      <div className="space-y-2 overflow-y-auto max-h-[200px] pr-2">
        {history.map((description, index) => (
          <div
            key={index}
            className="group bg-white/50 rounded-lg p-4 hover:bg-white/70 transition-colors"
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-600 font-mono truncate hover:whitespace-normal hover:overflow-visible">
                {description}
              </p>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onSelect(description)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Use this description"
                >
                  <ArrowUpCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleCopy(description)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(index, false)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete from history"
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