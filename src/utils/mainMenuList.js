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
      id: 2,
      name: "Hospital Inventory",
      path: "#",
      icon: "feather-package", // Existing icon for inventory
      dropdownMenu: [
        {
          id: 40, // Updated to ensure uniqueness
          name: "List Hospitals",
          path: "#",
          subdropdownMenu: false,
        },
        {
          id: 41, // Updated to ensure uniqueness
          name: "Add Hospital",
          path: "#",
          subdropdownMenu: false,
        },
        {
          id: 42, // Added for medicines
          name: "Medicine",
          path: "#",
          icon: "feather-medical", // New icon for medicine
          subdropdownMenu: false,
        },
      ],
    },
    {
      id: 3, // Updated to ensure uniqueness
      name: "Hospital Types",
      path: "#",
      icon: "feather-hospital", // Added hospital icon here
      dropdownMenu: [
        {
          id: 45, // Updated to ensure uniqueness
          name: "Add Hospital Type",
          path: "#",
          subdropdownMenu: false,
        },
        {
          id: 46, // Updated to ensure uniqueness
          name: "View Hospital Types",
          path: "/hospitaltypes",
          subdropdownMenu: false,
        },
      ],
    },
  ];
  