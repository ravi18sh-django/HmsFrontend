import HttpClient from '../httpClient';

// Example: Fetch users
const fetchUsers = async () => {
	try {
		HttpClient.setAuthorizationHeader(); // Ensure the header is set
		const users = await HttpClient.get('/v1/admin/user/list/dropdown');
		console.log(users);
	} catch (error) {
		console.error('Error fetching users:', error);
	}
};

export default fetchUsers
