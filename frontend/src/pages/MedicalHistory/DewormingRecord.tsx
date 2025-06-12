import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import DewormingView from "../../components/dogMedicalRecords/DewormingView";
const DewormingRecord = () => {
  return (
    <>
      <PageBreadcrumb pageTitle="Deworming Record" />
      <div className="space-y-6">
        <ComponentCard title="">
          <DewormingView />
        </ComponentCard>
      </div>
    </>
  );
};

export default DewormingRecord;
