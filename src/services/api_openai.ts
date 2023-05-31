import axios from "axios";

const api_openai = axios.create({
    baseURL: 'https://api.openai.com/v1',
});

export default api_openai;