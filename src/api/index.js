import axios from 'axios';

const url = 'https://restcountries.eu/rest/v2/all';

export const fetchCountryList = async()=>{
    try {
        const response = await axios.get(url);
        return response.data;
    } catch(error) {
        return error;
    }
};