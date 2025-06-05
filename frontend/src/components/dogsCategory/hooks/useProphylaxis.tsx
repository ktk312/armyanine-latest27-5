import { useCallback } from "react";
import { useProphylaxisStore } from "../../../store/prophylaxisStore";
import { ProphylaxisInput } from "../types/prophylaxis";

export const useProphylaxis = () => {
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
  } = useProphylaxisStore();

  const getAllProphylaxis = useCallback(async () => {
    await fetchAll();
  }, [fetchAll]);

//   const getProphylaxisById = useCallback(async (id: number) => {
//     await fetchOne(id);
//   }, [fetchOne]);

  const createProphylaxis = useCallback(
    async (data: Partial<ProphylaxisInput>) => {
      await create(data);
    },
    [create]
  );

  const updateProphylaxis = useCallback(
    async (id: number, data: Partial<ProphylaxisInput>) => {
      await update(id, data);
    },
    [update]
  );

  const deleteProphylaxis = useCallback(async (id: number) => {
    await remove(id);
  }, [remove]);

  const selectProphylaxis = useCallback(
    (record: typeof selected | null) => {
      setSelected(record);
    },
    [setSelected]
  );

  return {
    prophylaxisRecords: records,
    selectedProphylaxis: selected,
    isLoading: loading,
    error,

    getAllProphylaxis,
    // getProphylaxisById,
    createProphylaxis,
    updateProphylaxis,
    deleteProphylaxis,
    selectProphylaxis,
  };
};
