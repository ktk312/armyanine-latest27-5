import { useEffect } from "react";
import { useCityStore } from "../../../store/citiesStore";
import { City } from "../types/city";

export const useFetchCities = () => {
  const { getAllCity, city, CityLoading, Cityerror, setSelectedCity, selectedCity} = useCityStore();

  useEffect(() => {
    getAllCity();
  }, [getAllCity]);

  return { city, CityLoading, Cityerror,setSelectedCity, selectedCity};
};


export const useAddCity = () => {
  const { addCity, CityLoading, Cityerror } = useCityStore();

  const handleAddCity = async (data: Partial<City>) => {
    await addCity(data);
  };

  return { handleAddCity, CityLoading, Cityerror };
};


export const useFetchCitiesByCountry = (countryId: string) => {
  const { city, CityLoading, Cityerror,getCitiesByCountryId, selectedCity, setSelectedCity } = useCityStore();

  // Fetch cities when countryId changes
  useEffect(() => {
    if (countryId) {
      getCitiesByCountryId(countryId);
    }
  }, [countryId, getCitiesByCountryId]);

  return { city, CityLoading, Cityerror,selectedCity, setSelectedCity };
};

export const useEditCity = () => {
  const { editCity, CityLoading, Cityerror } = useCityStore();

  const handleEditCity = async (id: string, data: Partial<City>) => {
   const response = await editCity(Number(id), data);
   return response;
  };

  return { handleEditCity, CityLoading, Cityerror };
};