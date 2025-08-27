import { useEffect } from "react";
import { useCountryStore } from "../../../store/countryStore";
import { CountryType } from "../types/country";

export const useFetchCountries = () => {
  const {
    getAllCountry,
    country,
    countryLoading,
    Countryerror,
    selectedCountry,
    setSelectedCountry,
  } = useCountryStore();

  useEffect(() => {
    getAllCountry();
  }, [getAllCountry]);

  return {
    country,
    countryLoading,
    Countryerror,
    selectedCountry,
    setSelectedCountry,
  };
};

export const useAddCountry = () => {
  const { addCountry, countryLoading, Countryerror } = useCountryStore();

  const handleAddCountry = async (data: Partial<CountryType>) => {
    await addCountry(data);
  };

  return { handleAddCountry, countryLoading, Countryerror };
};

export const useEditCountry = () => {
  const { editCountry, countryLoading, Countryerror } = useCountryStore();

  const handleEditCountry = async (id: string, data: Partial<CountryType>) => {
    const response = await editCountry(Number(id), data);
    return response;
  };

  return { handleEditCountry, countryLoading, Countryerror };
};

export const useCreateCountries = () => {
  const { createCountries, countryLoading, Countryerror } = useCountryStore();

  useEffect(() => {
    createCountries();
  }, [createCountries]);

  return { countryLoading, Countryerror };
};
