import { useCallback } from "react";
import { useDewormingStore } from "../../../store/dewormingStore";
import { DewormingInput } from "../types/deworming";

export const useDeworming = () => {
  const {
    records,
    selected,
    loading,
    error,
    fetchAll,
    fetchOne,
    create,
    update,
    remove,
    setSelected,
  } = useDewormingStore();

  const getAllDeworming = useCallback(() => fetchAll(), [fetchAll]);

  const getDewormingById = useCallback((id: number) => fetchOne(id), [fetchOne]);

  const createDeworming = useCallback(
    (data: Partial<DewormingInput>) => create(data),
    [create]
  );

  const updateDeworming = useCallback(
    (id: number, data: Partial<DewormingInput>) => update(id, data),
    [update]
  );

  const deleteDeworming = useCallback((id: number) => remove(id), [remove]);

  const selectDeworming = useCallback(
    (record: typeof selected | null) => setSelected(record),
    [setSelected]
  );

  return {
    dewormingRecords: records,
    selectedDeworming: selected,
    isLoading: loading,
    error,

    getAllDeworming,
    getDewormingById,
    createDeworming,
    updateDeworming,
    deleteDeworming,
    selectDeworming,
  };
};
