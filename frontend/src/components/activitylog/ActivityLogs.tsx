import { useEffect, useState } from "react";

const ActivityLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);

  // Load logs from localStorage on mount
  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem("activityLogs") || "[]");
    setLogs(savedLogs);
  }, []);

  // Save logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("activityLogs", JSON.stringify(logs));
  }, [logs]);

  // Function to add a new log
  const addLog = (message: string) => {
    const newLog = `${new Date().toLocaleString()}: ${message}`;
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  // Function to clear logs
  const clearLogs = () => {
    setLogs([]);
    localStorage.removeItem("activityLogs");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]  text-black dark:text-white w-200 ml-90 mt-20">
      <h2 className="text-xl font-bold mb-2">Activity Log</h2>
      <button 
        className="bg-red-500 text-white px-4 py-2 rounded-md mb-2"
        onClick={clearLogs}
      >
        Clear Log
      </button>
      <ul className="list-disc pl-5 h-60 overflow-auto border p-2 rounded-md">
        {logs.length === 0 ? (
          <li className="text-gray-500">No activity recorded</li>
        ) : (
          logs.map((log, index) => <li key={index}>{log}</li>)
        )}
      </ul>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        onClick={() => addLog("Sample action performed")}
      >
        Add Sample Log
      </button>
    </div>
  );
};

export default ActivityLogs;
