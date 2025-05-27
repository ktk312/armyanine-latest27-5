import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import DogListTable from "../../components/dogsCategory/dogsTable";
// import PageMeta from "../../components/common/PageMeta";

export default function BasicTables() {
  return (
    <>
      <PageBreadcrumb pageTitle="Dogs" />
      <div className="space-y-6">
        <ComponentCard title="">
          <DogListTable />
        </ComponentCard>
      </div>
    </>
  );
}
