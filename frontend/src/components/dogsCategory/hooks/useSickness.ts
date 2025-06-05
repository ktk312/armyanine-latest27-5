import { useCallback } from "react";
import { useSicknessStore } from "../../../store/sicknessStore";
import { SicknessInput } from "../types/sickness";

export const useSickness = () => {
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
  } = useSicknessStore();

  const getAllSickness = useCallback(() => fetchAll(), [fetchAll]);
  const getSicknessById = useCallback((id: number) => fetchOne(id), [fetchOne]);
  const createSickness = useCallback(
    (data: Partial<SicknessInput>) => create(data),
    [create]
  );
  const updateSickness = useCallback(
    (id: number, data: Partial<SicknessInput>) => update(id, data),
    [update]
  );
  const deleteSickness = useCallback((id: number) => remove(id), [remove]);
  const selectSickness = useCallback(
    (record: typeof selected | null) => setSelected(record),
    [setSelected]
  );

  return {
    sicknessRecords: records,
    selectedSickness: selected,
    isLoading: loading,
    error,
    getAllSickness,
    getSicknessById,
    createSickness,
    updateSickness,
    deleteSickness,
    selectSickness,
  };
};
