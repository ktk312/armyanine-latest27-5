import { useEffect } from "react";
import { useStudCertificateStore } from "../../../store/stud-certificate-store";
import { CreateStudCertificateResponse, StudCertificate } from "../types/studCertificate";

export const useFetchStudCertificate = () => {
  const { fetchStudCertificate, loading, error, studCertificate, setSelectedStudCertificate  } = useStudCertificateStore(); //Fix: Changed isLoading → loading

  useEffect(() => {
    fetchStudCertificate();
  }, [fetchStudCertificate]);

  return { loading, error, studCertificate, setSelectedStudCertificate }; //Fix: Return loading, not isLoading
};


export const useCreateStudCertificate = () => {
  const { addStudCertificate, loading, error } = useStudCertificateStore();

  const createNewStudCertificate = async (studeCertificateData: Partial<CreateStudCertificateResponse>) => {
    const result = await addStudCertificate(studeCertificateData);
    return result;
  };

  return { createNewStudCertificate, loading, error };
};

export const useUpdateStudCertification = () => {
    const { editStudCertification, loading, error } = useStudCertificateStore();
  
    const updateExistingStudCertification= async (id: number, studCertificationData: Partial<StudCertificate>) => {
      const result = await editStudCertification(id, studCertificationData);
      return result;
    };
  
    return { updateExistingStudCertification, loading, error };
  };

  export const useCheckVirtualbreeding = () => {
    const { addStudCertificate, loading, error } = useStudCertificateStore();
  
    const checkVirtualBreed= async (studCertificationData: Partial<StudCertificate>) => {
      const result = await addStudCertificate(studCertificationData);
      return result;
    };
  
    return { checkVirtualBreed, loading, error };
  };

  // Delete
  export const useDeleteStudCertificate = () => {
    const { deleteStudeCertification, loading, error } = useStudCertificateStore();
  
    const deleteStudCertificate = async (id: string) => {
      try {
        await deleteStudeCertification(Number(id));
      } catch (error) {
        console.error("Error deleting stud certificate:", error);
      }
     
     
      // return result;
    };
  
    return { deleteStudCertificate, loading, error };
  };