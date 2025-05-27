import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import StudCertificate from "../../components/dogsCategory/StudCertificate";

export default function StudCertificateList() {
  return (
    <>
      <PageBreadcrumb pageTitle="Stud Certificate" />
      <div className="space-y-6">
        <ComponentCard title="">
          <StudCertificate/>
        </ComponentCard>
      </div>
    </>
  );
}
