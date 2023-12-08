
import { Link } from "react-router-dom";
import imgUser from '../../../src/assets/user.png'
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
import useAdmin from "../../hooks/UseAdmin";
import UseSurveyor from "../../hooks/UseSurveyor";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isSurveyor] = UseSurveyor();

    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    };



    const navOptions = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/showalldata'}>Survey</Link></li>

        {(isAdmin || isSurveyor) && (
            <li><Link to={'/dashBoard'}>DashBoard</Link></li>
        )}

        {!isAdmin && !isSurveyor && (
            <li><Link to={'/prouser'}>Pro User</Link></li>
        )}

        {
            !isAdmin && !isSurveyor && (
                <li><Link to={'/result'}>Survey Result</Link></li>
            )
        }


    </>
    return (
        <div>
            <div className="navbar bg-blue-500  max-w-screen-xl text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Teacher Evolution</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">




                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">

                        <div className="w-10 rounded-full">
                            <img src={user ? (user.photoURL || imgUser) : imgUser} alt="User" />
                        </div>
                    </label>
                    {user ? (
                        <Link to={"/login"}>
                            <button onClick={handleSignOut} className="text-xl rounded-md text-white hover:bg-sky-800 border px-2 py-2 border-red-700 ">
                                Log Out
                            </button>
                        </Link>
                    ) : (
                        <Link to={'/login'}>
                            <button className=" text-xl rounded-md text-white hover:bg-sky-800 border px-2 py-2 border-red-700 ">Login</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;