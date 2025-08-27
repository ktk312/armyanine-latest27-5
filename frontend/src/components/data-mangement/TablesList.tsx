// TablesList.tsx
import React from "react";
import { Database, Loader2 } from "lucide-react";
import { useDataStore } from "../../store/useDataStore";

const TablesList: React.FC = () => {
  const { tables, selectedTable, setSelectedTable, isLoading } = useDataStore();

  return (
    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800 text-white/90">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Database className="w-5 h-5 mr-2" />
        Tables ({tables.length})
      </h3>
      <div className="space-y-2 max-h-96 overflow-auto no-scrollbar dark:text-white/90 text-gray-600">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
          onClick={() => setSelectedTable("")}
        >
          Clear Selection
        </button>
        {isLoading && tables.length === 0 ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            Loading tables...
          </div>
        ) : (
          tables.map((table) => (
            <div
              key={table.name}
              className={`p-4 overflow-auto no-scrollbar rounded-lg border cursor-pointer transition-colors dark:bg-gray-900  ${
                selectedTable === table.name
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedTable(table.name)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{table.name}</span>
                <span className="text-sm text-gray-600">
                  {table.error
                    ? "Error"
                    : `${table.count.toLocaleString()} records`}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TablesList;
