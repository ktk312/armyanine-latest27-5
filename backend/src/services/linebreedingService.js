const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAncestorsMap(dogId) {
  const ancestorsMap = new Map();

  // const dog = await prisma.dog.findUnique({
  //   where: { id: dogId },
  //   include: {
  //     sire: { 
  //       include: { 
  //         sire: true, 
  //         dam: true 
  //       } 
  //     },
  //     dam: { 
  //       include: { 
  //         sire: true, 
  //         dam: true 
  //       } 
  //     },
  //   },
  // });
  const dog = await prisma.dog.findUnique({
    where: { id: dogId },
    include: {
      sire: {
        include: {
          sire: {
            include: {
              sire: { include: { sire: true, dam: true } }, // 4th gen
              dam: { include: { sire: true, dam: true } },   // 4th gen
            }
          }, // 3rd gen
          dam: {
            include: {
              sire: { include: { sire: true, dam: true } }, // 4th gen
              dam: { include: { sire: true, dam: true } },  // 4th gen
            }
          }, // 3rd gen
        }
      },
      dam: {
        include: {
          sire: {
            include: {
              sire: { include: { sire: true, dam: true } }, // 4th gen
              dam: { include: { sire: true, dam: true } },  // 4th gen
            }
          }, // 3rd gen
          dam: {
            include: {
              sire: { include: { sire: true, dam: true } }, // 4th gen
              dam: { include: { sire: true, dam: true } },  // 4th gen
            }
          }, // 3rd gen
        }
      },
    },
  });
  if (!dog) {
    throw new Error(`Dog with ID ${dogId} not found`);
  }

  const traverseAncestors = (dog, pathLength) => {
    if (!dog || pathLength > 5) return;

    const existing = ancestorsMap.get(dog.id);
    if (existing) {
      existing.paths.push(pathLength);
    } else {
      ancestorsMap.set(dog.id, { paths: [pathLength] });
    }

    if (dog.sire) traverseAncestors(dog.sire, pathLength + 1);
    if (dog.dam) traverseAncestors(dog.dam, pathLength + 1);
  };

  traverseAncestors(dog, 0);
  return ancestorsMap;
}

function calculateInbreedingCoefficient(ancestors1, ancestors2) {
  let coefficient = 0;

  for (const [ancestorId, data1] of ancestors1.entries()) {
    if (ancestors2.has(ancestorId)) {
      const data2 = ancestors2.get(ancestorId);
      for (const path1 of data1.paths) {
        for (const path2 of data2.paths) {
          // if (path1 === 1 && path2 === 1) { // Both mother and child share this common ancestor (sire)
          //   coefficient += Math.pow(0.5, path1 + path2 + 1); // Direct relationship
          // }
          coefficient += Math.pow(0.5, path1 + path2 + 1);
        }
      }
    }
  }

  return (coefficient * 100);
}

async function getAvailableSiresForDam(damId) {

  const damBreed = await prisma.dog.findUnique({ where: { id: damId } });
  const [dam, allDogs] = await Promise.all([
    prisma.dog.findUnique({
      where: { id: damId },
      select: { id: true, sex: true, KP: true }
    }),

    prisma.dog.findMany({
      where: {
        NOT: { id: damId },
        breedId: damBreed?.breedId,
        isDeath: false,
        isLoan: false,
        isSold: false,
        isTransfer: false,
        CNS: false,
        CDN: false,
      },
      select: {
        id: true,
        dogName: true,
        sex: true, // include sex for filtering
        KP: true
      },
    }),
  ]);
  // Filter only male dogs (case-insensitive)
  const allSires = allDogs.filter(dog => dog.sex.toLowerCase() === 'male');

  if (!dam) {
    throw new Error('Dam not found');
  }
  if (dam.sex.toLowerCase() !== 'female') {
    throw new Error('Specified dog is not female');
  }

  const damAncestors = await getAncestorsMap(damId);

  const results = [];
  for (const sire of allSires) {
    const sireAncestors = await getAncestorsMap(sire.id);
    results.push({
      id: sire.id,
      dogName: sire.dogName,
      KP: sire?.KP,
      inbreedingCoefficient: calculateInbreedingCoefficient(sireAncestors, damAncestors)
    });
  }

  return results.sort((a, b) => a.inbreedingCoefficient - b.inbreedingCoefficient);
}

// Modified to only return data, not handle response
async function getAvailableSires(damId) {
  try {
    const availableSires = await getAvailableSiresForDam(damId);
    return availableSires;
  } catch (error) {
    console.error('Error in getAvailableSires:', error);
    throw error; // Let controller handle the response
  }
}

module.exports = {
  getAncestorsMap,
  calculateInbreedingCoefficient,
  getAvailableSiresForDam,
  getAvailableSires,
};