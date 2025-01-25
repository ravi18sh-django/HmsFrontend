import React, { useState } from 'react'
import MyPageHeader from '@/components/shared/pageHeader/MyPageHeader'
import CustomerCreateContent from '@/components/customersCreate/CustomerCreateContent'
import { FiShield } from 'react-icons/fi'
import Input from '@/components/shared/Input'
import Checkbox from '@/components/shared/Checkbox'
import '../../index.css'


const AddRole = () => {

    const [title, setTitle] = useState('')
    const [resources, setResources] = useState([])

    let resource = []

    const modules = ["Roles and Permission", "User", "Staff"]

    const permissions = ["select All", "list", "add", "edit", "view", "delete"]


    let selecteditems = []

    const all = []

    modules.forEach((element, index) => {
        resource.push({
            "permissions": [],
            "moduleName": element,
            "moduleId": index + 1
        })
    })

    console.log(resource);

    const handleclick = (element, permission) => {

        if (permission === "select All") {
            const selctal = modules[element].replace(/\s/g, '');
            const index = all.indexOf(selctal);

            if (index > -1) {
                all.splice(index, 1);
                const div = document.getElementById(selctal);
                const checkboxes = div.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                });
            } else {
                all.push(selctal);
                const div = document.getElementById(selctal);
                const checkboxes = div.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach((checkbox) => {
                    checkbox.checked = true;
                });
            }
        } else {
            const div = modules[element].replace(/\s/g, '');

            // Get all checkboxes inside the div
            const checkboxes = div.querySelectorAll('input[type="checkbox"]');

            // Check if any checkbox is unchecked
            const anyUnchecked = Array.from(checkboxes).some((checkbox) => !checkbox.checked);

            if (anyUnchecked) {
                alert("There is at least one unchecked checkbox.");
            } else {
                alert("All checkboxes are checked.");
            }

        }

        // console.log(all);

        // const newObject = { [element]: permission };
        // selecteditems.push(newObject)
        // console.log(selecteditems);
    };

    const submit = () => {
        console.log("agye");

        let emptarr = []
        const newarr = selecteditems.map((element) => {
            if (emptarr.some(obj => obj[Object.keys(obj)[0]] === element)) {
                emptarr = emptarr.filter(obj => obj[Object.keys(obj)[0]] !== element);
            }
            else {
                emptarr.push(element)
            }
        });
    }




    return (

        <>
            <MyPageHeader title={"Roles and Permission"}>
                <a onClick={submit} className="btn btn-primary">
                    <FiShield size={16} className='me-2' />
                    <span>Create Role</span>

                </a>
            </MyPageHeader>
            <div className='main-content'>
                <div className='row'>
                    <div className="col-lg-12">
                        <div className="card border-top-0">
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="profileTab" role="tabpanel">
                                    <div className="card-body personal-info">
                                        <div className="mb-4 d-flex align-items-center justify-content-between">
                                            <h5 className="fw-bold mb-0 me-4">
                                                <span className="d-block mb-2">Add Role Information:</span>
                                                <span className="fs-12 fw-normal text-muted text-truncate-1-line">Manage roles with care: The information you provide is essential for role assignment.</span>
                                            </h5>

                                        </div>

                                        <Input
                                            icon='feather-user'
                                            label={"Title"}
                                            labelId={"titleInput"}
                                            placeholder={"Title"}
                                            name={"title"}
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />

                                        {modules.map((element, index) =>
                                            <div id={element.replace(/\s/g, '')} className="row mb-4 align-items-center">
                                                <div className="col-lg-4">
                                                    <label for="titleInput" className="fw-semibold">{element}: </label>
                                                </div>
                                                <div className="col-lg-8">
                                                    <div key={index} className="input-group">
                                                        {permissions.map((permission, ndex) => (
                                                            <div className="d-flex align-items-center">
                                                                <div className="me-5"> {/* Add a small margin-right to the checkbox */}
                                                                    <input
                                                                        key={ndex}
                                                                        type="checkbox"
                                                                        className="form-check-input me-2"
                                                                        onClick={() => handleclick(index, permission)}
                                                                    />


                                                                    <span>{permission.charAt(0).toUpperCase() + permission.slice(1)}</span>
                                                                </div>

                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                        )}




                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}


export default AddRole



