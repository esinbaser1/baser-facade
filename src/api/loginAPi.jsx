import axios from 'axios';
import { URL } from './urlServer';


export const loginUser = async ({ email, password }) => {
    const response = await axios.post(`${URL}login`, {
        email,
        password,
    });
    return response.data;
};