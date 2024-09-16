import axios from 'axios';
import { URL } from './urlServer';

export const checkAdminAccess = async () => {
  const response = await axios.post(`${URL}admin`); 
  return response.data; 
};
