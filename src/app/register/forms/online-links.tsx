export async function fetchServiceRows(branchId: string) {
    const requestOptions: RequestInit = {
      method: "GET",
      mode: "no-cors",
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        `https://api.amrk.app/external/getMenuLinks/${branchId}`,
        requestOptions
      );
      const result = await response.json();
  
      if (result.success) {
        // Define constants
        const qrSizes = [
          { label: "Small", value: 200 },
          { label: "Medium", value: 300 },
          { label: "Large", value: 400 },
        ];
  
        const qrSrcBaseUrl = "/api/qr";
  
        // Map response to serviceRows
        const serviceRows = result.generatedServiceLinks.map((service: any) => ({
          serviceName: service.serviceName,
          menuOptions: [
            {
              name: service.menuOptions.menuName,
              link: service.menuOptions.menuLink,
            },
          ],
          qrSizes,
          qrSrcBaseUrl,
        }));
  
        return { success: true, serviceRows };
      } else {
        return { success: false, error: result.msg };
      }
    } catch (error) {
      return { success: false };
    }
  }