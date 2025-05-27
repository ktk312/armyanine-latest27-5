
export interface CountryType {
    message?: String;
    id?: number;
    idCountry: string;
    countryCode: string;
    countryName: string;
    currencyCode: string;
    continent: string;
}

export interface CountryState {
    country: CountryType[];
    selectedCountry: CountryType | null;
    countryLoading: boolean;
    Countryerror: string | null;
    getAllCountry: () => Promise<CountryType[]>;
    // getCountryById: (id: number) => Promise<void>;
    addCountry: (countryData: Partial<CountryType>) => Promise<void>;
    editCountry: (id: number, CountryData: Partial<CountryType>) => Promise<CountryType | undefined>;
    // removeCountry: (id: number) => Promise<void>;
    setSelectedCountry: (country: CountryType | null) => Promise<void>;

}