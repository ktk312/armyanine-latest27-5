import { create } from "zustand";
import { checkVirtualBreed, createStudCertification, deletedStude, fetchAllStudCertificate, fetchStudCertificateById, updateStudCertificate } from "../../src/components/dogsCategory/api/dogsApi"; // Import API function
import { CheckBreeding, StudCertificate, StudCertificateStore, VirtualBreed } from "../components/dogsCategory/types/studCertificate";

export const useStudCertificateStore = create<StudCertificateStore>((set) => ({
  studCertificate: [],
  selectedStufCert: null,
  loading: false,
  error: null,
  // Fetch Dog
  fetchStudCertificate: async () => {
    set({ loading: true, error: null });

    try {
      const studCertificate = await fetchAllStudCertificate(); // Use the API function
      set({ studCertificate, loading: false });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch dogs";
      set({ error: errorMessage, loading: false });
    }
  },

  setSelectedStudCertificate: (studCertificate) => set({ selectedStufCert: studCertificate }),

  addStudCertificate: (studCertificate) => {
    return (async () => {
      set({ loading: true, error: null });
      try {
        const newDog = await createStudCertification(studCertificate);
        if ("reasons" in newDog) {
          // If mating is not allowed, return mating not allowed response
          set({ error: newDog.message, loading: false });
          return newDog; // Return the mating not allowed response
        }
        set((state) => ({
          studCertificate: [...state.studCertificate, newDog],
          loading: false,
          selectedStufCert: null,
        }));
        return newDog;
      } catch (error) {
        set({ error: "Failed to create stud certification", loading: false });
        throw error;
      }
    })();
  },

  fetchSelectedStudById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const stud = await fetchStudCertificateById(String(id));
      set({ selectedStufCert: stud, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch stud certification", loading: false });
    }
  },

  editStudCertification: async (
    id: number,
    studCertData: Partial<StudCertificate>
  ): Promise<StudCertificate | undefined> => {
    set({ loading: true, error: null });
    try {
      const updatedStudCert = await updateStudCertificate(String(id), studCertData);
      set((state) => ({
        studCertificate: state.studCertificate.map((b) => (b.id === id ? updatedStudCert : b)),
        loading: false,
        selectedStufCert: null,
      }));
      return updatedStudCert;
    } catch (error) {
      set({ error: "Failed to update stud certification", loading: false });
      return undefined;
    }
  },

  deleteStudeCertification: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await deletedStude(String(id));
  
      set((state) => ({
        studCertificate: state.studCertificate.filter(cert => cert.id !== id),
        selectedStufCert: null,
        loading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete stud certification", loading: false });
    }
  },

  checkVirtualBreed: async (studCertData: VirtualBreed): Promise<CheckBreeding> => {
    set({ loading: true, error: null });
    try {
      const virtualBreedResult = await checkVirtualBreed(studCertData);
      set({ loading: false });
      return virtualBreedResult;
    } catch (error) {
      set({ error: "Failed to check virtual breeding", loading: false });
      throw error; // It's better to throw the error rather than return undefined
    }
  },
}));
