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

    // Fetch a single vaccination record by ID
    //   const getVaccinationById = useCallback(async (id: number) => {
    //     await fetchOne(id);
    //   }, [fetchOne]);

    // Create new vaccination
    const createVaccination = useCallback(
        async (data: Partial<VaccinationInput>) => {
            await create(data);
        },
        [create]
    );

    // Update existing vaccination
    const updateVaccination = useCallback(
        async (id: number, data: Partial<VaccinationInput>) => {
            await update(id, data);
        },
        [update]
    );

    // Delete a vaccination record
    const deleteVaccination = useCallback(async (id: number) => {
        await remove(id);
    }, [remove]);

    // Set selected vaccination for UI detail/edit view
    const selectVaccination = useCallback(
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
    };
};
