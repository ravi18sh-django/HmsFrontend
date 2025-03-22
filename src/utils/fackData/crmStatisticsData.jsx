import { useState, useEffect } from "react";
import { BsPerson, BsHospital, BsPersonBadge, BsArchive } from "react-icons/bs";  

const useCrmStatisticsData = () => {
    const [data, setData] = useState({
        patient: 0,
        doctor: 0,
        clinic: 0,
        inventory: 0
    });

    useEffect(() => {
        const patient = localStorage.getItem("HMSMernPatient") || 0;
        const doctor = localStorage.getItem("HMSMernDoctor") || 0;
        const clinic = localStorage.getItem("HMSMernClinic") || 0;
        const inventory = localStorage.getItem("HMSMernInventory") || 0;

        setData({
            patient,
            doctor,
            clinic,
            inventory
        });
    }, []);

    return [
        {
            id: 1,
            title: "Patients",
            total_number: data.patient,
            completed_number: "80",
            progress: "67%",
            progress_info: `${data.patient} Patients in Treatment`,
            icon: <BsPerson />
        },
        {
            id: 2,
            title: "Clinics",
            total_number: data.clinic,
            completed_number: "4",
            progress: "80%",
            progress_info: `${data.clinic} Clinics Operational`,
            icon: <BsHospital />
        },
        {
            id: 3,
            title: "Doctors",
            total_number: data.doctor,
            completed_number: "30",
            progress: "60%",
            progress_info: `${data.doctor} Doctors Active`,
            icon: <BsPersonBadge />
        },
        {
            id: 4,
            title: "Inventory",
            total_number: data.inventory,
            completed_number: "800",
            progress: "80%",
            progress_info: "800 Items Available",
            icon: <BsArchive />
        },
    ];
};

export default useCrmStatisticsData;
