import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { PlusIcon } from "../../assets/icons";
import { useVaccination } from "../dogsCategory/hooks/useVaccination";

// const dummyData = [
//   {
//     age: "3 months",
//     vaccine: "Rabies",
//     dateDue: "2025-06-10",
//     dateGiven: "2025-06-01",
//     batchNo: "RB-203",
//     vetSign: "Dr. Khan",
//   },
//   {
//     age: "6 months",
//     vaccine: "Parvovirus",
//     dateDue: "2025-06-15",
//     dateGiven: "2025-06-05",
//     batchNo: "PV-554",
//     vetSign: "Dr. Ayesha",
//   },
// ];

const goToNewPage = () => {
  // Placeholder for navigation to new vaccination form
};

const TABLE_HEADERS = [
  { label: "Age", key: "age" },
  { label: "Vaccine", key: "vaccine" },
  { label: "Date Due", key: "dateDue" },
  { label: "Date Given", key: "dateGiven" },
  { label: "Batch No", key: "batchNo" },
  { label: "Vet Sign", key: "vetSign" },
];
const VaccinationView = () => {
   const { vaccinations = [], isLoading, error, getAllVaccinations } = useVaccination();


  const [filters, setFilters] = useState<Record<string, string>>({
    age: "",
    vaccine: "",
    dateDue: "",
    dateGiven: "",
    batchNo: "",
    vetSign: "",
  });

  useEffect(() => {
    getAllVaccinations();
  }, [getAllVaccinations]);


  const filteredVaccinations = vaccinations.filter((item) =>
    TABLE_HEADERS.every(({ key }) => {
      const filterVal = filters[key]?.toLowerCase().trim() || "";
      if (!filterVal) return true;

      // Handle missing or undefined keys gracefully
      const itemVal = (item[key as keyof typeof item] ?? "").toString().toLowerCase();
      return itemVal.includes(filterVal);
    })
  );

   

 

  return (
    <section
      aria-labelledby="vaccination-heading"
      className="overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300"
      role="region"
      tabIndex={-1}
    >
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-6 pt-6 text-gray-900 dark:text-gray-100">
        <h2
          id="vaccination-heading"
          className="text-xl font-semibold tracking-tight"
          tabIndex={0}
        >
          Vaccination List
        </h2>
        <Button
          size="sm"
          variant="primary"
          endIcon={<PlusIcon className="h-5 w-5" />}
          onClick={goToNewPage}
          aria-label="Add new vaccination record"
          className="whitespace-nowrap"
        >
          New
        </Button>
      </header>

      <div className="max-w-full overflow-x-auto px-4 sm:px-6 pb-6 pt-4">
        <table
          className="min-w-full border-separate border-spacing-y-2"
          role="table"
          aria-describedby="vaccination-heading"
        >
          <thead>
            <tr>
              {TABLE_HEADERS.map(({ label, key }) => (
                <th
                  key={key}
                  scope="col"
                  className="whitespace-nowrap px-4 py-2 text-left text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 select-none"
                >
                  {label}
                  {/* <input
                      type="text"
                      placeholder={`Search ${label}`}
                      value={filters[key]}
                      onChange={(e) => handleFilterChange(key, e.target.value)}
                      className="mt-1 w-full border rounded-md p-1 text-sm"
                    /> */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredVaccinations.length === 0 ? (
               <tr>
                  <td colSpan={TABLE_HEADERS.length} className="text-center p-4 text-gray-500">
                    No records found.
                  </td>
                </tr>
              ):
              (filteredVaccinations.map((item, index) => (
                 <tr
                key={index}
                className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                tabIndex={0}
              >
                <TableCell>{item?.age.toLocaleString()}</TableCell>
                <TableCell>{item.vaccine}</TableCell>
                <TableCell>{item?.dueDate}</TableCell>
                <TableCell>{item?.batchNo.toLocaleString()}</TableCell>
                <TableCell>{item?.vaccine}</TableCell>
                <TableCell>{item?.vetSign}</TableCell>
              </tr>
              ))
             
              )}
          </tbody>
        </table>
        
      </div>
    </section>
  );
};

const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
    {children}
  </td>
);

export default VaccinationView;



