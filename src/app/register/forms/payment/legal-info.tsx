import React, { useState } from "react";

interface bankData {
  bankHolderName: string;
  bankName: string;
  iban: string;
  vatNumber: string;
  acceptTerms: boolean;
}

interface props {
  onChange: (data: bankData) => void
}

export default function LegalInfo({ onChange }: props) {
  const [formData, setFormData] = useState({
    bankHolderName: "",
    bankName: "",
    iban: "",
    vatNumber: "",
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onChange(formData);
  };

  return (
    <form
      className="flex flex-col w-full gap-5 overflow-y-auto custom-scrollbar justify-between"
    >
      <h3 className="text-sm lg:text-xl font-semibold text-primText top-0">
        Enter your legal payment information
      </h3>

      <div className="flex flex-col bg-[#f7f7f7] gap-2 p-6 rounded-lg">
        <div className="w-full flex flex-col justify-start gap-2">
          <label
            htmlFor="bankHolderName"
            className="text-sm lg:text-base font-medium text-primText"
          >
            Bank Account Holder Name
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="bankHolderName"
            id="bankHolderName"
            value={formData.bankHolderName}
            onChange={handleChange}
            className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
            placeholder="Enter Full Name"
          />
        </div>

        <div className="w-full flex flex-col justify-start gap-2">
          <label
            htmlFor="bankName"
            className="text-sm lg:text-base font-medium text-primText"
          >
            Bank Name
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="bankName"
            id="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
            placeholder="Enter Bank Name"
          />
        </div>

        <div className="w-full flex flex-col justify-start gap-2">
          <label htmlFor="iban" className="text-sm lg:text-base font-medium text-primText">
            Account IBAN
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="iban"
            id="iban"
            value={formData.iban}
            onChange={handleChange}
            className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
            placeholder="Enter IBAN"
          />
        </div>

        <div className="w-full flex flex-col justify-start gap-2">
          <label
            htmlFor="vatNumber"
            className="text-sm lg:text-base font-medium text-primText"
          >
            VAT Governmental Registration Number
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="vatNumber"
            id="vatNumber"
            value={formData.vatNumber}
            onChange={handleChange}
            className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
            placeholder="Enter VAT Number"
          />
        </div>
      </div>

      <p className="flex flex-row items-center font-light text-xs lg:text-sm text-PrimBtn gap-2">
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
        Online payments will be settled once every week, then transferred to
        your bank account.
      </p>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="acceptTerms"
          id="terms"
          checked={formData.acceptTerms}
          onChange={handleChange}
          className="lg:w-5 lg:h-5 w-3 h-3 border-gray-300 rounded text-primText focus:to-blue-950"
        />
        <label htmlFor="terms" className="text-primText font-medium text-sm lg:text-base">
          Accept payment
          <a
            href="#"
            className="text-primText ml-1 underline hover:no-underline"
          >
            terms & conditions
          </a>
        </label>
      </div>
      <button
        type="button"
        className="w-full bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg"
        onClick={handleSubmit}
      >
        Confirm Payment Information
      </button>
    </form>
  );
}
