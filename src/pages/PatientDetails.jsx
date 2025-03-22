import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PatientDetails = ({ data, setData }) => {
  if (!data) return null;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => setData(null)}>
        &#8592; Back
      </button>

      <div className="card p-3">
        <h3 className="card-title text-center mb-3">Patient Details</h3>
        <div className="row">
          {/* Patient Information */}
          <div className="col-md-6">
            <h5>Personal Information</h5>
            <ul className="list-group mb-3">
              <li className="list-group-item"><strong>Name:</strong> {data.name}</li>
              <li className="list-group-item"><strong>Age:</strong> {data.age}</li>
              <li className="list-group-item"><strong>Gender:</strong> {data.gender}</li>
              <li className="list-group-item"><strong>Contact:</strong> {data.contact}</li>
              <li className="list-group-item"><strong>Email:</strong> {data.email}</li>
              <li className="list-group-item"><strong>Date of Birth:</strong> {new Date(data.dob).toDateString()}</li>
            </ul>
          </div>

          {/* Medical Information */}
          <div className="col-md-6">
            <h5>Medical Information</h5>
            <ul className="list-group mb-3">
              <li className="list-group-item"><strong>Diagnosis:</strong> {data.diagnosis}</li>
              <li className="list-group-item"><strong>Date of Admission:</strong> {new Date(data.dateOfAdmission).toDateString()}</li>
              <li className="list-group-item"><strong>Date of Discharge:</strong> {data.dateOfDischarge ? new Date(data.dateOfDischarge).toDateString() : "N/A"}</li>
              <li className="list-group-item"><strong>Operation Date:</strong> {data.operationDateTime ? new Date(data.operationDateTime).toDateString() : "N/A"}</li>
              <li className="list-group-item"><strong>Dressing Date:</strong> {data.dateOfDressing ? new Date(data.dateOfDressing).toDateString() : "N/A"}</li>
            </ul>
          </div>
        </div>

        {/* Doctor Information */}
        {data.doctor && (
          <div className="mt-3">
            <h5>Doctor Information</h5>
            <ul className="list-group">
              <li className="list-group-item"><strong>Name:</strong> {data.doctor.name}</li>
              <li className="list-group-item"><strong>Specialization:</strong> {data.doctor.specialization}</li>
              <li className="list-group-item"><strong>Contact:</strong> {data.doctor.contact}</li>
              <li className="list-group-item"><strong>Email:</strong> {data.doctor.email}</li>
              <li className="list-group-item"><strong>Address:</strong> {data.doctor.address}</li>
            </ul>
          </div>
        )}

        {/* Clinic Information */}
        {data.clinic && (
          <div className="mt-3">
            <h5>Clinic Information</h5>
            <ul className="list-group">
              <li className="list-group-item"><strong>Name:</strong> {data.clinic.name}</li>
              <li className="list-group-item"><strong>Address:</strong> {data.clinic.address}</li>
              <li className="list-group-item"><strong>Contact:</strong> {data.clinic.contact}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;
