"use client";

import { useEffect, useState } from "react";

interface ApiResponse {
  success: boolean;
  msg: string;
  rest_id?: string;
}

interface Props {
  onNext: () => void;
  restaurantName: string;
  onChange: (restaurantName: string, restaurantId: string) => void;
}

export default function RestaurantName({
  onNext,
  restaurantName,
  onChange,
}: Props) {
  const [restaurantNameTemp, setRestaurantName] =
    useState<string>(restaurantName);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setRestaurantName(restaurantName);
  }, [restaurantName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setRestaurantName(newName);
    setErrorMessage(null);
  };
  
  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
        
    if (restaurantNameTemp.length <= 0) {
      setErrorMessage("Please Your Restaurant Name.");
      return false;
    }
    
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      restName: restaurantNameTemp,
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
        "https://api.amrk.app/external/addRestaurantName",
        requestOptions
      );

      const result: ApiResponse = await response.json();

      if (response.ok && result.success && result.rest_id) {
        const { rest_id } = result;
        onChange(restaurantNameTemp, rest_id);
        onNext();
      } else {
        if (response.status === 409) {
          setErrorMessage("This restaurant name is already taken. Please choose another.");
        } else {
          console.error("Failed to create restaurant:", result.msg);
        }
      }
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  return (
    <form className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-col gap-10">
        <h1 className="text-primText text-xl lg:text-3xl font-semibold text-center">
          Welcome To Amrk Online
        </h1>

        <div className="w-full flex flex-col justify-start gap-2">
          <label
            htmlFor="restaurant-name"
            className="text-sm lg:text-xl font-medium text-primText"
          >
            Restaurant Name
          </label>
          <input
            type="text"
            name="restaurant-name"
            id="restaurant-name"
            className={`w-full h-12 rounded-xl p-4 border border-solid  ${errorMessage? 'border-red-500' : 'border-[#23314c4c]'} focus:outline-none`}
            placeholder="Enter Here.."
            value={restaurantNameTemp}
            onChange={handleChange}
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>
      </div>

      <button
        className="w-full bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg"
        onClick={handleNext}
        disabled={loading}
      >
        {loading ? "Loading..." : "Continue"}
      </button>
    </form>
  );
}
