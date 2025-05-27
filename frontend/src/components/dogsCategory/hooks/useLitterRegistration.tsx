import { useEffect } from "react";
import { useLitterRegistrationStore } from "../../../store/litterRegistrationStore";
import { LitterRegistration } from "../types/littersRegistration";

export const useFetchLitterRegistration = () => {
  const { fetchAllLitterRegistration, loading, error, setSelectedLitterRegistration, selectedLitterRegistration, litterRegistration } = useLitterRegistrationStore(); //Fix: Changed isLoading → loading

  useEffect(() => {
    fetchAllLitterRegistration();
  }, [fetchAllLitterRegistration]);

  return { loading, error, litterRegistration, setSelectedLitterRegistration,selectedLitterRegistration }; //Fix: Return loading, not isLoading
};


export const useCreateLitterRegistration = () => {
  const { addLitterRegistration, loading, error } = useLitterRegistrationStore();

  const createLitterRegistration = async (litterRegistrationData: Partial<LitterRegistration>) => {
    const result = await addLitterRegistration(litterRegistrationData);
    return result;
  };

  return { createLitterRegistration, loading, error };
};


export const useUpdateLitterregistration = () => {
    const { editLitterRegistration, loading, error } = useLitterRegistrationStore();
  
    const updateExistingLitterregistration= async (id: number, litterRegistrationData: Partial<LitterRegistration>) => {
      const result = await editLitterRegistration(id, litterRegistrationData);
      return result;
    };
  
    return { updateExistingLitterregistration, loading, error };
  };