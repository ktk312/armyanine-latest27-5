const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Gets ancestors map for a dog using tabular method
 */
async function getAncestorsMap(dogId) {
  const ancestorsTable = new Map();
  const dog = await prisma.dog.findUnique({
    where: { id: dogId },
    include: {
      sire: {
        include: {
          sire: { include: { sire: true, dam: true } },
          dam: { include: { sire: true, dam: true } }
        }
      },
      dam: {
        include: {
          sire: { include: { sire: true, dam: true } },
          dam: { include: { sire: true, dam: true } }
        }
      }
    }
  });

  if (!dog) return ancestorsTable;

  // Helper to add ancestor with generation number
  function addAncestor(ancestor, generation) {
    if (!ancestor) return;
    const existing = ancestorsTable.get(ancestor.id);
    if (existing) {
      if (!existing.generations.includes(generation)) {
        existing.generations.push(generation);
      }
    } else {
      ancestorsTable.set(ancestor.id, {
        id: ancestor.id,
        name: ancestor.dogName,
        generations: [generation],
        sireId: ancestor.sireId,
        damId: ancestor.damId
      });
    }
  }

  // Add ancestors by generation
  function processAncestors(current, generation = 0) {
    if (!current) return;
    addAncestor(current, generation);
    if (current.sire) {
      processAncestors(current.sire, generation + 1);
    }
    if (current.dam) {
      processAncestors(current.dam, generation + 1);
    }
  }

  processAncestors(dog);
  return ancestorsTable;
}

function calculateInbreedingCoefficient(sireAncestors, damAncestors) {
  let F = 0;

  // Step 1: Find all common ancestors
  const commonAncestorIds = [...sireAncestors.keys()].filter(id =>
    damAncestors.has(id)
  );

  // Step 2: Calculate contribution of each common ancestor
  for (const ancestorId of commonAncestorIds) {
    const sireGen = Math.min(...sireAncestors.get(ancestorId).generations);
    const damGen = Math.min(...damAncestors.get(ancestorId).generations);
    const FA = sireAncestors.get(ancestorId).inbreedingCoefficient || 0;

    const contribution = Math.pow(0.5, sireGen + damGen + 1) * (1 + FA);
    F += contribution;
  }

  return +(F * 100).toFixed(2); // Return as percentage
}

/**
 * Get available sires for dam with inbreeding coefficients
 */
async function getAvailableSiresForDam(damId) {
  const dam = await prisma.dog.findUnique({
    where: { id: damId },
    select: { id: true, sex: true, breedId: true }
  });

  console.log('Dam:', dam);

  if (!dam) throw new Error('Dam not found');
  if (dam.sex.toLowerCase() !== 'female') throw new Error('Not a female dog');

  const allSires = await prisma.dog.findMany({
    where: {
      breedId: dam.breedId,
      sex: 'male',
      isDeath: false,
      isLoan: false,
      isSold: false,
      isTransfer: false,
      CNS: false,
      CDN: false,
      NOT: { id: damId }
    }
  });


  const damAncestors = await getAncestorsMap(damId);
  const results = [];

  for (const sire of allSires) {
    const sireAncestors = await getAncestorsMap(sire.id);
    // const coeff = await calculateInbreedingCoefficient(allSires, damAncestors);
    const coeff = await calculateInbreedingCoefficient(sireAncestors, damAncestors);
    if (sire.dogName.toLowerCase() === 'tara') {
      console.log(`Sire: ${sire.dogName}, Coefficient: ${coeff}`);
      console.log(`Sire Ancestors:`, sireAncestors);
      console.log(`Dam Ancestors:`, damAncestors);

    }


    results.push({
      id: sire.id,
      dogName: sire.dogName,
      KP: sire.KP,
      inbreedingCoefficient: coeff
    });
  }

  return results.sort((a, b) => a.inbreedingCoefficient - b.inbreedingCoefficient);
}

module.exports = {
  getAncestorsMap,
  calculateInbreedingCoefficient,
  getAvailableSiresForDam
};