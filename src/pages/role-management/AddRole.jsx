import React, { useState } from "react";
import MyPageHeader from "@/components/shared/pageHeader/MyPageHeader";
import Input from "@/components/shared/Input";
import { FiShield } from "react-icons/fi";
import Roles from "../../api/RolesPermission/Roles";
import topTost from '@/utils/topTost';
import "../../index.css";

const AddRole = () => {
  const [title, setTitle] = useState("");


  const modules = ["Roles and Permission", "User", "Staff"];
  const permissions = ["select All", "list", "add", "edit", "view", "delete"];

  const [selectedPermissions, setSelectedPermissions] = useState(
    modules.reduce((acc, module) => {
      acc[module] = [];
      return acc;
    }, {})
  );




  const handlePermissionChange = (module, permission) => {
    setSelectedPermissions((prev) => {
      const updatedPermissions = { ...prev };


      if (permission === "select All") {

        if (updatedPermissions[module].length === permissions.length) {
          updatedPermissions[module] = []; // Deselect all
        } else {
          updatedPermissions[module] = [...permissions]; // Select all, including "select All"
        }
      } else {

        if (updatedPermissions[module].includes(permission)) {
          updatedPermissions[module] = updatedPermissions[module].filter(
            (perm) => perm !== permission
          );
        } else {
          updatedPermissions[module].push(permission);
        }


        if (updatedPermissions[module].length === permissions.length - 1 && !updatedPermissions[module].includes("select All")) {
          updatedPermissions[module].push("select All");
        } else if (updatedPermissions[module].length < permissions.length && updatedPermissions[module].includes("select All")) {
          updatedPermissions[module] = updatedPermissions[module].filter(
            (perm) => perm !== "select All"
          );
        }
      }

      return updatedPermissions;
    });
  };

  const user_id = JSON.parse(localStorage.getItem("Kripauser"))?.user.id
  console.log(user_id);


  // const handleSubmit = async () => {
  //   const formattedResources = modules.map((module, index) => ({
  //     moduleName: module,
  //     moduleId: (index + 1).toString(),
  //     permissions: selectedPermissions[module],
  //   }));

  //   const roleData = {
  //     name: title,
  //     resource: formattedResources,
  //   };

  //   console.log("Generated Role Object:", roleData);
  //   try {

  //     const res = await Roles.AddRole(user_id, roleData);

  //     console.log('Response from AddRole:', res);

  //     if (res.code === 200) {
  //       console.log('200: Role added successfully');
  //       topTost({
  //         message: 'Role added successfully!',
  //         type: 'success',
  //       });
  //     } else if (res.code === 401) {
  //       console.log('401: Session expired');
  //       topTost({
  //         message: 'Session is expired, please login again!',
  //         type: 'error',
  //       });
  //     } else {
  //       console.log('Error in response:', res);
  //       topTost({
  //         message: res.message || 'An unknown error occurred.',
  //         type: 'error',
  //       });
  //     }

  //   } catch (error) {
  //     console.error("Error adding role:", error);
  //     topTost({
  //       message: 'Failed to add role. Please try again.',
  //       type: 'error',  // Adjust depending on topTost's API
  //     });
  //   }
  // };

  const handleSubmit = async () => {
    // Validate required fields
    if (!title || title.trim() === "") {
      console.log("title is required");
      topTost({
        message: "Title is required!",
        type: "error",
      });
      return; // Stop further execution
    }
  
    if (!modules || modules.length === 0) {
      topTost({
        message: "At least one module is required!",
        type: "error",
      });
      return; // Stop further execution
    }
  
    if (!selectedPermissions || Object.keys(selectedPermissions).length === 0) {
      topTost({
        message: "Permissions are required!",
        type: "error",
      });
      return; // Stop further execution
    }
  
    // Format resources
    const formattedResources = modules.map((module, index) => ({
      moduleName: module,
      moduleId: (index + 1).toString(),
      permissions: selectedPermissions[module],
    }));
  
    // Prepare role data
    const roleData = {
      name: title,
      resource: formattedResources,
    };
  
    console.log("Generated Role Object:", roleData);
  
    try {
      const res = await Roles.AddRole( roleData );
  
      console.log("Response from AddRole:", res);
  
      if (res.code === 200) {
        console.log("200: Role added successfully");
        topTost({
          message: "Role added successfully!",
          type: "success",
        });
      } else if (res.code === 401) {
        console.log("401: Session expired");
        topTost({
          message: "Session is expired, please login again!",
          type: "error",
        });
      } else {
        console.log("Error in response:", res);
        topTost({
          message: res.message || "An unknown error occurred.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error adding role:", error);
      topTost({
        message: "Failed to add role. Please try again.",
        type: "error",
      });
    }
  };
  
  return (
    <>
      <MyPageHeader title={"Roles and Permission"}>
        <button onClick={handleSubmit} className="btn btn-primary">
          <FiShield size={16} className="me-2" />
          <span>Create Role</span>
        </button>
      </MyPageHeader>
      <div className="main-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="card border-top-0">
              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="profileTab"
                  role="tabpanel"
                >
                  <div className="card-body personal-info">
                    <div className="mb-4 d-flex align-items-center justify-content-between">
                      <h5 className="fw-bold mb-0 me-4">
                        <span className="d-block mb-2">Add Role Information:</span>
                        <span className="fs-12 fw-normal text-muted text-truncate-1-line">
                          Manage roles with care: The information you provide is
                          essential for role assignment.
                        </span>
                      </h5>
                    </div>

                    <Input
                      icon="feather-user"
                      label={"Title"}
                      labelId={"titleInput"}
                      placeholder={"Title"}
                      name={"title"}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    {modules.map((module, index) => (
                      <div
                        key={index}
                        id={module.replace(/\s/g, "")}
                        className="row mb-4 align-items-center"
                      >
                        <div className="col-lg-4">
                          <label
                            htmlFor="titleInput"
                            className="fw-semibold"
                          >
                            {module}:
                          </label>
                        </div>
                        <div className="col-lg-8">
                          <div className="input-group">
                            {permissions.map((permission, pIndex) => (
                              <div key={pIndex} className="d-flex align-items-center">
                                <div className="me-5">
                                  <input
                                    type="checkbox"
                                    className="form-check-input me-2"
                                    checked={selectedPermissions[module]?.includes(permission)}
                                    onChange={() => handlePermissionChange(module, permission)}
                                  />
                                  <span>
                                    {permission.charAt(0).toUpperCase() + permission.slice(1)}
                                  </span>
                                </div>
                              </div>
                            ))}


                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRole;



//working fine tll now
