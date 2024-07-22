import { useContext } from "react";
import { DSAPracticeListContext } from "../Context/DSAPracticeListContext";

export const useDSAPracticeListContext = () => {
  const context = useContext(DSAPracticeListContext);
  if (context === undefined) {
    throw new Error("useDsaContext must be used within a DsaContextProvider");
  }
  return context;
};
