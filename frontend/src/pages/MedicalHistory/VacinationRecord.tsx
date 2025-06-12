import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard'
import VaccinationView from '../../components/dogMedicalRecords/VaccinationView'

const VaccinationRecord = () => {
  return (
    <>
      <PageBreadcrumb pageTitle="Vaccination Record" />
      <div className="space-y-6">
        <ComponentCard title="">
          <VaccinationView/>
        </ComponentCard>
      </div>
    </>
  )
}

export default VaccinationRecord
