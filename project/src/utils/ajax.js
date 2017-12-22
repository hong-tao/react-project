import axios from 'axios'

const http = axios.create({
	baseURL: 'http://localhost:1706',
	timeout: 10000,
	headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
});

export default http
