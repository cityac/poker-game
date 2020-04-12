import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://mppl-poker-json-server.herokuapp.com/',
});

export default instance