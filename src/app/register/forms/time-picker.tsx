import React from "react";

interface TimePickerProps {
  day: string;
  isActive: boolean;
  fromHour: string;
  fromMinute: string;
  toHour: string;
  toMinute: string;
  onTimeChange: (day: string, field: string, value: string) => void;
  onCheckboxChange: (day: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  day,
  isActive,
  fromHour,
  fromMinute,
  toHour,
  toMinute,
  onTimeChange,
  onCheckboxChange,
}) => {
  return (
    <div className="flex flex-col gap-2 lg:flex-row items-start lg:items-center space-x-4 p-6 border border-dashed rounded-md bg-[#fafafa] justify-between">
      {/* Checkbox and Label */}
      <label className="flex items-center space-x-2 w-1/5">
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => onCheckboxChange(day)}
          className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-gray-800">{day}</span>
      </label>

      {/* Time Range */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center space-x-0 lg:space-x-2 lg:w-4/5 gap-3 lg:gap-6 justify-center">
        {/* From Time */}
        <div className="flex flex-row items-center gap-2 w-full justify-between lg:justify-center">
          <span className="text-base font-normal text-primText">From</span>
          <div className="flex items-center space-x-1">
            <input
              type="number"
              value={fromHour}
              onChange={(e) => onTimeChange(day, "fromHour", e.target.value)}
              placeholder="HH"
              maxLength={2}
              min={0}
              className="w-16 h-8 text-center border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              disabled={!isActive}
            />
            <input
              type="number"
              value={fromMinute}
              onChange={(e) => onTimeChange(day, "fromMinute", e.target.value)}
              placeholder="MM"
              maxLength={2}
              min={0}
              className="w-16 h-8 text-center border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              disabled={!isActive}
            />
          </div>
        </div>

        {/* To Time */}
        <div className="flex flex-row items-center gap-2 w-full justify-between lg:justify-center">
          <span className="text-base font-normal text-primText">To</span>
          <div className="flex items-center space-x-1">
            <input
              type="number"
              value={toHour}
              onChange={(e) => onTimeChange(day, "toHour", e.target.value)}
              placeholder="HH"
              maxLength={2}
              min={0}
              className="w-16 h-8 text-center border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              disabled={!isActive}
            />
            <input
              type="number"
              value={toMinute}
              onChange={(e) => onTimeChange(day, "toMinute", e.target.value)}
              placeholder="MM"
              maxLength={2}
              min={0}
              className="w-16 h-8 text-center border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              disabled={!isActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
