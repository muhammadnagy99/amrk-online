import React, { useState } from "react";
import { Delete_ico, Edit_ico, Order_ico } from "./icons";

interface Category {
  nameEn: string;
  nameAr: string;
}

interface AddCategoriesProps {
  onMove: () => void;
  onUpdateCategories: (categories: Category[]) => void;
  onSkip: () => void;
  Categories: Category[]
}

export default function AddCategories({ onMove, onUpdateCategories, onSkip, Categories }: AddCategoriesProps) {
  const [categoryNameEn, setCategoryNameEn] = useState<string>("");
  const [categoryNameAr, setCategoryNameAr] = useState<string>("");

  const [categories, setCategories] = useState<Category[]>(Categories);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newCategoryNameEn, setNewCategoryNameEn] = useState<string>("");
  const [newCategoryNameAr, setNewCategoryNameAr] = useState<string>("");

  const handleAddCategory = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (categoryNameEn.trim()) {
      setCategories((prevCategories) => [
        ...prevCategories,
        { nameEn: categoryNameEn, nameAr: categoryNameAr },
      ]);
      setCategoryNameEn("");
      setCategoryNameAr("");
    }
  };

  const handleEditCategory = (index: number) => {
    const category = categories[index];
    setEditingIndex(index);
    setNewCategoryNameEn(category.nameEn);
    setNewCategoryNameAr(category.nameAr);
  };

  const handleUpdateCategory = () => {
    if (editingIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editingIndex] = {
        nameEn: newCategoryNameEn,
        nameAr: newCategoryNameAr,
      };
      setCategories(updatedCategories);
      setEditingIndex(null); // Reset editing state
      setNewCategoryNameEn("");
      setNewCategoryNameAr("");
    }
  };

  // Function to handle delete button click
  const handleDeleteCategory = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
    onUpdateCategories(updatedCategories);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("index", index.toString()); // Set the dragged item index
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow the drop by preventing the default behavior
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = Number(e.dataTransfer.getData("index"));
    if (fromIndex !== toIndex) {
      const updatedCategories = [...categories];
      const [movedItem] = updatedCategories.splice(fromIndex, 1);
      updatedCategories.splice(toIndex, 0, movedItem);
      setCategories(updatedCategories);
    }
  };

  const handleConfirmCategories = () => {
    onUpdateCategories(categories);
    onMove();
  };

  return (
    <>
      <div className="flex flex-col w-full gap-5 overflow-y-auto custom-scrollbar justify-between">
        <h3 className="text-sm lg:text-xl font-semibold text-primText top-0">
          Add Categories
          <span className="text-xs font-normal ml-1">(Can edit/add more later)</span>
        </h3>

        <div className="flex flex-col bg-[#f7f7f7] gap-2 p-6 rounded-lg h-[350px] overflow-y-auto custom-scrollbar">
          <div className="flex flex-col lg:flex-row">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full lg:w-[90%]">
              <div className="w-full flex flex-col justify-start gap-2">
                <label
                  htmlFor="category-name-en"
                  className="text-base font-semibold text-primText"
                >
                  Category Name (English)
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="categoryNameEn"
                  id="category-name-en"
                  className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
                  placeholder="Enter Name Here..."
                  value={editingIndex !== null ? newCategoryNameEn : categoryNameEn}
                  onChange={(e) =>
                    editingIndex !== null
                      ? setNewCategoryNameEn(e.target.value)
                      : setCategoryNameEn(e.target.value)
                  }
                />
              </div>

              <div className="w-full flex flex-col justify-start gap-2">
                <label
                  htmlFor="category-name-ar"
                  className="text-base font-semibold text-primText"
                >
                  Category Name (Arabic)
                  <span className="text-xs">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="categoryNameAr"
                  id="category-name-ar"
                  className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
                  placeholder="Enter Name Here..."
                  value={editingIndex !== null ? newCategoryNameAr : categoryNameAr}
                  onChange={(e) =>
                    editingIndex !== null
                      ? setNewCategoryNameAr(e.target.value)
                      : setCategoryNameAr(e.target.value)
                  }
                />
              </div>
            </div>
            <button
              className="flex items-center w-full lg:w-[10%] lg:p-4 mt-4 justify-end"
              onClick={(e) => {
                e.preventDefault();
                editingIndex === null
                  ? handleAddCategory(e)
                  : handleUpdateCategory();
              }}
            >
              <svg
                width="28"
                height="21"
                viewBox="0 0 28 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.91666 21L0.416656 11.5L2.79166 9.12501L9.91666 16.25L25.2083 0.958344L27.5833 3.33334L9.91666 21Z"
                  fill="#26A300"
                />
              </svg>
            </button>
          </div>

          <div className="Line"></div>

          <div className="flex flex-col">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-row justify-between bg-[#ededed] px-6 py-3 rounded-lg mb-2"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <div className="flex flex-row gap-4 items-center">
                  <p aria-label="order icon" className="cursor-pointer">
                    <Order_ico />
                  </p>

                  <p>
                    {category.nameEn} - {category.nameAr}
                  </p>
                </div>

                <div className="flex flex-row gap-4 justify-center items-center">
                  <p
                    className="cursor-pointer"
                    aria-labelledby="edit icon"
                    onClick={() => handleEditCategory(index)}
                  >
                    <Edit_ico />
                  </p>
                  <p
                    className="cursor-pointer"
                    aria-labelledby="delete icon"
                    onClick={() => handleDeleteCategory(index)}
                  >
                    <Delete_ico />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-4">
        <button
          className="w-full lg:w-[70%] bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg"
          onClick={handleConfirmCategories}
        >
          Confirm Categories
        </button>

        <button
          className="w-full lg:w-[30%] bg-white text-primText font-normal text-base lg:text-xl h-14 rounded-lg border-solid border-2 border-primText"
          onClick={onSkip}
        >
          Skip for Now
        </button>
      </div>
    </>
  );
}
