"use client";

import { useState, useRef } from "react";
import MapComponent from "./google-map";

interface branchData {
    branchNameEn: string
    branchNameAr: string
    branchLoc: {
      lat: number;
      lng: number;
    };
}
interface props {
  branchInfo: branchData;
  onNext: () => void;
  onSubmit: (branchInfo: branchData) => void;
}

export default function BranchInfo({ branchInfo, onSubmit, onNext }: props) {
  const [branchNameEn, setBranchNameEn] = useState<string>(branchInfo.branchNameEn);
  const [branchNameAr, setBranchNameAr] = useState<string>(branchInfo.branchNameAr);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploadLabel, setUploadLabel] = useState("Upload Branch Logo");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [lat, setLat] = useState<number>(branchInfo.branchLoc.lat);
  const [lng, setLng] = useState<number>(branchInfo.branchLoc.lng);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setTimeout(() => {
      const formData: branchData = {
        branchNameEn,
        branchNameAr,
        branchLoc: {
          lat: lat,
          lng: lng,
        },
      };
  
      onSubmit(formData);
      onNext();
      setLoading(false);
    }, 1000);
  };

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadLabel(event.target.files[0].name);
      setLogoFile(event.target.files[0]);
      setFilePreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  // Handle browse button click
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAddressSelect = (addressData: { lat: number; lng: number; address: string }) => {
    const { lat, lng } = addressData;
    setLat(lat);
    setLng(lng);
  };


  return (
    <form
      className="w-full flex flex-col gap-4 lg:gap-8"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-col gap-5 lg:gap-10">
        <h2 className="text-primText text-base lg:text-2xl font-bold text-start w-full relative">
          Branch Information
          <span className="ml-2 text-sm lg:text-base font-normal">
            (Can edit / add more branches later)
          </span>
          <span className="absolute -my-2 bottom-0 left-0 w-full h-[1px] bg-[#23314c4c]"></span>
        </h2>

        <div className="flex flex-col w-full gap-5 p-4 h-[450px] overflow-y-auto custom-scrollbar ">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2 flex flex-col justify-start gap-2">
              <label
                htmlFor="branch-name-en"
                className="text-sm lg:text-xl font-semibold text-primText"
              >
                Branch Name En
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="branchNameEn"
                id="branch-name-en"
                className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
                placeholder="Enter Name Here..."
                value={branchNameEn}
                onChange={(e) => setBranchNameEn(e.target.value)}
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-start gap-2">
              <label
                htmlFor="branch-name-ar"
                className="text-sm lg:text-xl font-semibold text-primText"
              >
                Branch Name Ar
                <span className="text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                name="branchNameAr"
                id="branch-name-ar"
                className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
                placeholder="Enter Name Here..."
                value={branchNameAr}
                onChange={(e) => setBranchNameAr(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Upload Branch Logo{" "}
              <span className="text-gray-500">(Optional)</span>
            </label>
            <div className="flex items-center border-2 border-dashed border-gray-300 rounded-lg p-2">
              <input
                type="file"
                ref={fileInputRef}
                className="sr-only"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-upload"
                className="flex-grow cursor-pointer text-gray-400 text-sm flex justify-center items-center h-10"
              >
                {uploadLabel}
              </label>
              <button
                type="button"
                onClick={handleBrowseClick}
                className="ml-4 px-4 py-2 bg-primText text-white rounded-md"
              >
                Browse
              </button>
            </div>
            {filePreview && (
              <div className="w-full flex items-center justify-center">
                <img
                  src={filePreview}
                  alt="File preview"
                  className="max-w-xs rounded-lg"
                />
              </div>
            )}
          </div>

          <div className="w-full flex flex-col justify-start gap-2">
          <label
              htmlFor="branch-address"
              className="text-sm lg:text-xl font-semibold text-primText"
            >
              Pick up your address
              <span className="text-red-500">*</span>
            </label>
            <MapComponent onAddressSelect={handleAddressSelect} currentAddress={branchInfo.branchLoc} />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg"
        disabled={loading}
      >
        {loading? 'Submitting your information… Please wait': 'Confirm Information'}
      </button>
    </form>
  );
}
