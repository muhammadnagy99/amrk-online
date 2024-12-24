"use client";

import React, { useEffect, useState } from "react";

interface Dine{
  isChecked: boolean ;
  tips: number[]
  selectedTip: string
  minTip:number
}
interface Props {
  dineData: Dine
  onChange: (Dine: Dine) => void;  // Ensure the name matches here
}
export default function DineIn({dineData, onChange}: Props) {
  const [isChecked, setIsChecked] = useState(dineData.isChecked);
  // Separate states for each tip input
  const [tip1, setTip1] = useState<string>(  dineData?.tips?.[0] ? dineData.tips[0].toString() : '');
  const [tip2, setTip2] = useState<string>(  dineData?.tips?.[1] ? dineData.tips[1].toString() : '');
  const [tip3, setTip3] = useState<string>(  dineData?.tips?.[2] ? dineData.tips[2].toString() : '');
  const [tip4, setTip4] = useState<string>(  dineData?.tips?.[3] ? dineData.tips[3].toString() : '');
  const [minTip, setMinTip] = useState<string>(dineData.minTip.toString());
  const [selectedTip, setSelectedTip] = useState<string>(dineData.selectedTip);

  const [tips, updateTips] = useState<number[]>(dineData.tips);

  // Handle checkbox toggle
  const handleToggleChange = () => {
    setIsChecked((prevState) => !prevState);
  };

  const handleTipChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setTip: React.Dispatch<React.SetStateAction<string>>,
    index: number
  ) => {
    const value = e.target.value;

    // Update the individual tip state (as string)
    setTip(value);

    // Update the `tips` array with the value, convert to number or leave empty if deleted
    updateTips((prevTips) => {
      const newTips = [...prevTips];
      newTips[index] = value === "" ? 0 : Number(value); // Convert empty to 0, or use the number
      return newTips;
    });
  };

  const handleMinTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinTip(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTip(e.target.value);
  };

  useEffect(() => {
    const collectedData = {
      isChecked,
      tips,
      selectedTip,
      minTip: minTip ? Number(minTip) : 0,
    };
    onChange(collectedData);

  }, [isChecked, tip1, tip2, tip3, tip4, tips, minTip]);

  return (
    <>
      <div
        className="flex flex-col w-full gap-5 max-h-[560px] overflow-y-auto custom-scrollbar justify-between lg:h-[270px]"
        aria-labelledby="Dine in"
      >
        <div className="flex flex-row gap-2 justify-between">
          <h3 className="text-base lg:text-xl font-semibold text-primText top-0">
            Would you accept tips for Dine-In?
          </h3>

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={isChecked}
              onChange={handleToggleChange}
              disabled={false}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:none peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-PrimBtn"></div>
          </label>
        </div>

        {/* Payment options and payment fees are hidden but not removed from the DOM if the toggle is not checked */}
        <div hidden={!isChecked}>
          <div className="flex flex-col bg-[#f7f7f7] gap-2 p-6 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12">
              <div className="flex flex-col gap-2">
                <label className="text-sm lg:text-base font-semibold text-primText">
                  Enter your preferred tips values(%)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <input
                    type="number"
                    placeholder="15"
                    value={tip1}
                    onChange={(e) => handleTipChange(e, setTip1, 0)} // 0 is the index for tip1
                    className="border border-gray-300 rounded-md h-12 w-16 text-gray-700 text-base text-center focus:ring-2 focus:ring-blue-500 focus:outline-none hover:bg-gray-100"
                  />
                  <input
                    type="number"
                    placeholder="20"
                    value={tip2}
                    onChange={(e) => handleTipChange(e, setTip2, 1)} // 1 is the index for tip2
                    className="border border-gray-300 rounded-md h-12 w-16 text-gray-700 text-base text-center focus:ring-2 focus:ring-blue-500 focus:outline-none hover:bg-gray-100"
                  />
                  <input
                    type="number"
                    placeholder="25"
                    value={tip3}
                    onChange={(e) => handleTipChange(e, setTip3, 2)} // 2 is the index for tip3
                    className="border border-gray-300 rounded-md h-12 w-16 text-gray-700 text-base text-center focus:ring-2 focus:ring-blue-500 focus:outline-none hover:bg-gray-100"
                  />
                  <input
                    type="number"
                    placeholder="30"
                    value={tip4}
                    onChange={(e) => handleTipChange(e, setTip4, 3)} // 3 is the index for tip4
                    className="border border-gray-300 rounded-md h-12 w-16 text-gray-700 text-base text-center focus:ring-2 focus:ring-blue-500 focus:outline-none hover:bg-gray-100"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm lg:text-base font-semibold text-primText">
                  Default tip
                </label>
                <div className="relative">
                  <select
                    className="block w-full appearance-none border h-12 border-gray-300 rounded-md bg-white px-4 py-2 text-primText text-base focus:ring-2 focus:[#23314c] focus:outline-none hover:bg-gray-100"
                    value={selectedTip}
                    onChange={handleSelectChange}
                  >
                    {tips.map((key, index) => {
                      return (
                        <option key={index} value={key}>
                          {key}%
                        </option>
                      );
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-PrimBtn"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.707a1 1 0 011.414 0L10 11l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm lg:text-base font-semibold text-primText">
                Tip minimum percentage
              </label>
              <div className="w-full flex items-center border border-gray-300 rounded-md bg-white focus:none focus-within:ring-2 focus-within:none">
                <span className="px-4 py-2 text-gray-500 border-r border-gray-300">
                  %
                </span>
                <input
                  type="text"
                  placeholder="Enter Number Here..."
                  className="w-full px-4 py-2 text-gray-700 text-base focus:outline-none"
                  value={minTip}
                  onChange={handleMinTipChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
