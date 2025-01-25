// src/utils/crmStatisticsData.js
import { BsPerson, BsHospital, BsPersonBadge, BsArchive } from 'react-icons/bs';  // Import icons

export const crmStatisticsData = [
    {
        id: 1,
        title: "Patients",
        total_number: "120",
        completed_number: "80",
        progress: "67%",
        progress_info: "80 Patients in Treatment",
        icon: <BsPerson /> // Store the icon component directly
    },
    {
        id: 2,
        title: "Clinics",
        total_number: "5",
        completed_number: "4",
        progress: "80%",
        progress_info: "4 Clinics Operational",
        icon: <BsHospital /> // Store the icon component directly
    },
    {
        id: 3,
        title: "Doctors",
        total_number: "50",
        completed_number: "30",
        progress: "60%",
        progress_info: "30 Doctors Active",
        icon: <BsPersonBadge /> // Store the icon component directly
    },
    {
        id: 4,
        title: "Inventory",
        total_number: "1000",
        completed_number: "800",
        progress: "80%",
        progress_info: "800 Items Available",
        icon: <BsArchive /> // Store the icon component directly
    },
]
