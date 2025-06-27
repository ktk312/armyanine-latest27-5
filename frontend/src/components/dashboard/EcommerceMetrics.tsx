import { useState } from "react";
import {
  DogIcon
} from "../../assets/icons";
import { useFetchDogStats } from "../dogsCategory/hooks/useDashboardState";

export default function EcommerceMetrics() {
  const { dogStats } = useFetchDogStats()

  const [mortalityRange, setMortalityRange] = useState<'3' | '6' | '12'>('12');

  const getMortalityValue = () => {
    if (!dogStats) return "N/A";

    const total = Number(dogStats.totalDogs || 1); // Avoid division by zero

    switch (mortalityRange) {
      case '3':
        return ((Number(dogStats.mortality3Months || 0) / total) * 100).toFixed(2) + '%';
      case '6':
        return ((Number(dogStats.mortality6Months || 0) / total) * 100).toFixed(2) + '%';
      case '12':
      default:
        return ((Number(dogStats.mortality12Months || 0) / total) * 100).toFixed(2) + '%';
    }
  };
  return (
    <div className="grid grid-cols-1 gap-4 grid-cols-2 sm:grid-cols-3 sm:gap-25 xl:gap-5 md:grid-cols-4 md:gap-25">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-30 w-50 text-black dark:text-white">
        <div className="flex items-center justify-center w-15 h-15 bg-gray-100 rounded-xl dark:bg-gray-800 -mt-5">
          <DogIcon />
        </div>

        <div className="w-5 h-10 flex items-end justify-between mt-3">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-25">
              Total Dogs
            </span>
            <h4 className="mt-2 font-bold text-gray-800 te-title-sm:18px dark:text-white/90 ml-35">
              {dogStats?.totalDogs}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-30 w-50 text-black dark:text-white">
        <div className="flex items-center justify-center w-15 h-15 bg-gray-100 rounded-xl dark:bg-gray-800 -mt-5">
          <DogIcon />
        </div>

        <div className="w-5 h-10 flex items-end justify-between mt-3">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-15">
              C&S
            </span>
            <h4 className="mt-2 font-bold text-gray-800 te-title-sm:18pxxt dark:text-white/90 ml-35 ">
              {dogStats?.cns ?? 0}
            </h4>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-30 w-50 text-black dark:text-white">
        <div className="flex items-center justify-center w-15 h-15 bg-gray-100 rounded-xl dark:bg-gray-800 -mt-5">
          <DogIcon />
        </div>

        <div className="w-5 h-10 flex items-end justify-between mt-3">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-15">
              C&D
            </span>
            <h4 className="mt-2 font-bold text-gray-800 te-title-sm:18pxxt dark:text-white/90 ml-35 ">
              {dogStats?.cnd ?? 0}
            </h4>
          </div>
        </div>
      </div>

      {/*
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-30 w-50 text-black dark:text-white">
        <div className="flex items-center justify-center w-15 h-15 bg-gray-100 rounded-xl dark:bg-gray-800 -mt-5">
          <DogIcon />
        </div>

        <div className="w-5 h-10 flex items-end justify-between mt-3">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-15">
              Number of Matings
            </span>
            <h4 className="mt-2 font-bold text-gray-800 te-title-sm:18pxxt dark:text-white/90 ml-35 ">
              485
            </h4>
          </div>
        </div>
      </div>

*/}
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> 
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-30 w-50 text-black dark:text-white">
        <div className="flex items-center justify-center w-15 h-15 bg-gray-100 rounded-xl dark:bg-gray-800 -mt-5">
          <PawPrintIcon />
        </div>

        <div className="w-5 h-10 flex items-end justify-between mt-3">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-10">
              Unused Stud Certificate
            </span>
            <h4 className="mt-2 font-bold text-gray-800 te-title-sm:18pxxt dark:text-white/90 ml-35 ">
              180
            </h4>
          </div>
        </div>
      </div>*/}
      {/* <!-- Metric Item End --> */}

      {/*
      
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-30 w-50 text-black dark:text-white">
        <div className="flex items-center justify-center w-15 h-15 bg-gray-100 rounded-xl dark:bg-gray-800 -mt-5">
          <PawPrintIcon />
        </div>

        <div className="w-5 h-10 flex items-end justify-between mt-3">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-25">
              Retired dogs
            </span>
            <h4 className="mt-2 font-bold text-gray-800 te-title-sm:18pxxt dark:text-white/90 ml-35 ">
              10
            </h4>
          </div>
        </div>
      </div>
      */}

      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-2 h-30 w-50 text-black dark:text-white">


        {/* Selector */}
        <div className=" flex justify-center">
          <select
            className="text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-2 py-1"
            value={mortalityRange}
            onChange={(e) => setMortalityRange(e.target.value as '3' | '6' | '12')}
          >
            <option value="3">Last 3 Months</option>
            <option value="6">Last 6 Months</option>
            <option value="12">Last 12 Months</option>
          </select>
        </div>


        <div className="w-5 h-10 flex items-end justify-between mt-3">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-10">
              Mortality Percentage
            </span>
            <h4 className="mt-2 font-bold text-gray-800 te-title-sm:18pxxt dark:text-white/90 ml-30 ">
              {getMortalityValue()}
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* 
      <!-- Metric Item Start -->
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-30 w-50 text-black dark:text-white">
        <div className="flex items-center justify-center w-15 h-15 bg-gray-100 rounded-xl dark:bg-gray-800 -mt-5">
          <DogIcon />
        </div>

        <div className="w-5 h-10 flex items-end justify-between mt-3">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-20">
              Ekennel Visitors
            </span>
            <h4 className="mt-2 font-bold text-gray-800 te-title-sm:18pxxt dark:text-white/90 ml-35 ">
              10
            </h4>
          </div>
        </div>
      </div>
      <!-- Metric Item End -->
      */}

      {/* 
      <!-- Metric Item Start -->
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-30 w-50 text-black dark:text-white">
        <div className="flex items-center justify-center w-15 h-15 bg-gray-100 rounded-xl dark:bg-gray-800 -mt-5">
          <ChartColumnIcon />
        </div>

        <div className="w-5 h-10 flex items-end justify-between mt-3">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-25">
              For Sale
            </span>
            <h4 className="mt-2 font-bold text-gray-800 te-title-sm:18pxxt dark:text-white/90 ml-35 ">
              10
            </h4>
          </div>
        </div>
      </div>
      <!-- Metric Item End -->
      */}

      {/* 
      <!-- Metric Item Start -->
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-30 w-50 text-black dark:text-white">
        <div className="flex items-center justify-center w-15 h-15 bg-gray-100 rounded-xl dark:bg-gray-800 -mt-5">
          <PercentIcon />
        </div>

        <div className="w-5 h-10 flex items-end justify-between mt-3">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-25">
              Total Income
            </span>
            <h4 className="mt-2 font-bold text-gray-800 te-title-sm:18pxxt dark:text-white/90 ml-35 ">
              10
            </h4>
          </div>
        </div>
      </div>
      <!-- Metric Item End -->
      */}
    </div>
  );
}
