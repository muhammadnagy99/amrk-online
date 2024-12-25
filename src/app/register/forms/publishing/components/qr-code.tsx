import { QRCodeCanvas } from "qrcode.react";
import { forwardRef, useImperativeHandle, useRef } from "react";

interface Props {
  value: string;
  size?: number;
  logoUrl?: string; 
  logoSizeRatio?: number; 
  excavate?: boolean; 
  title?: string;
}

export type QRRef = {
  download: () => void;
};


const QrCode = forwardRef<QRRef, Props>(({
  value,
  size = 256,
  logoUrl,
  logoSizeRatio = 0.2,
  excavate = true,
  title
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (canvasRef.current) {
      const qrCanvas = canvasRef.current;

      const padding = 100;
      const whiteCanvas = document.createElement("canvas");
      whiteCanvas.width = size + 2.5 * padding;
      whiteCanvas.height = size + 2.5 * padding;
      const ctx = whiteCanvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, whiteCanvas.width, whiteCanvas.height);

        ctx.drawImage(qrCanvas, padding, padding);

        const link = document.createElement("a");
        link.download = `${title}.jpg`;
        link.href = whiteCanvas.toDataURL("image/jpeg");
        link.click();
      }
    }
  };

  const download = () => {
    if (canvasRef.current) {
      const qrCanvas = canvasRef.current;

      const padding = 100;
      const whiteCanvas = document.createElement("canvas");
      whiteCanvas.width = size + 2.5 * padding;
      whiteCanvas.height = size + 2.5 * padding;
      const ctx = whiteCanvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, whiteCanvas.width, whiteCanvas.height);

        ctx.drawImage(qrCanvas, padding, padding);

        const link = document.createElement("a");
        link.download = `${title}.jpg`;
        link.href = whiteCanvas.toDataURL("image/jpeg");
        link.click();
      }
    }
  };

  useImperativeHandle(ref, () => ({
    download,
  }));

  const logoSize = size * logoSizeRatio;

  return (
    <div className="flex flex-row items-center justify-between">
      {/* QR Code */}
        <QRCodeCanvas
          value={value}
          size={size}
          imageSettings={
            logoUrl
              ? {
                  src: logoUrl,
                  height: logoSize,
                  width: logoSize,
                  excavate: excavate,
                }
              : undefined
          }
          ref={canvasRef}
        />

      <button
        onClick={handleDownload}
        className="border-2 border-solid border-PrimBtn text-PrimBtn text-sm font-bold h-10 flex flex-row items-center px-3 rounded-lg"
      >
        Download QR
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM4 20V15H6V18H18V15H20V20H4Z"
            fill="#B0438A"
          />
        </svg>
      </button>
    </div>
  );
});

export default QrCode;
