import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://poker-json-server.herokuapp.com/'
});

export default instance;