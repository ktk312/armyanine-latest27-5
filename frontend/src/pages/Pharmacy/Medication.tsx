import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import MedicationForm from "../../components/pharmacy/Medication";

export default function Medication() {
  return (
    <>
      <PageBreadcrumb pageTitle="Pharmacy" />
      <div className="space-y-6">
        <ComponentCard title="">
          <MedicationForm/>
        </ComponentCard>
      </div>
    </>
  );
}
