// ExportSection.tsx
import React from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { exportData } from "./api";
import { useDataStore } from "../../store/useDataStore";

const ExportSection: React.FC = () => {
  const { selectedTable, isLoading, setIsLoading } = useDataStore();

  const handleExport = async (table?: string) => {
    setIsLoading(true);
    try {
      await exportData(table);
      toast.success(
        `${table ? `${table} table` : "All tables"} exported successfully`
      );
    } catch (error) {
      toast.error("Export failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800 text-white/90">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Download className="w-5 h-5 mr-2" />
        Export Data
      </h3>
      <div className="space-y-4">
        <button
          onClick={() => handleExport()}
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          Export All Tables (ZIP)
        </button>

        {selectedTable && (
          <button
            onClick={() => handleExport(selectedTable)}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Export {selectedTable} (CSV)
          </button>
        )}
      </div>
    </div>
  );
};

export default ExportSection;
