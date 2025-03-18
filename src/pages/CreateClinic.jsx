import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { normalPostData, normalPutData } from "../api/HttpClient"// Adjust import based on your project

const CreateClinic = ({ editClinic, setEditContent }) => {
    const navigate = useNavigate();

    

    // Set initial state from editClinic if provided, otherwise empty form
    const [clinicData, setClinicData] = useState({
        name: editClinic?.name || "",
        address: editClinic?.address || "",
        contact: editClinic?.contact || "",
    });

    const handleChange = (e) => {
        setClinicData({ ...clinicData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endpoint = editClinic?._id
                ? `/api/clinics/${editClinic._id}` // Update existing clinic
                : "/api/clinics"; // Create new clinic

            const response = editClinic?._id
                ? await normalPutData(endpoint, clinicData, true) // PUT request for update
                : await normalPostData(endpoint, clinicData, true); // POST request for creation

            if (response) {
                if(editClinic){
                    setEditContent(null);
                }
                 
                navigate("/Clinic");
                
            } else {
                console.error("Failed to submit clinic data:", response.message);
            }
        } catch (error) {
            console.error("Error submitting clinic data:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
           
            <div className="d-flex p-3 justify-content-between align-items-center mb-4">
                {editClinic && (
                    <button
                        onClick={() => setEditContent(null)}
                        className="btn btn-outline-secondary me-3"
                    >
                        <i className="bi bi-chevron-left"></i> Go Back
                    </button>
                )}

                <h2 className="mb-0">
                {editClinic ? "Edit Clinic" : "Create Clinic"}
                </h2>
            </div>
            {/* <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={clinicData.name}
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
                        value={clinicData.address}
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
                        value={clinicData.contact}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    {editClinic ? "Update Clinic" : "Create Clinic"}
                </button>
            </form> */}
            <form onSubmit={handleSubmit} className="container p-4 border rounded bg-light">
    <div className="mb-3">
        <label className="form-label fw-bold">Name</label>
        <input
            type="text"
            name="name"
            value={clinicData.name}
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
            value={clinicData.address}
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
            value={clinicData.contact}
            onChange={handleChange}
            className="form-control"
            required
        />
    </div>
    <button
        type="submit"
        className="btn btn-primary w-100"
    >
        {editClinic ? "Update Clinic" : "Create Clinic"}
    </button>
</form>

        </div>
    );
};

export default CreateClinic;
