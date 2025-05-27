// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const getDogPedigreeData = async (dogId) => {
//     // 1. Get main dog details
//     const dogDetails = await getDogDetails(dogId);
    
//     // 2. Get pedigree tree
//     const pedigree = await getPedigreeTree(dogId, 5);
    
//     // 3. Get siblings
//     const siblings = await getSiblings(dogId, dogDetails.sireId, dogDetails.damId);
    
//     // 4. Get all relatives
//     const relatives = await findAllRelatives(dogId, 5);

//     return {
//         dogDetails,
//         pedigree,
//         siblings,
//         relatives
//     };
// };

// // Helper Service Functions
// async function getDogDetails(dogId) {
//     return await prisma.dog.findUnique({
//         where: { id: dogId },
//         include: {
//             breed: true,
//             country: true,
//             city: true,
//             sire: { select: { id: true, dogName: true } },
//             dam: { select: { id: true, dogName: true } }
//         }
//     });
// }

// async function getPedigreeTree(dogId, maxDepth) {
//     if (maxDepth <= 0 || !dogId) return null;

//     const dog = await prisma.dog.findUnique({
//         where: { id: dogId },
//         include: {
//             breed: true,
//             sire: { select: { id: true, dogName: true } },
//             dam: { select: { id: true, dogName: true } }
//         }
//     });

//     if (!dog) return null;

//     const [sireTree, damTree] = await Promise.all([
//         getPedigreeTree(dog.sireId, maxDepth - 1),
//         getPedigreeTree(dog.damId, maxDepth - 1)
//     ]);

//     return {
//         dog: formatDogForPedigree(dog),
//         sire: sireTree,
//         dam: damTree
//     };
// }

// function formatDogForPedigree(dog) {
//     return {
//         id: dog.id,
//         name: dog.dogName,
//         breed: dog.breed?.breed || 'Unknown',
//         dob: dog.dob,
//         sex: dog.sex,
//         kennel: dog.kennel
//     };
// }

// async function getSiblings(dogId, sireId, damId) {
//     if (!sireId && !damId) return [];
    
//     const whereClause = {
//         NOT: { id: dogId }
//     };
    
//     if (sireId && damId) {
//         whereClause.OR = [
//             { sireId: sireId },
//             { damId: damId }
//         ];
//     } else if (sireId) {
//         whereClause.sireId = sireId;
//     } else {
//         whereClause.damId = damId;
//     }

//     return await prisma.dog.findMany({
//         where: whereClause,
//         include: {
//             breed: true
//         }
//     });
// }

// async function findAllRelatives(dogId, generations) {
//     const relatives = {
//         parents: [],
//         grandparents: [],
//         greatGrandparents: [],
//         siblings: [],
//         auntsUncles: [],
//         cousins: []
//     };

//     const dog = await getDogDetails(dogId);
//     if (!dog) return relatives;

//     // Get immediate relatives
//     if (dog.sire) relatives.parents.push(formatRelative(dog.sire, 'sire'));
//     if (dog.dam) relatives.parents.push(formatRelative(dog.dam, 'dam'));
    
//     relatives.siblings = await getSiblings(dogId, dog.sireId, dog.damId)
//         .then(sibs => sibs.map(s => formatRelative(s, 'sibling')) || []);

//     // Get ancestors if more generations needed
//     if (generations > 1) {
//         if (dog.sireId) {
//             const sireRelatives = await findAllRelatives(dog.sireId, generations - 1);
//             mergeRelatives(relatives, sireRelatives);
//         }
//         if (dog.damId) {
//             const damRelatives = await findAllRelatives(dog.damId, generations - 1);
//             mergeRelatives(relatives, damRelatives);
//         }
//     }

//     return relatives;
// }

// function formatRelative(dog, relationship) {
//     return {
//         id: dog.id,
//         name: dog.dogName,
//         sex: dog.sex,
//         dob: dog.dob,
//         relationship: relationship,
//         kennel: dog.kennel,
//         breed: dog.breed?.breed || 'Unknown'
//     };
// }

// function mergeRelatives(mainRelatives, newRelatives) {
//     const mergeUnique = (target, source, prop) => {
//         const ids = new Set(target.map(r => r.id));
//         for (const relative of source[prop]) {
//             if (!ids.has(relative.id)) {
//                 target.push(relative);
//                 ids.add(relative.id);
//             }
//         }
//     };

//     mergeUnique(mainRelatives.parents, newRelatives, 'parents');
//     mergeUnique(mainRelatives.grandparents, newRelatives, 'grandparents');
//     mergeUnique(mainRelatives.siblings, newRelatives, 'siblings');
//     mergeUnique(mainRelatives.auntsUncles, newRelatives, 'auntsUncles');
//     mergeUnique(mainRelatives.cousins, newRelatives, 'cousins');
// }




const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const normalizeSex = (sex) => String(sex).trim().toLowerCase();

