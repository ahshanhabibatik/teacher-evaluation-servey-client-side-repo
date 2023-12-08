// import { Navigate, useLocation } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../Provider/AuthProvider";
// import UseSurveyor from "../hooks/UseSurveyor";


// const SurveyorRoute = ({Children}) => {
//     const { user, loading } = useContext(AuthContext);
//     const [isSurveyor, isSurveyorLoading] = UseSurveyor();
//     const location = useLocation();

//     if (loading || isSurveyorLoading) {
//         return <progress className="progress w-56"></progress>
//     }

//     if (user && isSurveyor) {
//         return Children;
//     }

//     return <Navigate to="/" state={{ from: location }} replace></Navigate>

// };

// export default SurveyorRoute;