import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postData, fetchData, putData, deleteData } from "../api/HttpClient";
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

  console.log(editContent)

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

  const removeDocument = async (documentId) => {
    try {
      const response = await deleteData(`/api/patients/deleteimage/${documentId}`);
  
      console.log(response);
  
      if (response.isSuccess) {
        alert("File Deleted Successfully");
  
        setFormData((prev) => ({
          ...prev,
          documents: prev.documents.filter((doc) => doc._id !== documentId),
        }));
        
      } else {
        throw new Error(response.message || "Failed to delete file");
      }
  
    } catch (error) {
      alert(error.message || "An error occurred while deleting the file");
    }
  };
  

  //console.log(formData)
  //console.log(editContent._id)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
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
        setEditContent(null)
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

      <form onSubmit={handleSubmit} className="container p-4 bg-light border rounded">
        <div className="row g-3">
          {/* Name */}
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} className="form-control" required />
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} className="form-control" required />
          </div>

          {/* Contact */}
          <div className="col-md-6">
            <label className="form-label">Contact (10 digits)</label>
            <input type="text" name="contact" placeholder="Enter Contact Number" value={formData.contact} onChange={handleChange} className="form-control" required />
          </div>

          {/* Diagnosis */}
          <div className="col-md-6">
            <label className="form-label">Diagnosis</label>
            <input type="text" name="diagnosis" placeholder="Enter Diagnosis" value={formData.diagnosis} onChange={handleChange} className="form-control" required />
          </div>

          {/* Dates Section */}
          <div className="col-md-6">
            <label className="form-label">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date of Admission</label>
            <input type="date" name="dateOfAdmission" value={formData.dateOfAdmission} onChange={handleChange} className="form-control" required />
          </div>

          <div className="col-md-6">
            <label className="form-label">Operation Date</label>
            <input type="date" name="operationDateTime" value={formData.operationDateTime} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-6">
            <label className="form-label">Discharge Date</label>
            <input type="date" name="dateOfDischarge" value={formData.dateOfDischarge} onChange={handleChange} className="form-control" />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date of Dressing</label>
            <input type="date" name="dateOfDressing" value={formData.dateOfDressing} onChange={handleChange} className="form-control" />
          </div>

          {/* Gender */}
          <div className="col-md-6">
            <label className="form-label">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="form-select">
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

          </div>

          {/* Doctor Selection */}
          <div className="col-md-6">
            <label className="form-label">Doctor</label>
            <select name="doctor" value={formData.doctor} onChange={handleChange} className="form-select" required>
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>{doc.name}</option>
              ))}
            </select>
          </div>

          {/* Clinic Selection */}
          <div className="col-md-6">
            <label className="form-label">Clinic</label>
            <select name="clinic" value={formData.clinic} onChange={handleChange} className="form-select" required>
              <option value="">Select Clinic</option>
              {clinics.map((clinic) => (
                <option key={clinic._id} value={clinic._id}>{clinic.name}</option>
              ))}
            </select>
          </div>

          {/* Age */}
          <div className="col-md-6">
            <label className="form-label">Age</label>
            <input type="number" name="age" placeholder="Enter Age" value={formData.age} onChange={handleChange} className="form-control" required />
          </div>

          {/* File Upload */}
          {/* <div className="col-md-6">
            <label className="form-label">Upload Documents</label>
            <input type="file" multiple onChange={handleFileChange} className="form-control" />
          </div> */}

          {/* Staff Surgeons Multi-Select */}
          <div className="col-md-6">
            <label className="form-label">Staff Surgeons</label>
            <Select isMulti options={doctors.map((doc) => ({ value: doc._id, label: doc.name }))} onChange={handleStaffSurgeonChange} className="form-controls" placeholder="Select Staff Surgeons" />
          </div>



          {/* Display Uploaded Documents */}
          {/* <div className="col-md-12">
            <label className="form-label">Uploaded Documents</label>
            <div className="container">
              <div className="row g-3">
                {formData.documents.map((doc, index) => (
                  doc.fileUrl ? (
                    <div key={index} className="col-6 col-md-4 col-lg-3 position-relative">
                      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                        <img
                          src={doc.fileUrl}
                          alt={`Document ${index + 1}`}
                          className="img-fluid border rounded"
                          style={{ width: "100%", height: "auto", objectFit: "cover" }}
                        />
                      </a>
                      <div
                        onClick={() => removeDocument(doc._id)}
                        className="position-absolute top-0 end-0 btn btn-sm btn-danger m-1"
                        style={{ zIndex: 10, cursor: "pointer" }}
                      >
                        X
                      </div>
                    </div>
                  ) : null
                ))}

              </div>
            </div>


          </div> */}


          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              {editContent ? "Update Patient" : "Create Patient"}
            </button>
          </div>
        </div>
      </form>

    </div>
  );
};

export default CreatePatient;
