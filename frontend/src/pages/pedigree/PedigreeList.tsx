import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import FamilyTree from "../../components/pedigree/Pedigree";

export default function PedigreeList() {
  return (
    <>
      <PageBreadcrumb pageTitle="Pedigree" />
      <div className="space-y-6">
        <ComponentCard title="">
          <FamilyTree/>
        </ComponentCard>
      </div>
    </>
  );
}
