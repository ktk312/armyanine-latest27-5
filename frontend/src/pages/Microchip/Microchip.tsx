import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import DogBreedPage from "../../components/dogManagement/microchip/MicrochipList";

export default function MicrochipList() {
  return (
    <>
      <PageBreadcrumb pageTitle="Microchip List" />
      <div className="space-y-6">
        <ComponentCard title="">
          <DogBreedPage/>
        </ComponentCard>
      </div>
    </>
  );
}
