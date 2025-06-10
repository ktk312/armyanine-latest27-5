import Button from "../ui/button/Button";
import { PlusIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";

const dummyData = [
  {
    date: "2025-06-01",
    drug: "Rabies Vaccine",
    remarks: "First dose given successfully",
  },
  {
    date: "2025-06-05",
    drug: "Parvovirus Vaccine",
    remarks: "No side effects reported",
  },
];

const headers = ["Date", "Prophylactic Drug", "Remarks"];

export default function ProphylaxisView() {
  const navigate = useNavigate();
  const goToNewPage = () => {
    navigate("/create-prophylaxis");
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 shadow-md transition-colors duration-300">
      {/* Header with Title and New Button */}
      <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-semibold tracking-wide">
          Prophylaxis List
        </h2>
        <Button
          size="sm"
          variant="primary"
          endIcon={<PlusIcon className="h-5 w-5" />}
          onClick={goToNewPage}
          className="transition-transform hover:scale-105"
        >
          New
        </Button>
      </div>

      {/* Table Container with horizontal scroll */}
      <div className="max-w-full overflow-x-auto px-6 py-6">
        <table className="w-full text-sm table-auto border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {headers.map((title) => (
                <th
                  key={title}
                  className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 tracking-wide"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, index) => (
              <tr
                key={index}
                className={`transition-colors duration-200 ${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer`}
              >
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                  {item.date}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                  {item.drug}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">
                  {item.remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
