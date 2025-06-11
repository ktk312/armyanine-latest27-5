import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
// import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
// import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import DogCategory from "./pages/Dogs/DogsCategory";
import LittersRegRequest from "./pages/Litters/LittersRegRequest";
import LittersInspectionRequest from "./pages/Litters/LittersInspectionReqList";
import Medication from "./pages/Pharmacy/Medication";
import StudCertificateList from "./pages/Dogs/StudCertificateList";
import ActivityLog from "./components/activitylog/ActivityLogs";
import RecycleBin from "./components/recyclebin/RecycleBin";
import MicrochipTracking from "./components/dogManagement/microchip/MicroChip";
import DatabaseView from "./components/databaseview/DatabaseView";
// import Progeny from "./components/progeny/Progeny";
import FormElements from "./pages/Dogs/Forms/FormElements";
import CreateStudCertificate from "./components/dogsCategory/CreateStudCertificate";
import LitterInspectionForm from "./components/litters/LitterInspectionForm";
import LitterRegistrationForm from "./components/litters/LitterRegistrationForm";
import AssignMicrochip from "./components/litters/LitterMicrochipAssign";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DogBreed from "./pages/Dogs/DogBreed";

import CreateMicrochip from "./components/dogManagement/microchip/CreateMicrochip";
import Microchip from "./pages/Microchip/Microchip";
import DogBreedCreate from "./components/dogManagement/breed/DogBreedCreate";
import ChangePassword from "./pages/AuthPages/ChangePassword";
import CreateCity from "./components/dogManagement/city/CreateCity";
import CityList from "./components/dogManagement/city/CityList";
import CountryList from "./components/dogManagement/country/CountryList";
import CreateCountry from "./components/dogManagement/country/CreateCountry";
import DogCategoryCreate from "./components/dogManagement/category/DogCategoryCreate";
import VacinationRecord from "./pages/MedicalHistory/VacinationRecord";
import DewormingRecord from "./components/dogMedicalRecords/DewormingView";
import TrainingRecord from "./pages/MedicalHistory/TrainingRecord";
import Prophylaxis from "./components/dogMedicalRecords/ProphylaxisView";
import VaccinationRecordForm from "./pages/MedicalHistory/Form/VaccinationRecordForm";
import DewormingRecordForm from "./pages/MedicalHistory/Form/DewormingRecordForm";
import ProphylaxisList from "./pages/MedicalHistory/ProphylaxisList";
import TrainingRecordForm from "./pages/MedicalHistory/Form/TrainingRecordForm";
import EditProphylaxisRecord from "./pages/MedicalHistory/EditProphylaxisRecord";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Redirect root path to /signin */}
          <Route path="/" element={<SignIn />} />
          {/* Public Routes */}
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/signup" element={<SignUp />} /> */}
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route index path="/dashboard" element={<Home />} />

              {/*Adminstration */}
              <Route path="/activity-logs" element={<ActivityLog />} />
              <Route path="/recycle-bin" element={<RecycleBin />} />

              {/* Others Page */}
              {/* <Route path="/profile" element={<UserProfiles />} /> */}
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />

              {/* microchip */}
              <Route path="/micro-chip" element={<MicrochipTracking />} />

              {/* Dog Management */}
              <Route path="/create-city" element={<CreateCity />} />
              <Route path="/cities" element={<CityList />} />

              <Route path="/create-country" element={<CreateCountry />} />
              <Route path="/countries" element={<CountryList />} />

              <Route path="/countries" element={<CountryList />} />
              {/* microchip */}
              <Route path="/microchip" element={<Microchip />} />
              {/* microchip */}
              <Route path="/create/microchip" element={<CreateMicrochip />} />

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />

              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />
              <Route path="/change-password" element={<ChangePassword />} />

              {/* Dogs Category */}
              <Route path="/dog-category-list" element={<DogCategory />} />
              {/* <Route path="/dog-categories/create" element={<DogCategoryCreate />} /> */}
              <Route
                path="/dog/create/category"
                element={<DogCategoryCreate />}
              />

              {/* Dogs Breed */}
              <Route path="/dog-breed" element={<DogBreed />} />
              <Route path="/dog/create/breed" element={<DogBreedCreate />} />

              <Route
                path="/stud-certificate"
                element={<StudCertificateList />}
              />
              <Route
                path="/create-stud-certificate"
                element={<CreateStudCertificate />}
              />

              {/* Litters */}
              <Route
                path="/litters-reigstration-request"
                element={<LittersRegRequest />}
              />
              <Route
                path="/litters-inspection-request-list"
                element={<LittersInspectionRequest />}
              />
              <Route
                path="/litter-inspection"
                element={<LitterInspectionForm />}
              />
              <Route
                path="/litter-registration"
                element={<LitterRegistrationForm />}
              />
              <Route path="/assign-microchip" element={<AssignMicrochip />} />

              {/* pedigree Tree */}
              <Route path="/database-view" element={<DatabaseView />} />

              {/* pedigree Tree */}
              {/* <Route path="/progeny-data" element={<Progeny />} /> */}

              {/* Medication */}
              <Route path="/pharmacy-medication" element={<Medication />} />

              {/* siblings */}
              {/* <Route path="/siblings-data" element={<DogList />} /> */}

              {/* Medical Record of every dogs */}
              <Route path="/vaccination-view" element={<VacinationRecord />} />
              <Route path="/deworming-view" element={<DewormingRecord />} />
              <Route path="/training-view" element={<TrainingRecord />} />
              <Route path="/prophylaxis-view" element={<Prophylaxis />} />

              {/* Medical Form */}
              <Route
                path="/create-vaccination-record"
                element={<VaccinationRecordForm />}
              />
              <Route
                path="/create-deworming-record"
                element={<DewormingRecordForm />}
              />
              <Route path="/create-prophylaxis" element={<ProphylaxisList />} />
              <Route
                path="/create-training-record"
                element={<TrainingRecordForm />}
              />

              {/*Edit Prophylaxis */}
              <Route
                path="/edit-prophylaxis-records/:id"
                element={<EditProphylaxisRecord />}
              />

              {/* Dog Breed */}

              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />
              {/* <Route path="/pedigreeTree" element={<PedigreeTree/>} /> */}

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>
          </Route>
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
