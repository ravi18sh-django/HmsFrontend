import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// export const loginApi = async (credentials) => {
//     const response = await axios.post(`${BASE_URL}/api/admin/login`, credentials);
//     console.log(response.data);

//     return response.data;
// };



export const loginApi = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/admin/login`, credentials);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        // This catches all errors including non-200 status
        if (error.response) {
            // Server responded with a status other than 200
            console.error("API Error:", error.response.data);
            return error.response.data; // or throw if you want to handle it elsewhere
        } else if (error.request) {
            // Request was made but no response
            console.error("No response received:", error.request);
        } else {
            // Something else happened
            console.error("Error setting up request:", error.message);
        }
        return null;
    }
};


export const resetPasswordApi = async (password) => {
    const response = await axios.post(`${BASE_URL}/v1/auth/reset-password?`, { password });
    return response.data;
};
export const forgotPasswordApi = async (email) => {



    // console.log(email);

    try {

        const response = await axios.post(`${BASE_URL}/v1/admin/auth/forgot-password`, email);

        // console.log(response.data);
        return response.data;
    } catch (error) {

        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

