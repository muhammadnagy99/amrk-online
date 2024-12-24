interface branchData {
  branchNameEn: string;
  branchNameAr: string;
  branchLoc: {
    lat: number;
    lng: number;
  };
}

interface serviceData {
  dineIn: {
    key: boolean;
    data: { tableNumber: string };
  };
  pickupOrders: { key: boolean; data: {} };
  tableReservation: {
    key: boolean;
    data: { minGuests: string; maxGuests: string };
  };
  foodDelivery: {
    key: boolean;
    data: {
      minOrderSize: string;
      regionDataFees: { distance: string; fees: string }[];
    };
  };
}

interface DayWorkingHours {
  day: string;
  isActive: boolean;
  fromHour: string;
  fromMinute: string;
  toHour: string;
  toMinute: string;
}

export const branchDataAPI = async (
  restaurrantId: string,
  branchInfo: branchData,
  servicesData: serviceData,
  weekWorkingHours: DayWorkingHours[]
): Promise<string> => {
  // Transform data into the API payload format
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const payload = {
    rest_id: restaurrantId,
    branchNameEn: branchInfo.branchNameEn,
    branchNameAr: branchInfo.branchNameAr,
    servicesOffered: {
      dininServies: {
        enable: servicesData.dineIn.key,
        tableNumbers: parseInt(servicesData.dineIn.data.tableNumber || "0"),
      },
      pickupServies: servicesData.pickupOrders.key,
      tableReservation: {
        enable: servicesData.tableReservation.key,
        minGuestNumber: parseInt(
          servicesData.tableReservation.data.minGuests || "0"
        ),
        maxGuestNumber: parseInt(
          servicesData.tableReservation.data.maxGuests || "0"
        ),
      },
      foodDelievry: {
        enable: servicesData.foodDelivery.key,
        minOrderSize: parseInt(
          servicesData.foodDelivery.data.minOrderSize || "0"
        ),
        deliveryRanges: servicesData.foodDelivery.data.regionDataFees.map(
          (fee) => ({
            deliveryDistance: parseFloat(fee.distance || "0"),
            deliveryFees: parseFloat(fee.fees || "0"),
          })
        ),
      },
    },
    branchLoc: branchInfo.branchLoc,
    workingHours: weekWorkingHours.map((hour) => ({
      day: hour.day,
      from: `${hour.fromHour}:${hour.fromMinute} ${
        parseInt(hour.fromHour) < 12 ? "AM" : "PM"
      }`,
      to: `${hour.toHour}:${hour.toMinute} ${
        parseInt(hour.toHour) < 12 ? "AM" : "PM"
      }`,
      isClose: !hour.isActive,
    })),
  };

  try {
    console.log("Sending payload:", payload);
    delay(1500);
    return "Hello I am branch Id";
    // Define headers and request options
    // const response = await fetch("https://api.amrk.app/external/addBranch", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });

    // if (!response.ok) {
    //   const errorResponse = await response.json();
    //   console.error("API request failed:", errorResponse);
    //   throw new Error(
    //     `API request failed with status ${response.status}: ${errorResponse.message || "Unknown error"}`
    //   );
    // }

    // const result = await response.json();
    // console.log("Success:", result);

    // if (result.success) {
    //   console.log("Branch ID:", result.branchId);
    //   return result.branchId;
    // } else {
    //   console.error("API Error:", result.msg);
    //   return '';
    // }
  } catch (error) {
    console.error("Error in branchDataAPI:", error);
    throw error; // Ensure the error propagates to be handled upstream
  }
};
