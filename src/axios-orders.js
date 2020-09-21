import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://myburger-8d19a.firebaseio.com/'
});

export default instance;