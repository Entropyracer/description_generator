import React, { useState } from 'react';
import { DescriptionInput } from './components/DescriptionInput';
import { DescriptionHistory } from './components/DescriptionHistory';
import { SavedDescriptions } from './components/SavedDescriptions';
import { generateDescriptions } from './utils/descriptionGenerator';

export default function App() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [savedDescriptions, setSavedDescriptions] = useState<string[]>([]);
  const [isUppercase, setIsUppercase] = useState(true);

  const handleGenerate = () => {
    const descriptions = generateDescriptions(input);
    if (descriptions.length > 0) {
      const newDescription = descriptions[0];
      const formattedDescription = isUppercase ? newDescription.toUpperCase() : newDescription;
      setHistory(prev => [input, ...prev].slice(0, 5));
      setInput(formattedDescription);
    }
  };

  const handleSave = () => {
    if (input.trim()) {
      setSavedDescriptions(prev => [input, ...prev].slice(0, 50));
    }
  };

  const handleSelect = (description: string) => {
    setInput(description);
  };

  const handleDelete = (index: number, isSaved: boolean) => {
    if (isSaved) {
      setSavedDescriptions(prev => prev.filter((_, i) => i !== index));
    } else {
      setHistory(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Engineering Description Generator</h1>
          <p className="text-gray-600">Generate standardized engineering descriptions</p>
        </div>

        <DescriptionInput
          input={input}
          setInput={setInput}
          isUppercase={isUppercase}
          setIsUppercase={setIsUppercase}
          onGenerate={handleGenerate}
          onSave={handleSave}
        />

        <div className="mt-8 space-y-8">
          <DescriptionHistory
            history={history}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />

          <SavedDescriptions
            descriptions={savedDescriptions}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}