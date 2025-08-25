const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");

// const dogFamily = [];

const dogsList = [
    // --- Generation 1 (Founders, no parents) ---
    {
        dogName: "Test Founder Gen1 (Male)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "male",
        sireId: null,
        damId: null,
        KP: "KP0001",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Female)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "female",
        sireId: null,
        damId: null,
        KP: "KP0002",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Male2)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "male",
        sireId: null,
        damId: null,
        KP: "KP0003",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Female2)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "female",
        sireId: null,
        damId: null,
        KP: "KP0004",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Male3)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "male",
        sireId: null,
        damId: null,
        KP: "KP0005",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Female3)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "female",
        sireId: null,
        damId: null,
        KP: "KP0006",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Male4)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "male",
        sireId: null,
        damId: null,
        KP: "KP0007",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Female4)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "female",
        sireId: null,
        damId: null,
        KP: "KP0008",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Male5)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "male",
        sireId: null,
        damId: null,
        KP: "KP0009",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Female5)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "female",
        sireId: null,
        damId: null,
        KP: "KP0010",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Male6)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "male",
        sireId: null,
        damId: null,
        KP: "KP0011",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Female6)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "female",
        sireId: null,
        damId: null,
        KP: "KP0012",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Male7)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "male",
        sireId: null,
        damId: null,
        KP: "KP0013",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Female7)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "female",
        sireId: null,
        damId: null,
        KP: "KP0014",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Male8)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "male",
        sireId: null,
        damId: null,
        KP: "KP0015",
        status: "Active",
    },
    {
        dogName: "Test Founder Gen1 (Female8)",
        breedId: 1,
        countryId: 1,
        categoryId: 1,
        dob: new Date("2016-01-01"),
        sex: "female",
        sireId: null,
        damId: null,
        KP: "KP0016",
        status: "Active",
    },

    // --- Generation 2 ---
    {
        dogName: "Test Ancestor Gen2 (Male)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2017-01-01"), sex: "male", sireId: 1, damId: 2, KP: "KP0017",
        status: "Active",
    },
    {
        dogName: "Test Ancestor Gen2 (Female)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2017-01-01"), sex: "female", sireId: 3, damId: 4, KP: "KP0018",
        status: "Active",
    },
    {
        dogName: "Test Ancestor Gen2 (Male2)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2017-01-01"), sex: "male", sireId: 5, damId: 6, KP: "KP0019",
        status: "Active",
    },
    {
        dogName: "Test Ancestor Gen2 (Female2)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2017-01-01"), sex: "female", sireId: 7, damId: 8, KP: "KP0020",
        status: "Active",
    },
    {
        dogName: "Test Ancestor Gen2 (Male3)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2017-01-01"), sex: "male", sireId: 9, damId: 10, KP: "KP0021",
        status: "Active",
    },
    {
        dogName: "Test Ancestor Gen2 (Female3)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2017-01-01"), sex: "female", sireId: 11, damId: 12, KP: "KP0022",
        status: "Active",
    },
    {
        dogName: "Test Ancestor Gen2 (Male4)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2017-01-01"), sex: "male", sireId: 13, damId: 14, KP: "KP0023",
        status: "Active",
    },
    {
        dogName: "Test Ancestor Gen2 (Female4)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2017-01-01"), sex: "female", sireId: 15, damId: 16, KP: "KP0024",
        status: "Active",
    },

    // --- Generation 3 ---
    {
        dogName: "Test Grandparent Gen3 (Male)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2018-01-01"), sex: "male", sireId: 17, damId: 18, KP: "KP0025",
        status: "Active",
    },
    {
        dogName: "Test Grandparent Gen3 (Female)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2018-01-01"), sex: "female", sireId: 19, damId: 20, KP: "KP0026",
        status: "Active",
    },
    {
        dogName: "Test Grandparent Gen3 (Male2)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2018-01-01"), sex: "male", sireId: 21, damId: 22, KP: "KP0027",
        status: "Active",
    },
    {
        dogName: "Test Grandparent Gen3 (Female2)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2018-01-01"), sex: "female", sireId: 23, damId: 24, KP: "KP0028",
        status: "Active",
    },

    // --- Generation 4 ---
    {
        dogName: "Test Parent Gen4 (Male)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2019-01-01"), sex: "male", sireId: 25, damId: 26, KP: "KP0029",
        status: "Active",
    },
    {
        dogName: "Test Parent Gen4 (Female)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2019-01-01"), sex: "female", sireId: 27, damId: 28, KP: "KP0030",
        status: "Active",
    },

    // --- Generation 5 ---
    {
        dogName: "Test Puppy Gen5 (Male)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2020-01-01"), sex: "male", sireId: 29, damId: 30, KP: "KP0031",
        status: "Active",
    },
    {
        dogName: "Test Puppy Gen5 (Female)", breedId: 1, countryId: 1, categoryId: 1, dob: new Date("2020-01-01"), sex: "female", sireId: 29, damId: 30, KP: "KP0032",
        status: "Active",
    }
];
// async function generateUniqueKP() {
//   let unique = false;
//   let kp;

//   while (!unique) {
//     kp = faker.string.alphanumeric(8).toUpperCase();
//     const existingDog = await prisma.dog.findFirst({ where: { KP: kp } });
//     if (!existingDog) unique = true;
//   }
//   return kp;
// }

// async function createDogWithLineageAndTrack({ generationsLeft, sex, breedId, cityId, countryId, categoryId }) {
//   if (generationsLeft === 0) return null;

