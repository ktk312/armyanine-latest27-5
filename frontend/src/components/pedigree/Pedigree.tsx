
import { useState, useEffect } from "react";
const dummyData = [
    {
        name: "Buddy",
        sire: {
            name: "Max",
            sire: { name: "Rex", sire: { name: "King" }, dam: { name: "Queen" } },
            dam: { name: "Bella", sire: { name: "Duke" }, dam: { name: "Lady" } },
        },
        dam: {
            name: "Luna",
            sire: { name: "Charlie", sire: { name: "Rocky" }, dam: { name: "Molly" } },
            dam: { name: "Daisy", sire: { name: "Oscar" }, dam: { name: "Lily" } },
        },
        cousin: {
            name: "Shadow",
            sire: {
                name: "Leo",
                sire: { name: "Rex", sire: { name: "King" }, dam: { name: "Queen" } },
                dam: { name: "Daisy", sire: { name: "Oscar" }, dam: { name: "Lily" } },
            },
            dam: {
                name: "Zoe",
                sire: { name: "Charlie", sire: { name: "Rocky" }, dam: { name: "Molly" } },
                dam: { name: "Bella", sire: { name: "Duke" }, dam: { name: "Lady" } },
            },
        },
    },
    {
        name: "Duke",
        sire: {
            name: "Sam",
            sire: { name: "Thunder" },
            dam: { name: "Sky" },
        },
        dam: {
            name: "Rosie",
            sire: { name: "Hunter" },
            dam: { name: "Ruby" },
        },
        cousin: {
            name: "Coco",
            sire: {
                name: "Rocky",
                sire: { name: "Storm" },
                dam: { name: "Sandy" },
            },
            dam: {
                name: "Bella",
                sire: { name: "Duke" },
                dam: { name: "Lady" },
            },
        },
    },
    {
        name: "Shadow",
        sire: {
            name: "Leo",
            sire: { name: "Rex", sire: { name: "King" }, dam: { name: "Queen" } },
            dam: { name: "Daisy", sire: { name: "Oscar" }, dam: { name: "Lily" } }
        },
        dam: {
            name: "Zoe",
            sire: { name: "Charlie", sire: { name: "Rocky" }, dam: { name: "Molly" } },
            dam: { name: "Bella", sire: { name: "Duke" }, dam: { name: "Lady" } }
        },
        cousin: {
            name: "Buddy", // Since Shadow is Buddy's cousin, we link back
            sire: {
                name: "Max",
                sire: { name: "Rex", sire: { name: "King" }, dam: { name: "Queen" } },
                dam: { name: "Bella", sire: { name: "Duke" }, dam: { name: "Lady" } }
            },
            dam: {
                name: "Luna",
                sire: { name: "Charlie", sire: { name: "Rocky" }, dam: { name: "Molly" } },
                dam: { name: "Daisy", sire: { name: "Oscar" }, dam: { name: "Lily" } }
            }
        }
    }
];

export default function FamilyTree() {
  const [familyData, setFamilyData] = useState<typeof dummyData>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFamilyData(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );

  return (
    <div className="container mx-auto p-6 overflow-x-auto">
      {familyData.map((family, index) => (
        <div
          key={index}
          className="mb-20 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-900 dark:text-white/90"
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            {family.name}'s Pedigree Tree
          </h2>

          {/* Horizontal Tree Layout Starting from Dog */}
          <div className="flex space-x-10 items-start justify-start relative">
            {/* Main Dog */}
            <div className="flex flex-col items-center relative">
              <Card title="Dog" name={family.name} highlight />
            </div>
            <Connector />

            {/* Parents */}
            <div className="flex flex-col space-y-10 items-center relative">
              <Card title="Father" name={family.sire?.name} />
              <Card title="Mother" name={family.dam?.name} />
            </div>
            <Connector />

            {/* Grandparents */}
            <div className="flex flex-col space-y-10 items-center relative">
              <Card title="Paternal Grandfather" name={family.sire?.sire?.name} />
              <Card title="Paternal Grandmother" name={family.sire?.dam?.name} />
              <Card title="Maternal Grandfather" name={family.dam?.sire?.name} />
              <Card title="Maternal Grandmother" name={family.dam?.dam?.name} />
            </div>
            <Connector />

            {/* Great Grandparents */}
            <div className="flex flex-col space-y-10 items-center relative">
              <Card title="G-Grandfather" name={family.sire?.sire?.sire?.name} />
              <Card title="G-Grandmother" name={family.sire?.sire?.dam?.name} />
              <Card title="G-Grandfather" name={family.dam?.sire?.sire?.name} />
              <Card title="G-Grandmother" name={family.dam?.sire?.dam?.name} />
            </div>
            <Connector />

            {/* Cousin */}
            {family.cousin && (
              <div className="flex flex-col items-center relative">
                <Card title="Cousin" name={family.cousin.name}>
                  <p className="text-xs">Father: {family.cousin?.sire?.name || "Unknown"}</p>
                  <p className="text-xs">Mother: {family.cousin?.dam?.name || "Unknown"}</p>
                </Card>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Card({
  title,
  name,
  children,
  highlight = false,
}: {
  title: string;
  name?: string;
  children?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`w-44 p-4 border rounded-xl shadow-md bg-white dark:bg-gray-800 text-center relative ${
        highlight ? "border-blue-500 bg-blue-50 dark:bg-blue-900" : ""
      }`}
    >
      <h4 className="font-semibold text-sm mb-1">{title}</h4>
      <p className="text-base font-medium">{name || "Unknown"}</p>
      {children}
    </div>
  );
}

function Connector() {
  return <div className="w-10 h-1 bg-gray-400 self-center" />;
}
