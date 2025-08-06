

//shamim- changes

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

interface ParentDog {
  name: string;
  gender: string;
  breed: string;
  dob: string;
  accNumber: string;
  imageUrl: string | null;
}

interface Progeny {
  id: number;
  name: string;
  accNumber: string;
  gender: string;
  breed: string;
  dob: string;
  imageUrl: string | null;
  dam: ParentDog | null;
  sire: ParentDog | null;
}

type DogPedigreeProps = {
  dogId: number;
};

const Progeny: React.FC<DogPedigreeProps> = ({ dogId }) => {
  const [progenyData, setProgenyData] = useState<Progeny[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgeny = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/dog/progeny/${dogId}`);
        setProgenyData(response.data);
      } catch (err) {
        console.error('Error fetching progeny:', err);
        setError('Failed to load progeny data');
      } finally {
        setLoading(false);
      }
    };

    fetchProgeny();
  }, [dogId]);


  const groupedByParents = useMemo(() => {
    const map = new Map<string, Progeny[]>();

    for (const child of progenyData) {
      if (child.sire && child.dam) {
        const key = `${child.sire.accNumber}-${child.dam.accNumber}`;
        if (!map.has(key)) {
          map.set(key, []);
        }
        map.get(key)!.push(child);
      }
    }

    return Array.from(map.entries());
  }, [progenyData]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center text-red-600 bg-red-100 rounded-md">
        {error}
      </div>
    );
  }

  if (!progenyData.length) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center text-gray-500">
        No progeny found for this dog.
      </div>
    );
  }

  const getImageUrl = (url: string | null) =>
    url ? `http://localhost:3000${url}` : 'http://localhost:3000/uploads/dogs/defaultdog.jpg';

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {groupedByParents.map(([key, children], i) => {
        const sire = children[0].sire!;
        const dam = children[0].dam!;
        console.log(key);
        return (
          <div
            key={i}
            className="space-y-6 border border-gray-300 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 shadow"
          >
            {/* Parents Header */}
            <div className="flex flex-wrap justify-between items-start gap-6 border-b pb-4">
              {/* Sire */}
              <div className="flex gap-3 w-full md:w-[48%]">
                <img
                  src={getImageUrl(sire.imageUrl)}
                  alt={sire.name}
                  className="w-20 h-20 rounded-lg object-cover border"
                />
                <div className="flex-1">
                  <h3 className="text-blue-700 dark:text-blue-400 font-semibold text-lg flex items-center gap-2">
                    ♂ {sire.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {sire.breed} | Born: {sire.dob}
                  </p>
                  <p className="text-yellow-600 dark:text-yellow-400 font-medium text-sm">
                    {sire.accNumber}
                  </p>
                </div>
              </div>

              {/* Dam */}
              <div className="flex gap-3 w-full md:w-[48%]">
                <img
                  src={getImageUrl(dam.imageUrl)}
                  alt={dam.name}
                  className="w-20 h-20 rounded-lg object-cover border"
                />
                <div className="flex-1">
                  <h3 className="text-green-700 dark:text-green-400 font-semibold text-lg flex items-center gap-2">
                    ♀ {dam.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {dam.breed} | Born: {dam.dob}
                  </p>
                  <p className="text-yellow-600 dark:text-yellow-400 font-medium text-sm">
                    {dam.accNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Children */}
            <div className="grid gap-6 md:grid-cols-2">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="rounded-lg border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 p-4 shadow"
                >
                  <div className="text-center mb-3">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{child.name}</h2>
                    <div className="flex justify-center items-center gap-2 mt-1 flex-wrap">
                      <span className="text-base text-blue-600 dark:text-blue-400 font-medium">
                        {child.accNumber}
                      </span>
                      <span className="text-lg px-3 py-1 bg-gray-100 dark:bg-gray-600 rounded-full">
                        <span className="inline-block mr-1 text-xl">
                          {child.gender === "Male" ? "♂" : "♀"}
                        </span>
                        {child.breed}
                      </span>
                    </div>
                    {child.dob && (
                      <p className="text-gray-600 dark:text-gray-400 mt-1 text-base">Born: {child.dob}</p>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <img
                      src={getImageUrl(child.imageUrl)}
                      alt={child.name}
                      className="w-28 h-28 rounded-lg object-cover border border-gray-200 dark:border-gray-600 shadow"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

};

export default Progeny;
