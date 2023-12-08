
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const PrivateRoute = ({ children }) => {

    const location = useLocation();
    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <span className="loading text-center loading-bars loading-lg"></span>
    }

    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;