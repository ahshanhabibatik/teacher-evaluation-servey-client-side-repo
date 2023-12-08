import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";

const AllSurveyorData = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: surveyQuestion = [], refetch } = useQuery({
        queryKey: ['surveyQuestion'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/surveyQuestion?email=${user.email}`);
            return res.data;
        }
    });

    return (
        <div>
            <h1 className="text-xl font-bold text-center mb-5">Total Survey: {surveyQuestion.length}</h1>
            <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-3">
                {surveyQuestion.map((question) => (
                    <div key={question._id} className="card bg-base-100 border border-orange-500">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{question.title}</h2>
                            <h2 className="card-title">{question.Subject}</h2>
                            <p className="justify-between">{question.description}</p>
                            <p>{question.date}</p>
                            <p>{question.status}</p>
                            <p>Total Voted: {question.vote}</p>
                            <Link to={`/dashBoard/update/${question._id}`}>
                                <div className="">
                                    <button className="btn btn-primary">Update</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllSurveyorData;
