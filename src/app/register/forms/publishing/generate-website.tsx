"use client";

import React, { useState } from "react";

export default function GenerateWebsite() {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleChange = () => {
    setIsChecked((prevState) => !prevState);
  };

  return (
    <>
      <div
        className="flex flex-col w-full gap-5 max-h-[560px] overflow-y-auto custom-scrollbar justify-between lg:my-8"
        aria-labelledby="payment information"
      >
        <div className="flex flex-row gap-2 justify-between w-full">
          <h3 className="text-base lg:text-xl font-medium text-primText top-0 w-[80%]">
            Would you like a website optimized for online ordering?
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

        {/* Use the visibility property to hide/show the content */}
        <div
          className={`flex flex-col ${
            isChecked ? "visible" : "invisible"
          } bg-[#f7f7f7] gap-2 p-6 rounded-lg h-full`}
        >
          <div className="flex flex-col items-center justify-center gap-5">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
                fill="#21C179"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M41.0945 18.4332C41.6366 18.9847 41.6287 19.8711 41.0771 20.413L25.102 36.1082C24.5661 36.6349 23.7098 36.6444 23.1624 36.1301L15.6757 29.0979C15.1122 28.5687 15.0844 27.6825 15.6138 27.1191C16.1432 26.5555 17.0292 26.5278 17.5927 27.057L24.099 33.1685L39.1149 18.4157C39.6662 17.8738 40.5527 17.8816 41.0945 18.4332Z"
                fill="white"
              />
            </svg>

            <p className="text-base font-semibold text-primText">
              Website created successfully!
            </p>

            <p className="text-base font-normal text-primText text-center">
              Congratulations! your optimized website has been created. Please
              click the button down below to preview or edit your website.
            </p>

            <button className="py-2 px-4 bg-[#348ef4] text-white rounded-lg" onClick={(e) => e.preventDefault()}>
            View Website
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
