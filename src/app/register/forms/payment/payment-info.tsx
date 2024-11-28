"use client";

import React, { useState } from "react";
import Payment_img from "@/public/payment.png";
import Image from "next/image";

interface props{
  onAccept: (state: boolean) => void
  state: boolean;
}
export default function PaymentInfo({onAccept, state}: props) {
  const [isChecked, setIsChecked] = useState(state);

  const handleToggleChange = () => {
    setIsChecked((prevState) => !prevState);
    onAccept(isChecked);
  };

  return (
    <>
      <div
        className="flex flex-col w-full gap-5 max-h-[450px] overflow-y-auto custom-scrollbar justify-between p-4"
        aria-labelledby="payment information"
      >
        <div className="flex flex-row gap-2 justify-between">
          <h3 className="text-sm lg:text-xl font-semibold text-primText top-0">
            Do you accept online payment?
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
          className={`flex flex-col ${isChecked ? "visible" : "invisible"} bg-[#f7f7f7] gap-2 p-6 rounded-lg`}
        >
          <h3 className="text-base font-medium text-primText">
            Payments options we use
          </h3>
          <Image src={Payment_img} width={330} height={32} alt="payment" />
        </div>
      {isChecked && (
        <div
          className={`flex flex-col bg-[#f7f7f7] gap-5 p-6 rounded-lg`}
        >
          <h3 className="text-base font-semibold text-primText">
            Online payment fees
          </h3>
          <div className="flex flex-col lg:flex-row gap-2">
            <p className="w-1/3 text-base font-normal">MADA</p>
            <p className="w-2/3 text-sm font-light">
              1.7% + SAR 0.49 (transaction equal to or less than SAR 25) <br />
              1.7% + SAR 0.79 (transaction more than SAR 25) <br />
              1.7% + SAR 0.99 (transaction more than SAR 50)
            </p>
          </div>
          <div className="Line"></div>
          <div className="flex flex-col lg:flex-row gap-2">
            <p className="w-1/3 text-base font-normal">Visa/Mastercard</p>
            <p className="w-2/3 text-sm font-light flex flex-col gap-1">
              2.5% + SAR 0.99 (transaction equal to or less than SAR 25) <br />
              2.5% + SAR 1.29 (transaction more than SAR 25)
              <br />
              2.5% + SAR 1.49 (transaction more than SAR 50)
            </p>
          </div>
          <p className="flex flex-row items-center font-light text-sm text-PrimBtn gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00016 5.33337H8.0055M8.00016 10.6667V7.33337M14.6668 8.00004C14.6668 11.682 11.6822 14.6667 8.00016 14.6667C4.31816 14.6667 1.3335 11.682 1.3335 8.00004C1.3335 4.31804 4.31816 1.33337 8.00016 1.33337C11.6822 1.33337 14.6668 4.31804 14.6668 8.00004Z"
                stroke="#B0438A"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Refund fees for MADA service is SAR 0 - Refund fees for Visa/Mastercard service is SAR 1
          </p>
        </div>

      )}
      </div>
    </>
  );
}
