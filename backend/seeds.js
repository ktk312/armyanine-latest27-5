// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// const { faker } = require("@faker-js/faker");

// const dogFamily = [];

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

//   const sire = await createDogWithLineageAndTrack({ generationsLeft: generationsLeft - 1, sex: "Male", breedId, cityId, countryId, categoryId });
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

// async function main() {
//   console.log("🌱 Seeding database...");

//   const user = await prisma.user.create({
//     data: {
//       name: "Admin User",
//       email: "admin1@example.com",
//       password: "$2a$12$jZmPVUgryGG.qoMnRYehd.khpL.gU4nvTwwlxqYju6cQWU5BOPrG2",
//       role: "admin",
//     }
//   });
//   console.log("✅ User Seeded:", user.email);

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

//   console.log("🎉 Seeding completed!");
// }

// main()
//   .catch((error) => {
//     console.error("❌ Error seeding database:", error);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
