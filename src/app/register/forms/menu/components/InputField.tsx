import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  placeholder: string;
  required?: boolean;
  type?: "text" | "number" | "file";
  value: string | number; // Accept value as either string or number for text/number inputs
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange handler to update parent state
}

const InputField: React.FC<InputFieldProps> = ({ label, id, placeholder, required = false, type = "text", value, onChange }) => {
  // Conditional rendering for different input types (file, text, number)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(e); // For file input, pass the whole event to handle the file
    }
  };

  return (
    <div className="flex flex-col justify-start gap-2">
      <label htmlFor={id} className="text-base font-semibold text-primText">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
        placeholder={placeholder}
        value={type !== "file" ? value : undefined} 
        onChange={onChange}
        onInput={type === "file" ? handleFileChange : undefined} 
      />
    </div>
  );
};

export default InputField;
