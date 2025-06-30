
import { useState, useEffect } from "react";
// import { fetchMonthlyWhelpingStats } from "../api/dogsApi";
import { fetchMonthlyDeathsStats } from "../api/dogsApi";

// Import the API function

// Define the type of the monthly data for TypeScript
interface MonthlyDeathData {
    month: string;
    year: number;
    count: number;
}

const useDeaths = (year: string) => {
    const [monthlyDeathsData, setMonthlyDeathsData] = useState<MonthlyDeathData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the data when the component mounts or year changes
        const getData = async () => {
            try {
                // const result = await fetchMonthlyWhelpingStats(year);
                const result = await fetchMonthlyDeathsStats(year);;

                setMonthlyDeathsData(result.data.monthlyData); // Update the state with the response data
            } catch (err) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [year]);

    return { monthlyDeathsData, loading, error };
};

export default useDeaths;
