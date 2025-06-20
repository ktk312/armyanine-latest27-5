export const BASE_URL = "http://127.0.0.1:3000/api";

export const api_keys = {
  // USER LOGIN
  USER_LOGIN: "login-user",
  CHANGE_PASSWORD: "change-password",

  //Dog API KEY
  GET_DOGS: "dogs-get-all",
  DOGS_FILTER: "dogs-filter",
  ADD_DOG: "dogs-add",
  UPDATE_DOG: "dogs-update",
  DELETE_DOG: "dogs-delete",
  GET_DOG_BY_ID: "dog-get-by-id",
  GET_PARENT: "dog-parent-all",
  GET_DOG_BREEDID: "get-dog-by-breedid",
  GET_SIBLINGS: "dog-siblings-by-id",
  GET_LINEAGE_SIRE: "get-lineage-sire",

  // Microchipp API Keys
  ADD_MICROCHIP: "microchip-add",
  GET_ALL_MICROCHIPS: '/microchip-all',
  GET_ALL_NOT_ASSIGN_MICROCHIPS: '/unassign-microchip-all',
  DELETE_MICROCHIP: "microchip-delete",
  UPDATE_MICROCHIP: "update-microchip",
  // Breed API Keys
  GET_BREEDS: "breeds-get-all",
  ADD_BREED: "breeds-add",
  UPDATE_BREED: "breeds-update",
  DELETE_BREED: "breeds-delete",
  GET_BREED_BY_ID: "breed-get-by-id",

  // Dog Category
  GET_CATEGORY: "category-get-all",
  UPDATE_CATEGORY: "update-dog-category",

  // Get All Country
  CREATE_COUNTRY: "create-country",
  GET_COUNTRY: "country-get-all",
  UPDATE_COUNTRY: `update-country`,

  // Get All Country
  CREATE_CITY: "create-city",
  GET_CITIES: "cities-get-all",
  GET_CITIES_COUNTRY_ID: "cities-by-country-id",
  UPDATE_CITY: "update-city",

  // Get All /api/stud-certificates
  GETALL_STUDCERTIFICATE: "getAll-stud-certificates",
  CREATE_CERTIFICATE: "create-stud-certificates",
  UPDATE_CERTIFICATE: "update-stud-certificates",
  GETONE_CERTIF: "get-one-certificate-by-id",
  DELETE_CERTIF: "get-one-certificate-by-id",

  // Create Litter Inspection
  CREATE_LITTER_INSPECTION: "create_litter-inspection",
  GETALL_LITTER_INSPECTION: "get_all_litter-inspection",
  GETONE_LITTER_INSPECTION: "get_one_litter-inspection",
  UPDATE_LITTER_INSPECTION: "update_litter-inspection",

  // Litter Registration
  CREATE_LITTER_REGISTRATION: "create-litter-registration",
  GET_ALL_REGISTRATION: "get-all-litter-registration",
  GET_ONE_REGISTRATION: "get-one-litter-registration",
  UPDATE_REGISTRATION: "update-litter-registration",

  // Virtual Breeding Checking
  VIRTUAL_BREEDING_CHECKED: "virtual-breeding-check",

  //Dashboard
  DASHBOARD_STATE: "dashboard-statistic",
  DASHBOARD_WHELPING_STATE: "whelping-statistic",

  // List of differemt breed Dog
  GERMANSHEPHERD_LIST: "german-shepherd-list",
  LABRADOR_RETRIEVER: "labrador-retriever-list",
  BELGIAN_MALINOIS: "belgian_malinois-list",
  STANDING_DOG: "standing-dog-list",
  SOLD_DOG: "list-sold-view",
  LOANED_DOG: "loan-dog-list",
  TRANSFERRED_DOGS: "transferred-dog-list",
  BULLDOGS: "bulldogd-list",


  // Medical History of dogs
  // VACCINATION
  ADD_VACCINATION: "add-vaccinations",
  UPDATE_VACCINATION: "update-vaccinations",
  GETALL_VACCINATION: "get-all-vaccinations",
  GETONE_VACCINATION: "get-vaccinations",
  DELETE_VACCINATION: "delete-vaccinations",

  //prophylaxis
  ADD_PROPHYLAXIS: "add-prophylaxis",
  GET_ALL_PROPHYLAXIS: "get-all-prophylaxis",
  UPDATE_PROPHYLAXIS: "update-prophylaxis",
  DELETE_PROPHYLAXIS: "delete-prophylaxis",
  GETONE_PROPHYLAXIS: "get-one-prophylaxis",

  // Dewarning
  GET_ALL_DEWORMING: "get-all-deworming",
  GET_DEWORMING_BY_ID: "get-one-deworming",
  ADD_DEWORMING: "add-deworming",
  UPDATE_DEWORMING: "update-deworming",
  DELETE_DEWORMING: "deete-deworming",

  // training 

  GET_ALL_TRAINING: "get-all-training",
  GET_TRAINING_BY_ID: "get-one-training",
  ADD_TRAINING: "add-training",
  UPDATE_TRAINING: "update-training",
  DELETE_TRAINING: "delete-training",

  // sickness

  GET_ALL_SICKNESS: "get-all-sickness",
  GET_SICKNESS_BY_ID: "get-one-sickness",
  ADD_SICKNESS: "add-sickness",
  UPDATE_SICKNESS: "update-sickness",
  DELETE_SICKNESS: "delete-sickness",
};


