import TableList from "./components/tables-list";

export type TableRowData = {
  tableId: string;
  tableName: string;
  menuLink: string;
  qrSizes: { label: string; value: number }[];
  qrSrcBaseUrl: string;
};

export type TableLinks = {
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

        <TableList tableRows={tableRows} />
      </div>
    </div>
  );
}
