import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://teacher-evaluation-server.vercel.app'
})
const useAxiosSecure = () => {

    return axiosSecure;
};

export default useAxiosSecure;