export async function fetchAndTransformTables(branchId: string) {
  const requestOptions: RequestInit = {
    method: "GET",
    mode: "no-cors",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `https://api.amrk.app/external/getTablesList/${branchId}`,
      requestOptions
    );
    const result = await response.json();

    if (result.success) {
      const transformedData = result.table_info.map(
        (table: { tableName: any; menuLink: any }, index: number) => ({
          tableId: (index + 1).toString(),
          tableName: table.tableName,
          menuLink: table.menuLink,
          qrSizes: [
            { label: "Small", value: 120 },
            { label: "Medium", value: 150 },
            { label: "Large", value: 200 },
          ],
          qrSrcBaseUrl: "/api/qr",
        })
      );

      return { success: true, data: transformedData };
    } else {
      return { success: false, message: result.msg };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching data",
      error,
    };
  }
}
