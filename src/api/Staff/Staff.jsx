import HttpClient from "../HttpClient";

function StaffService() {
  return {
    addStaff: (values) => {
      return HttpClient.post('v1/admin/auth/subadmin', values);
    },
    getStaffList: async (request) => {
      try {
        HttpClient.setAuthorizationHeader(); 
        const response = await HttpClient.get(`v1/admin/auth/subadmin`);
        return response;
      } catch (error) {
        console.error('Error fetching staff list:', error);
        throw error; 
      }
    },
    getStaffDetails: (values) => {
      return HttpClient.get('v1/admin/auth/subadmin' + values);
    },
    updateStaff: (values, id) => {
      return HttpClient.patch('v1/admin/auth/subadmin' + id, values);
    },
    deleteStaff: (id) => {
      return HttpClient.delete('v1/admin/auth/subadmin' + id);
    },
    resetStaffPassword: (values) => {
      return HttpClient.post('v1/admin/auth/subadmin', values);
    },
  };
}

export default StaffService();