//   const sire = await createDogWithLineageAndTrack({ generationsLeft: generationsLeft - 1, sex: "male", breedId, cityId, countryId, categoryId });
//   const dam = await createDogWithLineageAndTrack({ generationsLeft: generationsLeft - 1, sex: "Female", breedId, cityId, countryId, categoryId });

//   const dog = await prisma.dog.create({
//     data: {
//       dogName: faker.animal.dog(),
//       kennel: faker.company.name(),
//       countryId,
//       cityId,
//       breeder: faker.person.fullName(),
//       breedId,
//       dob: faker.date.past({ years: generationsLeft + 1 }),
//       sex,
//       status: "Active",
//       categoryId,
//       KP: await generateUniqueKP(),
//       sireId: sire?.id || null,
//       damId: dam?.id || null
//     }
//   });

//   dogFamily.push(dog);
//   console.log(`📦 Created Dog ID: ${dog.id} | Sire: ${sire?.id}, Dam: ${dam?.id}`);

//   return dog;
// }

async function main() {
    console.log("🌱 Seeding database...");

    const user = await prisma.user.create({
        data: {
            name: "Admin User",
            email: "admin@acc.com",
            password: "$2a$12$jZmPVUgryGG.qoMnRYehd.khpL.gU4nvTwwlxqYju6cQWU5BOPrG2",
            role: "admin",
        }
    });
    console.log("✅ User Seeded:", user.email);

    const usa = await prisma.country.create({
        data: { countryCode: "US", countryName: "United States", currencyCode: "USD", continent: "North America" }
    });
    const uk = await prisma.country.create({
        data: { countryCode: "UK", countryName: "United Kingdom", currencyCode: "GBP", continent: "Europe" }
    });
    console.log("✅ Countries Seeded");
    await prisma.dogCategory.createMany({
        data: [
            { name: "Purebred" },
            { name: "Mixed Breed" },
            { name: "Working Dogs" },
            { name: "Sporting Dogs" }
        ],
    });
    console.log("✅ Categories Seeded");

    const labrador = await prisma.breed.create({ data: { breed: "Labrador Retriever", status: "Active" } });
    const belgianmalinois = await prisma.breed.create({ data: { breed: "Belgian Malinois", status: "Active" } });
    const germanShepherd = await prisma.breed.create({ data: { breed: "German Shepherd", status: "Active" } });
    console.log("✅ Breeds Seeded");


    for (const dog of dogsList) {
        await prisma.dog.create({
            data: {
                ...dog,
                dob: new Date(dog.dob) // ✅ convert to Date object
            }
        });
    }
    console.log("✅ Dogs seeded successfully!");


    //   const usa = await prisma.country.create({
    //     data: { countryCode: "US", countryName: "United States", currencyCode: "USD", continent: "North America" }
    //   });
    //   const uk = await prisma.country.create({
    //     data: { countryCode: "UK", countryName: "United Kingdom", currencyCode: "GBP", continent: "Europe" }
    //   });
    //   console.log("✅ Countries Seeded");

    //   const newYork = await prisma.city.create({
    //     data: { countryId: usa.idCountry, city: "New York", status: "Active" }
    //   });
    //   const london = await prisma.city.create({
    //     data: { countryId: uk.idCountry, city: "London", status: "Active" }
    //   });
    //   console.log("✅ Cities Seeded");

    //   await prisma.dogCategory.createMany({
    //     data: [
    //       { name: "Purebred" },
    //       { name: "Mixed Breed" },
    //       { name: "Working Dogs" },
    //       { name: "Sporting Dogs" }
    //     ],
    //   });
    //   console.log("✅ Categories Seeded");

    //   const purebred = await prisma.dogCategory.findFirst({ where: { name: "Purebred" } });
    //   const mixedBreed = await prisma.dogCategory.findFirst({ where: { name: "Mixed Breed" } });
    //   const workingDogs = await prisma.dogCategory.findFirst({ where: { name: "Working Dogs" } });

    //   const labrador = await prisma.breed.create({ data: { breed: "Labrador Retriever", status: "Active" } });
    //   const belgianmalinois = await prisma.breed.create({ data: { breed: "Belgian Malinois", status: "Active" } });
    //   const germanShepherd = await prisma.breed.create({ data: { breed: "German Shepherd", status: "Active" } });
    //   console.log("✅ Breeds Seeded");

    //   const cityPool = [newYork, london];
    //   const countryPool = [usa, uk];
    //   const categoryPool = [purebred, mixedBreed, workingDogs];
    //   const breedPool = [labrador, belgianmalinois, germanShepherd];

    //   const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    //   const breed = getRandom(breedPool);
    //   const city = getRandom(cityPool);
    //   const country = countryPool.find(c => c.idCountry === city.countryId);
    //   const category = getRandom(categoryPool);

    //   console.log("🌳 Seeding one large dog family...");
    //   await createDogWithLineageAndTrack({
    //     generationsLeft: 5,
    //     sex: "Male",
    //     breedId: breed.id,
    //     cityId: city.id,
    //     countryId: country.idCountry,
    //     categoryId: category.id
    //   });

    //   console.log(`✅ Created ${dogFamily.length} related dogs`);

    //   const femaleDog = dogFamily.find(d => d.sex === "Female");
    //   const maleDog = dogFamily.find(d => d.sex === "Male" && d.id !== femaleDog?.id);

    //   if (maleDog && femaleDog) {
    //     console.log("🧪 Test Pair for Inbreeding:");
    //     console.log("♀️ Female ID:", femaleDog.id);
    //     console.log("♂️ Male ID:", maleDog.id);
    //   } else {
    //     console.log("⚠️ Could not find suitable pair to test inbreeding");
    //   }

    console.log("🎉 Seeding completed!");
}

main()
    .catch((error) => {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
