import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { normalPostData, normalPutData, fetchData } from "../api/HttpClient"; // Adjust import based on your project


const CreateInventory = ({ editClinic, setEditContent }) => {
    const navigate = useNavigate();

    const [clinics, setClinics] = useState([]);
    const [categories, setCategories] = useState([]);

    // Set initial state from editClinic if provided, otherwise empty form
    const [clinicData, setClinicData] = useState({
        name: editClinic?.name || "",
        category: editClinic?.category || "",
        quantity: editClinic?.quantity || 0,
        unit: editClinic?.unit || "",
        supplier: editClinic?.supplier || "",
        purchaseDate: editClinic?.purchaseDate.split("T")[0] || "",
        expiryDate: editClinic?.expiryDate.split("T")[0] || "",
        costPrice: editClinic?.costPrice || "",
        sellingPrice: editClinic?.sellingPrice || "",
        clinic: editClinic?.clinic._id || ""
    });

    useEffect(() => {
        const fetchClinicsAndCategories = async () => {
            try {
                const clinicsData = await fetchData("/api/clinics");
                setClinics(clinicsData || []);

                const categoriesData = await fetchData("/api/categories");
                setCategories(categoriesData || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchClinicsAndCategories();
    }, []);

    const handleChange = (e) => {
        setClinicData({ ...clinicData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const endpoint = editClinic?._id
                ? `/api/inventory/${editClinic._id}` // Update existing clinic
                : "/api/inventory"; // Create new clinic

            const response = editClinic?._id
                ? await normalPutData(endpoint, clinicData, true) // PUT request for update
                : await normalPostData(endpoint, clinicData, true); // POST request for creation

            if (response) {


                navigate("/inventorylist"); // Redirect after successful submission
                setEditContent(null);
            } else {
                console.error("Failed to submit clinic data:", response.message);
            }
        } catch (error) {
            console.error("Error submitting clinic data:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* <h2 className="text-xl font-semibold mb-4">

            </h2> */}
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
                    {editClinic ? "Edit Inventory" : "Create Inventory"}
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
                    <label className="block text-gray-700">Category</label>
                    <select
                        name="category"
                        value={clinicData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                
                <div className="mb-4">
                    <label className="block text-gray-700">Clinic</label>
                    <select
                        name="clinic"
                        value={clinicData.clinic}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    >
                        <option value="">Select Clinic</option>
                        {clinics.map((cl) => (
                            <option key={cl._id} value={cl._id}>
                                {cl.name}
                            </option>
                        ))}
                    </select>
                </div>

                
                <div className="mb-4">
                    <label className="block text-gray-700">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={clinicData.quantity}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                
                <div className="mb-4">
                    <label className="block text-gray-700">Unit</label>
                    <input
                        type="text"
                        name="unit"
                        value={clinicData.unit}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                
                <div className="mb-4">
                    <label className="block text-gray-700">Supplier</label>
                    <input
                        type="text"
                        name="supplier"
                        value={clinicData.supplier}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                
                <div className="mb-4">
                    <label className="block text-gray-700">Purchase Date</label>
                    <input
                        type="date"
                        name="purchaseDate"
                        value={clinicData.purchaseDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                
                <div className="mb-4">
                    <label className="block text-gray-700">Expiry Date</label>
                    <input
                        type="date"
                        name="expiryDate"
                        value={clinicData.expiryDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                
                <div className="mb-4">
                    <label className="block text-gray-700">Cost Price</label>
                    <input
                        type="number"
                        name="costPrice"
                        value={clinicData.costPrice}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                
                <div className="mb-4">
                    <label className="block text-gray-700">Selling Price</label>
                    <input
                        type="number"
                        name="sellingPrice"
                        value={clinicData.sellingPrice}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg"
                        required
                    />
                </div>

                
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                    {editClinic ? "Update Inventory" : "Create Inventory"}
                </button>
            </form> */}
            <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow bg-white">
                <div className="row g-3">
                    <div className="mb-1 col-md-6">
                        <label className="form-label fw-bold">Name</label>
                        <input type="text" name="name" value={clinicData.name} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-1 col-md-6">
                        <label className="form-label fw-bold">Category</label>
                        <select name="category" value={clinicData.category} onChange={handleChange} className="form-select" required>
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-1 col-md-6">
                        <label className="form-label fw-bold">Clinic</label>
                        <select name="clinic" value={clinicData.clinic} onChange={handleChange} className="form-select" required>
                            <option value="">Select Clinic</option>
                            {clinics.map((cl) => (
                                <option key={cl._id} value={cl._id}>{cl.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-1 col-md-6">
                        <label className="form-label fw-bold">Quantity</label>
                        <input type="number" name="quantity" value={clinicData.quantity} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-1 col-md-6">
                        <label className="form-label fw-bold">Unit</label>
                        <input type="text" name="unit" value={clinicData.unit} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-1 col-md-6">
                        <label className="form-label fw-bold">Supplier</label>
                        <input type="text" name="supplier" value={clinicData.supplier} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-1 col-md-6">
                        <label className="form-label fw-bold">Purchase Date</label>
                        <input type="date" name="purchaseDate" value={clinicData.purchaseDate} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-1 col-md-6">
                        <label className="form-label fw-bold">Expiry Date</label>
                        <input type="date" name="expiryDate" value={clinicData.expiryDate} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-1 col-md-6">
                        <label className="form-label fw-bold">Cost Price</label>
                        <input type="number" name="costPrice" value={clinicData.costPrice} onChange={handleChange} className="form-control" required />
                    </div>

                    <div className="mb-1 col-md-6">
                        <label className="form-label fw-bold">Selling Price</label>
                        <input type="number" name="sellingPrice" value={clinicData.sellingPrice} onChange={handleChange} className="form-control" required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    {editClinic ? "Update Inventory" : "Create Inventory"}
                </button>
            </form>

        </div>
    );
};

export default CreateInventory;
