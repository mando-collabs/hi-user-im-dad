const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function seed() {
  await db.joke.create({
    data: {
      externalId: null,
      delivered: false,
      content:
        "Why does a chicken coop only have two doors? Because if it had four doors it would be a chicken sedan.",
      submitter: {
        create: {
          email: "bryan.muller@rms.com",
          displayName: "Bryan Müller",
        },
      },
    },
  });
}

seed();
