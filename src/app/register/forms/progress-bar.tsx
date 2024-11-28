// components/ProgressBar.js
import React from 'react';
interface props {
    currentStep: number;
    totalSteps: number;
}
const ProgressBar = ({ currentStep, totalSteps }: props) => {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

  return (
    <div className="relative flex items-center justify-between w-[100px] lg:w-[200px]">
      <div className="absolute left-0 right-0 h-1 bg-gray-200"></div>
      <div className="flex justify-between w-full relative z-10">
        {steps.map((step) => (
          <div
            key={step}
            className={`w-2 h-2 lg:w-4 lg:h-4 rounded-full flex items-center justify-center text-white 
              ${step <= currentStep ? 'bg-PrimBtn' : 'bg-gray-300'}`}
          >
          </div>
        ))}
      </div>
      <div
        className="absolute left-0 bg-PrimBtn h-1 transition-all"
        style={{
          width: `${(currentStep / totalSteps) * 100}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
