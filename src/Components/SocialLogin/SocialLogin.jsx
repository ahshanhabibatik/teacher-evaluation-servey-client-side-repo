import { FaGoogle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    role: 'user'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
            })
    }

    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="border-2 px-[180px] hover:bg-green-500 cursor-pointer rounded-lg hover: py-2 w-full border-orange-500">
                    <div className="flex items-center">
                        <FaGoogle className="mr-2"></FaGoogle>
                        <span>Google</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;