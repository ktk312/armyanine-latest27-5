import EcommerceMetrics from "../../components/dashboard/EcommerceMetrics";
import MonthlySalesChart from "../../components/dashboard/MonthlySalesChart";
import AllDogs from "../../components/dashboard/AllDogs";
import PageMeta from "../../components/common/PageMeta";
// import StatisticsChart from "../../components/dashboard/StatisticsChart";
// import MonthlyTarget from "../../components/dashboard/MonthlyTarget";
// import DemographicCard from "../../components/ecommerce/DemographicCard";

export default function Home() {
  return (
    <>
    <PageMeta
        title="ACC - Dashboard"
        description="Army Dog Centre Pakistan."
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>
     

        <div className="col-span-12 xl:col-span-12">
          <AllDogs />
        </div>
      </div>
    </>
  );
}
