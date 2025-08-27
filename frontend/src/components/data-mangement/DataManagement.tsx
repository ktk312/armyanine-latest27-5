import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchTables } from "./api";
import TablesList from "./TablesList";
import ExportSection from "./ExportSection";
import ImportSection from "./ImportSection";
import { useDataStore } from "../../store/useDataStore";

const DataManagement: React.FC = () => {
  const { setTables, setIsLoading } = useDataStore();

  useEffect(() => {
    const loadTables = async () => {
      setIsLoading(true);
      try {
        const tableData = await fetchTables();
        setTables(tableData);
        toast.success("Tables loaded successfully");
      } catch (error) {
        toast.error("Failed to load tables");
      } finally {
        setIsLoading(false);
      }
    };

    loadTables();
  }, [setTables, setIsLoading]);

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white/90 rounded-md">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TablesList />
          <ExportSection />
        </div>

        <div className="mt-6">
          <ImportSection />
        </div>
      </div>

      {/* Toasts */}
    </div>
  );
};

export default DataManagement;
