import TableList from "./components/tables-list";

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

export default function DineInTables({tableRows}: TableLinks) {
  return (
    <div
      className="flex flex-col w-full gap-5 max-h-[560px] overflow-y-auto custom-scrollbar justify-between my-8"
      aria-labelledby="payment information"
    >
      <div className="flex flex-col gap-4 ">
        <h3 className="text-base lg:text-xl font-medium text-primText top-0">
          Manage your tables QR codes & links
        </h3>

        <div
          className={`flex flex-col bg-[#f7f7f7] gap-2 p-6 rounded-lg h-full`}
        >
          <div className="flex flex-col justify-start gap-2">
            <label
              htmlFor="tableNumber"
              className="text-sm lg:text-base font-semibold text-primText"
            >
              Number of your Dine-In tables
            </label>
            <input
              type="number"
              name="tableNumber"
              id="tableNumber"
              min={0}
              className="w-full h-12 rounded-xl p-4 border border-solid border-[#23314c4c] focus:outline-none"
              placeholder="Enter Number Here..."
            />
          </div>
        </div>

        <TableList tableRows={tableRows} />
      </div>
    </div>
  );
}
