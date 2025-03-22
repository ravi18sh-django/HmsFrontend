import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReactToPrint } from 'react-to-print';
import header from "../../public/images/header.png"
import mark from "../../public/images/mark.png"
import footer from "../../public/images/footer.png"

const HospitalBill = ({ formData, setPopUp }) => {
  const billRef = useRef();

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const content = billRef.current.innerHTML;
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Hospital Bill</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
          <style>
            @page { size: A4; margin: 20mm; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; margin: 0; padding: 0; }
            .container { width: 100%; margin: auto; }
          </style>
        </head>
        <body>
          <div class="container">${content}</div>
        </body>
      </html>
    `);
    printWindow.document.head.innerHTML += `
  <style>
    @page { size: A4; margin: 20mm; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; margin: 0; padding: 0; }
    .container { width: 80%; margin: auto; }
  </style>
`;



    printWindow.document.close(); // Close the document before printing
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    };
  };
  
const printref = useRef()

const handlesPrint = useReactToPrint({
  content: () => printRef.current,
});

  return (
    <div className="container relative" ref={printref}>
      <div
        ref={billRef}
        className="border p-1 shadow bg-white"
        style={{ minHeight: "100vh" }}
      >
        <header className="mb-3">
          <img src={header} alt="" style={{ width: "100%", height: "auto" }} />

        </header>
        <div className="mainbox m-3">
          <div className="service justify-center">
            <h5 className="fw-bold text-center p-1 baxa">Service Bill</h5>
          </div>
          <div className="d-flex w-100 border-bottom border-2 border-dark pb-0 m-0">
            {/* Left Section */}
            <div className="w-50 pe-0 border-end border-2 border-dark text-start m-0">
              <div className="d-flex justify-content-between w-100 p-1 m-0">
                <div className="me-3">
                  <p className="fw-bold p-1  m-0"><strong>Bill To:</strong></p>
                  <p className="fw-bold m-0 p-1 "><strong>Name:</strong> {formData.name}</p>
                </div>
                <div>
                  <p className="fw-bold p-1  m-0"><strong>Age:</strong> {formData.age}</p>
                  <p className="fw-bold m-0 p-1 "><strong>Sex:</strong> {formData.sex}</p>
                </div>
              </div>
              <div className="text-left p-1 m-0">
                <p className="fw-bold p-1  m-0"><strong>Father/Husband Name:</strong> {formData.fatherName}</p>
                <p className="fw-bold p-1  m-0"><strong>Case ID:</strong> {formData.caseId}</p>
                <p className="fw-bold p-1  m-0"><strong>Address:</strong> {formData.address}</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-50 ps-0 text-start m-0">
              <ul className="list-unstyled m-0 p-0">

                <li className="border-bottom border-2 border-dark p-1 m-0"><strong>IP Number:</strong> {formData.ipNumber}</li>
                <li className="border-bottom border-2 border-dark p-1  m-0"><strong>Bill No.:</strong> {formData.billNo}</li>
              </ul>
              <p className="fw-bold p-1  m-0"><strong>Date & Time:</strong> {formData.dateandtime}</p>
              <p className="fw-bold p-1  m-0"><strong>Admission Date:</strong> {formData.admissionDate}</p>
              <p className="fw-bold p-1  m-0"><strong>Discharge Date:</strong> {formData.dischargeDate}</p>
              <p className="fw-bold p-1  m-0"><strong>Surgery Date:</strong> {formData.surgeryDate}</p>
            </div>
          </div>

          <div className="d-flex justify-content-between border-bottom border-dark border-2 w-100 p-1 m-0">
            <div className="me-3 text-left">
              <p className="fw-bold p-1  m-0"><strong>Doctor Name : {formData.doctorName}</strong></p>
              <p className="fw-bold m-0 p-1 "><strong>Speciality : </strong> {formData.speciality}</p>
            </div>
            <div>
              <p className="fw-bold m-0 p-1 "><strong>Ward Name : </strong> {formData.wardName}</p>
              <p className="fw-bold m-0 p-1 "><strong>Bed No. : </strong> {formData.bedNo}</p>
            </div>
          </div>

          <div className="d-flex justify-content-between border-bottom border-dark border-2 w-100 p-1 m-0">
            <div className="me-3 text-left">
              <p className="fw-bold p-1  m-0"><strong>Billing Type : </strong></p>
            </div>
            <div>
              <p className="fw-bold m-0 p-1 "><strong>Authorization No. : </strong> {formData.sex}</p>
            </div>
            <div>
              <p className="fw-bold m-0 p-1 "><strong>TPA/Corporate. : </strong> {formData.sex}</p>
            </div>
          </div>

          <div className="d-flex justify-content-between border-bottom border-dark border-2 w-100 p-1 m-0">
            <div className="me-3 text-left">
              <p className="fw-bold p-1  m-0"><strong>Insuarance Name : </strong></p>
            </div>
          </div>




          <table className="table w-100 border-bottom border-2 border-dark zind" style={{ borderLeft: "none", borderRight: "none" }}>
            <thead className="table-light border-bottom border-2 border-dark">
              <tr>
                <th style={{ width: "10%" }}>S. No.</th>
                <th style={{ width: "80%" }}>Service</th>
                <th style={{ width: "10%" }}>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {formData.services?.map((service, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{service.name || "N/A"}</td>
                  <td>{parseFloat(service.amount) ? parseFloat(service.amount).toFixed(2) : "0.00"}</td>
                </tr>
              ))}
            </tbody>
          </table>


          <div className="position-absolute start-50 top-50 translate-middle" style={{ zIndex: "-1", opacity: "0.2" }}>
            <img src={mark} alt="" />
          </div>



          <div className="d-flex border-bottom border-2 border-dark justify-content-between w-100 p-1">
            <div className="me-3">
              <p className="fw-bold p-1  m-0"><strong>Service Amount</strong></p>
            </div>
            <div>
              <p className="fw-bold m-0 p-1 ">₹{formData.serviceAmount}</p>
            </div>
          </div>
          <div className="d-flex border-bottom border-2 border-dark justify-content-between w-100 p-1">
            <div className="me-3">
              <p className="fw-bold p-1  m-0"><strong>To Pay</strong></p>
            </div>
            <div>
              <p className="fw-bold m-0 p-1 ">₹{formData.toPay}</p>
            </div>
          </div>
          <div className="d-flex border-bottom border-2 border-dark justify-content-between w-100 p-1">
            <div className="me-3">
              <p className="fw-bold p-1  m-0"><strong>Deposit Receipt No</strong></p>
            </div>
            <div>
              <p className="fw-bold m-0 p-1 ">₹{formData.discountAmt}</p>
            </div>
          </div>
          <div className="d-flex border-bottom border-2 border-dark justify-content-between w-100 p-1">
            <div className="me-3">
              <p className="fw-bold p-1  m-0"><strong>Discount Amt.</strong></p>
            </div>
            <div>
              <p className="fw-bold m-0 p-1 ">{formData.discountAmt}</p>
            </div>
          </div>
          <div className="d-flex border-bottom border-2 border-dark justify-content-between w-100 p-1">
            <div className="me-3">
              <p className="fw-bold p-1  m-0"><strong>Net Amount</strong></p>
            </div>
            <div>
              <p className="fw-bold m-0 p-1 ">{formData.netAmount}</p>
            </div>
          </div>
          <div className="d-flex border-bottom border-2 border-dark justify-content-between w-100 p-1">
            <div className="me-3">
              <p className="fw-bold p-1  m-0"><strong>Total Paid</strong></p>
            </div>
            <div>
              <p className="fw-bold m-0 p-1 ">{formData.totalPaid}</p>
            </div>
          </div>

          <footer className="mt-0 text-end">
            <p>
              <strong>Cashier/Manager</strong>
            </p>
          </footer>

        </div>
        <footer className="mt-3">
          <img src="/images/footer.png" alt="Footer" style={{ width: "100%", height: "auto" }} />
        </footer>

      </div>

      <div className="text-center mt-3">
        <button onClick={handlesPrint} className="btn btn-primary">
          Print Bill
        </button>
      </div>
      <style>
                            {` @media print {
                                               @page {
                                                     size: A4 !important;
                                                     padding:1px  !important;
                                                     margin: 0;
                                                     }
                                                    .app-wapper{
                                                        display:block !important;
                                                        border:2px solid black !important;
                                                        height:100vh !important;
                                                        width: 100% !important;
                                                        box-sizing: border-box !important;
                                                        }
                                                     }`}
                        </style>
    </div>
    
  );
};

export default HospitalBill;
