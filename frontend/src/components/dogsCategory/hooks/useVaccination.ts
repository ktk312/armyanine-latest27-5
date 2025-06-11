import { useCallback } from "react";
import { useVaccinationStore } from "../../../store/vaccinationStore";
import { VaccinationInput } from "../types/vaccination";

export const useVaccination = () => {
    const {
        records,
        selected,
        loading,
        error,
        fetchAll,
        create,
        update,
        remove,
        setSelected,
    } = useVaccinationStore();

    // Fetch all vaccination records
    const getAllVaccinations = useCallback(async () => {
        await fetchAll();
    }, [fetchAll]);

    // Create new vaccination
    const createVaccination = useCallback(
        async (data: Partial<VaccinationInput>) => {
            await create(data);
        },
        [create]
    );

    // Update existing vaccination
    const updateVaccination = useCallback(
        async (id: string, data: Partial<VaccinationInput>) => {
            console.log("----id and data insde hook are", id, data)
            await update(id, data);
        },
        [update]
    );

    // Delete a vaccination record
    const deleteVaccination = useCallback(async (id: string) => {
        await remove(id);
    }, [remove]);

    // Set selected vaccination for UI detail/edit view
    const selectVaccination = useCallback(
        (record: typeof selected | null) => {
            setSelected(record);
        },
        [setSelected]
    );
  const setSelectedVaccination = useCallback(
        (record: typeof selected | null) => {
            setSelected(record);
        },
        [setSelected]
    );
    return {
        vaccinations: records,
        selectedVaccination: selected,
        isLoading: loading,
        error,

        getAllVaccinations,
        // getVaccinationById,
        createVaccination,
        updateVaccination,
        deleteVaccination,
        selectVaccination,
        setSelectedVaccination
    };
};
