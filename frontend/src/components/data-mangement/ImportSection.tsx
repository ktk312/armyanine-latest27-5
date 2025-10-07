// ImportSection.tsx
import React, { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { importData, importMultipleData, fetchTables } from "./api";
import { useDataStore } from "../../store/useDataStore";

const ImportSection: React.FC = () => {
  const { selectedTable, isLoading, setIsLoading, setTables } = useDataStore();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [importMode, setImportMode] = useState<"single" | "bulk">("single");
  console.log(selectedFiles, "SSSSSSSS");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleImport = async () => {
    if (selectedFiles.length === 0) {
      toast.warning("Please select files to import");
      return;
    }

    if (importMode === "single" && !selectedTable) {
      toast.warning("Please select a table for single import");
      return;
    }

    setIsLoading(true);

    try {
      if (importMode === "single") {
        const result = await importData(selectedFiles[0], selectedTable);
        toast.success(
          `Import completed: ${result.imported || 0} records imported`
        );
      } else {
        const result = await importMultipleData(selectedFiles);
        const successCount = result.results.filter(
          (r: any) => r.status === "success"
        ).length;
        toast.success(
          `Bulk import completed: ${successCount} tables imported successfully`
        );
      }

      setSelectedFiles([]);
      // Refresh tables
      const tableData = await fetchTables();
      setTables(tableData);
    } catch (error) {
      toast.error("Import failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800 dark:text-white/90">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Upload className="w-5 h-5 mr-2" />
        Import Data
      </h3>

      {/* Import Mode */}
      <div className="mb-4">
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="importMode"
              value="single"
              checked={importMode === "single"}
              onChange={(e) =>
                setImportMode(e.target.value as "single" | "bulk")
              }
              className="mr-2"
            />
            Single Table
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="importMode"
              value="bulk"
              checked={importMode === "bulk"}
              onChange={(e) =>
                setImportMode(e.target.value as "single" | "bulk")
              }
              className="mr-2"
            />
            Bulk Import
          </label>
        </div>
      </div>

      {/* File Upload */}
      <div className="mb-4">
        <input
          type="file"
          accept=".csv"
          multiple={importMode === "bulk"}
          onChange={handleFileSelect}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium mb-2">Selected Files:</h4>
          <div className="space-y-1">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="text-sm text-gray-600 p-2 bg-gray-50 rounded"
              >
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Import Button */}
      <button
        onClick={handleImport}
        disabled={
          isLoading ||
          selectedFiles.length === 0 ||
          (importMode === "single" && !selectedTable)
        }
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Upload className="w-4 h-4 mr-2" />
        )}
        Import Data
      </button>

      {/* Help Text */}
      {importMode === "bulk" && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Bulk Import:</strong> File names should match table names
            (e.g., Dog.csv, User.csv)
          </p>
        </div>
      )}
    </div>
  );
};

export default ImportSection;
