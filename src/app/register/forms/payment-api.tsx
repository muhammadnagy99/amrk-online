interface Dine {
  isChecked: boolean;
  tips: number[];
  selectedTip: string;
  minTip: number;
}

interface bankData {
  bankHolderName: string;
  bankName: string;
  iban: string;
  vatNumber: string;
  acceptTerms: boolean;
}

export const PaymentAPI = async (
  restuarantId: string,
  branchId: string,
  paymentAccept: boolean,
  dineInData: Dine,
  bankData: bankData
): Promise<boolean> => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const raw = JSON.stringify({
    restId: restuarantId,
    branchId: branchId,
    acceptPayment: paymentAccept,
    acceptDinein: dineInData.isChecked,
    dineinDetails: {
      preferedTips: dineInData.tips,
      defaultTip: Number(dineInData.selectedTip),
      minPercntage: dineInData.minTip,
    },
    legalPaymentInfo: {
      vatNumber: bankData.vatNumber,
      accountHolderName: bankData.bankHolderName,
      bankName: bankData.bankName,
      acceptTerms: bankData.acceptTerms,
    },
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow" as const,
  };

  try {
    const response = await fetch(
      "https://api.amrk.app/external/addPaymentBranch",
      requestOptions
    );

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      return false;
    }

    const result = await response.json();

    if (result && typeof result.success === "boolean") {
      return result.success;
    } else {
      console.error("Unexpected API Response Structure:", result);
      return false;
    }
  } catch (error) {
    return false;
  }
};
