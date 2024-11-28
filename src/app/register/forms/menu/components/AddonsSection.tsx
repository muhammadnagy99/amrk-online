import React, { useState } from "react";
import { PlusIcon, Save } from "../icons";

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

interface AddonsSectionProps {
  menuAddons: AddonGroup[];
  handleAddAddonGroup: (addonGroup: AddonGroup) => void;
  handleSaveItemWithAddon: (addonGroup: AddonGroup) => void;
}

const AddonsSection: React.FC<AddonsSectionProps> = ({
  menuAddons,
  handleAddAddonGroup,
  handleSaveItemWithAddon,
}) => {
  const [addonGroupName, setAddonGroupName] = useState("");
  // Initialize with one default addon input
  const [newAddons, setNewAddons] = useState<Addon[]>([
    { name: "", price: "", minSelection: "", maxSelection: "" },
  ]);
  const [selectedAddonGroup, setSelectedAddonGroup] = useState<string>("");

  // Function to add a new addon input field
  const handleAddMoreAddons = () => {
    setNewAddons([
      ...newAddons,
      { name: "", price: "", minSelection: "", maxSelection: "" },
    ]);
  };

  // Handle input changes for new add-ons
  const handleAddonChange = (
    index: number,
    field: keyof (typeof newAddons)[0],
    value: string
  ) => {
    const updatedAddons = [...newAddons];
    updatedAddons[index][field] = value;
    setNewAddons(updatedAddons);
  };

  const handleSaveAddonGroup = () => {
    const newAddonGroup: AddonGroup = {
      name: addonGroupName,
      addons: newAddons,
    };
    handleAddAddonGroup(newAddonGroup);
    handleSaveItemWithAddon(newAddonGroup);
    setNewAddons([
      { name: "", price: "", minSelection: "", maxSelection: "" },
    ]);
    setAddonGroupName('');
  };

  const [isAddonsVisible, setIsAddonsVisible] = useState(false);

  const handleAddAddonsClick = () => {
    setIsAddonsVisible(true);
  };

  // Determine if we should show the "Add New Group" section
  const shouldShowAddNewGroup =
    selectedAddonGroup === "add-new" || menuAddons.length === 0;

  return (
    <>
      {!isAddonsVisible && (
        <button
          type="button"
          onClick={handleAddAddonsClick}
          className="w-[160px] flex items-center gap-4 px-4 py-2 border-2 border-[#B0438A] text-[#B0438A] rounded-lg text-xs lg:text-sm font-semibold focus:outline-none"
        >
          <PlusIcon />
          Add Add-ons
        </button>
      )}
      {isAddonsVisible && (
        <>
          <div className="flex flex-col bg-[#f7f7f7] gap-2 p-6 rounded-lg">
            <div className="flex flex-col gap-2">
              <label className="text-sm lg:text-base font-semibold text-primText">
                Apply Saved Add-ons Group to Item
              </label>
              <div className="relative">
                <select
                  className="block w-full appearance-none border h-12 border-gray-300 rounded-md bg-white px-4 py-2 text-primText text-sm lg:text-base focus:ring-2 focus:[#23314c] focus:outline-none hover:bg-gray-100"
                  value={selectedAddonGroup}
                  onChange={(e) => setSelectedAddonGroup(e.target.value)}
                >
                  {menuAddons && menuAddons.length > 0 ? (
                    menuAddons.map((addon, index) => (
                      <>
                        <option key={index} value={addon.name}>
                          {addon.name}
                        </option>
                        <option value="add-new">Add New Group...</option>
                      </>
                    ))
                  ) : (
                    <option value="add-new">Add New Group...</option>
                  )}
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
          </div>

          {shouldShowAddNewGroup && (
            <div className="flex flex-col bg-[#f7f7f7] gap-4 p-6 rounded-lg">
              <div className="w-full flex flex-col justify-start gap-2">
                <label
                  htmlFor="addon-group-name"
                  className="text-sm lg:text-base font-semibold text-primText"
                >
                  Add-ons Group Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="addon-group-name"
                  className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
                  placeholder="Enter Name Here..."
                  value={addonGroupName}
                  onChange={(e) => setAddonGroupName(e.target.value)}
                />
              </div>

              {/* Render input fields for each addon */}
              {newAddons.map((addon, index) => (
                <div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 bg-[#EDEDED] rounded-lg"
                  aria-label="add new group addon"
                  key={index}
                >
                  <div className="w-full flex flex-col justify-start gap-2">
                    <label
                      htmlFor={`addon-name-${index}`}
                      className="text-sm lg:text-base font-semibold text-primText"
                    >
                      Add-on Name
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`addon-name-${index}`}
                      className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
                      placeholder="Enter Name Here..."
                      value={addon.name}
                      onChange={(e) =>
                        handleAddonChange(index, "name", e.target.value)
                      }
                    />
                  </div>

                  <div className="w-full flex flex-col justify-start gap-2">
                    <label
                      htmlFor={`addon-price-${index}`}
                      className="text-sm lg:text-base font-semibold text-primText"
                    >
                      Add-on Price
                      <span className="text-red-500">*</span>
                    </label>
                    
                    <input
                      type="number"
                      id={`addon-price-${index}`}
                      className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
                      placeholder="Enter Price Here..."
                      value={addon.price}
                      onChange={(e) =>
                        handleAddonChange(index, "price", e.target.value)
                      }
                    />
                  </div>

                  <div className="w-full flex flex-col justify-start gap-2">
                    <label
                      htmlFor={`min-selection-${index}`}
                      className="text-sm lg:text-base font-semibold text-primText"
                    >
                      Min Selection
                      <span className="text-xs font-light ml-1">
                        (if left blank, set to 0)
                      </span>
                    </label>
                    <input
                      type="number"
                      id={`min-selection-${index}`}
                      className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
                      placeholder="Enter Min Selection Here..."
                      value={addon.minSelection}
                      onChange={(e) =>
                        handleAddonChange(index, "minSelection", e.target.value)
                      }
                    />
                  </div>

                  <div className="w-full flex flex-col justify-start gap-2">
                    <label
                      htmlFor={`max-selection-${index}`}
                      className="text-sm lg:text-base font-semibold text-primText"
                    >
                      Max Selection
                    </label>
                    <input
                      type="number"
                      id={`max-selection-${index}`}
                      className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
                      placeholder="Enter Max Selection Here..."
                      value={addon.maxSelection}
                      onChange={(e) =>
                        handleAddonChange(index, "maxSelection", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}

              <div className="flex flex-col lg:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleAddMoreAddons}
                  className="w-full lg:w-[200px] flex items-center gap-2 px-4 py-2 border-2 border-[#B0438A] text-[#B0438A] rounded-lg text-xs lg:text-sm font-semibold focus:outline-none"
                >
                  <PlusIcon />
                  Add More Add-ons
                </button>
                <button
                  type="button"
                  onClick={handleSaveAddonGroup}
                  className="w-full lg:w-[200px] flex items-center gap-2 px-4 py-2 border-2 border-[#23314C] text-[#23314C] rounded-lg text-xs lg:text-sm font-semibold focus:outline-none"
                >
                  <Save />
                  Save Add-ons Group
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AddonsSection;
