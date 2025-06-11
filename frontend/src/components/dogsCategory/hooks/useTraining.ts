import { useCallback } from "react";
import { useTrainingStore } from "../../../store/trainingStore";
import { TrainingInput } from "../types/training";

export const useTraining = () => {
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
  } = useTrainingStore();

  const getAllTraining = useCallback(() => fetchAll(), [fetchAll]);
  const getTrainingById = useCallback((id: number) => fetchOne(id), [fetchOne]);
  const createTraining = useCallback(
    (data: Partial<TrainingInput>) => create(data),
    [create]
  );
  const updateTraining = useCallback(
    (id: number, data: Partial<TrainingInput>) => update(id, data),
    [update]
  );
  const deleteTraining = useCallback((id: number) => remove(id), [remove]);
  const selectTraining = useCallback(
    (record: typeof selected | null) => setSelected(record),
    [setSelected]
  );
  const setSelectedTraining = useCallback(
    (record: typeof selected | null) => {
      setSelected(record);
    },
    [setSelected]
  );
  return {
    trainingRecords: records,
    selectedTraining: selected,
    isLoading: loading,
    error,
    getAllTraining,//http://localhost:3000/api/training
    getTrainingById,
    createTraining,
    updateTraining,
    deleteTraining,
    setSelectedTraining,
    selectTraining,
  };
};
