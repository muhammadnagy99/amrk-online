import React, { useEffect, useRef, useState } from "react";

interface UploadFileProps {
  onFileChange: (file: File | null) => void;
  fileName?: string;
  filePreviewState: string | null;
}

const UploadFile: React.FC<UploadFileProps> = ({
  onFileChange,
  fileName,
  filePreviewState,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filePreview, setFilePreview] = useState<string | null>(
    filePreviewState
  );

  useEffect(() => {
    setFilePreview(filePreviewState);
  }, [filePreviewState]);

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      onFileChange(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Upload Item Image <span className="text-gray-500">(Optional)</span>
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
          className="flex-grow cursor-pointer text-gray-400 text-xs lg:text-sm flex justify-center items-center h-10"
        >
          {fileName ? fileName : "Drag and drop file here"}
        </label>
        <button
          type="button"
          className="ml-4 px-4 py-2 bg-primText text-xs lg:text-sm text-white rounded-md"
          onClick={handleBrowseClick}
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
  );
};

export default UploadFile;
