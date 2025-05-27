import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import LittersInspectionReqList from "../../components/litters/LittersInspectionReqList";

export default function LittersInspectionRequest() {
  return (
    <>
      <PageBreadcrumb pageTitle="Litters" />
      <div className="space-y-6">
        <ComponentCard title="">
          <LittersInspectionReqList/>
        </ComponentCard>
      </div>
    </>
  );
}
