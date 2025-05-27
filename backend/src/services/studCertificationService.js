const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const canMateWithoutInbreeding = async (sireId, damId) => {
    const sire = await prisma.dog.findUnique({
        where: { id: sireId },
        include: { sire: true, dam: true },
    });

    const dam = await prisma.dog.findUnique({
        where: { id: damId },
        include: { sire: true, dam: true },
    });

    if (!sire || !dam) {
        console.log("One or both dogs not found.");
        return false;
    }


    // **Allow mating if either dog has no known parents (Early Return)**
    if (!sire.sireId && !sire.damId) {
        console.log("Allowed: Sire has no parent records, mating allowed.");
        return true;
    }
    if (!dam.sireId && !dam.damId) {
        console.log("Allowed: Dam has no parent records, mating allowed.");
        return true;
    }

    // **Parent-Child Inbreeding Check**
    if (sire.id === dam.sireId || sire.id === dam.damId || dam.id === sire.sireId || dam.id === sire.damId) {
        console.log("Not Allowed: Parent-Child Inbreeding detected.");
        return false;
    }
    // some case Father of the Sire are not found 
    if (!sire.sireId && sire.damId && dam.sireId && dam.damId) {
        console.log("Allowed: No ancestry found, mating allowed.");
        return true;
    }

    // **Sibling Check**
    if (sire.sireId && sire.sireId === dam.sireId) {
        console.log("Not Allowed: Siblings (Same father).");
        return false;
    }
    if (sire.damId && sire.damId === dam.damId) {
        console.log("Not Allowed: Siblings (Same mother).");
        return false;
    }

    console.log("Fetching parents to check uncle/aunt relationship...");
    const sireParents = await prisma.dog.findMany({
        where: { OR: [{ id: sire.sireId }, { id: sire.damId }] },
        include: { sire: true, dam: true },
    });

    const damParents = await prisma.dog.findMany({
        where: { OR: [{ id: dam.sireId }, { id: dam.damId }] },
        include: { sire: true, dam: true },
    });

    const sireParentIds = new Set([sire.sireId, sire.damId].filter(Boolean));
    const damParentIds = new Set([dam.sireId, dam.damId].filter(Boolean));

    // **Aunt-Nephew or Uncle-Niece Check (Updated)**
    for (let parentId of sireParentIds) {
        const parent = await prisma.dog.findUnique({
            where: { id: parentId },
            include: { sire: true, dam: true },
        });

        if (parent) {
            if (parent.sireId === dam.sireId || parent.sireId === dam.damId ||
                parent.damId === dam.sireId || parent.damId === dam.damId) {
                console.log("Not Allowed: Aunt-Nephew or Uncle-Niece Inbreeding detected.");
                return false;
            }
        }
    }

    for (let parentId of damParentIds) {
        const parent = await prisma.dog.findUnique({
            where: { id: parentId },
            include: { sire: true, dam: true },
        });

        if (parent) {
            if (parent.sireId === sire.sireId || parent.sireId === sire.damId ||
                parent.damId === sire.sireId || parent.damId === sire.damId) {
                console.log("Not Allowed: Aunt-Nephew or Uncle-Niece Inbreeding detected.");
                return false;
            }
        }
    }

    console.log("Fetching grandparents...");
    const sireGrandparents = await prisma.dog.findMany({
        where: { OR: [{ id: sire.sireId }, { id: sire.damId }] },
        include: { sire: true, dam: true },
    });

    const damGrandparents = await prisma.dog.findMany({
        where: { OR: [{ id: dam.sireId }, { id: dam.damId }] },
        include: { sire: true, dam: true },
    });

    console.log("Sire's Grandparents:", sireGrandparents.map(gp => gp.id));
    console.log("Dam's Grandparents:", damGrandparents.map(gp => gp.id));

    // **Cousin (First Cousin) Check**
    const sireGrandparentIds = new Set(sireGrandparents.flatMap(dog => [dog.sireId, dog.damId]).filter(Boolean));
    const damGrandparentIds = new Set(damGrandparents.flatMap(dog => [dog.sireId, dog.damId]).filter(Boolean));

    for (let grandparentId of sireGrandparentIds) {
        if (damGrandparentIds.has(grandparentId)) {
            console.log(" Not Allowed: First Cousin Inbreeding detected.");
            return false;
        }
    }

    //  **Grandparent-Grandchild Check (NEWLY ADDED)**
    for (let grandparentId of sireGrandparentIds) {
        if (grandparentId === dam.id) {
            console.log(" Not Allowed: Grandparent-Grandchild Inbreeding detected.");
            return false;
        }
    }
    for (let grandparentId of damGrandparentIds) {
        if (grandparentId === sire.id) {
            console.log(" Not Allowed: Grandparent-Grandchild Inbreeding detected.");
            return false;
        }
    }
    console.log("Allowed: No inbreeding detected.");
    return true;
};


const normalizeSex = (sex) => String(sex).trim().toLowerCase();

