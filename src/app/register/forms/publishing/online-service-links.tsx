'use client';

import React from "react";
import ServicesRow from "./components/services-row";

type ServiceRowData = {
  serviceName: string;
  menuOptions: { id: number; name: string; link: string }[];
  qrSizes: { label: string; value: number }[];
  qrSrcBaseUrl: string;
};

type OnlineLinksProps = {
  serviceRows: ServiceRowData[]; 
};

export default function OnlineLinks({ serviceRows }: OnlineLinksProps) {
  return (
    <>
      <div
        className="flex flex-col w-full gap-5 max-h-[560px] overflow-y-auto custom-scrollbar justify-between my-8"
        aria-labelledby="payment information"
      >
        <div className="flex flex-row gap-2 justify-between">
          <h3 className="text-base lg:text-xl font-medium text-primText top-0">
            Manage your online services links
          </h3>
        </div>

        <div className="flex flex-col gap-4 rounded-lg h-full w-full">
          {serviceRows.map((serviceRow, index) => (
            <ServicesRow
              key={index}
              serviceName={serviceRow.serviceName}
              menuOptions={serviceRow.menuOptions}
              qrSizes={serviceRow.qrSizes}
              qrSrcBaseUrl={serviceRow.qrSrcBaseUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}
