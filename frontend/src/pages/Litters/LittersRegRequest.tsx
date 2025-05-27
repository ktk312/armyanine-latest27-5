import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import LitterRegRequests from "../../components/litters/LittersRegRequest";

export default function LittersRegRequest() {
  return (
    <>
      <PageBreadcrumb pageTitle="Litters" />
      <div className="space-y-6">
        <ComponentCard title="">
          <LitterRegRequests/>
        </ComponentCard>
      </div>
    </>
  );
}
