import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../SignUp/SignUp";
import DashBoard from "../Layout/DashBoard";
import AllUsers from "../Pages/AdminDashbord/AllUser/AllUsers";
import AddSurvey from "../Pages/SurveyorDashboard/AddSurvey";
import AllSurveyorData from "../Pages/SurveyorDashboard/AllSurveyorData";
import SurveyorAllData from "../Pages/AdminDashbord/SurveyorAllData";
import AllSurveyShowUser from "../Pages/Home/AllSurveyShowUser/AllSurveyShowUser";
import VotedPage from "../Pages/Home/VotetedPage/VotedPage";
import SurveyResponse from "../Pages/SurveyorDashboard/SurveyResponse";
import AdminSurveyResponse from "../Pages/AdminDashbord/AdminSurveyResponse/AdminSurveyResponse";
import ProUser from "../Pages/ProUser/ProUser";
import PaymentHistory from "../Pages/AdminDashbord/PaymentHistory/PaymentHistory";
import SurveyResult from "../Pages/Home/SurveyResult/SurveyResult";
import AdminHome from "../Pages/AdminDashbord/AdminHome/AdminHome";
import SurveyorHome from "../Pages/SurveyorDashboard/SurveyorHome/SurveyorHome";
import UpdateSurvey from "../Pages/SurveyorDashboard/UpdateSurvey/UpdateSurvey";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import SurveyorRequest from "../Pages/AdminDashbord/SurveyorRequest";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/showalldata",
                element: <AllSurveyShowUser></AllSurveyShowUser>
            },
            {
                path: "/votedPage/:id",
                element: <PrivateRoute><VotedPage></VotedPage></PrivateRoute>,


            },
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "signUp",
                element: <SignUp></SignUp>,
            },
            {
                path: "/prouser",
                element: <PrivateRoute><ProUser></ProUser></PrivateRoute>
            },
            {
                path: 'result',
                element: <PrivateRoute><SurveyResult></SurveyResult></PrivateRoute>
            },


        ]
    },

    {
        path: 'dashBoard',
        element: <DashBoard></DashBoard>,
        children: [
            // Admin dashboard
            {
                path: 'users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'surveyorRequest',
                element: <AdminRoute><SurveyorRequest></SurveyorRequest></AdminRoute>
            },
            {
                path: 'surveyordata/:id',
                element: <AdminRoute><SurveyorAllData></SurveyorAllData></AdminRoute>,


            },
            {
                path: 'surveyResponse',
                element: <AdminRoute> <AdminSurveyResponse></AdminSurveyResponse></AdminRoute>,
            },
            {
                path: 'paymentHistory',
                element: <AdminRoute><PaymentHistory></PaymentHistory></AdminRoute>,
            },
            {
                path: 'home',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>,
            },



            // surveyorDashboard
            {
                path: 'addSurvey',
                element: <AddSurvey></AddSurvey>
            },
            {
                path: 'surveyData',
                element: <AllSurveyorData></AllSurveyorData>
            },
            {
                path: 'response',
                element: <SurveyResponse></SurveyResponse>
            },

            {
                path: 'surveyorHome',
                element: <SurveyorHome></SurveyorHome>
            },
            {
                path: 'update/:id',
                element: <UpdateSurvey></UpdateSurvey>,
                loader: ({ params }) => fetch(`https://teacher-evaluation-server.vercel.app/surveyorRequest/${params.id}`)
            },



        ]
    }
]);