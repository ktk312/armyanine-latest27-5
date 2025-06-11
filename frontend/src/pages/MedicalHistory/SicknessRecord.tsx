import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import SicknessView from "../../components/dogMedicalRecords/SicknessView";

const SicknessRecord = () => {
  return (
    <>
      <PageBreadcrumb pageTitle="Sickness Record " />
      <div className="space-y-6">
        <ComponentCard title="">
          <SicknessView />
        </ComponentCard>
      </div>
    </>
  );
};

export default SicknessRecord;
