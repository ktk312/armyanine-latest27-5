import { create } from "zustand";
import { deleteMicrochip, generateMicrochip, getAllMicrochips, getAllUnassignMicrochips, updateMicrochip } from "../components/dogsCategory/api/dogsApi";
import { Microchip, MicrochipState } from "../components/dogsCategory/types/microchip";

export const useMicrochipStore = create<MicrochipState>((set) => ({
  microchips: [],
  selectedMicrochip: null,
  microchiploading: false,
  error: null,

  addMicrochip: async (chipId: string) => {
    set({ microchiploading: true, error: null });
    try {
      await generateMicrochip(chipId); // no need to store this
      const updatedList = await getAllMicrochips();
      set({
        microchips: updatedList.microchips,
        microchiploading: false,
        selectedMicrochip: null,
      });
    } catch (error) {
      set({ error: "Failed to generate microchip", microchiploading: false });
    }
  },
    editMicrochip: async (
      id: number,
      microchipData: Partial<Microchip>
    ): Promise<Microchip | undefined> => {
      set({ microchiploading: true, error: null });
      try {
        const updatedMicrochip = await updateMicrochip(String(id), microchipData);
        set((state) => ({
          microchips: state.microchips.map((b) => (b.id === id ? updatedMicrochip : b)),
          microchiploading: false,
          selectedCountry: null,
        }));
        return updatedMicrochip;
      } catch (error) {
        set({ error: "Failed to update Country", microchiploading: false });
        return undefined;
      }
    },
  fetchMicrochips: async () => {
    set({ microchiploading: true, error: null });
    try {
      const result = await getAllMicrochips();
      set({
        microchips: result.microchips,
        microchiploading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch microchips", microchiploading: false });
    }
  },

    fetchUnassignMicrochips: async () => {
    set({ microchiploading: true, error: null });
    try {
      const result = await getAllUnassignMicrochips();
      set({
        microchips: result.microchips,
        microchiploading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch microchips", microchiploading: false });
    }
  },

  deleteMicrochipByChipId: async (id: string) => {
    set({ microchiploading: true, error: null });
    try {
      const result = await deleteMicrochip(id);
      set({ microchiploading: false });
      return result;
    } catch (error) {
      set({ error: "Failed to delete microchip", microchiploading: false });
      throw error;  // 👈 important so it never returns undefined
    }
  },
  

  setSelectedMicrochip: (Microchip) => set({ selectedMicrochip: Microchip }),
}));
