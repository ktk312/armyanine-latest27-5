import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Divider,
  Chip,
  Avatar,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import SelectInputs from "../form/form-elements/components/SelectInputs";
import Input from "../form/input/InputField";
import DogList from "../dogsCategory/DogSiblingsList";
import PedigreeTree from "../dogsCategory/react-tree";
import VirtualBreeding from "../dogsCategory/virtualBreeding";
import Progeny from "../progeny/Progeny";
import { useFilteredDogs } from "../dogsCategory/hooks/useFetchDogs";
import { useBreedStore } from "../../store/breedStore";
import { useFetchCities } from "../dogsCategory/hooks/useCities";
import {
  Pets as PetsIcon,
  ArrowBack as ArrowBackIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  Cake as CakeIcon,
  LocationOn as LocationIcon,
  Flag as FlagIcon,
  Fingerprint as FingerprintIcon,
  Psychology as PsychologyIcon,
  Science as ScienceIcon,
  FamilyRestroom as FamilyIcon,
  AccountTree as PedigreeIcon,
  MedicalServices as Medical,
} from "@mui/icons-material";
import "./styles/DatabaseView.css"; // Import the separated CSS file
import MedicalHistory from "../dogsCategory/MedicalHistory";
import {
  FaCalendarTimes,
  FaRulerHorizontal,
  FaRulerVertical,
  FaSkull,
  FaWeight,
} from "react-icons/fa";

// Custom Material-UI theme
const canineTheme = createTheme({
  palette: {
    primary: { main: "#1b5e20" }, // Military green
    secondary: { main: "#1976d2" }, // Navy blue
    error: { main: "#d32f2f" },
    background: { default: "#f5f7fa", paper: "#ffffff" },
    text: { primary: "#1e293b", secondary: "#4b5563" },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    subtitle1: { fontWeight: 500 },
    body2: { fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "0.5rem 1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

interface MappedDog {
  id: number;
  title: string;
  registrationNumber: string;
  imageUrl: string;
  breed: string;
  country: string;
  location: string;
  sex: string;
  microchip: string | null;
  birthDate: string;
  sire: string;
  dam: string;
  isDeath: boolean;
  deathDate: string;
  category: string;
  chestDepth: string;
  chestCircumference: string;
  achievements: string;
  weight: string;
  city: string;
  virtuesAndFaults: string;
  breedingAdvice: string;
  miscellaneousComments: string;
  progenyTrainability: string;
}

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  bgColor?: string;
}) => (
  <Box className="flex items-center gap-2 mb-3 animate-fade-in dark:!text-white/90">
    {icon && <Box sx={{ color: "primary.main" }}>{icon}</Box>}
    <Typography
      variant="body2"
      sx={{
        fontWeight: 600,
        color: "text.primary",
        minWidth: { xs: 100, sm: 130 },
        letterSpacing: "0.02em",
      }}
      className="dark:!text-white/90"
    >
      {label}:
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: "text.secondary" }}
      className="dark:!text-white/90"
    >
      {value || "N/A"}
    </Typography>
  </Box>
);

