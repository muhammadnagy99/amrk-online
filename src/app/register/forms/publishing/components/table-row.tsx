"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Overlay from "../../menu/overlay";
import TableOverlay, { TableOverlayRef } from "./table-overlay";

type QrSizeOption = {
  label: string;
  value: number;
};

type TableOverlayProps = {
  tableName: string;
  tableId: string;
  menuLink: string;
  qrSizes: QrSizeOption[];
  qrSrcBaseUrl: string;
  isSelected: boolean;
  onSelectionChange: (tableId: string, isSelected: boolean) => void;
};

export type TableRowRef = {
  download: () => void;
};

const TableRow = forwardRef<TableRowRef, TableOverlayProps>(
  (
    {
      tableName,
      tableId,
      menuLink,
      qrSizes,
      qrSrcBaseUrl,
      isSelected,
      onSelectionChange,
    },
    ref
  ) => {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [copyMessage, setCopyMessage] = useState<string | null>(null);

    const tableOverlayRef = useRef<TableOverlayRef>(null);

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
        await navigator.clipboard.writeText(menuLink);
        setCopyMessage("Copied!");
        setTimeout(() => setCopyMessage(null), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onSelectionChange(tableId, e.target.checked);
    };

    useImperativeHandle(ref, () => ({
      download: () => {
          tableOverlayRef.current?.download();
      },
    }));

    return (
      <>
        <Overlay isVisible={overlayVisible} onClose={hideOverlay}>
          <TableOverlay
            ref={tableOverlayRef}
            tableId={tableId}
            tableName={tableName}
            menuLink={menuLink}
            qrSizes={qrSizes}
            qrSrcBaseUrl={qrSrcBaseUrl}
          />
        </Overlay>

        <div style={{ display: "none" }}>
          <TableOverlay
            ref={tableOverlayRef}
            tableId={tableId}
            tableName={tableName}
            menuLink={menuLink}
            qrSizes={qrSizes}
            qrSrcBaseUrl={qrSrcBaseUrl}
          />
        </div>

        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row items-center gap-2">
            <input
              id={`selectTable${tableId}`}
              type="checkbox"
              className="w-4 h-4 text-PrimBtn bg-gray-100 border-gray-300 rounded focus:[#b0438a] dark:focus:[#b0438a] dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              checked={isSelected}
              onChange={handleCheckboxChange}
            />

            <p className="text-sm lg:text-base text-primText font-normal">
              {tableName}
            </p>
          </div>

          <div className="flex gap-6 items-center">
            {copyMessage && (
              <span className="text-green-500 text-sm">{copyMessage}</span>
            )}
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
      </>
    );
  }
);

export default TableRow;