// Checking for upto fift generation
const checkBreedingEligibility = async (sireId, damId) => {
    console.log("---sire and dam IDs", sireId, damId)
    const result = {
        isEligible: true,
        reasons: [],
        sire: null,
        dam: null,
        commonAncestors: []
    };

    // Fetch both dogs with their immediate parents
    const [sire, dam] = await Promise.all([
        prisma.dog.findUnique({
            where: { id: sireId },
            include: {
                sire: true,
                dam: true,
                breed: true
            }
        }),
        prisma.dog.findUnique({
            where: { id: damId },
            include: {
                sire: true,
                dam: true,
                breed: true
            }
        })
    ]);

    result.sire = sire;
    result.dam = dam;

    if (!sire || !dam) {
        result.isEligible = false;
        result.reasons.push("One or both dogs not found");
        return result;
    }

    // Basic checks
    if (normalizeSex(sire.sex) !== 'male' || normalizeSex(dam.sex) !== 'female') {
        result.isEligible = false;
        result.reasons.push("Sire must be male and dam must be female");
    }

    if (sire.breedId !== dam.breedId) {
        result.isEligible = false;
        result.reasons.push("Dogs must be of the same breed");
    }

    if (sire.id === dam.id) {
        result.isEligible = false;
        result.reasons.push("Cannot breed a dog with itself");
    }

    // Get full pedigrees (5 generations)
    const [sirePedigree, damPedigree] = await Promise.all([
        getPedigree(sireId, 5),
        getPedigree(damId, 5)
    ]);

    // Check all relationships
    const relationships = checkPedigreeRelationships(sirePedigree, damPedigree);

    if (relationships.length > 0) {
        result.isEligible = false;
        result.reasons.push(...relationships.map(r => r.message));
        result.commonAncestors = relationships.map(r => ({
            id: r.commonAncestor?.id,
            name: r.commonAncestor?.dogName,
            sireGenerations: r?.sireGenerations,
            damGenerations: r?.damGenerations,
            relationshipType: r?.type
        }));
    }

    return result;
};

// Helper function to get full pedigree
async function getPedigree(dogId, maxDepth) {
    if (maxDepth <= 0 || !dogId) return null;

    const dog = await prisma.dog.findUnique({
        where: { id: dogId },
        select: {
            id: true,
            dogName: true,
            sireId: true,
            damId: true
        }
    });

    if (!dog) return null;

    const [sire, dam] = await Promise.all([
        getPedigree(dog.sireId, maxDepth - 1),
        getPedigree(dog.damId, maxDepth - 1)
    ]);

    return {
        dog,
        sire,
        dam
    };
}

function checkPedigreeRelationships(sirePed, damPed) {
    const relationships = [];

    // First collect all ancestors with their generational depth
    const collectAncestors = (node, depth, ancestors) => {
        if (!node) return;

        ancestors.push({
            dog: node.dog,
            generation: depth
        });

        if (node.sire) collectAncestors(node.sire, depth + 1, ancestors);
        if (node.dam) collectAncestors(node.dam, depth + 1, ancestors);
    };

    const sireAncestors = [];
    collectAncestors(sirePed, 0, sireAncestors);

    const damAncestors = [];
    collectAncestors(damPed, 0, damAncestors);

    // Now compare every ancestor from sire with every ancestor from dam
    for (const sireAnc of sireAncestors) {
        for (const damAnc of damAncestors) {
            if (sireAnc.dog.id === damAnc.dog.id) {
                const relationship = {
                    type: getRelationshipType(sireAnc.generation, damAnc.generation),
                    message: getRelationshipMessage(
                        sireAnc.dog,
                        sireAnc.generation,
                        damAnc.generation
                    ),
                    commonAncestor: sireAnc.dog,
                    sireGenerations: sireAnc.generation,
                    damGenerations: damAnc.generation
                };
                relationships.push(relationship);
            }
        }
    }

    // Special case for avuncular relationships (uncle-niece)
    // Even if no common ancestor is found
    const sireGen0 = sireAncestors.find(a => a.generation === 0);
    const damGen1 = damAncestors.filter(a => a.generation === 1);

    for (const parent of damGen1) {
        if (parent.dog.id === sireGen0.dog.id) {
            relationships.push({
                type: "Parent-Child",
                message: `Parent-Child relationship detected: ${sireGen0.dog.dogName} is parent of ${damPed.dog.dogName}`,
                commonAncestor: null,
                sireGenerations: 0,
                damGenerations: 1
            });
        }
    }

    return relationships;
}


function getRelationshipType(sireGen, damGen) {
    const genDiff = Math.abs(sireGen - damGen);
    const commonGen = Math.min(sireGen, damGen);

    // Direct lineage
    if (genDiff === 0) {
        switch (commonGen) {
            case 1: return "Parent-Child";
            case 2: return "Full Sibling";
            case 3: return "Grandparent-Grandchild";
            case 4: return "Great-Grandparent";
            case 5: return "Great-Great-Grandparent";
        }
    }

    // Collateral relationships
    if (genDiff === 1) {
        if (commonGen === 1) return "Half-Sibling";
        if (commonGen === 2) return "Aunt/Uncle-Niece/Nephew";
        if (commonGen === 3) return "Great-Aunt/Uncle";
    }

    // Cousin relationships
    if (genDiff <= 1) {
        if (commonGen === 3) return "First Cousin";
        if (commonGen === 4) return "Second Cousin";
        if (commonGen === 5) return "Third Cousin";
    }

    return `Complex Relationship (${sireGen}:${damGen} gens)`;
}

function getRelationshipMessage(dog, sireGen, damGen) {
    const relType = getRelationshipType(sireGen, damGen);
    return `${relType} relationship detected via ${dog.dogName} ` +
        `(Sire's ${sireGen}${getOrdinalSuffix(sireGen)} gen, ` +
        `Dam's ${damGen}${getOrdinalSuffix(damGen)} gen)`;
}

function getOrdinalSuffix(num) {
    if (num > 3 && num < 21) return 'th';
    switch (num % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}




module.exports = {
    canMateWithoutInbreeding,
    checkBreedingEligibility
};