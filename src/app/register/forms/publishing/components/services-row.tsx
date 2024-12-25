"use client";

import { useState } from "react";
import Overlay from "../../menu/overlay";
import ServiceOverlay from "./service-overlay";

type MenuOption = {
  id: number;
  name: string;
  link: string;
};

type QrSizeOption = {
  label: string;
  value: number;
};

type ServicesRowProps = {
  serviceName: string;
  menuOptions: MenuOption[];
  qrSizes: QrSizeOption[];
  qrSrcBaseUrl?: string;
};

export default function ServicesRow({
  serviceName,
  menuOptions,
  qrSizes,
  qrSrcBaseUrl,
}: ServicesRowProps) {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  const showOverlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOverlayVisible(true);
  };

  const hideOverlay = () => {
    setOverlayVisible(false);
  };

  const copyToClipboard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(menuOptions[0].link);
      setCopyMessage("Copied!");
      setTimeout(() => setCopyMessage(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <Overlay isVisible={overlayVisible} onClose={hideOverlay}>
        <ServiceOverlay
          serviceName={serviceName}
          menuOptions={menuOptions}
          qrSizes={qrSizes}
          qrSrcBaseUrl={qrSrcBaseUrl}
        />
      </Overlay>

      <div className="flex flex-row w-full justify-between py-4 px-8 rounded-lg border-2 border-solid border-[#23314c4c]">
        <p className="text-primText text-sm lg:text-base font-normal">
          {serviceName} Digital Menu Link
        </p>

        <div className="flex gap-6 items-center">
          <button onClick={(e) => copyToClipboard(e)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 3H4V16"
                stroke="#23314C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 7H20V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H10C9.46957 21 8.96086 20.7893 8.58579 20.4142C8.21071 20.0391 8 19.5304 8 19V7Z"
                stroke="#23314C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button onClick={showOverlay}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 19H6.425L16.2 9.225L14.775 7.8L5 17.575V19ZM3 21V16.75L16.2 3.575C16.4 3.39167 16.621 3.25 16.863 3.15C17.105 3.05 17.359 3 17.625 3C17.891 3 18.1493 3.05 18.4 3.15C18.6507 3.25 18.8673 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.771 5.4 20.863 5.65C20.955 5.9 21.0007 6.15 21 6.4C21 6.66667 20.9543 6.921 20.863 7.163C20.7717 7.405 20.6257 7.62567 20.425 7.825L7.25 21H3ZM15.475 8.525L14.775 7.8L16.2 9.225L15.475 8.525Z"
                fill="#23314C"
              />
            </svg>
          </button>
        </div>
      </div>
      {copyMessage && (
            <span className="text-green-500 text-sm">{copyMessage}</span>
          )}
    </>
  );
}
