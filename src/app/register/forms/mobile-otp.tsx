"use client";
import { useRef, useState } from "react";

interface props {
  rest_mobile: string;
  restaurantId: string;
  onNext: () => void;
}

export default function MobileOtp({
  rest_mobile,
  restaurantId,
  onNext,
}: props) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<number | string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sucessMessage, setSuccessMessage] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState<string>('Verify')

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      if (value && value.length === 1 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      const newOtp = otp.toString().split("");
      newOtp[index] = value;
      setOtp(Number(newOtp.join("")));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    if (otp.toString().length <= 0) {
      setErrorMessage("Please enter the OTP.");
      return;
    }
    
    if (otp.toString().length !== 4) {
      setErrorMessage("Please enter all 4 digits of the OTP.");
      return;
    }
    
    setLoading(true);
    setLoadingMsg('Verifying....')

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      otpCode: otp,
      rest_id: restaurantId,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      mode: "no-cors",
    };

    try {
      const response = await fetch("https://api.amrk.app/external/verifyOTP", requestOptions);
      const result = await response.json();

      if (response.ok) {
        console.log(result);
        onNext();
      } else {
        console.error("Verification failed:", result);
        setErrorMessage("OTP verification failed, please try again.");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setErrorMessage("There was an error while verifying the OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if(loading) return;
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    setLoadingMsg('Sending New OTP...');
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const raw = JSON.stringify({
      mobileNum: rest_mobile,
      rest_id: restaurantId,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
      mode: "no-cors",
    };

    try {
      const response = await fetch(
        "https://api.amrk.app/external/resendOTP",
        requestOptions
      );
      const result = await response.json();

      if (response.ok) {
        console.log(result);
        setLoadingMsg('Verify');
        setSuccessMessage("OTP has been resent! Please check your phone.");
      } else {
        console.error("Resend OTP failed:", result);
        setErrorMessage("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during OTP resend:", error);
      setErrorMessage(
        "There was an error while resending the OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
          <span className="text-PrimBtn font-bold ml-1">{rest_mobile}</span>
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
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        {sucessMessage && <p className="text-green-500 text-sm">{sucessMessage}</p>}
      </div>

      <button
        className="w-full bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg"
        onClick={(e) => handleNext(e)}
        disabled={loading}
      >
        {loadingMsg}
      </button>

      <p className="text-PrimBtn font-light text-sm text-center">
        Didn’t receive code?
        <span
          className="font-bold ml-1 cursor-pointer"
          onClick={handleResendOTP}
        >
          Resend
        </span>
      </p>
    </form>
  );
}
