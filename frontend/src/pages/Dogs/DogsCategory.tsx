import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import DogsCategoryList from "../../components/dogManagement/category/DogsCategoryList";

export default function DogCategory() {
  return (
    <>
      <PageBreadcrumb pageTitle="Dogs Categories" />
      <div className="space-y-6">
        <ComponentCard title="">
          <DogsCategoryList/>
        </ComponentCard>
      </div>
    </>
  );
}
