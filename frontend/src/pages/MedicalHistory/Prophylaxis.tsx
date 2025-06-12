import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import ProphylaxisView from "../../components/dogMedicalRecords/ProphylaxisView";

const Prophylaxis = () => {
  return (
    <>
      <PageBreadcrumb pageTitle="Prophylaxis " />
      <div className="space-y-6">
        <ComponentCard title="">
          <ProphylaxisView />
        </ComponentCard>
      </div>
    </>
  );
};

export default Prophylaxis;