export const endpoint = {

  //Dashboard
  DASHBOARD_STATE: `${BASE_URL}/dashboard/state`,
  // SigIn

  USER_LOGIN: `${BASE_URL}/users/login`,
  CHANGE_PASSWORD: `${BASE_URL}/users/change-password`,

  //Dog ENDPIONT
  GET_DOGS: `${BASE_URL}/dog`,
  DOGS_FILTER: (breedId: string, cityId: string) => `${BASE_URL}/dog/filter/view?breedId=${breedId}&cityId=${cityId}`,
  GET_DOG_BY_ID: (id: string) => `${BASE_URL}/dog/${id}`,
  ADD_DOG: `${BASE_URL}/dog`,
  UPDATE_DOG: (id: string) => `${BASE_URL}/dog/${id}`,
  DELETE_DOG: (id: string) => `${BASE_URL}/dog/${id}`,
  GET_DOG_BREEDID: (id: string) => `${BASE_URL}/dog/breed/${id}`,
  GET_PARENT: `${BASE_URL}/dog/parent/all`,
  GET_SIBLINGS: (id: number) => `${BASE_URL}/dog/siblings/${id}`,
  GET_DOGS_COUNT: `${BASE_URL}/dog/totalDogs/count`,
  GET_LINEAGE_SIRE: (id: string) => `${BASE_URL}/line/breeding/${id}`,

  // Microchip Endpoints
  GENERATE_MICROCHIP: `${BASE_URL}/microchip/generate`,
  GET_ALL_MICROCHIPS: `${BASE_URL}/microchip/getall`,
  GET_ALL_NOT_ASSIGN_MICROCHIPS: `${BASE_URL}/microchip/getall/unassign`,
  DELETE_MICROCHIP: (id: string) => `${BASE_URL}/microchip/delete/${id}`,
  UPDATE_MICROCHIP: (id: string) => `${BASE_URL}/microchip/${id}`,
  // Breed Endpoints
  GET_BREEDS: `${BASE_URL}/breeds`,
  GET_BREED_BY_ID: (id: string) => `${BASE_URL}/breeds/${id}`,
  ADD_BREED: `${BASE_URL}/breeds`,
  UPDATE_BREED: (id: string) => `${BASE_URL}/breeds/${id}`,
  DELETE_BREED: (id: string) => `${BASE_URL}/breed/${id}`,

  // Category Endpoints
  GET_CATEGORY: `${BASE_URL}/dog/category/all`,
  ADD_CATEGORY: `${BASE_URL}/dog/create/category`,
  UPDATE_CATEGORY: (id: string) => `${BASE_URL}/dog/update/category/${id}`,

  // GEt All Country
  CREATE_COUNTRY: `${BASE_URL}/country/`,
  GET_COUNTRY: `${BASE_URL}/country/`,
  UPDATE_COUNTRY: (countryId: string) => `${BASE_URL}/country/${countryId}`,

  // GEt All Cities
  CREATE_CITY: `${BASE_URL}/cities/`,
  GET_CITIES: `${BASE_URL}/cities`,
  GET_CITIES_COUNTRY_ID: (countryId: string) => `${BASE_URL}/cities/get/dropdown/${countryId}`,
  UPDATE_CITY: (cityId: string) => `${BASE_URL}/cities/${cityId}`,

  //Get All Stud Certificate
  GETALL_CERTIFICATE: `${BASE_URL}/stud-certificates`,
  CREATE_CERTIFICATE: `${BASE_URL}/stud-certificates`,
  UPDATE_CERTIF: (id: string) => `${BASE_URL}/stude-certificates/${id}`,
  GETONE_CERTIF: (id: string) => `${BASE_URL}/stude-certificates/${id}`,
  DELETE_CERTIF: (id: string) => `${BASE_URL}/stud-certificates/${id}`,

  //Litter Inspection
  CREATE_LITTER_INSPECTION: `${BASE_URL}/litter`,
  GETALL_LITTER_INSPECTION: `${BASE_URL}/litter/`,
  GETONE_LITTER_INSPECTION: (id: string) => `${BASE_URL}/litter/${id}`,
  UPDATE_LITTER_INSPECTION: (id: string) => `${BASE_URL}/litter/${id}`,

  // Litter Registration
  CREATE_LITTER_REGISTRATION: `${BASE_URL}/litter-detail`,
  GET_ALL_REGISTRATION: `${BASE_URL}/litter-detail`,
  GET_ONE_REGISTRATION: (id: string) => `${BASE_URL}/litter-detail/${id}`,
  UPDATE_REGISTRATION: (id: string) => `${BASE_URL}/litter-detail/${id}`,

  //Virtuall Breeding
  VIRTUAL_BREEDING_CHECKED: `${BASE_URL}/stud-certificates/virtual/breeding`,
  DASHBOARD_WHELPING_STATE: (selectedYear: string) => `${BASE_URL}/dashboard/monthly/whelping/?year=${selectedYear}`,

  // Dog List by Breed
  GERMANSHEPHERD_LIST: `${BASE_URL}/dog/germanshepherd/view`,
  BULLDOGS: `${BASE_URL}/dog/bulldogs/view`,
  LABRADOR_RETRIEVER: `${BASE_URL}/dog/labrador-retriever/view`,
  BELGIAN_MALINOIS: `${BASE_URL}/dog/belgian/view`,
  STANDING_DOG: `${BASE_URL}/dog/standing/view`,
  SOLD_DOG: `${BASE_URL}/dog/list/sold/view`,
  LOANED_DOG: `${BASE_URL}/dog/loan/view`,
  TRANSFERRED_DOGS: `${BASE_URL}/dog/transferred/view`,
  DEAD_DOGS: `${BASE_URL}/dog/dead/view`,


  // Medical Histoy of Dog

  // Vaccination
  ADD_VACCINATION: `${BASE_URL}/vaccinations`,
  UPDATE_VACCINATION: (id: string) => `${BASE_URL}/vaccinations/${id}`,
  GETALL_VACCINATION: `${BASE_URL}/vaccinations`,
  GETONE_VACCINATION: (id: string) => `${BASE_URL}/vaccinations/${id}`,
  DELETE_VACCINATION: (id: string) => `${BASE_URL}/vaccinations/${id}`,

  //prophylaxis
  ADD_PROPHYLAXIS: `${BASE_URL}/prophylaxis`,
  UPDATE_PROPHYLAXIS: (id: string) => `${BASE_URL}/prophylaxis/${id}`,
  GET_ALL_PROPHYLAXIS: `${BASE_URL}/prophylaxis`,
  GETONE_PROPHYLAXIS: (id: string) => `${BASE_URL}/prophylaxis/${id}`,
  DELETE_PROPHYLAXIS: (id: string) => `${BASE_URL}/prophylaxis/${id}`,

  // Dewarming
  ADD_DEWORMING: `${BASE_URL}/deworming`,
  UPDATE_DEWORMING: (id: string) => `${BASE_URL}/deworming/${id}`,
  GET_ALL_DEWORMING: `${BASE_URL}/deworming`,
  GET_DEWORMING_BY_ID: (id: string) => `${BASE_URL}/deworming/${id}`,
  DELETE_DEWORMING: (id: string) => `${BASE_URL}/deworming/${id}`,

  // Training
  ADD_TRAINING: `${BASE_URL}/training`,
  UPDATE_TRAINING: (id: string) => `${BASE_URL}/training/${id}`,
  GET_ALL_TRAINING: `${BASE_URL}/training`,
  GET_TRAINING_BY_ID: (id: string) => `${BASE_URL}/training/${id}`,
  DELETE_TRAINING: (id: string) => `${BASE_URL}/training/${id}`,


  // Sickness

  ADD_SICKNESS: `${BASE_URL}/sickness`,
  UPDATE_SICKNESS: (id: string) => `${BASE_URL}/sickness/${id}`,
  GET_ALL_SICKNESS: `${BASE_URL}/sickness`,
  GET_SICKNESS_BY_ID: (id: string) => `${BASE_URL}/sickness/${id}`,
  DELETE_SICKNESS: (id: string) => `${BASE_URL}/sickness/${id}`,

};
