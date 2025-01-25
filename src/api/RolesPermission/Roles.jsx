import HttpClient from '../httpClient';

const AddRole = async (values) => {
    try {
        HttpClient.setAuthorizationHeader(); 
        const response = await HttpClient.post(`v1/admin/role`, values); 
        return response; 
    } catch (error) {
        console.error('Error adding role:', error);
        throw error;
    }
};

export default {
    AddRole, 
};
