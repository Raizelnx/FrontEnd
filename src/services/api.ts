import axios from 'axios';

const api = axios.create({
baseURL: 'https://tensodemais.herokuapp.com/',
});

export default api;