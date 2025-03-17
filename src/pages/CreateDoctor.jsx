import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { normalPostData, normalPutData, fetchData } from "../api/HttpClient"; // Adjust import based on your project

const CreateDoctor = ({ editDoctor, setEditContent }) => {
    const navigate = useNavigate();

    // State for doctor data
    const [doctorData, setDoctorData] = useState({
        name: editDoctor?.name || "",
        specialization: editDoctor?.specialization || "",
        contact: editDoctor?.contact || "",
        email: editDoctor?.email || "",
        address: editDoctor?.address || "",
        clinic: editDoctor?.clinic._id || "", // Stores clinic ID
    });

    // State for available clinics
    const [clinics, setClinics] = useState([]);

    // Fetch clinics on component mount
    useEffect(() => {
        const fetchDoctorsAndClinics = async () => {
            try {
                const clinicsData = await fetchData("/api/clinics");
                setClinics(clinicsData || []);
            } catch (error) {
                console.error("Error fetching clinics:", error);
            }
        };
        fetchDoctorsAndClinics();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endpoint = editDoctor?._id
                ? `/api/doctors/${editDoctor._id}` // Update existing doctor
                : "/api/doctors"; // Create new doctor

            const response = editDoctor?._id
                ? await normalPutData(endpoint, doctorData, true) // PUT request
                : await normalPostData(endpoint, doctorData, true); // POST request

            if (response) {
                editDoctor ? setEditContent(null) : null;

                navigate("/Doctors"); // Redirect after successful submission
            } else {
                console.error("Failed to submit doctor data:", response.message);
            }
        } catch (error) {
            console.error("Error submitting doctor data:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            
            <div className="d-flex p-3 justify-content-between align-items-center mb-4">
                {editDoctor && (
                    <button
                        onClick={() => setEditContent(null)}
                        className="btn btn-outline-secondary me-3"
                    >
                        <i className="bi bi-chevron-left"></i> Go Back
                    </button>
                )}

                <h2 className="mb-0">
                {editDoctor ? "Edit Doctor" : "Create Doctor"}
                </h2>
            </div>
            {/* <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={doctorData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Specialization</label>
                    <input
                        type="text"
                        name="specialization"
                        value={doctorData.specialization}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Contact</label>
                    <input
                        type="text"
                        name="contact"
                        value={doctorData.contact}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={doctorData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={doctorData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                
                <div className="mb-4">
                    <label className="block text-gray-700">Clinic</label>
                    <select
                        name="clinic"
                        value={doctorData.clinic}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    >
                        <option value="">Select a Clinic</option>
                        {clinics.map((clinic) => (
                            <option key={clinic._id} value={clinic._id}>
                                {clinic.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    {editDoctor ? "Update Doctor" : "Create Doctor"}
                </button>
            </form> */}

            <form onSubmit={handleSubmit} className="container p-4 border rounded bg-light">
                <div className="mb-3">
                    <label className="form-label fw-bold">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={doctorData.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Specialization</label>
                    <input
                        type="text"
                        name="specialization"
                        value={doctorData.specialization}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Contact</label>
                    <input
                        type="text"
                        name="contact"
                        value={doctorData.contact}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={doctorData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-bold">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={doctorData.address}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                {/* Clinic Dropdown */}
                <div className="mb-3">
                    <label className="form-label fw-bold">Clinic</label>
                    <select
                        name="clinic"
                        value={doctorData.clinic}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option value="">Select a Clinic</option>
                        {clinics.map((clinic) => (
                            <option key={clinic._id} value={clinic._id}>
                                {clinic.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    {editDoctor ? "Update Doctor" : "Create Doctor"}
                </button>
            </form>

        </div>
    );
};

export default CreateDoctor;
