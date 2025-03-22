import React, { useState } from "react";
import HospitalBill from "./HospitalBill";

const BillForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    fatherName: "",
    caseId: "",
    address: "",
    ipNumber: "",
    dateandtime: "",
    billNo: "",
    admissionDate: "",
    dischargeDate: "",
    surgeryDate: "",
    doctorName: "",
    wardName: "",
    speciality: "",
    bedNo: "",
    billingType: "",
    authorizationNo: "",
    tpaCorporate: "",
    services: [{ name: "", amount: "" }],
    serviceAmount: "",
    toPay: "",
    depositReceiptNo: "",
    discountAmt: "0",
    netAmount: "",
    totalPaid: "",
    paymentDetails: ""
  });
  const [popup, setPopUp] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (formData.toPay && formData.discountAmt && formData.depositReceiptNo) {
    const getamt = formData.toPay - formData.discountAmt - formData.depositReceiptNo;
    formData.netAmount = getamt;
  }
  

  const handleServiceChange = (index, e) => {
    const newServices = [...formData.services];
    newServices[index][e.target.name] = e.target.value;
    setFormData({ ...formData, services: newServices });
  };

  const addService = () => {
    setFormData({ ...formData, services: [...formData.services, { name: "", amount: "" }] });
  };

  const printBill = () => {
    setPopUp(false);
  };

  return (
    popup ? (
      <div className="bill-form-container">
        <h2>Generate Service Bill</h2>
        <form className="bill-form">
          <label>Name: <input type="text" name="name" value={formData.name} onChange={handleChange} /></label>
          <label>Age: <input type="number" name="age" value={formData.age} onChange={handleChange} /></label>
          <label>Sex: <input type="text" name="sex" value={formData.sex} onChange={handleChange} /></label>
          <label>Father/Husband's Name: <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} /></label>
          <label>Case ID: <input type="text" name="caseId" value={formData.caseId} onChange={handleChange} /></label>
          <label>Address: <input type="text" name="address" value={formData.address} onChange={handleChange} /></label>
          <label>IP Number: <input type="text" name="ipNumber" value={formData.ipNumber} onChange={handleChange} /></label>
          <label>Bill No.: <input type="text" name="billNo" value={formData.billNo} onChange={handleChange} /></label>
          <label>Date & Time: <input type="datetime-local" name="dateandtime" value={formData.dateandtime} onChange={handleChange} /></label>
          <label>Admission Date: <input type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} /></label>
          <label>Discharge Date: <input type="date" name="dischargeDate" value={formData.dischargeDate} onChange={handleChange} /></label>
          <label>Surgery Date: <input type="date" name="surgeryDate" value={formData.surgeryDate} onChange={handleChange} /></label>
          <label>Doctor Name: <input type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} /></label>
          <label>Ward Name: <input type="text" name="wardName" value={formData.wardName} onChange={handleChange} /></label>
          <label>Speciality: <input type="text" name="speciality" value={formData.speciality} onChange={handleChange} /></label>
          <label>Bed No.: <input type="text" name="bedNo" value={formData.bedNo} onChange={handleChange} /></label>
          <label>Billing Type: <input type="text" name="billingType" value={formData.billingType} onChange={handleChange} /></label>
          <label>Authorization No: <input type="text" name="authorizationNo" value={formData.authorizationNo} onChange={handleChange} /></label>
          <label>TPA/Corporate: <input type="text" name="tpaCorporate" value={formData.tpaCorporate} onChange={handleChange} /></label>
          <h3>Services</h3>
          {formData.services.map((service, index) => (
            <div key={index} className="service-input">
              <input type="text" name="name" placeholder="Service Name" value={service.name} onChange={(e) => handleServiceChange(index, e)} />
              <input type="number" name="amount" placeholder="Amount" value={service.amount} onChange={(e) => handleServiceChange(index, e)} />
            </div>
          ))}
          <button type="button" onClick={addService}>Add Service</button>
          <h3>Billing Summary</h3>
          <label>Service Amount: <input type="number" name="serviceAmount" value={formData.serviceAmount} onChange={handleChange} /></label>
          <label>To Pay: <input type="number" name="toPay" value={formData.toPay} onChange={handleChange} /></label>
          <label>Deposit Receipt Amt: <input type="text" name="depositReceiptNo" value={formData.depositReceiptNo} onChange={handleChange} /></label>
          <label>Discount Amt.: <input  type="number" name="discountAmt" value={formData.discountAmt} onChange={handleChange} /></label>
          <label>Net Amount: <input disabled type="number" name="netAmount" value={formData.netAmount} onChange={handleChange} /></label>
          <label>Total Paid: <input type="number" name="totalPaid" value={formData.totalPaid} onChange={handleChange} /></label>
          <label>Payment Details: <input type="text" name="paymentDetails" value={formData.paymentDetails} onChange={handleChange} /></label>
          <button type="button" onClick={printBill}>Print Bill</button>
        </form>
      </div>
    ) : <HospitalBill formData={formData} setPopUp={setPopUp} />
  );
};

export default BillForm;