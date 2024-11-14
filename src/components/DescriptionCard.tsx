import React, { useState } from 'react';
import { ClipboardCopy, Check } from 'lucide-react';

interface DescriptionCardProps {
  description: string;
  index: number;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({ description, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between group hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4 flex-1">
        <span className="text-sm font-medium text-gray-500 w-6">{index}.</span>
        <p className="text-gray-800 font-medium flex-1 font-mono">{description}</p>
      </div>
      <button
        onClick={handleCopy}
        className={`ml-4 p-2 rounded-md transition-colors ${
          copied
            ? 'bg-green-100 text-green-600'
            : 'text-gray-500 hover:bg-gray-100 group-hover:text-gray-700'
        }`}
      >
        {copied ? <Check className="w-5 h-5" /> : <ClipboardCopy className="w-5 h-5" />}
      </button>
    </div>
  );
}

export default DescriptionCard;