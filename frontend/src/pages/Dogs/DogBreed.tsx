import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import DogBreedPage from "../../components/dogManagement/breed/DogBreedList";

export default function DogBreed() {
  return (
    <>
      <PageBreadcrumb pageTitle="Dogs Categories" />
      <div className="space-y-6">
        <ComponentCard title="">
          <DogBreedPage/>
        </ComponentCard>
      </div>
    </>
  );
}
