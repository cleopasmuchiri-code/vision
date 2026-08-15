export const seedData = {
  users: [
    { id: "u1", name: "Cleopas" },
    { id: "u2", name: "Vincent" },
    { id: "u3", name: "Dancun" },
    { id: "u4", name: "Aysha" },
    { id: "u5", name: "Victor" },
  ],

  visions: [
    // --- COMPLETED VISIONS (Total Contributions >= Target) ---
    {
      id: "v1",
      title: "New phone",
      targetAmount: 12000, // Contributed: 12,000 (100%)
      targetDate: "2026-09-30",
      createdAt: "2026-07-15",
      memberIds: ["u1"],
      quickDefault: 100,
    },
    {
      id: "v5",
      title: "Birthday gift for Mary",
      targetAmount: 5000, // Contributed: 5,000 (100%)
      targetDate: "2026-08-20",
      createdAt: "2026-08-01",
      memberIds: ["u1", "u3"],
      quickDefault: 100,
    },
    {
      id: "v9",
      title: "Concert & Festival Tickets",
      targetAmount: 6500, // Contributed: 6,500 (100%)
      targetDate: "2026-09-05",
      createdAt: "2026-08-08",
      memberIds: ["u2", "u4", "u5"],
      quickDefault: 100,
    },

    // --- IN PROGRESS VISIONS (Total Contributions < Target) ---
    {
      id: "v2",
      title: "Diani trip",
      targetAmount: 40000, // Contributed: 23,000
      targetDate: null,
      createdAt: "2026-07-01",
      memberIds: ["u1", "u2", "u3"],
      quickDefault: 100,
    },
    {
      id: "v3",
      title: "Emergency fund",
      targetAmount: 20000, // Contributed: 10,000
      targetDate: null,
      createdAt: "2026-06-01",
      memberIds: ["u2"],
      quickDefault: 100,
    },
    {
      id: "v4",
      title: "New laptop",
      targetAmount: 60000, // Contributed: 25,000
      targetDate: "2026-12-01",
      createdAt: "2026-06-15",
      memberIds: ["u3"],
      quickDefault: 100,
    },
    {
      id: "v6",
      title: "Rent buffer",
      targetAmount: 10000, // Contributed: 5,000
      targetDate: null,
      createdAt: "2026-07-01",
      memberIds: ["u2"],
      quickDefault: 100,
    },
    {
      id: "v7",
      title: "Naivasha Getaway",
      targetAmount: 25000, // Contributed: 12,000
      targetDate: "2026-10-15",
      createdAt: "2026-08-05",
      memberIds: ["u1", "u4", "u5"],
      quickDefault: 500,
    },
    {
      id: "v8",
      title: "Home Studio Setup",
      targetAmount: 18000, // Contributed: 10,000
      targetDate: "2026-11-20",
      createdAt: "2026-07-15",
      memberIds: ["u4"],
      quickDefault: 200,
    },
    {
      id: "v10",
      title: "PS5 Console",
      targetAmount: 70000, // Contributed: 35,000
      targetDate: "2026-12-25",
      createdAt: "2026-07-10",
      memberIds: ["u1", "u3"],
      quickDefault: 500,
    },
  ],

  contributions: [
    // --- Vision 1: Completed (12,000 / 12,000) ---
    {
      id: "c1",
      visionId: "v1",
      memberId: "u1",
      amount: 4000,
      date: "2026-07-20",
    },
    {
      id: "c2",
      visionId: "v1",
      memberId: "u1",
      amount: 4000,
      date: "2026-08-05",
    },
    {
      id: "c3",
      visionId: "v1",
      memberId: "u1",
      amount: 4000,
      date: "2026-08-11",
    }, // u1 Streak Day 1

    // --- Vision 5: Completed (5,000 / 5,000) ---
    {
      id: "c10",
      visionId: "v5",
      memberId: "u1",
      amount: 1500,
      date: "2026-08-02",
    },
    {
      id: "c11",
      visionId: "v5",
      memberId: "u3",
      amount: 1000,
      date: "2026-08-03",
    }, // u3 Past Streak Day 3
    {
      id: "c13",
      visionId: "v5",
      memberId: "u1",
      amount: 2500,
      date: "2026-08-12",
    }, // u1 Streak Day 2

    // --- Vision 9: Completed (6,500 / 6,500) ---
    {
      id: "c25",
      visionId: "v9",
      memberId: "u2",
      amount: 2000,
      date: "2026-08-13",
    }, // u2 Streak Day 1
    {
      id: "c26",
      visionId: "v9",
      memberId: "u4",
      amount: 2500,
      date: "2026-08-12",
    }, // u4 Streak Day 1
    {
      id: "c27",
      visionId: "v9",
      memberId: "u5",
      amount: 2000,
      date: "2026-08-14",
    }, // u5 Streak Day 1

    // --- Vision 2: In Progress (23,000 / 40,000) ---
    {
      id: "c4",
      visionId: "v2",
      memberId: "u2",
      amount: 5000,
      date: "2026-07-10",
    },
    {
      id: "c5",
      visionId: "v2",
      memberId: "u1",
      amount: 4000,
      date: "2026-07-15",
    },
    {
      id: "c6",
      visionId: "v2",
      memberId: "u3",
      amount: 3000,
      date: "2026-08-01",
    }, // u3 Past Streak Day 1
    {
      id: "c7",
      visionId: "v2",
      memberId: "u3",
      amount: 2000,
      date: "2026-08-02",
    }, // u3 Past Streak Day 2
    {
      id: "c17",
      visionId: "v2",
      memberId: "u1",
      amount: 5000,
      date: "2026-08-13",
    }, // u1 Streak Day 3
    {
      id: "c18",
      visionId: "v2",
      memberId: "u2",
      amount: 4000,
      date: "2026-08-14",
    }, // u2 Streak Day 2

    // --- Vision 3: In Progress (10,000 / 20,000) ---
    {
      id: "c14",
      visionId: "v3",
      memberId: "u2",
      amount: 3000,
      date: "2026-06-15",
    },
    {
      id: "c15",
      visionId: "v3",
      memberId: "u2",
      amount: 4000,
      date: "2026-07-01",
    },
    {
      id: "c16",
      visionId: "v3",
      memberId: "u2",
      amount: 3000,
      date: "2026-08-01",
    },

    // --- Vision 4: In Progress (25,000 / 60,000) ---
    {
      id: "c8",
      visionId: "v4",
      memberId: "u3",
      amount: 15000,
      date: "2026-06-25",
    },
    {
      id: "c9",
      visionId: "v4",
      memberId: "u3",
      amount: 10000,
      date: "2026-07-28",
    },

    // --- Vision 6: In Progress (5,000 / 10,000) ---
    {
      id: "c12",
      visionId: "v6",
      memberId: "u2",
      amount: 2000,
      date: "2026-07-05",
    },
    {
      id: "c19",
      visionId: "v6",
      memberId: "u2",
      amount: 3000,
      date: "2026-08-10",
    },

    // --- Vision 7: In Progress (12,000 / 25,000) ---
    {
      id: "c20",
      visionId: "v7",
      memberId: "u1",
      amount: 3000,
      date: "2026-08-14",
    }, // u1 Streak Day 4
    {
      id: "c21",
      visionId: "v7",
      memberId: "u4",
      amount: 5000,
      date: "2026-08-13",
    }, // u4 Streak Day 2
    {
      id: "c22",
      visionId: "v7",
      memberId: "u5",
      amount: 4000,
      date: "2026-08-10",
    },

    // --- Vision 8: In Progress (10,000 / 18,000) ---
    {
      id: "c23",
      visionId: "v8",
      memberId: "u4",
      amount: 4000,
      date: "2026-07-20",
    },
    {
      id: "c24",
      visionId: "v8",
      memberId: "u4",
      amount: 3500,
      date: "2026-08-11",
    },
    {
      id: "c30",
      visionId: "v8",
      memberId: "u4",
      amount: 2500,
      date: "2026-08-14",
    }, // u4 Streak Day 3

    // --- Vision 10: In Progress (35,000 / 70,000) ---
    {
      id: "c28",
      visionId: "v10",
      memberId: "u1",
      amount: 15000,
      date: "2026-07-15",
    },
    {
      id: "c29",
      visionId: "v10",
      memberId: "u3",
      amount: 20000,
      date: "2026-07-28",
    },
  ],
};
