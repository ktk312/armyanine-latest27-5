import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import EditProphylaxis from "../../components/dogMedicalRecords/EditProphyaxis";

const EditProphylaxisRecord = () => {
  return (
    <>
      <PageBreadcrumb pageTitle="Prophylaxis " />
      <div className="space-y-6">
        <ComponentCard title="">
          <EditProphylaxis />
        </ComponentCard>
      </div>
    </>
  );
};

export default EditProphylaxisRecord;
