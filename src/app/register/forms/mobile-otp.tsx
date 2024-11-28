"use client";

import { useRef } from "react";

interface props {
  onNext: () => void;
}

export default function MobileOtp({onNext}: props) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (value && value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      // Move to the previous input
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onNext();
  };

  return (
    <form className="w-full flex flex-col gap-4 lg:gap-8">
      <div className="w-full flex flex-col gap-5 lg:gap-10">
        <h2 className="text-primText text-sm lg:text-2xl font-bold text-start w-full relative">
          Enter Verification Code
          <span className="absolute -my-2 bottom-0 left-0 w-full h-[1px] bg-[#23314c4c]"></span>
        </h2>

        <h3 className="text-primText text-sm lg:text-2xl font-normal text-center">
          We’ve sent a code to
          <span className="text-PrimBtn font-bold ml-1">+966 xxx xxx xxx</span>
        </h3>

        <div className="flex items-center justify-center gap-4">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                className="w-10 h-10 lg:w-14 lg:h-14 text-center text-sm lg:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded-lg p-2 lg:p-4 outline-none focus:bg-white focus:border-indigo-200 focus:ring-2 focus:ring-indigo-100"
                pattern="\d*"
                maxLength={1}
                onInput={(e: React.FormEvent<HTMLInputElement>) =>
                  handleInput(e as React.ChangeEvent<HTMLInputElement>, index)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(e, index)
                }
              />
            ))}
        </div>
      </div>

      <button className="w-full bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg" onClick={(e) => handleNext(e)}>
        Verify
      </button>

      <p className="text-PrimBtn font-light text-sm text-center">  
        Didn’t receive code?
        <span className="font-bold ml-1" onClick={() => {}}>Resend</span> {/**handle the send otp function */}
      </p>
    </form>
  );
}
