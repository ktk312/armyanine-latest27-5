import { useEffect, useState } from "react";

const MicrochipTracking = () => {
  const [microchips, setMicrochips] = useState<{ id: string; dogName: string }[]>([]);
  const [newMicrochip, setNewMicrochip] = useState("");
  const [dogName, setDogName] = useState("");

  // Load microchip data from localStorage on mount
  useEffect(() => {
    const savedMicrochips = JSON.parse(localStorage.getItem("microchips") || "[]");
    setMicrochips(savedMicrochips);
  }, []);

  // Save microchip data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("microchips", JSON.stringify(microchips));
  }, [microchips]);

  // Function to add a new microchip
  const addMicrochip = () => {
    if (newMicrochip.trim() === "" || dogName.trim() === "") return;
    setMicrochips((prev) => [...prev, { id: newMicrochip, dogName }]);
    setNewMicrochip("");
    setDogName("");
  };

  // Function to remove a microchip
  const removeMicrochip = (id: string) => {
    setMicrochips((prev) => prev.filter((chip) => chip.id !== id));
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]  text-black dark:text-white max-w-md mx-auto">

      <h2 className="text-xl font-bold mb-2">Microchip Tracking</h2>
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Microchip ID" 
          value={newMicrochip} 
          onChange={(e) => setNewMicrochip(e.target.value)}
          className="border p-2 rounded-md w-full mb-2"
        />
        <input 
          type="text" 
          placeholder="Dog Name" 
          value={dogName} 
          onChange={(e) => setDogName(e.target.value)}
          className="border p-2 rounded-md w-full mb-2"
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          onClick={addMicrochip}
        >
          Add Microchip
        </button>
      </div>
      <ul className="list-disc pl-5 h-60 overflow-auto border p-2 rounded-md">
        {microchips.length === 0 ? (
          <li className="text-gray-500">No microchips recorded</li>
        ) : (
          microchips.map((chip) => (
            <li key={chip.id} className="flex justify-between">
              {chip.dogName} - {chip.id}
              <button 
                className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
                onClick={() => removeMicrochip(chip.id)}
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MicrochipTracking;
