//design 3 with better layout and icons and no record found message

import React, { useEffect, useState } from "react";
import {
  getAllVaccination,
  getAllDeworming,
  getAllProphylaxis,
  getAllSickness,
  getAllTraining,
} from "./api/dogsApi";
import { VaccinationRecord } from "./types/vaccination";
import { DewormingRecord } from "./types/deworming";
import { ProphylaxisRecord } from "./types/prophylaxis";
import { SicknessRecord } from "./types/sickness";
import { TrainingRecord } from "./types/training";
import {
  FaSyringe,
  FaPills,
  FaShieldAlt,
  FaHeartbeat,
  FaRunning,
  FaUserMd,
  FaNotesMedical,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";

type Props = {
  dogId: number;
};

interface GroupItem {
  title: string;
  dateLabel: string;
  subtitle?: string;
  details?: string;
  age?: string;
}

interface DisplayGroup {
  category: string;
  icon: React.ReactNode;
  items: GroupItem[];
  latestDate: string | null;
}

const MedicalHistory: React.FC<Props> = ({ dogId }) => {
  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>([]);
  const [dewormings, setDewormings] = useState<DewormingRecord[]>([]);
  const [prophylaxes, setProphylaxes] = useState<ProphylaxisRecord[]>([]);
  const [sicknesses, setSicknesses] = useState<SicknessRecord[]>([]);
  const [trainings, setTrainings] = useState<TrainingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const [vacc, deworm, proph, sick, train] = await Promise.all([
          getAllVaccination(),
          getAllDeworming(),
          getAllProphylaxis(),
          getAllSickness(),
          getAllTraining(),
        ]);

        setVaccinations(vacc.filter((r) => Number(r.dogId) === dogId));
        setDewormings(deworm.filter((r) => r.dogId === dogId));
        setProphylaxes(proph.filter((r) => r.dogId === dogId));
        setSicknesses(sick.filter((r) => r.dogId === dogId));
        setTrainings(train.filter((r) => r.dogId === dogId));
      } catch (e) {
        console.error(e);
        setError("Unable to load medical history. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [dogId]);

  const buildDisplayGroups = (): DisplayGroup[] => {
    const groups: DisplayGroup[] = [
      {
        category: "Vaccination",
        icon: <FaSyringe className="w-5 h-5 text-blue-500" />,
        items: vaccinations.map((v) => ({
          title: `Vaccine: ${v.vaccine}`,
          age: v.age.toString(),
          dateLabel: `Given Date: ${new Date(
            v.givenDate
          ).toLocaleDateString()} and Due Date: ${new Date(
            v.dueDate
          ).toLocaleDateString()}`,
          subtitle: `Vet Sign: ${v.vetSign}`,
          details: `Batch No: ${v.batchNo}`,
        })),
        latestDate:
          vaccinations.length > 0
            ? vaccinations
                .map((v) => new Date(v.givenDate))
                .sort((a, b) => b.getTime() - a.getTime())[0]
                .toISOString()
            : null,
      },
      {
        category: "Deworming",
        icon: <FaPills className="w-5 h-5 text-green-500" />,
        items: dewormings.map((d) => ({
          title: `Medicine: ${d.drug}`,
          subtitle: `Sign: ${d.sign}`,
          dateLabel: `Date: ${new Date(d.date).toLocaleDateString()}`,
        })),
        latestDate:
          dewormings.length > 0
            ? dewormings
                .map((d) => new Date(d.date))
                .sort((a, b) => b.getTime() - a.getTime())[0]
                .toISOString()
            : null,
      },
      {
        category: "Prophylaxis",
        icon: <FaShieldAlt className="w-5 h-5 text-purple-500" />,
        items: prophylaxes.map((p) => ({
          title: `Prophylactic Drug: ${p.prophylacticDrug}`,
          dateLabel: `Date: ${new Date(p.date).toLocaleDateString()}`,
          subtitle: `Remarks: ${p.remarks}`,
        })),
        latestDate:
          prophylaxes.length > 0
            ? prophylaxes
                .map((p) => new Date(p.date))
                .sort((a, b) => b.getTime() - a.getTime())[0]
                .toISOString()
            : null,
      },
      {
        category: "Sickness",
        icon: <FaHeartbeat className="w-5 h-5 text-red-500" />,
        items: sicknesses.map((s) => ({
          title: `Condition: ${s.diseases}`,
          dateLabel: `Date: ${new Date(s.date).toLocaleDateString()}`,
          subtitle: `Treatment: ${s.treatment}`,
        })),
        latestDate:
          sicknesses.length > 0
            ? sicknesses
                .map((s) => new Date(s.date))
                .sort((a, b) => b.getTime() - a.getTime())[0]
                .toISOString()
            : null,
      },
      {
        category: "Training",
        icon: <FaRunning className="w-5 h-5 text-orange-500" />,
        items: trainings.map((t) => ({
          title: `Category: ${t.trainingCategory || "General"}`,
          dateLabel: `Started: ${new Date(
            t.trainingStartedOn
          ).toLocaleDateString()}, Ended: ${new Date(
            t.trainingCompleted
          ).toLocaleDateString()}`,
          subtitle: `Trainer: ${t.trainerName}`,
          details: `Performance: ${t.performance || "N/A"}`,
        })),
        latestDate:
          trainings.length > 0
            ? trainings
                .map((t) => new Date(t.trainingStartedOn))
                .sort((a, b) => b.getTime() - a.getTime())[0]
                .toISOString()
            : null,
      },
    ];

    return groups.sort((a, b) => {
      if (!a.latestDate) return 1;
      if (!b.latestDate) return -1;
      return (
        new Date(b.latestDate).getTime() - new Date(a.latestDate).getTime()
      );
    });
  };

  if (loading)
    return (
      <div className="text-center py-12 text-lg">
        Loading medical history...
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 py-12">{error}</div>;

  const groups = buildDisplayGroups();

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:!text-white mb-10">
        Dog Medical & Training History
      </h1>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {groups.map((grp) => (
          <div
            key={grp.category}
            className="flex flex-col p-5 bg-white dark:bg-gray-800 rounded-2xl
              shadow-md hover:shadow-lg transition duration-300 ease-in-out
              ring-1 ring-transparent hover:ring-gray-200 dark:hover:ring-gray-700"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                {grp.icon}
              </div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {grp.category} ({grp.items.length})
              </h2>
            </div>
            {grp.items.length === 0 ? (
              <div className="text-gray-500 dark:text-gray-400 flex items-center gap-2 text-sm">
                <FaInfoCircle className="text-gray-400" /> No records found.
              </div>
            ) : (
              <div className="space-y-5">
                {grp.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="pl-4 border-l-4 border-blue-300 dark:border-blue-500"
                  >
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    {item.age && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <FaClock className="text-gray-400" /> Age: {item.age}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />{" "}
                      {item.dateLabel}
                    </p>
                    {item.subtitle && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <FaUserMd className="text-gray-400" /> {item.subtitle}
                      </p>
                    )}
                    {item.details && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <FaNotesMedical className="text-gray-400" />{" "}
                        {item.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalHistory;
