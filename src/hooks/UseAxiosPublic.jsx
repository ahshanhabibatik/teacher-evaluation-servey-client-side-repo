import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://teacher-evaluation-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;