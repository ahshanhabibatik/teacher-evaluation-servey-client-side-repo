// DashBoard.js
import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaAd, FaBook, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUtensils } from 'react-icons/fa';
import useAdmin from '../hooks/UseAdmin';
import UseSurveyor from '../hooks/UseSurveyor';
import img from '../../src/assets/un.png'

const DashBoard = () => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const [isSurveyor, isSurveyorLoading] = UseSurveyor();


    if (isAdminLoading || isSurveyorLoading) {
        return <span className="loading flex mx-auto justify-center loading-ring   w-40"></span>;
    }

    if (!isAdmin && !isSurveyor) {
        return <div className='mt-20'>
            <p className='text-center mb-3 text-red-500'>Data is loaded But no role detected.</p>
            <img className='flex mx-auto' src={img} alt="" />
            <Link to='/'>
                <button className='btn mt-5 flex mx-auto justify-center'>Go Back Home</button>
            </Link>
        </div>;
    }




    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-300" >
                <ul className="menu">
                    <li>
                        {isAdmin && (
                            <>
                                <NavLink to={'/dashboard/home'}>
                                    <FaHome></FaHome>
                                    Admin Home
                                </NavLink>
                                <NavLink to={'/dashboard/users'}>
                                    <FaHome></FaHome>
                                    All User
                                </NavLink>
                                <NavLink to={'/dashboard/surveyorRequest'}>
                                    <FaHome></FaHome>
                                    All Surveyor Request
                                </NavLink>
                                <NavLink to={'/dashboard/surveyResponse'}>
                                    <FaHome></FaHome>
                                    Survey Response
                                </NavLink>
                                <NavLink to={'/dashboard/paymentHistory'}>
                                    <FaHome></FaHome>
                                    Payment History
                                </NavLink>

                            </>
                        )}
                        {isSurveyor && (
                            <>
                                <NavLink to={'/dashboard/surveyorHome'}>
                                    <FaHome></FaHome>
                                    Surveyor Home
                                </NavLink>
                                <NavLink to={'/dashboard/addSurvey'}>
                                    <FaShoppingCart></FaShoppingCart>
                                    Add Survey
                                </NavLink>
                                <NavLink to={'/dashboard/surveyData'}>
                                    All Survey
                                </NavLink>
                                <NavLink to={'/dashboard/response'}>
                                    Total Response
                                </NavLink>
                            </>
                        )}
                        {!isAdmin && !isSurveyor && (
                            <>
                                <NavLink to={'/dashboard/userHome'}>
                                    <FaHome></FaHome>
                                    User Home
                                </NavLink>
                                <NavLink to={'/dashboard/cart'}>
                                    <FaShoppingCart></FaShoppingCart>
                                    My Cart
                                </NavLink>
                                <NavLink to={'/dashboard/review'}>
                                    <FaAd></FaAd>
                                    My Review
                                </NavLink>
                                <NavLink to={'/dashboard/bookings'}>
                                    <FaList></FaList>
                                    My Bookings
                                </NavLink>
                            </>
                        )}
                    </li>

                    {/* shared related navlink */}
                    <div className="divider"></div>

                    <NavLink to={'/'}>
                        <div className="flex items-center gap-1">
                            <FaHome></FaHome>
                            <span>Home</span>
                        </div>
                    </NavLink>

                </ul>
            </div>
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;
