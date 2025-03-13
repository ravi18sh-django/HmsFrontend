import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const getAuthToken = () => {
	const user = localStorage.getItem("HMSMern");
	if (user) {
		try {
			return JSON.parse(user).token;
		} catch (error) {
			console.error("Error parsing token:", error);
			return null;
		}
	}
	return null;
};

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use((config) => {
	const token = getAuthToken();
	if (token) {
		config.headers.Authorization = token;
	}
	return config;
}, (error) => {
	return Promise.reject(error);
});

export const fetchData = async (endpoint) => {
	try {
		const response = await apiClient.get(endpoint);
		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

export const normalPostData = async (endpoint, data, isFormData = false) => {
	try {
	  const headers = isFormData
		? { Authorization: `Bearer ${getAuthToken()}` } // No Content-Type for FormData
		: { "Content-Type": "application/json", Authorization: `Bearer ${getAuthToken()}` };

	  const response = await apiClient.post(endpoint, data, { headers });
	  return response.data;
	} catch (error) {
	  console.error("Error posting data:", error.response?.data || error.message);
	  throw error;
	}
  };
export const normalPutData = async (endpoint, data, isFormData = false) => {
	try {
	  const headers = isFormData
		? { Authorization: `Bearer ${getAuthToken()}` } // No Content-Type for FormData
		: { "Content-Type": "application/json", Authorization: `Bearer ${getAuthToken()}` };

	  const response = await apiClient.put(endpoint, data, { headers });
	  return response.data;
	} catch (error) {
	  console.error("Error posting data:", error.response?.data || error.message);
	  throw error;
	}
  };

export const postData = async (endpoint, data, isFormData = false) => {
	try {
		console.log("📤 Sending data to API:", data);

		// Debugging: Check FormData contents before sending
		if (isFormData && data instanceof FormData) {
			for (let pair of data.entries()) {
				console.log(`FormData Key: ${pair[0]}`, "Value:", pair[1]);
			}
		}

		// Set headers manually for testing
		const headers = isFormData
			? {
					"Content-Type": "multipart/form-data", // 🚨 Manually setting this
					Authorization: getAuthToken(),
			  }
			: { "Content-Type": "application/json", Authorization: getAuthToken() };

		// Debugging: Log headers before sending request
		console.log("📝 Request Headers:", headers);

		// Make API request
		const response = await apiClient.post(endpoint, data, { headers });

		console.log("✅ API Response:", response.data);
		return response.data;
	} catch (error) {
		console.error("❌ Error posting data:", error.response?.data || error.message);
		throw error;
	}
};
export const putData = async (endpoint, data, isFormData = false) => {
	try {
		console.log("📤 Sending data to API:", data);

		// Debugging: Check FormData contents before sending
		if (isFormData && data instanceof FormData) {
			for (let pair of data.entries()) {
				console.log(`FormData Key: ${pair[0]}`, "Value:", pair[1]);
			}
		}

		// Set headers manually for testing
		const headers = isFormData
			? {
					"Content-Type": "multipart/form-data", // 🚨 Manually setting this
					Authorization: getAuthToken(),
			  }
			: { "Content-Type": "application/json", Authorization: getAuthToken() };

		// Debugging: Log headers before sending request
		console.log("📝 Request Headers:", headers);

		// Make API request
		const response = await apiClient.put(endpoint, data, { headers });

		console.log("✅ API Response:", response.data);
		return response.data;
	} catch (error) {
		console.error("❌ Error posting data:", error.response?.data || error.message);
		throw error;
	}
};








export const updateData = async (endpoint, data) => {
	try {
		const response = await apiClient.put(endpoint, data);
		return response.data;
	} catch (error) {
		console.error("Error updating data:", error);
		throw error;
	}
};

export const deleteData = async (endpoint) => {
	try {
		const response = await apiClient.delete(endpoint);
		return response.data;
	} catch (error) {
		console.error("Error deleting data:", error);
		throw error;
	}
};
