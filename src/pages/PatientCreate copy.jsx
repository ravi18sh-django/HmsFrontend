import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postData, fetchData, putData } from "../api/HttpClient";
import Select from "react-select";
//import { ArrowLeft, ChevronLeft } from "react-bootstrap-icons";


const CreatePatient = ({
    editContent,
    setEditContent
}) => {
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        dob: "",
        age: "",
        gender: "",
        notes: "",
        dateOfAdmission: "",
        operationDateTime: "",
        dateOfDischarge: "",
        dateOfDressing: "",
        doctor: "",
        clinic: "",
        staffSurgeon: [],
        diagnosis: "",
        documents: [],
    });

    useEffect(() => {


        const fetchDoctorsAndClinics = async () => {
            try {
                const doctorsData = await fetchData("/api/doctors");
                const clinicsData = await fetchData("/api/clinics");
                if (doctorsData) {
                    setDoctors(doctorsData);
                }

                setClinics(clinicsData || []);
            } catch (error) {
                console.error("Error fetching doctors or clinics:", error);
            }
        };
        fetchDoctorsAndClinics();

        // If ID exists, fetch patient data for editing
        if (editContent) {
            const fetchPatient = async () => {



                setFormData((prevData) => ({
                    ...prevData,
                    ...editContent, // Spread the entire patient data
                    dob: editContent.dob ? editContent.dob.split("T")[0] : "",
                    dateOfAdmission: editContent.dateOfAdmission ? editContent.dateOfAdmission.split("T")[0] : "",
                    operationDateTime: editContent.operationDateTime ? editContent.operationDateTime.split("T")[0] : "",
                    dateOfDischarge: editContent.dateOfDischarge ? editContent.dateOfDischarge.split("T")[0] : "",
                    dateOfDressing: editContent.dateOfDressing ? editContent.dateOfDressing.split("T")[0] : "",
                    doctor: editContent.doctor ? editContent.doctor._id : "",
                    clinic: editContent.clinic ? editContent.clinic._id : "",
                    staffSurgeon: editContent.staffSurgeon || "", // Ensure it's not null
                    documents: editContent.documents || [], // Ensure it's an array
                }));


            };
            fetchPatient();
        }


    }, [editContent]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStaffSurgeonChange = (selectedOptions) => {
        setFormData((prev) => ({
            ...prev,
            staffSurgeon: selectedOptions.map((option) => option.value),
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            documents: [...prev.documents, ...Array.from(e.target.files)],
        }));
    };

    const removeDocument = (index) => {
        setFormData((prev) => ({
            ...prev,
            documents: prev.documents.filter((_, i) => i !== index),
        }));
    };
    console.log(formData)
    //console.log(editContent._id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        // Append fields except "documents"
        Object.keys(formData).forEach((key) => {
            if (key !== "documents") {
                formDataToSend.append(key, formData[key]);
            }
        });

        // Append documents only if they exist
        if (formData.documents.length > 0) {
            formData.documents.forEach((file) => {
                formDataToSend.append("documents", file);
            });
        }

        try {
            const endpoint = editContent?._id
                ? `/api/patients/${editContent._id}`  // Update
                : "/api/patients";  // Create

            let response;

            if (editContent) {

                response = await putData(endpoint, formDataToSend, true);
            } else {
                response = await postData(endpoint, formDataToSend, true);
            }



            if (response.isSuccess) {
                navigate("/patients");
            } else {
                console.error("Failed to submit patient data:", response.message);
            }
        } catch (error) {
            console.error("Error submitting patient data:", error);
        }

    };

    return (
        <div className="max-w-2xl mx-auto  p-6 bg-white shadow-lg rounded-lg">
            <div className="d-flex p-3 justify-content-between align-items-center mb-4">
                {editContent && (
                    <button
                        onClick={() => setEditContent(null)}
                        className="btn btn-outline-secondary me-3"
                    >
                        <i className="bi bi-chevron-left"></i> Go Back
                    </button>
                )}

                <h2 className="mb-0">
                    {editContent ? "Edit Patient" : "Create Patient"}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="contact" placeholder="Contact (10 digits)" value={formData.contact} onChange={handleChange} className="w-full p-2 border rounded" required />
                <input type="text" name="diagnosis" placeholder="Diagnosis" value={formData.diagnosis} onChange={handleChange} className="w-full p-2 border rounded" required />

                <label>Date Of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border rounded" required />

                <label>Date Of Admission</label>
                <input type="date" name="dateOfAdmission" value={formData.dateOfAdmission} onChange={handleChange} className="w-full p-2 border rounded" required />

                <label>Operation Date</label>
                <input type="date" name="operationDateTime" value={formData.operationDateTime} onChange={handleChange} className="w-full p-2 border rounded" />

                <label>Discharge Date</label>
                <input type="date" name="dateOfDischarge" value={formData.dateOfDischarge} onChange={handleChange} className="w-full p-2 border rounded" />

                <label>Date Of Dressing</label>
                <input type="date" name="dateOfDressing" value={formData.dateOfDressing} onChange={handleChange} className="w-full p-2 border rounded" />

                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
                    <option disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                {/* <select name="doctor" value={formData.doctor} onChange={handleChange} className="w-full p-2 border rounded" required>
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>{doc.name}</option>
                    ))}
                </select> */}

                <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>
                            {doc.name}
                        </option>
                    ))}
                </select>


                <select name="clinic" value={formData.clinic} onChange={handleChange} className="w-full p-2 border rounded" required>
                    <option value="">Select Clinic</option>
                    {clinics.map((clinic) => (
                        <option key={clinic._id} value={clinic._id}>{clinic.name}</option>
                    ))}
                </select>

                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded" required />

                <Select
                    isMulti
                    options={doctors.map((doc) => ({ value: doc._id, label: doc.name }))}
                    onChange={handleStaffSurgeonChange}
                    className="w-full"
                    placeholder="Select Staff Surgeons"
                />


                <input type="file" multiple onChange={handleFileChange} className="w-full p-2 border rounded" />

                {/* Display uploaded documents */}
                <div className="flex flex-wrap gap-2">
                    {formData.documents.map((doc, index) => (
                        <div key={index} className="relative w-20 h-20">
                            <a href={`https://drive.google.com/uc?id=${doc.fileId}`} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={`https://drive.google.com/thumbnail?id=${doc.fileId}&sz=w1000`}
                                    alt={doc.fileName || "Document"}
                                    className=" object-cover rounded"
                                />
                            </a>
                            <button
                                onClick={() => removeDocument(index)}
                                className="absolute top-0 right-0 bg-red-500 text-xs px-2 rounded-full"
                            >
                                X
                            </button>
                        </div>
                    ))}



                </div>

                <button type="submit" className="w-full bg-blue-600 p-2 rounded">{editContent ? "Update Patient" : "Create Patient"}</button>
            </form>
        </div>
    );
};

export default CreatePatient;
