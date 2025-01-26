export const mainMenuList = [
    {
      id: 0,
      name: "dashboards",
      path: "/",
      icon: "feather-airplay",
      dropdownMenu: [],
    },
    {
      id: 1,
      name: "Patients",
      path: "#",
      icon: "feather-users",
      dropdownMenu: [
        {
          id: 30, // Updated to ensure uniqueness
          name: "Add Patient",
          path: "#",
          subdropdownMenu: false,
        },
        {
          id: 31, // Updated to ensure uniqueness
          name: "View Patients",
          path: "#",
          subdropdownMenu: false,
        },
      ],
    },
    {
      id: 2, // Updated to ensure uniqueness
      name: "All Clinic's",
      path: "#",
      icon: "clinics", // Added hospital icon here
      dropdownMenu: [
        {
          id: 45, // Updated to ensure uniqueness
          name: "Add Clinic",
          path: "#",
          subdropdownMenu: false,
        },
        {
          id: 46, // Updated to ensure uniqueness
          name: "View Clinic's",
          path: "#",
          subdropdownMenu: false,
        },
      ],
    },
    {
      id: 3,
      name: "Clinic Inventory",
      path: "#",
      icon: "inventory", // Existing icon for inventory
      dropdownMenu: [
        {
          id: 40, // Updated to ensure uniqueness
          name: "Clinic1",
          path: "#",
          subdropdownMenu: false,
        },
        {
          id: 41, // Updated to ensure uniqueness
          name: "Clinic2",
          path: "#",
          subdropdownMenu: false,
        },
        {
          id: 42, // Updated to ensure uniqueness
          name: "Clinic3",
          path: "#",
          subdropdownMenu: false,
        },
        {
          id: 43, // Updated to ensure uniqueness
          name: "Clinic4",
          path: "#",
          subdropdownMenu: false,
        },
        {
          id: 44, // Updated to ensure uniqueness
          name: "Clinic5",
          path: "#",
          subdropdownMenu: false,
        },
      ],
    }
    
  ];
  