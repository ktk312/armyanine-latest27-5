
import { useState, useEffect } from "react";
import { fetchMonthlyWhelpingStats } from "../api/dogsApi";
// Import the API function

// Define the type of the monthly data for TypeScript
interface MonthlyData {
    month: string;
    year: number;
    count: number;
}

const useWhelping = (year: string) => {
    const [monthlyData, setMonthlyData] = useState<MonthlyData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the data when the component mounts or year changes
        const getData = async () => {
            try {
                const result = await fetchMonthlyWhelpingStats(year);
                setMonthlyData(result.data.monthlyData); // Update the state with the response data
            } catch (err) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [year]);

    return { monthlyData, loading, error };
};

export default useWhelping;
