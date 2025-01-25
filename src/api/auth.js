import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginApi = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/admin/login`, credentials);
    console.log(response.data);

    return response.data;
};

export const resetPasswordApi = async (password) => {
    const response = await axios.post(`${BASE_URL}/v1/auth/reset-password?`, { password });
    return response.data;
};
export const forgotPasswordApi = async (email) => {



    console.log(email);

    try {

        const response = await axios.post(`${BASE_URL}/v1/admin/auth/forgot-password`, email);

        console.log(response.data);
        return response.data;
    } catch (error) {

        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

