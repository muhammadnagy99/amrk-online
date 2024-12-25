"use client";

import React, { useEffect, useState } from "react";
import ProgressBar from "./progress-bar";
import GenerateWebsite from "./publishing/generate-website";
import OnlineLinks, {
  OnlineLinksProps,
  ServiceRowData,
} from "./publishing/online-service-links";
import DineInTables, {
  TableLinks,
  TableRowData,
} from "./publishing/dine-in.table";
import { fetchServiceRows } from "./online-links";
import { fetchAndTransformTables } from "./table-links";

const menuOptions = [{ id: 1, name: "Breakfast", link: "" }];

const qrSizes = [
  { label: "Small", value: 200 },
  { label: "Medium", value: 300 },
  { label: "Large", value: 400 },
];

const qrSrcBaseUrl = "";

const serviceRows = [
  {
    serviceName: "",
    menuOptions,
    qrSizes,
    qrSrcBaseUrl,
  },
  {
    serviceName: "",
    menuOptions,
    qrSizes,
    qrSrcBaseUrl,
  },
];

const testData = [
  {
    tableId: "1",
    tableName: "Table 1",
    menuLink: "",
    qrSizes: [
      { label: "Small", value: 120 },
      { label: "Medium", value: 150 },
      { label: "Large", value: 200 },
    ],
    qrSrcBaseUrl: "/api/qr",
  },
  {
    tableId: "2",
    tableName: "Table 2",
    menuLink: "",
    qrSizes: [
      { label: "Small", value: 120 },
      { label: "Medium", value: 150 },
      { label: "Large", value: 200 },
    ],
    qrSrcBaseUrl: "/api/qr",
  },
  {
    tableId: "3",
    tableName: "Table 3",
    menuLink: "",
    qrSizes: [
      { label: "Small", value: 120 },
      { label: "Medium", value: 150 },
      { label: "Large", value: 200 },
    ],
    qrSrcBaseUrl: "",
  },
];

interface props {
  restaurantId: string;
  branchId: string;
  onNext: () => void;
}

export default function Publishing({ restaurantId, branchId, onNext }: props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const totalSteps = 3;

  const [onlineServicesLinks, setOnlineServicesLinks] =
    useState<ServiceRowData[]>(serviceRows);
  const [tableLinks, setTableLinks] = useState<TableRowData[]>(testData);

  useEffect(() => {
    setError(false);
    const fetchData = async () => {
      try {
        const requestOnlineService = await fetchServiceRows(branchId);

        if (requestOnlineService.success) {
          setOnlineServicesLinks(requestOnlineService.serviceRows);
          console.log(
            "Online Services Links:",
            requestOnlineService.serviceRows
          );
        } else {
          console.error("Error fetching services:", requestOnlineService.error);
        }

        const requestTableLinks = await fetchAndTransformTables(branchId);

        if (requestTableLinks.success) {
          setTableLinks(requestTableLinks.data);
          console.log("Transformed Data:", requestTableLinks.data);
        } else {
          console.error(
            "Error:",
            requestTableLinks.message,
            requestTableLinks.error
          );
        }

        if (requestOnlineService.success && requestTableLinks.success) {
          setLoading(false);
        } else {
          setLoading(false);
          setError(true);
        }
      } catch (error) {
        console.error("Error during data fetch:", error);
        setLoading(false); // Stop loading even if an error occurs
      }
    };

    fetchData();
  }, [branchId]);

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const confirmPublish = () => {
    onNext();
  };

  return (
    <form className="w-full flex flex-col gap-6">
      <div className="w-full flex flex-col gap-5">
        <div className="text-primText text-base lg:text-2xl font-bold text-start w-full relative flex flex-row justify-between items-center">
          Publishing Setup
          <span className="absolute -my-2 bottom-0 left-0 w-full h-[1px] bg-[#23314c4c]"></span>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        {loading && !error && (
          <div className="flex flex-col items-center justify-center h-[200px] md:h-[400px] gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primText"></div>
            <p className="text-center font-medium">
              We are working on your Data.
              <br />
              Please Wait....
            </p>
          </div>
        )}

        {error && (
          <p className="text-center font-medium text-red-500">
           Something went wrong.
            <br />
            Try again later.
          </p>
        )}

        {!loading && !error && currentStep === 1 && (
          <GenerateWebsite branchId={branchId} />
        )}
        {!loading && !error && currentStep === 2 && (
          <OnlineLinks serviceRows={onlineServicesLinks} />
        )}
        {!loading && !error && currentStep === 3 && (
          <DineInTables tableRows={tableLinks} />
        )}

        {!loading && !error && currentStep < totalSteps && (
          <button
            type="button"
            onClick={handleNextStep}
            className="w-full bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg"
          >
            Next
          </button>
        )}

        {!loading && !error && currentStep === totalSteps && (
          <button
            type="button"
            onClick={confirmPublish}
            className="bg-primText text-white text-base lg:text-xl font-bold h-14 rounded-lg"
          >
            Confirm Publishing Setup
          </button>
        )}

        <div className="w-full flex justify-between items-end">
          {!loading && !error && currentStep > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="bg-white text-PrimBtn font-medium text-sm lg:text-base flex items-center gap-2"
            >
              <span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
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

          {!loading && !error && currentStep < totalSteps && (
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-white text-PrimBtn font-medium text-sm lg:text-base flex items-center gap-2"
            >
              Next
              <span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-180"
                >
                  <path
                    d="M15.0004 7.00004H3.83041L8.71041 2.12004C9.10041 1.73004 9.10041 1.09004 8.71041 0.700037C8.6179 0.607333 8.50801 0.533785 8.38704 0.483604C8.26606 0.433422 8.13638 0.407593 8.00541 0.407593C7.87444 0.407593 7.74476 0.433422 7.62379 0.483604C7.50281 0.533785 7.39293 0.607333 7.30041 0.700037L0.710413 7.29004C0.617709 7.38255 0.544162 7.49244 0.49398 7.61341C0.443799 7.73439 0.417969 7.86407 0.417969 7.99504C0.417969 8.12601 0.443799 8.25569 0.49398 8.37666C0.544162 8.49763 0.617709 8.60752 0.710413 8.70004L7.30041 15.29C7.39299 15.3826 7.5029 15.4561 7.62387 15.5062C7.74483 15.5563 7.87448 15.5821 8.00541 15.5821C8.13634 15.5821 8.26599 15.5563 8.38696 15.5062C8.50792 15.4561 8.61783 15.3826 8.71041 15.29C8.80299 15.1975 8.87643 15.0875 8.92654 14.9666C8.97664 14.8456 9.00243 14.716 9.00243 14.585C9.00243 14.4541 8.97664 14.3245 8.92654 14.2035C8.87643 14.0825 8.80299 13.9726 8.71041 13.88L3.83041 9.00004H15.0004C15.5504 9.00004 16.0004 8.55004 16.0004 8.00004C16.0004 7.45004 15.5504 7.00004 15.0004 7.00004Z"
                    fill="#B0438A"
                  />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