const getDogPedigreeData = async (dogId) => {
    // 1. Get main dog details
    const dogDetails = await getDogDetails(dogId);
    
    // 2. Get pedigree tree with proper relationship labels
    const pedigree = await getPedigreeTreeWithRelationships(dogId, 5, 'self');
    
    // 3. Get children (both sired and birthed)
    const children = await getChildren(dogId);
    
    // 4. Get all relatives with proper relationship names
    const relatives = await findAllRelativesWithLabels(dogId, 5);

    return {
        dogDetails: formatDogDetails(dogDetails),
        pedigree,
        children,
        relatives
    };
};

// Helper Functions

async function getPedigreeTreeWithRelationships(dogId, maxDepth, relationshipToCurrent) {
    if (maxDepth <= 0 || !dogId) return null;

    const dog = await prisma.dog.findUnique({
        where: { id: dogId },
        include: {
            breed: true,
            sire: { select: { id: true, dogName: true, sex: true } },
            dam: { select: { id: true, dogName: true, sex: true } }
        }
    });

    if (!dog) return null;

    const [sireTree, damTree] = await Promise.all([
        getPedigreeTreeWithRelationships(dog.sireId, maxDepth - 1, getNextRelationship(relationshipToCurrent, 'sire', dog.sex)),
        getPedigreeTreeWithRelationships(dog.damId, maxDepth - 1, getNextRelationship(relationshipToCurrent, 'dam', dog.sex))
    ]);

    return {
        dog: formatDogForPedigree(dog),
        relationship: relationshipToCurrent,
        sire: sireTree,
        dam: damTree
    };
}

function getNextRelationship(currentRelationship, parentType, parentSex) {
    if (currentRelationship === 'self') {
        return parentType; // 'sire' or 'dam'
    }
    
    const relationshipMap = {
        'sire': {
            'sire': normalizeSex(parentSex) === 'Male' ? 'grandsire' : 'granddam',
            'dam': normalizeSex(parentSex) === 'Male' ? 'grandsire' : 'granddam'
        },
        'dam': {
            'sire': normalizeSex(parentSex) === 'Male' ? 'grandsire' : 'granddam',
            'dam': normalizeSex(parentSex) === 'Male' ? 'grandsire' : 'granddam'
        },
        'grandsire': {
            'sire': 'great-grandsire',
            'dam': 'great-granddam'
        },
        'granddam': {
            'sire': 'great-grandsire',
            'dam': 'great-granddam'
        }
    };

    return relationshipMap[currentRelationship]?.[parentType] || `${parentType}-${currentRelationship}`;
}

async function getChildren(dogId) {
    const [sired, birthed] = await Promise.all([
        prisma.dog.findMany({
            where: { sireId: dogId },
            include: { breed: true }
        }),
        prisma.dog.findMany({
            where: { damId: dogId },
            include: { breed: true }
        })
    ]);

    return {
        sired: sired.map(dog => formatRelative(dog, 'child')),
        birthed: birthed.map(dog => formatRelative(dog, 'child'))
    };
}

async function findAllRelativesWithLabels(dogId, generations) {
    const relatives = {
        ancestors: [],
        descendants: [],
        siblings: [],
        cousins: [],
        auntsUncles: [],
        niecesNephews: []
    };

    const dog = await getDogDetails(dogId);
    if (!dog) return relatives;

    // Get ancestors (parents, grandparents, etc.)
    if (dog.sireId) {
        relatives.ancestors.push(
            ...await getAncestorsWithLabels(dog.sireId, generations, 'sire', dog.sex)
        );
    }
    if (dog.damId) {
        relatives.ancestors.push(
            ...await getAncestorsWithLabels(dog.damId, generations, 'dam', dog.sex)
        );
    }

    // Get descendants (children, grandchildren)
    relatives.descendants = await getDescendantsWithLabels(dogId, 2); // 2 generations down

    // Get siblings
    relatives.siblings = await getSiblingsWithLabels(dogId, dog.sireId, dog.damId).then(sibs => sibs.map(s => formatRelative(s, 'sibling')));;

    // Get aunts/uncles (parents' siblings)
    if (dog.sireId) {
        relatives.auntsUncles.push(
            ...await getSiblingsWithLabels(dog.sireId, null, null, 'uncle', 'aunt')
        );
    }
    if (dog.damId) {
        relatives.auntsUncles.push(
            ...await getSiblingsWithLabels(dog.damId, null, null, 'uncle', 'aunt')
        );
    }
// Aunts & Uncles: Siblings of sire and dam
if (dog.sireId) {
    const sireSiblings = await getSiblings(dog.sireId, dog.sire?.sireId, dog.sire?.damId);
    relatives.auntsUncles.push(...sireSiblings.map(s => formatRelative(s, 'aunt/uncle')));
}

if (dog.damId) {
    const damSiblings = await getSiblings(dog.damId, dog.dam?.sireId, dog.dam?.damId);
    relatives.auntsUncles.push(...damSiblings.map(s => formatRelative(s, 'aunt/uncle')));
}
    // Get nieces/nephews (siblings' children)
    for (const sibling of relatives.siblings) {
        const siblingChildren = await getChildren(sibling.id);
        relatives.niecesNephews.push(
            ...siblingChildren.sired.map(c => ({ ...c, relationship: normalizeSex(sibling.sex) === 'Male' ? 'nephew' : 'niece' })),
            ...siblingChildren.birthed.map(c => ({ ...c, relationship: normalizeSex(sibling.sex) === 'Male' ? 'nephew' : 'niece' }))
        );
    }

    // Get cousins (aunts/uncles' children)
    for (const auntUncle of relatives.auntsUncles) {
        const cousins = await getChildren(auntUncle.id);
        relatives.cousins.push(
            ...cousins.sired.map(c => ({ ...c, relationship: 'cousin' })),
            ...cousins.birthed.map(c => ({ ...c, relationship: 'cousin' }))
        );
    }

    return relatives;
}

