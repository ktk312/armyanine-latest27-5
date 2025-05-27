import { useEffect, useState } from "react";

const RecycleBin = () => {
  const [deletedItems, setDeletedItems] = useState<string[]>([]);

  // Load deleted items from localStorage on mount
  useEffect(() => {
    const savedDeletedItems = JSON.parse(localStorage.getItem("recycleBin") || "[]");
    setDeletedItems(savedDeletedItems);
  }, []);

  // Save deleted items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("recycleBin", JSON.stringify(deletedItems));
  }, [deletedItems]);

  // Function to add an item to the recycle bin
  const deleteItem = (item: string) => {
    setDeletedItems((prevItems) => [item, ...prevItems]);
  };

  // Function to restore an item
  const restoreItem = (item: string) => {
    setDeletedItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  // Function to empty the recycle bin
  const emptyRecycleBin = () => {
    setDeletedItems([]);
    localStorage.removeItem("recycleBin");
  };

  return (    <div className=" overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]  text-black dark:text-white w-200 ml-90 mt-20">

      <h2 className="text-xl font-bold mb-2">Recycle Bin</h2>
      <button 
        className="bg-red-500 text-white px-4 py-2 rounded-md mb-2"
        onClick={emptyRecycleBin}
      >
        Empty Bin
      </button>
      <ul className="list-disc pl-5 h-60 overflow-auto border p-2 rounded-md">
        {deletedItems.length === 0 ? (
          <li className="text-gray-500">Recycle Bin is empty</li>
        ) : (
          deletedItems.map((item, index) => (
            <li key={index} className="flex justify-between">
              {item}
              <button 
                className="bg-green-500 text-white px-2 py-1 rounded-md ml-2"
                onClick={() => restoreItem(item)}
              >
                Restore
              </button>
            </li>
          ))
        )}
      </ul>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        onClick={() => deleteItem("Sample deleted item")}
      >
        Delete Sample Item
      </button>
    </div>
  );
};

export default RecycleBin;
