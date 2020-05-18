import axios from 'axios';

export const queryWit = (message) => {
    // const params = {message: message};
    return axios.post('/wit/query', { message: message });
}

export const testQuery = () => {
    return axios.get('/users');
}