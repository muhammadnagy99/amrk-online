import { useRef, useState } from "react";
import Line from "./line";
import TableRow, { TableRowRef } from "./table-row";
import React from "react";

type TableRowData = {
  tableId: string;
  tableName: string;
  menuLink: string;
  qrSizes: { label: string; value: number }[];
  qrSrcBaseUrl: string;
};

type TableLinks = {
  tableRows: TableRowData[];
};

export default function TableList({ tableRows }: TableLinks) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const rowRefs = useRef<Record<string, React.RefObject<TableRowRef>>>(
    tableRows.reduce(
      (acc, row) => ({
        ...acc,
        [row.tableId]: React.createRef(),
      }),
      {}
    )
  );
  
  // Handle individual row selection
  const handleRowSelection = (tableId: string, isSelected: boolean) => {
    setSelectedRows((prev) =>
      isSelected ? [...prev, tableId] : prev.filter((id) => id !== tableId)
    );
  };

  // Handle "Select All"
  const handleSelectAll = (isSelected: boolean) => {
    setSelectedRows(isSelected ? tableRows.map((row) => row.tableId) : []);
  };

  const handleDownloadSelected = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    selectedRows.forEach((rowId) => {
      const rowRef = rowRefs.current[rowId];
      console.log(rowRef);
      rowRef?.current?.download();
    });
  };
  
  const allSelected = selectedRows.length === tableRows.length;


  return (
    <div className={`flex flex-col bg-[#f7f7f7] gap-4 p-6 rounded-lg h-full`}>
      <div className="flex flex-row items-center justify-between lg:px-4">
        <div className="flex items-center justify-between">
          <input
            id="selectAll"
            type="checkbox"
            className="w-6 h-6 text-PrimBtn bg-gray-100 border-gray-300 rounded focus:[#b0438a] dark:focus:[#b0438a] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={allSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
          <label
            htmlFor="selectAll"
            className="w-4/5 lg:py-4 ms-2 text-sm lg:text-base font-normal text-primText"
          >
            Select all
          </label>
        </div>

        <button
          className="border-2 border-solid border-primText text-primText text-xs lg:text-sm font-bold h-10 flex flex-row items-center px-3 rounded-lg"
          onClick={handleDownloadSelected}
        >
          Download Selected
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00033 10.6666L4.66699 7.33329L5.60033 6.36663L7.33366 8.09996V2.66663H8.66699V8.09996L10.4003 6.36663L11.3337 7.33329L8.00033 10.6666ZM2.66699 13.3333V9.99996H4.00033V12H12.0003V9.99996H13.3337V13.3333H2.66699Z"
              fill="#23314C"
            />
          </svg>
        </button>
      </div>

      <Line />

      <div className="flex flex-col gap-6 px-4">
        {tableRows.map((tableRow, index) => (
          <TableRow
            ref={rowRefs.current[tableRow.tableId]}
            key={index}
            tableId={tableRow.tableId}
            tableName={tableRow.tableName}
            menuLink={tableRow.menuLink}
            qrSizes={tableRow.qrSizes}
            qrSrcBaseUrl={tableRow.qrSrcBaseUrl}
            isSelected={selectedRows.includes(tableRow.tableId)}
            onSelectionChange={handleRowSelection}
          />
        ))}
      </div>
    </div>
  );
}
