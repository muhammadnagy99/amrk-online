"use client";

import React, { useState } from "react";
import ProgressBar from "./progress-bar";
import AddCategories from "./menu/add-categories";
import AddItem from "./menu/add-items";
import ReviewMenu from "./menu/review-menu";
import Overlay from "./menu/overlay";

interface Category {
  nameEn: string;
  nameAr: string;
}

interface Addon {
  name: string;
  price: string;
  minSelection: string;
  maxSelection: string;
}

interface AddonGroup {
  name: string;
  addons: Addon[];
}

interface ItemObject {
  nameEn: string;
  nameAr: string;
  price: number;
  descriptionEn: string;
  descriptionAr: string;
  file?: File | null;
  addon: AddonGroup[];
}

interface ItemData {
  category: Category;
  item: ItemObject;
}

interface Items {
  category: Category;
  items: ItemObject[];
}

interface AddonGroup {
  name: string;
  addons: {
    name: string;
    price: string;
    minSelection: string;
    maxSelection: string;
  }[];
}

interface props {
  onNext: () => void;
}

export default function Menu({onNext}: props) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Items[]>([]);

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCategoriesData = (newCategories: Category[]) => {
    // Step 1: Update the categories state
    setCategories(newCategories);

    // Step 2: Filter out items that are not in the new categories
    const updatedItems = items.filter((item) =>
      newCategories.some((category) => category.nameEn === item.category.nameEn)
    );

    newCategories.forEach((category) => {
      const categoryExistsInItems = items.some(
        (item) => item.category.nameEn === category.nameEn
      );

      if (!categoryExistsInItems) {
        const blankItem: Items = {
          category,
          items: [],
        };

        updatedItems.push(blankItem);
      }
    });

    setItems(updatedItems);
  };

  const deleteCategoryByName = (categoryName: string) => {
    const updatedCategories = categories.filter(
      (category) => category.nameEn !== categoryName
    );
    handleCategoriesData(updatedCategories);
  };

  const handleItemsData = (newItem: ItemData) => {
    setItems((prevItems) => {
      const categoryIndex = prevItems.findIndex(
        (item) => item.category.nameEn === newItem.category.nameEn
      );

      if (categoryIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[categoryIndex] = {
          ...updatedItems[categoryIndex],
          items: [...updatedItems[categoryIndex].items, newItem.item],
        };
        console.log(updatedItems);
        return updatedItems;
      } else {
        const updatedItems = [
          ...prevItems,
          { category: newItem.category, items: [newItem.item] },
        ];
        console.log(updatedItems);
        return updatedItems;
      }
    });
  };

  const [Addons, setAddons] = useState<AddonGroup[]>([]);

  const handleAddAddonGroup = (addonGroup: AddonGroup) => {
    setAddons((prevAddons) => {
      const existingGroupIndex = prevAddons.findIndex(
        (group) => group.name === addonGroup.name
      );

      if (existingGroupIndex !== -1) {
        const updatedAddons = [...prevAddons];
        updatedAddons[existingGroupIndex] = addonGroup;
        console.log(updatedAddons);
        return updatedAddons;
      } else {
        return [...prevAddons, addonGroup];
      }
    });
  };

  const handleSkipCategories = () => {
    setCategories([]);
    setItems([]);
    setCurrentStep(3);
  };

  const createMenu = () => {
    const menu = items;
    console.log(menu);
    onNext();
  };

  const [overlayVisible, setOverlayVisible] = useState(false);

  const showOverlay = (e:  React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOverlayVisible(true);
  };

  const hideOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <form className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col gap-5">
        <div className="text-primText text-base lg:text-2xl font-bold text-start w-full relative flex flex-row justify-between items-center">
          Menu Setup
          <span className="absolute -my-2 bottom-0 left-0 w-full h-[1px] bg-[#23314c4c]"></span>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        <Overlay isVisible={overlayVisible} onClose={hideOverlay}>
          <ReviewMenu
            menuItems={items}
            onDeleteCategory={deleteCategoryByName}
          />
        </Overlay>

        {currentStep === 1 && (
          <AddCategories
            onMove={handleNextStep}
            onUpdateCategories={handleCategoriesData}
            onSkip={handleSkipCategories}
            Categories={categories}
          />
        )}
        {currentStep === 2 && (
          <AddItem
            categories={categories}
            onItemAdded={handleItemsData}
            onAddAddons={handleAddAddonGroup}
            menuAddons={Addons}
            onShowOverlay={showOverlay}
            onMove={handleNextStep}
          />
        )}
        {currentStep === 3 && (
          <ReviewMenu
            menuItems={items}
            onDeleteCategory={deleteCategoryByName}
          />
        )}

        {currentStep === totalSteps && (
          <button
            type="button"
            onClick={createMenu}
            className="bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg"
          >
            Confirm Menu
          </button>
        )}

        <div className="w-full flex justify-between items-end">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-white text-PrimBtn font-medium text-base flex items-center gap-2"
            >
              <span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0004 7.00004H3.83041L8.71041 2.12004C9.10041 1.73004 9.10041 1.09004 8.71041 0.700037C8.6179 0.607333 8.50801 0.533785 8.38704 0.483604C8.26606 0.433422 8.13638 0.407593 8.00541 0.407593C7.87444 0.407593 7.74476 0.433422 7.62379 0.483604C7.50281 0.533785 7.39293 0.607333 7.30041 0.700037L0.710413 7.29004C0.617709 7.38255 0.544162 7.49244 0.49398 7.61341C0.443799 7.73439 0.417969 7.86407 0.417969 7.99504C0.417969 8.12601 0.443799 8.25569 0.49398 8.37666C0.544162 8.49763 0.617709 8.60752 0.710413 8.70004L7.30041 15.29C7.39299 15.3826 7.5029 15.4561 7.62387 15.5062C7.74483 15.5563 7.87448 15.5821 8.00541 15.5821C8.13634 15.5821 8.26599 15.5563 8.38696 15.5062C8.50792 15.4561 8.61783 15.3826 8.71041 15.29C8.80299 15.1975 8.87643 15.0875 8.92654 14.9666C8.97664 14.8456 9.00243 14.716 9.00243 14.585C9.00243 14.4541 8.97664 14.3245 8.92654 14.2035C8.87643 14.0825 8.80299 13.9726 8.71041 13.88L3.83041 9.00004H15.0004C15.5504 9.00004 16.0004 8.55004 16.0004 8.00004C16.0004 7.45004 15.5504 7.00004 15.0004 7.00004Z"
                    fill="#B0438A"
                  />
                </svg>
              </span>
              Previous
            </button>
          )}

          {currentStep < totalSteps && (
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-white text-PrimBtn font-medium text-base flex items-center gap-2"
            >
              Next
              <span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-180"
                >
                  <path
                    d="M15.0004 7.00004H3.83041L8.71041 2.12004C9.10041 1.73004 9.10041 1.09004 8.71041 0.700037C8.6179 0.607333 8.50801 0.533785 8.38704 0.483604C8.26606 0.433422 8.13638 0.407593 8.00541 0.407593C7.87444 0.407593 7.74476 0.433422 7.62379 0.483604C7.50281 0.533785 7.39293 0.607333 7.30041 0.700037L0.710413 7.29004C0.617709 7.38255 0.544162 7.49244 0.49398 7.61341C0.443799 7.73439 0.417969 7.86407 0.417969 7.99504C0.417969 8.12601 0.443799 8.25569 0.49398 8.37666C0.544162 8.49763 0.617709 8.60752 0.710413 8.70004L7.30041 15.29C7.39299 15.3826 7.5029 15.4561 7.62387 15.5062C7.74483 15.5563 7.87448 15.5821 8.00541 15.5821C8.13634 15.5821 8.26599 15.5563 8.38696 15.5062C8.50792 15.4561 8.61783 15.3826 8.71041 15.29C8.80299 15.1975 8.87643 15.0875 8.92654 14.9666C8.97664 14.8456 9.00243 14.716 9.00243 14.585C9.00243 14.4541 8.97664 14.3245 8.92654 14.2035C8.87643 14.0825 8.80299 13.9726 8.71041 13.88L3.83041 9.00004H15.0004C15.5504 9.00004 16.0004 8.55004 16.0004 8.00004C16.0004 7.45004 15.5504 7.00004 15.0004 7.00004Z"
                    fill="#B0438A"
                  />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </form>
  );
}