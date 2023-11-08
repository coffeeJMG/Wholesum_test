import axios from "axios";

// 환경변수에서 baseURL을 설정합니다.
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default api;
