const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Seed Status data
  const statusData = [
    { id: 1, status: "1" },
    { id: 2, status: "0" },
  ];

  for (const status of statusData) {
    await prisma.status.upsert({
      where: { id: status.id },
      update: {},
      create: status,
    });
  }

  // Seed Repository data
  const repositories = [
    {
      id: 671061979,
      repo_owner: "Gayle-Thompson-Igwebike",
      repo_name: "Good-PR-v1",
      repo_url: "https://github.com/Gayle-Thompson-Igwebike/GOOD-PR-v1",
      demo_url: "https://the-goodpr.onrender.com",
      cohort: "WM5",
      team_name: "Team Alpha",
      statusId: 1, // Assuming the status for this repo is 1
    },
    {
      id: 653794551,
      repo_owner: "ShayanMahnam",
      repo_name: "lentegeur-hospital-facility-board",
      repo_url:
        "https://github.com/ShayanMahnam/lentegeur-hospital-facility-board",
      demo_url: "https://lentegeur-hospital-facility-board.vercel.app/",
      cohort: "WM5",
      team_name: "Group 5",
      statusId: 1, // Assuming the status for this repo is 1
    },
    {
      id: 654251545,
      repo_owner: "Innapoliakova",
      repo_name: "set",
      repo_url: "https://github.com/Innapoliakova/set",
      demo_url: "https://cyf-set.onrender.com/",
      cohort: "NW6",
      team_name: "Set",
      statusId: 2, // Assuming the status for this repo is 0
    },
    {
      id: 466878624,
      repo_owner: "erin-switchstitch",
      repo_name: "deskeando",
      repo_url: "https://github.com/erin-switchstitch/deskeando",
      demo_url: "https://starter-kit-rd3m.onrender.com/",
      cohort: "WM5",
      team_name: "example deskeando",
      statusId: 1, // Assuming the status for this repo is 1
    },
    {
      id: 654107827,
      repo_owner: "howard-ss",
      repo_name: "Study-Buddies-Final-Project",
      repo_url: "https://github.com/howard-ss/Study-Buddies-Final-Project",
      demo_url: "https://starter-kit-rd3m.onrender.com/",
      cohort: "NW6",
      team_name: "Group 2",
      statusId: 2, // Assuming the status for this repo is 0
    },
    {
      id: 668917801,
      repo_owner: "MariAzhdari",
      repo_name: "finalProject-HubPlanner",
      repo_url: "https://github.com/MariAzhdari/finalProject-HubPlanner",
      demo_url: "https://starter-kit-rd3m.onrender.com/",
      cohort: "NW6",
      team_name: "Hub Planner",
      statusId: 1, // Assuming the status for this repo is 1
    },
  ];

  for (const repo of repositories) {
    await prisma.repository.upsert({
      where: { repo_name: repo.repo_name },
      update: {},
      create: repo,
    });
  }

  console.log("Seed data created");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
