
import { useEffect } from "react";
import { LitterInspection } from "../types/litterInspection";
import { useLitterStore } from "../../../store/litterInspectionStore";

export const useFetchLitterInspection = () => {
  const { fetchLitter, loading, error, setSelectedLitter, selectedLitter, litter } = useLitterStore(); //Fix: Changed isLoading → loading

  useEffect(() => {
    fetchLitter();
  }, [fetchLitter]);

  return { loading, error, litter, setSelectedLitter,selectedLitter, fetchLitter }; //Fix: Return loading, not isLoading
};


export const useCreateLitterInspection = () => {
  const { addLitter, loading, error } = useLitterStore();

  const createLitterInspection = async (litterInspectionData: Partial<LitterInspection>) => {
    const result = await addLitter(litterInspectionData);
    return result;
  };

  return { createLitterInspection, loading, error };
};


export const useUpdateLitterInspection = () => {
    const { editLitter, loading, error } = useLitterStore();
  
    const updateExistingLitterInspection= async (id: number, studCertificationData: Partial<LitterInspection>) => {
      const result = await editLitter(id, studCertificationData);
      return result;
    };
  
    return { updateExistingLitterInspection, loading, error };
  };