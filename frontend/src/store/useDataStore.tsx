// store.ts
import { create } from "zustand";
// import { TableInfo } from "./types";
import { TableInfo } from "../components/data-mangement/types/types";
interface DataStore {
  tables: TableInfo[];
  selectedTable: string;
  isLoading: boolean;
  setTables: (tables: TableInfo[]) => void;
  setSelectedTable: (table: string) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  tables: [],
  selectedTable: "",
  isLoading: false,
  setTables: (tables) => set({ tables }),
  setSelectedTable: (table) => set({ selectedTable: table }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
