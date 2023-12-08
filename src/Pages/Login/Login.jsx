import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../Provider/AuthProvider";


const Login = () => {
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const [registerError, setRegisterError] = useState('');
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');

        setRegisterError('');

        // Email validation
        if (!email || !password) {
            toast.error('Please enter both email and password!');
            return;
        }

        try {
            // Perform Firebase authentication
            const result = await signIn(email, password);
            console.log(result.user);
            navigate(location?.state ? location.state : '/');
            toast.success('Successfully logged in!');
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please check your email and password.');
        }
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>

            <hr />
            <ToastContainer position="top-center" autoClose={3000} />
            <div data-aos="fade-up" className="grid mt-6 border-2 w-[600px] mx-auto bg-slate-300 py-11">
                <div>

                </div>
                <div className=" ">
                    <div className="">
                        <h1 className="text-2xl  font-bold text-center text-gray-600">Please Login</h1>
                        <form onSubmit={handleLogin} className="w-80 md:w-96 lg:w-3/4 mx-auto">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-600font-bold">Email address</span>
                                </label>
                                <input type="email" name="email" placeholder="Enter Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-600 font-bold">Password</span>
                                </label>
                                <div className=" relative flex   ">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="password"
                                        className="input w-full input-bordered"
                                        required

                                    />
                                    <span className=" text-2xl mt-3 -ml-7">
                                        {showPassword ? (
                                            <FaEyeSlash onClick={togglePasswordVisibility} className="text-gray-400  cursor-pointer" />
                                        ) : (
                                            <FaEye onClick={togglePasswordVisibility} className="text-gray-400    cursor-pointer" />
                                        )}
                                    </span>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt text-gray-600 font-bold link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-amber-500 hover:bg-amber-200">Login</button>
                            </div>
                        </form>
                    </div>

                    <div >
                        <h1 className="border-b-2 mt-6 text-center ">OR</h1>
                    </div>
                    <div>
                        <div className='p-4 space-y-3 mb-6'>
                           
                        </div>
                        <p className="text-center text-gray-600 font-bold mt-5">New to page. Please<Link className="text-blue-600 underline font-bold" to={'/SignUp'}> Register</Link></p>
                    </div>
                </div>

            </div>
            <hr className="mt-20" />

        </div>
    );
};

export default Login;
