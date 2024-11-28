"use client";

import React, { useEffect, useState } from "react";
import Select, { SingleValue, StylesConfig } from "react-select";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import ar from "i18n-iso-countries/langs/ar.json";
import callingCodes from "country-calling-code";

countries.registerLocale(en);
countries.registerLocale(ar);

interface CountryOption {
  value: string;
  label: string;
}

interface props {
  onNext: () => void;
}

const customStyles: StylesConfig<CountryOption, false> = {
  control: (provided) => ({
    ...provided,
    borderRadius: "12px",
    borderColor: "#23314c4d",
    padding: "2px",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#23314c4d",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#F5F5F5" : "#FFFFFF",
    color: state.isSelected ? "#B0438A" : "#333333",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "12px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#333333",
  }),
};

export default function MobileInput({ onNext }: props) {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>({
    value: "SA",
    label: "Saudi Arabia",
  });
  const [phoneNumber, setPhoneNumber] = useState<string>("+966");

  const countryOptions: CountryOption[] = Object.entries(
    countries.getNames("en")
  ).map(([code, name]) => ({
    value: code,
    label: name,
  }));

  const handleCountryChange = (selectedOption: SingleValue<CountryOption>) => {
    if (selectedOption) {
      setSelectedCountry(selectedOption);
      const countryCallingCode = callingCodes.find(
        (entry) => entry.isoCode2 === selectedOption.value
      )?.countryCodes[0];

      if (countryCallingCode) {
        setPhoneNumber(`+${countryCallingCode}`);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const countryCallingCode = callingCodes.find(
      (entry) => entry.isoCode2 === (selectedCountry?.value || "")
    )?.countryCodes[0];
    if (countryCallingCode && !input.startsWith(`+${countryCallingCode}`)) {
      setPhoneNumber(`+${countryCallingCode}`);
    } else {
      setPhoneNumber(input);
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onNext();
  };

  return (
    <form className="w-full flex flex-col gap-8">
      <div className="w-full flex flex-col gap-10">
        <h2 className="text-primText text-sm lg:text-2xl font-bold text-start w-full relative">
          Set Up Your Verification
          <span className="absolute -my-2 bottom-0 left-0 w-full h-[1px] bg-[#23314c4c]"></span>
        </h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm lg:text-xl font-medium text-primText">
            Phone Number
          </label>
          <div className="flex flex-col md:flex-row w-full justify-between gap-2">
            <div className="relative w-full md:w-4/12">
              {
                <Select
                  options={countryOptions}
                  className="basic-single"
                  classNamePrefix="select"
                  id="country"
                  name="country"
                  required
                  isSearchable={true}
                  styles={customStyles}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                />
              }
            </div>
            <input
              className="w-full md:w-8/12 h-[40px] border border-solid border-[#23314c4c] focus:outline-none rounded-[12px] p-2"
              type="tel"
              id="phone"
              name="phone"
              required
              aria-required="true"
              value={phoneNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <button
        className="w-full bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg"
        onClick={(e) => handleNext(e)}
      >
        Send Verification Code
      </button>
    </form>
  );
}
