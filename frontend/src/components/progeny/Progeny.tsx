import React, { useState, useEffect } from 'react';
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
  // const dogId = 4; // Or get from URL params

  useEffect(() => {
    const fetchProgeny = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/dog/progeny/${dogId}`);
        console.log("-----dta progeny are", response?.data)
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-xl mx-auto text-center text-red-500 bg-red-50 rounded-lg">
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

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Progeny of Dog #{dogId}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {progenyData.map((progeny) => (
          <div
            key={progeny.id}
            className="rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 p-4 shadow-md hover:shadow-lg transition-all"
          >
            {/* Progeny Header */}
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {progeny.name}
              </h2>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-2xl text-blue-600 dark:text-blue-400 font-medium">
                  {progeny.accNumber}
                </span>
                <span className="text-3xl px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <span className="text-5xl inline-block mr-2">{progeny.gender === 'Male' ? '♂' : '♀'}</span> {progeny.breed}
                </span>
              </div>
              {progeny.dob && (
                <p className="text-2xl text-gray-500 dark:text-gray-400 mt-1">
                  Born: {progeny.dob}
                </p>
              )}
            </div>

            {/* Progeny Image */}
            {progeny.imageUrl && (
              <div className="flex justify-center mb-4">
                <img
                  src={`http://localhost:3000${progeny.imageUrl}` || `http://localhost:3000/uploads/dogs/defaultdog.jpg`}
                  alt={progeny.name}
                  className="w-32 h-32 rounded-lg object-cover border border-gray-200 dark:border-gray-600 shadow-sm"
                />
              </div>
            )}

            {/* Parents Section */}
            <div className="space-y-4">
              {progeny.dam && (
                <div className="flex items-start gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <img
 src={
    progeny?.sire?.imageUrl
      ? `http://localhost:3000${progeny?.dam?.imageUrl}`
      : `http://localhost:3000/uploads/dogs/defaultdog.jpg`
  }                    alt={progeny?.dam?.name}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-green-700 dark:text-green-400">
                        {progeny.dam.name}
                      </h3>
                      <span className="text-2xl px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-white rounded-full">
                        Dam
                      </span>
                    </div>
                    <p className="text-2xl text-gray-600 dark:text-gray-300 mt-1">
                      <span className="text-5xl inline-block mr-2">♀</span>
                      {progeny.dam.breed} | {progeny.dam.dob}
                    </p>
                    <p className="text-2xl text-yellow-600 dark:text-yellow-400 font-medium mt-1">
                      {progeny.dam.accNumber}
                    </p>
                  </div>
                </div>
              )}

              {progeny.sire && (
                <div className="flex items-start gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <img
                    src={
                      progeny?.sire?.imageUrl
                        ? `http://localhost:3000${progeny.sire.imageUrl}`
                        : `http://localhost:3000/uploads/dogs/defaultdog.jpg`
                    } alt={progeny.sire.name}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-blue-700 dark:text-blue-400">
                        {progeny.sire.name}
                      </h3>
                      <span className="text-2xl px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-white rounded-full">
                        Sire
                      </span>
                    </div>
                    <p className="text-3xl text-gray-600 dark:text-gray-300 mt-1">
                      <span className="text-5xl inline-block mr-2">♂</span> {progeny.sire.breed} | {progeny.sire.dob}
                    </p>
                    <p className="text-3xl text-yellow-600 dark:text-yellow-400 font-medium mt-1">
                      {progeny.sire.accNumber}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progeny;