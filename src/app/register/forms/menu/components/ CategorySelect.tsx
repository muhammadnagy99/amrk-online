import React, { useEffect } from "react";

interface Category {
  nameEn: string;
  nameAr: string;
}
interface CategorySelectProps {
  categories: Category[]; // Array of categories
  onCategoryChange: (category: Category) => void; // Callback to handle category change
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  onCategoryChange,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryIndex = Number(e.target.value);
    const selectedCategory = categories[selectedCategoryIndex];
    onCategoryChange(selectedCategory);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm lg:text-base font-semibold text-primText">
        Choose category to add items in
        <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          onChange={handleCategoryChange}
          className="block w-full appearance-none border h-12 border-gray-300 rounded-md bg-white px-4 py-2 text-primText text-base focus:ring-2 focus:[#23314c] focus:outline-none hover:bg-gray-100"
        >
          <option>Chooose Category</option>
          {categories.map((category, index) => (
            <option key={index} value={index}>
              {category.nameEn}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-PrimBtn"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 011.414 0L10 11l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CategorySelect;
