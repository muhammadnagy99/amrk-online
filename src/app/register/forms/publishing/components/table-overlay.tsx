import {
  useState,
  SetStateAction,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import Image from "next/image";
import Line from "./line";
import QrCode, { QRRef } from "./qr-code";

type QrSizeOption = {
  label: string;
  value: number;
};

type TableOverlayProps = {
  tableId: string;
  tableName: string;
  menuLink: string;
  qrSizes: QrSizeOption[];
  qrSrcBaseUrl: string;
};

export type TableOverlayRef = {
  download: () => void;
};

const TableOverlay = forwardRef<TableOverlayRef, TableOverlayProps>(
  ({ tableId, tableName, menuLink, qrSizes, qrSrcBaseUrl }, ref) => {
    const [qrSize, setQrSize] = useState(qrSizes[0].value);
    const [qrTitle, setQrTitle] = useState("");
    const [copyMessage, setCopyMessage] = useState<string | null>(null);
    const qrRef = useRef<QRRef>(null);

    const handleQrSizeChange = (event: { target: { value: any } }) => {
      setQrSize(Number(event.target.value));
    };

    const handleTitleChange = (event: {
      target: { value: SetStateAction<string> };
    }) => {
      setQrTitle(event.target.value);
    };

    const qrSrc = `${qrSrcBaseUrl}?size=${qrSize}&title=${encodeURIComponent(
      qrTitle || tableName
    )}`; //here you should specify your qr-links logic

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

    

    // const download = () => {
    //   console.log('hi');
    //   qrRef.current?.download();
    // };

    // useImperativeHandle(ref, () => ({
    //   download,
    // }));

    useImperativeHandle(ref, () => ({
      download: () => {
        console.log(ref);
        qrRef.current?.download();
      },
    }));

    return (
      <div className="flex flex-col gap-4 py-4">
        {/* Menu Selection */}

        {/* Menu Link Display */}
        <div className="flex flex-col gap-4 w-full">
          <label className="text-xl font-semibold text-primText">
            Menu Link
          </label>

          <div className="flex flex-row w-full justify-between py-3 px-5 rounded-lg border-[1px] border-solid border-[#23314c4c]">
            <p className="text-primText text-base font-normal">{menuLink}</p>
            <div className="flex gap-6">
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
            </div>
          </div>
          {copyMessage && (
            <span className="text-green-500 text-sm">{copyMessage}</span>
          )}
        </div>

        <Line />

        {/* QR Code Settings */}
        <div className="flex flex-col gap-4 w-full">
          <label className="text-xl font-semibold text-primText">
            QR Code Settings
          </label>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-base font-semibold text-primText">
              QR Code Title
            </label>
            <input
              type="text"
              className="w-full h-12 py-3 px-5 border-[1px] border-solid border-[#23314c4c] rounded-lg"
              placeholder="Enter Title Here..."
              value={qrTitle}
              onChange={handleTitleChange}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-base font-semibold text-primText">
              QR Code Size
            </label>
            <div className="relative">
              <select
                className="block w-full appearance-none border h-12 border-gray-300 rounded-md bg-white px-4 py-2 text-primText text-base focus:ring-2 focus:[#23314c] focus:outline-none hover:bg-gray-100"
                value={qrSize}
                onChange={handleQrSizeChange}
              >
                <option value="">Choose QR Size...</option>
                {qrSizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-PrimBtn"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.707a1 1 0 011.414 0L10 11l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Image Display */}
        <QrCode
          ref={qrRef}
          value={menuLink}
          size={qrSize}
          logoUrl="./logo.png"
          title={`${tableName}-Qr-${
            qrSizes.find((size) => size.value === qrSize)?.label
          }`}
        />
      </div>
    );
  }
);

export default TableOverlay;
