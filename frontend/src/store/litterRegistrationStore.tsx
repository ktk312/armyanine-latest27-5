import { create } from "zustand";
import { createLitterRegistration, fetchAllLitterRegistration, updateLitterRegistration } from "../../src/components/dogsCategory/api/dogsApi"; // Import API function
import { LitterRegistration, LitterRegistrationStore } from "../components/dogsCategory/types/littersRegistration";

export const useLitterRegistrationStore = create<LitterRegistrationStore>((set) => ({
  litterRegistration: [],
  selectedLitterRegistration: null,
  loading: false,
  error: null,
  // Fetch Dog
  fetchAllLitterRegistration: async () => {
    set({ loading: true, error: null });

    try {
      const litterRegistration = await fetchAllLitterRegistration(); // Use the API function
      set({ litterRegistration, loading: false });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch Litters Detail";
      set({ error: errorMessage, loading: false });
    }
  },

  setSelectedLitterRegistration: (litterRegistration) => set({ selectedLitterRegistration: litterRegistration }),

addLitterRegistration: (litterRegistration) => {
    return (async () => {
      set({ loading: true, error: null });
      try {
        const createdLitterDetail = await createLitterRegistration(litterRegistration);
        set((state) => ({ 
            litterRegistration: [...state.litterRegistration, createdLitterDetail], 
          loading: false, 
          selectedLitterRegistration: null
        }));
        return createdLitterDetail;
      } catch (error) {
        set({ error: "Failed to create Litters Detail", loading: false });
        throw error;
      }
    })();
  },

// fetchLitterRegById: async (id: number) => {
//       set({ loading: true, error: null });
//       try {
//         const stud = await fetchAllLitterRegistration(String(id));
//         set({ litterRegistration: stud, loading: false });
//       } catch (error) {
//         set({ error: "Failed to fetch stud certification", loading: false });
//       }
//     },

  // editLitterRegistration: async (id: number, studCertData: Partial<LitterRegistration>) => {
  //     set({ loading: true, error: null });
  //     try {
  //       const updatedLitterRegistration = await updateLitterRegistration(String(id), studCertData);
  //       set((state) => ({
  //         litterRegistration: state.litterRegistration.map((b) => (b.id === id ? updatedLitterRegistration : b)),
  //         loading: false,
  //         selectedLitterRegistration: null
  //       }));
  //       return updatedLitterRegistration
  //     } catch (error) {
  //       set({ error: "Failed to update stud certification", loading: false });
  //     }
  //   },
    editLitterRegistration: async (
        id: number,
        studCertData: Partial<LitterRegistration>
      ): Promise<LitterRegistration | undefined> => {
        set({ loading: true, error: null });
        try {
          const updatedLitterRegistration = await updateLitterRegistration(String(id), studCertData);
          set((state) => ({
            litterRegistration: state.litterRegistration.map((b) => (b.id === id ? updatedLitterRegistration : b)),
            loading: false,
            selectedLitterRegistration: null,
          }));
          return updatedLitterRegistration;
        } catch (error) {
          set({ error: "Failed to update stud certification", loading: false });
          return undefined;
        }
      },
}));
