import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DogsCategoryList from "../../components/dogManagement/category/DogsCategoryList";

export default function DogCategory() {
  return (
    <>
      <PageBreadcrumb pageTitle="" />
      {/* <div className="space-y-6"> */}
      {/* <ComponentCard title=""> */}
      <DogsCategoryList />
      {/* </ComponentCard> */}
      {/* </div> */}
    </>
  );
}
