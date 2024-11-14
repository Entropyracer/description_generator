import React from 'react';
import { Wand2, Save, X } from 'lucide-react';
import { EditableDescription } from './EditableDescription';

interface DescriptionInputProps {
  input: string;
  setInput: (value: string) => void;
  isUppercase: boolean;
  setIsUppercase: (value: boolean) => void;
  onGenerate: () => void;
  onSave: () => void;
}

export const DescriptionInput: React.FC<DescriptionInputProps> = ({
  input,
  setInput,
  isUppercase,
  setIsUppercase,
  onGenerate,
  onSave,
}) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onGenerate();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onGenerate]);

  const handleClear = () => {
    setInput('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="space-y-4">
        <EditableDescription
          description={input}
          onChange={setInput}
          placeholder="Enter description and press Enter or Generate (Shift+Enter for new line)"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isUppercase}
              onChange={(e) => setIsUppercase(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Uppercase Text Only</span>
          </label>

          <div className="flex space-x-3">
            <button
              onClick={handleClear}
              className="flex items-center px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transition-colors"
              title="Clear input"
            >
              <X className="w-5 h-5 mr-2" />
              Clear
            </button>
            <button
              onClick={onGenerate}
              className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-colors"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              Generate
            </button>
            <button
              onClick={onSave}
              disabled={!input}
              className="flex items-center px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5 mr-2" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};