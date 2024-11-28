"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import SideBar from "@/src/components/side-bar";
import RestaurantName from "./forms/restaurant-name";
import MobileInput from "./forms/mobile-input";
import MobileOtp from "./forms/mobile-otp";
import BranchInfo from "./forms/branch-info";
import Services from "./forms/services";
import Payment from "./forms/payment";
import Menu from "./forms/menu";
import Publishing from "./forms/publishing";
import Finish from "./forms/finish";
import HeaderMobile from "@/src/components/header-mobile";

export default function RegisterPage() {
  const searchParams = useSearchParams();

  const [restaurantName, setRestaurantName] = useState<string | ''>('');

  useEffect(() => {
    const name = searchParams.get("restaurantName");
    if (name) {
      setRestaurantName(name);  // Set the restaurant name from query param
    }
    console.log(name);
  }, [searchParams]);


  const updateRestaurantName = (restaurantName: string) => {
    setRestaurantName(restaurantName);
  }

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 9;

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
    <HeaderMobile />
    <div className="flex flex-row w-full h-[100vh]">
      <SideBar />

      <div className="w-full lg:w-4/5 flex items-center justify-center p-7 overflow-y-auto custom-scrollbar">
        <div className="w-full lg:w-[70%] max-w-[770px] p-6 lg:p-7 rounded-2xl nav-card gap-3 flex flex-col lg:px-12 mt-8 lg:mt-24">
          {currentStep > 1 && (
            <button
              className="flex w-28 text-PrimBtn font-bold text-sm lg:text-base justify-start items-center gap-4"
              onClick={(e) => handlePreviousStep(e)}
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
              <p>Previous</p>
            </button>
          )}

          {currentStep === 1 && <RestaurantName onNext={handleNextStep} restaurantName={restaurantName} onChange={updateRestaurantName}/>}
          {currentStep === 2 && <MobileInput onNext={handleNextStep} />}
          {currentStep === 3 && <MobileOtp onNext={handleNextStep} />}
          {currentStep === 4 && <BranchInfo onNext={handleNextStep} />}
          {currentStep === 5 && <Services onNext={handleNextStep} />}
          {currentStep === 6 && <Payment onNext={handleNextStep} />}
          {currentStep === 7 && <Menu onNext={handleNextStep} />}
          {currentStep === 8 && <Publishing onNext={handleNextStep} />}
          {currentStep === 9 && <Finish />}

          {currentStep > 1 && (
            <div className="flex flex-col gap-2">
              <div className="mb-1 text-sm font-light flex justify-between">
                <p>Progress</p>
                <p>
                  {currentStep}/{totalSteps}
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-lg h-1.5 mb-4 dark:bg-[#d9d9d9]">
                <div
                  className="bg-PrimBtn h-1.5 rounded-full"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