const DatabaseView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedBreed, setSelectedBreed] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [selectedCity, setSelectedCity] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const { dogs, loading, error } = useFilteredDogs(
    selectedBreed?.value || "",
    selectedCity?.value || ""
  );
  const [selectedDog, setSelectedDog] = useState<null | MappedDog>(null);
  const [selectedSection, setSelectedSection] = useState("Basic Data");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const navItems = [
    { name: "Basic Data", icon: <PetsIcon /> },
    { name: "Pedigree", icon: <PedigreeIcon /> },
    { name: "Siblings", icon: <FamilyIcon /> },
    { name: "Progeny", icon: <PsychologyIcon /> },
    { name: "Virtual Breeding", icon: <ScienceIcon /> },
    { name: "Medical History", icon: <Medical /> },
  ];

  const mappedDogs: MappedDog[] = dogs.map((dog) => ({
    id: dog.id || 0,
    title: `${dog.showTitle ? dog.showTitle + " " : ""}${
      dog.dogName || "Unknown"
    }`,
    registrationNumber: dog.KP || "N/A",
    imageUrl: dog.friendlyUrl ? `http://localhost:3000${dog.friendlyUrl}` : "",
    breed: dog.breed?.breed || "Unknown",
    country: dog.country?.countryName || "Unknown",
    city: dog.city?.city || "Unknown",
    location: dog.location || "Unknown",
    sex: dog.sex || "Unknown",
    microchip: dog.microchip?.chipId || null,
    birthDate: dog.dob || "",
    sire: dog.sire?.dogName || "Unknown",
    dam: dog.dam?.dogName || "Unknown",
    isDeath: dog.isDeath || false,
    deathDate: dog.deathDate || "",
    category: dog.category?.name.toUpperCase() || "",
    chestDepth: dog.chestDepth || "",
    chestCircumference: dog.chestCircumference || "",
    achievements: dog.achievements || "",
    weight: dog.weight || "",
    virtuesAndFaults: dog.virtuesAndFaults || "",
    breedingAdvice: dog.breedingAdvice || "",
    miscellaneousComments: dog.miscellaneousComments || "",
    progenyTrainability: dog.progenyTrainability || "",
  }));

  const filteredDogs = mappedDogs.filter((dog) => {
    const query = searchQuery.toLowerCase();
    return (
      dog.title.toLowerCase().includes(query) ||
      dog.registrationNumber.toLowerCase().includes(query) ||
      (dog.microchip && dog.microchip.toLowerCase().includes(query)) ||
      (dog.location && dog.location.toLowerCase().includes(query))
    );
  });

  const totalPages = Math.ceil(filteredDogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDogs = filteredDogs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const [searchTerm, setSearchTerm] = useState("");

  const handleBack = () => {
    setSelectedDog(null);
    setSelectedSection("Basic Data");
    setCurrentPage(1);
  };

  const { city, CityLoading } = useFetchCities();
  const [cityOptions, setCityOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (city.length > 0) {
      const uniqueCities = Array.from(
        new Set(city.map((c) => c.id.toString()))
      ).map((id) => ({
        value: id,
        label: city.find((c) => c.id.toString() === id)?.city || "",
      }));
      setCityOptions(uniqueCities);
    }
  }, [city]);

  const { breeds, getAllBreeds, loading: breedLoading } = useBreedStore();
  const [breedOptions, setBreedOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    getAllBreeds();
  }, [getAllBreeds]);

  useEffect(() => {
    if (breeds.length > 0) {
      const uniqueBreeds = Array.from(
        new Set(breeds.map((b) => b.id.toString()))
      ).map((id) => ({
        value: id,
        label: (
          breeds.find((b) => b.id.toString() === id)?.breed ?? ""
        ).replace(/^./, (c) => c.toUpperCase()),
      }));
      setBreedOptions(uniqueBreeds);
    }
  }, [breeds]);

  return (
    <ThemeProvider theme={canineTheme}>
      <div className="database-view dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90">
        {selectedDog && (
          <Button
            className="dark:!bg-gray-800 dark:hover:!bg-gray-700 dark:!text-white dark:hover:!text-white"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{
              mb: 1,
              fontWeight: 600,
              color: "text.secondary",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
              px: { xs: 2, sm: 3 }, // paddingX shorthand
              py: { xs: 1, sm: 1.5 }, // paddingY shorthand
            }}
            aria-label="Back to dog list"
          >
            Back to List
          </Button>
        )}

        {!selectedDog ? (
          <>
            <Box className="text-center mb-10 bg-white/[0.03]">
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
                  color: "text.primary",
                }}
                className="text-gray-500"
              >
                <Box component="span" sx={{ color: "primary.main" }}>
                  Army Canine Centre
                </Box>{" "}
                <span className="dark:text-white/90">Database</span>
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  // color: "text.secondary",
                  mt: 1,
                  fontSize: { xs: "1rem", sm: "1.125rem" },
                }}
                className="dark:text-white/90"
              ></Typography>
            </Box>

            <Box className="filter-section">
              <Box sx={{ flex: 1 }}>
                <SelectInputs
                  title="Select Breed"
                  placeholder={
                    breedLoading ? "Loading breeds..." : "Filter by Breed"
                  }
                  options={breedOptions}
                  value={selectedBreed?.value || ""}
                  onChange={(val) => {
                    setSelectedBreed(val ? { value: val, label: val } : null);
                    setCurrentPage(1);
                  }}
                  className="w-full"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <SelectInputs
                  title="Select City"
                  placeholder={
                    CityLoading ? "Loading cities..." : "Filter by City"
                  }
                  options={cityOptions}
                  value={selectedCity?.value || ""}
                  onChange={(val) => {
                    setSelectedCity(val ? { value: val, label: val } : null);
                    setCurrentPage(1);
                  }}
                  className="w-full"
                />
              </Box>

              <Box
                sx={{ flex: 1, position: "relative" }}
                className="dark:text-white/90"
              >
                <h3>Search Dogs by Name, Location, Microchip</h3>

                <Input
                  type="text"
                  placeholder="Search dogs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 w-full"
                  aria-label="Search dogs"
                />
              </Box>
              <Button
                className="dark:!text-white/90 dark:!border-gray-700 "
                onClick={() => {
                  setSelectedBreed(null);
                  setSelectedCity(null);
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                variant="outlined"
                sx={{
                  mt: { xs: 2, md: 0 },
                  color: "dark:primary.main",
                  borderColor: "primary.main",
                }}
                aria-label="Clear filters"
              >
                Clear Filters
              </Button>
            </Box>

            {error && (
              <Box sx={{ textAlign: "center", color: "error.main", p: 4 }}>
                Error loading dogs:{" "}
                {typeof error === "string"
                  ? error
                  : (error as any)?.message || "Please try again later."}
              </Box>
            )}

            <Box className="dog-grid" aria-live="polite">
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}>
                  <CircularProgress sx={{ color: "primary.main" }} />
                </Box>
              ) : filteredDogs.length === 0 ? (
                <Box
                  sx={{ textAlign: "center", color: "text.secondary", p: 6 }}
                >
                  No dogs found matching your criteria.
                </Box>
              ) : (
                currentDogs.map((dog) => (
                  <Card
                    key={dog.id}
                    onClick={() => setSelectedDog(dog)}
                    aria-label={`View details of ${dog.title}`}
                    className="dog-card cursor-pointer rounded-lg bg-white dark:bg-dark-100/[0.03] dark:text-white/90 shadow-md hover:shadow-lg transition duration-200"
                  >
                    <Box className="card-header">
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                        }}
                      >
                        {dog.title}
                      </Typography>
                    </Box>
                    <CardContent className="p-2 bg-white dark:bg-black">
                      <Box className="flex flex-col items-center gap-2">
                        <Avatar
                          src={dog.imageUrl}
                          alt={`${dog.title} picture`}
                          sx={{
                            width: { xs: 140, sm: 160 },
                            height: { xs: 140, sm: 160 },
                            borderRadius: 2,
                            mb: 1,
                          }}
                          variant="rounded"
                          className="avatar-img"
                          imgProps={{ loading: "lazy" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "primary.main",
                            fontWeight: 600,
                            textAlign: "center",
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                          }}
                        >
                          {dog.registrationNumber}
                        </Typography>
                        <Chip
                          label={dog.breed}
                          color="primary"
                          size="small"
                          sx={{
                            fontWeight: "bold",
                            letterSpacing: "0.05em",
                            textTransform: "capitalize",
                            bgcolor: "primary.main",
                            color: "white",
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            mt: 0.5,
                            textAlign: "center",
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          }}
                          className="dark:!text-white"
                        >
                          {dog.location}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          {dog.sex.toLowerCase() === "male" ? (
                            <MaleIcon
                              fontSize="medium"
                              sx={{ color: "secondary.main" }}
                            />
                          ) : dog.sex.toLowerCase() === "female" ? (
                            <FemaleIcon
                              fontSize="medium"
                              sx={{ color: "error.main" }}
                            />
                          ) : null}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>

            {totalPages > 1 && (
              <>
                <Typography className="pagination-info text-black dark:!text-white">
                  Showing {startIndex + 1} -{" "}
                  {Math.min(endIndex, filteredDogs.length)} of{" "}
                  {filteredDogs.length} dogs
                </Typography>
                <Box className="pagination">
                  <Button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
                  >
                    Prev
                  </Button>
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    const isCurrent = page === currentPage;
                    const showPage =
                      totalPages <= 5 ||
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2);
                    if (!showPage) {
                      return index === currentPage - 3 ||
                        index === currentPage + 2 ? (
                        <Button
                          key={page}
                          className="pagination-button"
                          disabled
                          sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
                        >
                          ...
                        </Button>
                      ) : null;
                    }
                    return (
                      <Button
                        key={page}
                        className={`pagination-button ${
                          isCurrent ? "active" : ""
                        }`}
                        onClick={() => handlePageChange(page)}
                        aria-label={`Page ${page}`}
                        aria-current={isCurrent ? "page" : undefined}
                        sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
                      >
                        {page}
                      </Button>
                    );
                  })}
                  <Button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    sx={{ minWidth: { xs: "2rem", sm: "2.5rem" } }}
                  >
                    Next
                  </Button>
                </Box>
              </>
            )}
          </>
        ) : (
          <Box className="bg-white dark:!bg-gray-800 dark:!text-white p-4 rounded-xl shadow-sm w-full max-w-screen-xl mx-auto">
            <Box className="flex flex-col md:flex-row">
              {/* Navigation Left (Sidebar or Tabs) */}
              <Box className="w-full md:w-1/3 lg:w-1/4">
                {isMobile ? (
                  <Tabs
                    orientation="vertical"
                    value={selectedSection}
                    onChange={(_, newValue) => setSelectedSection(newValue)}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="Dog details navigation"
                    sx={{ mb: 3 }}
                  >
                    {navItems.map(({ name, icon }) => (
                      <Tab
                        key={name}
                        label={name}
                        value={name}
                        icon={icon}
                        className={`justify-start ${
                          selectedSection === name
                            ? "text-primary-main dark:!text-white"
                            : "text-gray-500 dark:!text-white/70"
                        }`}
                        iconPosition="start"
                        sx={{ fontWeight: 500, alignItems: "flex-start" }}
                      />
                    ))}
                  </Tabs>
                ) : (
                  <Box className="flex flex-col gap-2">
                    {navItems.map(({ name, icon }) => (
                      <Button
                        key={name}
                        startIcon={icon}
                        onClick={() => setSelectedSection(name)}
                        className={`justify-start ${
                          selectedSection === name
                            ? "text-primary-main dark:!text-white"
                            : "text-gray-500 dark:!text-white/70"
                        }`}
                        sx={{
                          textTransform: "none",
                          fontWeight: 500,
                          fontSize: { sm: "0.95rem", md: "1rem" },
                          justifyContent: "flex-start",
                          color:
                            selectedSection === name
                              ? "primary.main  "
                              : "text.secondary",
                          "&:hover": {
                            color: "primary.main",
                          },
                        }}
                      >
                        {name}
                      </Button>
                    ))}
                  </Box>
                )}
              </Box>

              {/* Content Right */}
              <Box className="w-full md:w-2/3 lg:w-3/4">
                {selectedSection === "Basic Data" && (
                  <Box>
                    <Box className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white dark:!bg-gray-800 mb-4">
                      <Avatar
                        src={selectedDog.imageUrl}
                        alt={`${selectedDog.title} picture`}
                        sx={{
                          width: { xs: 140, sm: 160, md: 200 },
                          height: { xs: 140, sm: 160, md: 200 },
                          borderRadius: 2,
                        }}
                        variant="rounded"
                        className="avatar-img"
                        imgProps={{ loading: "lazy" }}
                      />
                      <Box className="flex-1 dark:!text-white">
                        <Typography
                          variant="h4"
                          sx={{
                            mb: 1,
                            fontSize: {
                              xs: "1.5rem",
                              sm: "2rem",
                              md: "2.5rem",
                            },
                            color: "primary.main",
                          }}
                          className="dark:!text-white/90"
                        >
                          {selectedDog.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: "text.secondary",
                            mb: 2,
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                          }}
                          className="dark:!text-white/90"
                        >
                          Reg #: {selectedDog.registrationNumber}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                            fontWeight: 500,
                          }}
                          className="dark:!text-white/90"
                        >
                          {selectedDog.sex.toLowerCase() === "male" ? (
                            <MaleIcon
                              color="secondary"
                              sx={{ verticalAlign: "middle", mr: 0.5 }}
                            />
                          ) : selectedDog.sex.toLowerCase() === "female" ? (
                            <FemaleIcon
                              color="error"
                              sx={{ verticalAlign: "middle", mr: 0.5 }}
                            />
                          ) : null}
                          <strong className="dark:!text-white/90">Sex:</strong>{" "}
                          {selectedDog.sex}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider
                      sx={{ mb: 4, borderColor: "rgba(0, 0, 0, 0.1)" }}
                    />
                    <Box className="details-container">
                      {/* Two-column section: Items WITH icons */}
                      <div className="grid md:grid-cols-1 sm:grid-cols-2">
                        <DetailItem
                          icon={<CakeIcon />}
                          label="Birth Date"
                          value={
                            selectedDog.birthDate
                              ? new Date(
                                  selectedDog.birthDate
                                ).toLocaleDateString(undefined, {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "N/A"
                          }
                        />
                        <DetailItem
                          icon={<LocationIcon />}
                          label="Location"
                          value={selectedDog.location}
                        />
                        <DetailItem
                          icon={<FlagIcon />}
                          label="City"
                          value={selectedDog.city}
                        />
                        <DetailItem
                          icon={<FlagIcon />}
                          label="Country"
                          value={selectedDog.country}
                        />
                        <DetailItem
                          icon={<FingerprintIcon />}
                          label="Microchip"
                          value={selectedDog.microchip ?? "N/A"}
                        />
                        <DetailItem
                          icon={<FamilyIcon />}
                          label="Sire"
                          value={selectedDog.sire}
                        />
                        <DetailItem
                          icon={<FamilyIcon />}
                          label="Dam"
                          value={selectedDog.dam}
                        />
                        <DetailItem
                          icon={<FaSkull />}
                          label="Is Deceased"
                          value={selectedDog.isDeath ? "Yes" : "No"}
                        />
                        {selectedDog.isDeath && (
                          <DetailItem
                            label="Death Date"
                            icon={<FaCalendarTimes />}
                            value={
                              selectedDog.deathDate
                                ? new Date(
                                    selectedDog.deathDate
                                  ).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })
                                : "N/A"
                            }
                          />
                        )}
                        <DetailItem
                          icon={<FlagIcon />}
                          label="Category"
                          value={selectedDog.category}
                        />
                        <DetailItem
                          icon={<FaRulerVertical />}
                          label="Chest Depth"
                          value={selectedDog.chestDepth}
                        />
                        <DetailItem
                          icon={<FaRulerHorizontal />}
                          label="Chest Circumference"
                          value={selectedDog.chestCircumference}
                        />
                        <DetailItem
                          icon={<FaWeight />}
                          label="Weight"
                          value={selectedDog.weight}
                        />
                      </div>

                      {/* One-column section: Items WITHOUT icons */}
                      <div className="flex flex-col gap-4">
                        <DetailItem
                          label="Field Achievements"
                          bgColor="#f5f5f5"
                          value={selectedDog.achievements}
                        />
                        <DetailItem
                          label="Virtues and Faults"
                          value={selectedDog.virtuesAndFaults}
                        />
                        <DetailItem
                          label="Breeding Advice"
                          value={selectedDog.breedingAdvice}
                        />
                        <DetailItem
                          label="Miscellaneous Comments"
                          value={selectedDog.miscellaneousComments}
                        />
                        <DetailItem
                          label="Progeny Trainability"
                          value={selectedDog.progenyTrainability}
                        />
                      </div>
                    </Box>
                  </Box>
                )}

                {selectedSection === "Pedigree" && (
                  <PedigreeTree dogId={selectedDog.id} />
                )}
                {selectedSection === "Siblings" && (
                  <DogList dogId={selectedDog.id} />
                )}
                {selectedSection === "Progeny" && (
                  <Progeny dogId={selectedDog.id} />
                )}
                {selectedSection === "Virtual Breeding" && <VirtualBreeding />}
                {selectedSection === "Medical History" && (
                  <MedicalHistory dogId={selectedDog.id} />
                )}
              </Box>
            </Box>
          </Box>
        )}
      </div>
    </ThemeProvider>
  );
};

export default DatabaseView;
