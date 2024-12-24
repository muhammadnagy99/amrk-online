import React, { useState } from "react";
import AddonsSection from "./components/AddonsSection";
import InputField from "./components/InputField";
import UploadFile from "./components/UploadFile";
import CategorySelect from "./components/ CategorySelect";
import Overlay from "./overlay";
import ReviewMenu from "./review-menu";

interface Addon {
  name: string;
  price: string;
  minSelection: string;
  maxSelection: string;
}

interface AddonGroup {
  name: string;
  minSelection: string;
  maxSelection: string;
  addons: {
    name: string;
    price: string;
  }[];
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

interface Category {
  nameEn: string;
  nameAr: string;
}

interface AddItemProps {
  categories: { nameEn: string; nameAr: string }[]; // Passing categories as prop
  onItemAdded: (newItem: ItemData) => void;
  onAddAddons: (addonGroup: AddonGroup) => void;
  menuAddons: AddonGroup[];
  onShowOverlay: (e:  React.MouseEvent<HTMLButtonElement>) => void;
  onMove: () => void;
}

export default function AddItem({
  categories,
  onItemAdded,
  onAddAddons,
  menuAddons,
  onShowOverlay,
  onMove
}: AddItemProps) {
  // State to store the item data
  const [category, setCategory] = useState<Category>({
    nameAr: "",
    nameEn: "",
  });
  const [nameEn, setNameEn] = useState<string>("");
  const [nameAr, setNameAr] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [descriptionEn, setDescriptionEn] = useState<string>("");
  const [descriptionAr, setDescriptionAr] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [addon, setAddons] = useState<AddonGroup[]>([]);

  

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    setFilePreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleAddCategory = (category: Category) => {
    setCategory(category);
    console.log(category);
  };
  const handleAddAddonItem = (addonGroup: AddonGroup) => {
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

  const emptyAddItemForm = () => {
    setCategory(category);
    setNameAr("");
    setNameEn("");
    setPrice(0);
    setFile(null);
    setFilePreview(null);
    setDescriptionEn("");
    setDescriptionAr("");
    setAddons([]);
  };

  const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const ItemData: ItemObject = {
      nameEn,
      nameAr,
      price,
      descriptionEn,
      descriptionAr,
      file,
      addon,
    };

    const newItem = {
      category: category,
      item: ItemData,
    };

    console.log(newItem);
    onItemAdded(newItem);

    emptyAddItemForm();
  };

  const handleConfirmItems = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onMove();
  };

  return (
    <>
      <div className="flex flex-col w-full h-[500px] gap-5 p-4 overflow-y-auto custom-scrollbar justify-between ">
        <h3 className="text-base lg:text-xl font-semibold text-primText top-0">
          Add Items
          <span className="text-xs font-normal ml-1">
            (Can edit/add more later)
          </span>
        </h3>

        <div className="flex flex-col bg-[#f7f7f7] gap-2 p-6 rounded-lg">
          <CategorySelect
            categories={categories}
            onCategoryChange={handleAddCategory}
          />

          <div className="flex flex-col lg:flex-row gap-4">
            <InputField
              label="Item Name En"
              id="branch-name-en"
              placeholder="Enter Name Here..."
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              required
            />
            <InputField
              label="Item Name Ar"
              id="branch-name-ar"
              placeholder="Enter Name Here..."
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
            />
            <InputField
              label="Price"
              id="item-price"
              placeholder="Enter Price Here..."
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
              type="number"
            />
          </div>

          <UploadFile
            onFileChange={handleFileChange}
            fileName={file ? file.name : undefined}
            filePreviewState={filePreview}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <InputField
              label="Item Description En"
              id="item-description-en"
              placeholder="Enter Description Here..."
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
            />
            <InputField
              label="Item Description Ar"
              id="item-description-ar"
              placeholder="Enter Description Here..."
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
            />
          </div>
        </div>

        <AddonsSection
          menuAddons={menuAddons}
          handleAddAddonGroup={onAddAddons}
          handleSaveItemWithAddon={handleAddAddonItem}
        />
      </div>

     

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
        <button
          className="bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg"
          onClick={(e) => handleConfirmItems(e)}
        >
          Review Full Menu
        </button>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          <button
            className="bg-white text-primText font-medium text-base lg:text-lg h-14 rounded-lg border-solid border-2 border-primText"
            onClick={onShowOverlay}
          >
            Preview Menu
          </button>

          <button
            className="bg-white text-primText font-medium text-base lg:text-lg h-14 rounded-lg border-solid border-2 border-primText"
            onClick={handleAddItem}
          >
            Add More Items
          </button>
        </div>
      </div>
    </>
  );
}
