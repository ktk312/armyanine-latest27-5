import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import TrainingView from "../../components/dogMedicalRecords/TrainingView";

const TrainingRecord = () => {
  return (
    <>
      <PageBreadcrumb pageTitle="Training Record " />
      <div className="space-y-6">
        <ComponentCard title="">
          <TrainingView />
        </ComponentCard>
      </div>
    </>
  );
};

export default TrainingRecord;
