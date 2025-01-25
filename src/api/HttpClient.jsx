import axios from 'axios';

const ErrorCodeMessages = {
	401: 'Invalid credentials',
	403: 'Access Forbidden',
	404: 'Resource or page not found',
};

function HttpClient() {
	
	const _errorHandler = (error) => {
		return Promise.reject(
			ErrorCodeMessages[error?.response?.status] ||
			error?.response?.data?.message ||
			error?.message ||
			'An unknown error occurred'
		);
	};

	
	const _httpClient = axios.create({
		baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000', // Default base URL
		timeout: 60000, // Timeout of 60 seconds
		headers: {
			'Content-Type': 'application/json',
		},
	});

	
	_httpClient.interceptors.response.use(
		(response) => response.data,
		_errorHandler
	);

	
	const setAuthorizationHeader = () => {
		const token =
        JSON.parse(localStorage.getItem('HMSMern') || '{}').tokens;
		
		
		
		
		if (token) {
           // console.log(token);
			_httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		} else {
			console.log("it came here");
			
			_httpClient.defaults.headers.common['Authorization'] =
				import.meta.env.VITE_BASIC_AUTH || '';
		}
	};

	
	return {
		get: (url, config = {}) => _httpClient.get(url, config),
		post: (url, data, config = {}) => _httpClient.post(url, data, config),
		patch: (url, data, config = {}) => _httpClient.patch(url, data, config),
		put: (url, data, config = {}) => _httpClient.put(url, data, config),
		delete: (url, config = {}) => _httpClient.delete(url, config),
		setAuthorizationHeader,
	};
}

export default HttpClient();