async function getAncestorsWithLabels(dogId, generationsRemaining, relationshipToCurrent, currentDogSex) {
    if (generationsRemaining <= 0 || !dogId) return [];

    const dog = await getDogDetails(dogId);
    if (!dog) return [];

    const ancestors = [formatRelative(dog, getRelationshipLabel(relationshipToCurrent, currentDogSex))];

    const [sireAncestors, damAncestors] = await Promise.all([
        getAncestorsWithLabels(
            dog.sireId, 
            generationsRemaining - 1, 
            relationshipToCurrent === 'sire' ? 'grandsire' : 'granddam',
            dog.sex
        ),
        getAncestorsWithLabels(
            dog.damId, 
            generationsRemaining - 1, 
            relationshipToCurrent === 'sire' ? 'grandsire' : 'granddam',
            dog.sex
        )
    ]);

    return [...ancestors, ...sireAncestors, ...damAncestors];
}

async function getDescendantsWithLabels(dogId, generationsRemaining) {
    if (generationsRemaining <= 0 || !dogId) return [];

    const children = await getChildren(dogId);
    let descendants = [...children.sired, ...children.birthed];

    for (const child of children.sired.concat(children.birthed)) {
        const grandChildren = await getDescendantsWithLabels(child.id, generationsRemaining - 1);
        descendants = [...descendants, ...grandChildren];
    }

    return descendants;
}

async function getSiblingsWithLabels(dogId, sireId, damId, maleLabel = 'brother', femaleLabel = 'sister') {
    const siblings = await getSiblings(dogId, sireId, damId) || [];
    return siblings.map(sib => ({
        ...formatRelative(sib, normalizeSex(sib.sex) === 'Male' ? maleLabel : femaleLabel),
        isFullSibling: !!sireId && !!damId && sib.sireId === sireId && sib.damId === damId
    }));
}

function getRelationshipLabel(relationship, currentDogSex) {
    const labels = {
        'sire': 'father',
        'dam': 'mother',
        'grandsire': normalizeSex(currentDogSex) === 'Male' ? 'paternal grandfather' : 'maternal grandfather',
        'granddam': normalizeSex(currentDogSex) === 'Male' ? 'paternal grandmother' : 'maternal grandmother',
        'great-grandsire': 'great-grandfather',
        'great-granddam': 'great-grandmother',
        'uncle': 'uncle',
        'aunt': 'aunt',
        'nephew': 'nephew',
        'niece': 'niece',
        'cousin': 'cousin'
    };

    return labels[relationship] || relationship;
}

function formatDogDetails(dog) {
    return {
        id: dog.id,
        name: dog.dogName,
        breed: dog.breed?.breed || 'Unknown',
        dob: dog.dob,
        sex: dog.sex,
        kennel: dog.kennel,
        country: dog.country?.name,
        city: dog.city?.name
    };
}

function formatRelative(dog, relationship) {
    return {
        id: dog.id,
        name: dog.dogName,
        sex: dog.sex,
        dob: dog.dob,
        relationship: relationship,
        kennel: dog.kennel,
        breed: dog.breed?.breed || 'Unknown'
    };
}

async function getDogDetails(dogId) {
    return await prisma.dog.findUnique({
        where: { id: dogId },
        include: {
            breed: true,
            country: true,
            city: true,
            sire: { select: { id: true, dogName: true } },
            dam: { select: { id: true, dogName: true } }
        }
    });
}

function formatDogForPedigree(dog) {
    return {
        id: dog.id,
        name: dog.dogName,
        breed: dog.breed?.breed || 'Unknown',
        dob: dog.dob,
        sex: dog.sex,
        kennel: dog.kennel
    };
}

async function getSiblings(dogId, sireId, damId) {
    if (!sireId && !damId) return [];
    
    const whereClause = {
        NOT: { id: dogId },
    };
    
    if (sireId && damId) {
        whereClause.OR = [
            { sireId: sireId },
            { damId: damId }
        ];
    } else if (sireId) {
        whereClause.sireId = sireId;
    } else {
        whereClause.damId = damId;
    }
    const siblings = await prisma.dog.findMany({
        where: whereClause,
        include: {
            breed: true
        }
    });

    return siblings || [];
}



module.exports ={
    getDogPedigreeData
}