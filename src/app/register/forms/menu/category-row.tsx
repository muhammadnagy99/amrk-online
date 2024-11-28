'use client'

import React, { useState } from 'react';
import { Order_ico, DropDown, Delete_ico } from './icons';
import { on } from 'stream';

// Define the types for the props
interface DropdownItem {
  name: string;
  price: string;
}

interface CategoryRowProps {
  category: string;
  dropdownItems: DropdownItem[];
  onDeleteCategory: (categoryName: string) => void;
}

export default function CategoryRow({ category, dropdownItems, onDeleteCategory }: CategoryRowProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [items, setItems] = useState(dropdownItems); // Track the state of dropdown items

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle drag start for an item
  const handleItemDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('draggedItemIndex', index.toString());
  };

  // Allow item to be dragged over
  const handleItemDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle item drop (reorder items)
  const handleItemDrop = (e: React.DragEvent, index: number) => {
    const draggedItemIndex = parseInt(e.dataTransfer.getData('draggedItemIndex'), 10);
    const reorderedItems = [...items];

    // Remove the dragged item and place it at the new index
    const [draggedItem] = reorderedItems.splice(draggedItemIndex, 1);
    reorderedItems.splice(index, 0, draggedItem);

    setItems(reorderedItems); // Update the items order
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between bg-[#ededed] px-6 py-3 rounded-lg mb-2" draggable>
        <div className="flex flex-row gap-4 items-center">
          <p aria-label="order icon" className="cursor-pointer">
            <Order_ico />
          </p>
          <p>{category}</p>
        </div>

        <div className="flex flex-row gap-4 justify-center items-center">
          <p 
            className={`flex items-center h-full transition-transform ${isDropdownOpen ? 'rotate-0' : 'rotate-180'} cursor-pointer`} 
            onClick={handleDropdownClick} 
            aria-labelledby="dropdown icon"
          >
            <DropDown />
          </p>
          <p className="cursor-pointer" aria-labelledby="delete icon" onClick={() => onDeleteCategory(category)} >
            <Delete_ico />
          </p>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="flex flex-col px-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between bg-[#ededed] px-6 py-3 rounded-lg mb-2"
              draggable
              onDragStart={(e) => handleItemDragStart(e, index)}
              onDragOver={handleItemDragOver}
              onDrop={(e) => handleItemDrop(e, index)}
            >
              <div className="flex flex-row gap-4 items-center">
                <p aria-label="order icon" className="cursor-pointer">
                  <Order_ico />
                </p>
                <p className="text-[#23314c99]">{item.name} - {item.price}</p>
              </div>

              <div className="flex flex-row gap-4 justify-center items-center">
                <p className="cursor-pointer" aria-labelledby="delete icon">
                  <Delete_ico />
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
