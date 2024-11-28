"use client";

import React, { useState } from "react";
import TimePicker from "./time-picker";
import ProgressBar from "./progress-bar";

const CheckboxInput = ({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex items-center justify-between h-14 px-4 border border-[#23314c4c] rounded-lg">
    <label
      htmlFor={id}
      className="w-4/5 py-4 ms-2 text-base font-normal text-primText"
    >
      {label}
    </label>
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-6 h-6 text-PrimBtn bg-gray-100 border-gray-300 rounded focus:[#b0438a] dark:focus:[#b0438a] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
  </div>
);

const TextInput = ({
  id,
  placeholder,
  name,
  value,
  onChange,
}: {
  id: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    id={id}
    type="text"
    name={name}
    className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

interface props {
  onNext: () => void;
}

export default function Services({onNext}: props) {
  const [dineIn, setDineIn] = useState(false);
  const [pickupOrders, setPickupOrders] = useState(false);
  const [tableReservation, setTableReservation] = useState(false);
  const [foodDelivery, setFoodDelivery] = useState(false);
  const [minGuests, setMinGuests] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [minOrderSize, setMinOrderSize] = useState("");
  const [regionDataFees, setRegionDataFees] = useState([
    { distance: "", fees: "" },
  ]);

  const daysOfWeek = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const [weekWorkingHours, setWeekWorkingHours] = useState(
    daysOfWeek.map((day) => ({
      day,
      isActive: false,
      fromHour: "",
      fromMinute: "",
      toHour: "",
      toMinute: "",
    }))
  );

  const handleTimeChange = (day: string, field: string, value: string) => {
    setWeekWorkingHours((prevState) =>
      prevState.map((item) =>
        item.day === day
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const handleCheckboxChange = (day: string) => {
    setWeekWorkingHours((prevState) =>
      prevState.map((item) =>
        item.day === day
          ? {
              ...item,
              isActive: !item.isActive,
              fromHour: "",
              fromMinute: "",
              toHour: "",
              toMinute: "",
            }
          : item
      )
    );
  };

  const handleNextClick = () => {

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const handlePrevious = (e: React.MouseEvent) => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegionFeeChange = (index: number, field: any, value: any) => {
    const updatedRegionFees = [...regionDataFees];
    updatedRegionFees[index] = { ...updatedRegionFees[index], [field]: value };
    setRegionDataFees(updatedRegionFees);
  };

  const addRegionFee = (e: React.MouseEvent) => {
    e.preventDefault();
    setRegionDataFees([...regionDataFees, { distance: "", fees: "" }]);
  };

  const removeRegionFee = (index: number) => {
    const updatedRegionFees = regionDataFees.filter((_, i) => i !== index);
    setRegionDataFees(updatedRegionFees);
  };


  const handleSaveServiceData = (e: React.MouseEvent) => {
    e.preventDefault();

    const servicesData = {
      dineIn: { key: dineIn, data: {} },
      pickupOrders: { key: pickupOrders, data: {} },
      tableReservation: {
        key: tableReservation,
        data: tableReservation
          ? {
              minGuests: minGuests,
              maxGuests: maxGuests,
            }
          : { minGuests: null, maxGuests: null },
      },

      foodDelivery: {
        key: foodDelivery,
        data: foodDelivery
          ? {
              minOrderSize: minOrderSize,
              regionDataFees: regionDataFees,
            }
          : { minOrderSize: null, regionDataFees: null },
      },
    };

    console.log(servicesData);

    console.log(weekWorkingHours);

    onNext();

  }

  return (
    <form className="w-full flex flex-col gap-6 max-h-[900px]">
      <div className="w-full flex flex-col gap-8">
        <div className="text-primText text-base lg:text-2xl font-bold text-start w-full relative flex flex-row justify-between items-center">
          Services & Working Hours
          <span className="absolute -my-2 bottom-0 left-0 w-full h-[1px] bg-[#23314c4c]"></span>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {/* Service Options Section */}
        {currentStep === 1 && (
          <div
            className="flex flex-col w-full gap-5 max-h-[560px] overflow-y-auto custom-scrollbar"
            aria-labelledby="services options"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-sm lg:text-xl font-semibold text-primText">
                What services do you offer?
                <span className="ml-2 font-normal text-xs">
                  Select all that applies
                </span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CheckboxInput
                  id="dine-in-service"
                  label="Dine-In Service"
                  checked={dineIn}
                  onChange={(e) => setDineIn(e.target.checked)}
                />
                <CheckboxInput
                  id="pickup-orders"
                  label="Pickup Orders"
                  checked={pickupOrders}
                  onChange={(e) => setPickupOrders(e.target.checked)}
                />
                <CheckboxInput
                  id="table-reservation"
                  label="Table Reservation"
                  checked={tableReservation}
                  onChange={(e) => setTableReservation(e.target.checked)}
                />
                <CheckboxInput
                  id="food-delivery"
                  label="Food Delivery"
                  checked={foodDelivery}
                  onChange={(e) => setFoodDelivery(e.target.checked)}
                />
              </div>
            </div>

            {/* Conditionally Render Table Reservation Details */}
            {tableReservation && (
              <div className="flex flex-col bg-[#f7f7f7] gap-2 p-6 rounded-lg">
                <h3 className="text-sm lg:text-base font-semibold text-primText">
                  Table Reservation Details
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <TextInput
                    id="min-guests"
                    name="minGuests"
                    placeholder="Min Guests Number"
                    value={minGuests}
                    onChange={(e) => setMinGuests(e.target.value)}
                  />
                  <TextInput
                    id="max-guests"
                    name="maxGuests"
                    placeholder="Max Guests Number"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Conditionally Render Food Delivery Details */}
            {foodDelivery && (
              <div className="flex flex-col bg-[#f7f7f7] gap-4 p-6 rounded-lg">
                <h3 className="text-sm lg:text-base font-semibold text-primText">
                  Food Delivery Details
                </h3>

                <div className="w-full">
                  <TextInput
                    id="min-order-size"
                    name="minOrderSize"
                    placeholder="Min Order Size (KG)"
                    value={minOrderSize}
                    onChange={(e) => setMinOrderSize(e.target.value)}
                  />
                </div>

                {/* Dynamically render the region fee sections */}
                {regionDataFees.map((_, index) => (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2" key={index}>
                    <TextInput
                      id={`new-region-${index}-distance`}
                      name={`newRegionDistance-${index}`}
                      placeholder="Delivery Distance (KM)"
                      value={regionDataFees[index].distance}
                      onChange={(e) =>
                        handleRegionFeeChange(index, "distance", e.target.value)
                      }
                    />
                    <TextInput
                      id={`new-region-${index}-fees`}
                      name={`newRegionFees-${index}`}
                      placeholder="Delivery Fees"
                      value={regionDataFees[index].fees}
                      onChange={(e) =>
                        handleRegionFeeChange(index, "fees", e.target.value)
                      }
                    />
                  </div>
                ))}

                <button
                  onClick={(e) => addRegionFee(e)}
                  className="h-6 flex items-center justify-start gap-2 py-2 text-lg font-semibold text-PrimBtn"
                >
                  <span className="h-full flex items-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.00033 0.666626C4.39783 0.666626 0.666992 4.39746 0.666992 8.99996C0.666992 13.6025 4.39783 17.3333 9.00033 17.3333C13.6028 17.3333 17.3337 13.6025 17.3337 8.99996C17.3337 4.39746 13.6028 0.666626 9.00033 0.666626ZM13.167 9.83329H9.83366V13.1666H8.16699V9.83329H4.83366V8.16663H8.16699V4.83329H9.83366V8.16663H13.167V9.83329Z"
                        fill="#B0438A"
                      />
                    </svg>
                  </span>
                  Add New Region Fees
                </button>
              </div>
            )}
          </div>
        )}

        {/* Working Hours Section */}
        {currentStep === 2 && (
          <div
            className="flex flex-col w-full gap-5 max-h-[560px] overflow-y-auto custom-scrollbar"
            aria-labelledby="services hours"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-sm lg:text-xl font-semibold text-primText">
                When is your branch working?
                <span className="ml-2 font-normal text-xs">
                  (Working 24/7 by default)
                </span>
              </h3>

              <div className="flex flex-col p-4 bg-[#f7f7f7f7] gap-2 max-h-[440px] custom-scrollbar">
                {weekWorkingHours.map((data) => (
                  <TimePicker
                    key={data.day}
                    day={data.day}
                    isActive={data.isActive}
                    fromHour={data.fromHour}
                    fromMinute={data.fromMinute}
                    toHour={data.toHour}
                    toMinute={data.toMinute}
                    onTimeChange={handleTimeChange}
                    onCheckboxChange={handleCheckboxChange}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {currentStep > 1 && (
        <button
          type="button"
          onClick={(e) => handlePrevious(e)}
          className="bg-white text-PrimBtn font-medium text-sm lg:text-base flex items-center gap-2"
        >
          <span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3 lg:w-4 lg:h-4"
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

      {/* Buttons */}
      {currentStep < totalSteps ? (
        <button
          onClick={handleNextClick}
          className="w-full bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg"
        >
          Next
        </button>
      ) : (
        <div className="w-full flex flex-col lg:flex-row gap-4">
          <button className="w-full lg:w-3/5 bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg" onClick={(e)=>handleSaveServiceData(e)}>
            Confirm Services Information
          </button>

          <button className="w-full lg:w-2/5 bg-white text-primText font-normal text-base lg:text-xl h-14 rounded-lg border-solid border-2 border-primText">
            Skip for Now
          </button>
        </div>
      )}
    </form>
  );
}
