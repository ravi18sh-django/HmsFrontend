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
          path: "/patientscreate",
          subdropdownMenu: false,
        },
        {
          id: 31, // Updated to ensure uniqueness
          name: "View Patients",
          path: "/patients",
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
          path: "/createclinic",
          subdropdownMenu: false,
        },
        {
          id: 46, // Updated to ensure uniqueness
          name: "View Clinic's",
          path: "/Clinic",
          subdropdownMenu: false,
        },
      ],
    },
    {
      id: 3, // Unique ID for Doctors
      name: "All Doctors",
      path: "#",
      icon: "doctors", // Updated icon to represent doctors
      dropdownMenu: [
        {
          id: 47, // Unique ID for Add Doctor
          name: "Add Doctor",
          path: "/createdoctor",
          subdropdownMenu: false,
        },
        {
          id: 48, // Unique ID for View Doctors
          name: "View Doctors",
          path: "/doctors",
          subdropdownMenu: false,
        },
      ],
    },
    
    {
      id: 4,
      name: "Clinic Inventory",
      path: "#",
      icon: "inventory", // Existing icon for inventory
      dropdownMenu: [
        {
          id: 40, // Updated to ensure uniqueness
          name: "Inventory List",
          path: "/inventorylist",
          subdropdownMenu: false,
        },
        {
          id: 41, // Updated to ensure uniqueness
          name: "Add Inventory",
          path: "/createinventory",
          subdropdownMenu: false,
        },
        {
          id: 42, // Updated to ensure uniqueness
          name: "Create Category",
          path: "/create_category",
          subdropdownMenu: false,
        },
        {
          id: 43, // Updated to ensure uniqueness
          name: "Category List",
          path: "/categorylist",
          subdropdownMenu: false,
        },
       
      ],
    },
    {
      id: 5,
      name: "Print Bill",
      path: "/printbill",
      icon: "feather-printer",
    }
    
    
  ];
  