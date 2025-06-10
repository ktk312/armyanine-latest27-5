import React, { useState } from "react";
import Button from "../ui/button/Button";
import { PlusIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";

const dummyData = [
  {
    age: "3 months",
    vaccine: "Rabies",
    dateDue: "2025-06-10",
    dateGiven: "2025-06-01",
    batchNo: "RB-203",
    vetSign: "Dr. Khan",
  },
  {
    age: "6 months",
    vaccine: "Parvovirus",
    dateDue: "2025-06-15",
    dateGiven: "2025-06-05",
    batchNo: "PV-554",
    vetSign: "Dr. Ayesha",
  },
  {
    age: "3 months",
    vaccine: "Parvovirus",
    dateDue: "2025-06-15",
    dateGiven: "2025-06-05",
    batchNo: "PV-554",
    vetSign: "Dr. Ayesha",
  },

  {
    age: "8 months",
    vaccine: "Parvovirus",
    dateDue: "2025-06-15",
    dateGiven: "2025-06-05",
    batchNo: "PV-554",
    vetSign: "Dr. Ayesha",
  },
  {
    age: "2 months",
    vaccine: "Parvovirus",
    dateDue: "2025-06-15",
    dateGiven: "2025-06-05",
    batchNo: "PV-554",
    vetSign: "Dr. Ayesha",
  },
];
const HEADERS = [
  { key: "age", label: "Age" },
  { key: "vaccine", label: "Vaccine" },
  { key: "dateDue", label: "Date Due" },
  { key: "dateGiven", label: "Date Given" },
  { key: "batchNo", label: "Batch No" },
  { key: "vetSign", label: "Vet Sign" },
];

const VaccinationView = () => {
  const navigate = useNavigate(); 
  const goToNewPage = () => {
    navigate("/create-vaccination-record");
  };
  const [filters, setFilters] = useState({
    age: "",
    vaccine: "",
    dateDue: "",
    dateGiven: "",
    batchNo: "",
    vetSign: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = dummyData.filter((item) =>
    Object.entries(filters).every(([key, value]) =>
      item[key as keyof typeof item]
        ?.toLowerCase()
        .includes(value.toLowerCase())
    )
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
              {HEADERS.map(({ key, label }) => (
                <th
                  key={key}
                  scope="col"
                  className="whitespace-nowrap px-4 py-2 text-left text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 select-none"
                >
                  <div className="flex flex-col gap-1">
                    <span>{label}</span>
                    <input
                      type="text"
                      placeholder={`Search ${label}`}
                      value={filters[key as keyof typeof filters]}
                      onChange={(e) => handleFilterChange(key, e.target.value)}
                      className="w-full rounded-md border border-gray-300 dark:border-white/[0.2] px-2 py-1 text-sm text-gray-800 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                tabIndex={0}
              >
                {HEADERS.map(({ key }) => (
                  <TableCell key={key}>
                    {item[key as keyof typeof item]}
                  </TableCell>
                ))}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={HEADERS.length}
                  className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  No matching records found.
                </td>
              </tr>
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
