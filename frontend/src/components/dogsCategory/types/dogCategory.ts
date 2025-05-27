// dogCategory.ts

// Full category type (used for reading/fetching)
export interface DogCategory {
  id: number;
  name: string;
}
export interface UpdateDogCategory {
  name: string;
}

// Input type when creating a category (no ID yet)
export type NewDogCategory = Omit<DogCategory, "id">;

export interface CategoryState {
  categories: DogCategory[];
  selectedCategory: DogCategory | null;
  dogLoading: boolean;
  error: string | null;
  getAllDogCategory: () => Promise<DogCategory[]>;
  setSelectedDogcategory: (dog: DogCategory | null) => void;
  addDogCategory: (
    dogCategoryData: NewDogCategory
  ) => Promise<DogCategory | undefined>;

  // updateDogCategory: (
  //   id: number,
  //   categoryData: UpdateDogCategory
  // ) => Promise<UpdateDogCategory | null>;
}
