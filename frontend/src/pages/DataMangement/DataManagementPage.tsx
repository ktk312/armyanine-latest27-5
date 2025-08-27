import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import DataManagement from "../../components/data-mangement/DataManagement";

export default function DataManagementPage() {
  return (
    <>
      <PageBreadcrumb pageTitle="Import/Export Data" />
      <div className="space-y-6">
        <ComponentCard
          title="Import and export data for your database tables
"
        >
          <DataManagement />
        </ComponentCard>
      </div>
    </>
  );
}
