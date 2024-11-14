import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal, X, Edit2 } from 'lucide-react';

interface EditableDescriptionProps {
  description: string;
  onChange: (newDescription: string) => void;
  placeholder?: string;
}

export const EditableDescription: React.FC<EditableDescriptionProps> = ({
  description,
  onChange,
  placeholder = '',
}) => {
  const [isEditing, setIsEditing] = useState(!description);
  const [selectedAttr, setSelectedAttr] = useState<number | null>(null);
  const [editingAttr, setEditingAttr] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const attributes = description.split(/, */g).filter(Boolean);

  useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
      const lineHeight = parseInt(getComputedStyle(inputRef.current).lineHeight);
      const maxHeight = lineHeight * 5; // 5 lines
      inputRef.current.style.height = 'auto';
      const scrollHeight = inputRef.current.scrollHeight;
      inputRef.current.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
      inputRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [isEditing, description]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsEditing(false);
    }
  };

  const handleDisplayClick = () => {
    setIsEditing(true);
  };

  const handleDelete = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    onChange(newAttributes.join(', '));
  };

  const handleStartEdit = (index: number) => {
    setEditingAttr(index);
    setEditValue(attributes[index]);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const handleEditComplete = () => {
    if (editingAttr !== null) {
      const newAttributes = [...attributes];
      newAttributes[editingAttr] = editValue;
      onChange(newAttributes.join(', '));
      setEditingAttr(null);
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditComplete();
    } else if (e.key === 'Escape') {
      setEditingAttr(null);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const newAttributes = [...attributes];
    const [removed] = newAttributes.splice(sourceIndex, 1);
    newAttributes.splice(targetIndex, 0, removed);
    onChange(newAttributes.join(', '));
    setIsDragging(false);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const commonClasses = "w-full px-4 py-3 rounded-lg border border-gray-300 font-mono min-h-[3rem] transition-all duration-200 ease-in-out";

  return (
    <div className="relative min-h-[3rem]">
      {isEditing ? (
        <textarea
          ref={inputRef}
          value={description}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={() => description && setIsEditing(false)}
          placeholder={placeholder}
          className={`${commonClasses} focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none scrollbar-thin bg-white`}
          rows={1}
        />
      ) : (
        <div
          onClick={handleDisplayClick}
          className={`${commonClasses} cursor-text bg-white hover:bg-gray-50`}
        >
          <div className="whitespace-pre-wrap break-words">
            {attributes.map((attr, index) => (
              <React.Fragment key={index}>
                <span
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  onMouseEnter={() => setSelectedAttr(index)}
                  onMouseLeave={() => setSelectedAttr(null)}
                  className="relative inline-block group/attr"
                >
                  {/* Extended hover area for controls */}
                  <div className="absolute -top-6 left-0 right-0 h-6 z-10 group-hover/attr:block hidden" />
                  
                  {/* Controls container */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover/attr:flex items-center space-x-1 bg-white shadow-md rounded-md p-1 z-20">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleStartEdit(index); }}
                      className="p-1.5 text-gray-500 hover:text-blue-500 focus:outline-none"
                      title="Edit attribute"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(index); }}
                      className="p-1.5 text-gray-500 hover:text-red-500 focus:outline-none"
                      title="Delete attribute"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 hidden group-hover/attr:block whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded z-30">
                    Left-click to reorder
                  </div>

                  {/* Attribute content */}
                  <span className={`${isDragging ? 'cursor-move' : 'cursor-pointer'} ${
                    selectedAttr === index ? 'bg-blue-50 rounded px-1' : ''
                  }`}>
                    {editingAttr === index ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={handleEditChange}
                        onBlur={handleEditComplete}
                        onKeyDown={handleEditKeyDown}
                        onClick={(e) => e.stopPropagation()}
                        className="px-1 py-0.5 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      attr
                    )}
                  </span>
                </span>
                {index < attributes.length - 1 && <span>, </span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};