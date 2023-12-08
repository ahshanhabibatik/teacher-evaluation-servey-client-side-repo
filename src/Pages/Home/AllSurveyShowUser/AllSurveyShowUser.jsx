import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import Banner from "../Banner";
import { Link } from "react-router-dom";
import NavBar from "../../Shared/NavBar";


const AllSurveyShowUser = () => {

    const axiosPublic = useAxiosPublic();

    const { data: totalData = [], isLoading } = useQuery({
        queryKey: ['totalData'],
        queryFn: async () => {
            const res = await axiosPublic.get('UserShowSurvey');
            return res.data;
        }
    })
    const publishedSurveys = totalData.filter((survey) => survey.status === 'published');

    if (isLoading) {
        return <p>Loading.....</p>
    }

    return (
        <div>
            <NavBar></NavBar>
            <h1 className="text-3xl font-bold mt-11 mb-8 text-center">Total Survey: {publishedSurveys.length}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 mb-10 gap-3">
                {
                    publishedSurveys.map(question => <div
                        key={question._id}

                        className="card  bg-base-100   border border-orange-500">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{question.title}</h2>
                            <h2 className="card-title">{question.Category}</h2>
                            <p>{question.date}</p>
                            <div className="">
                                <Link to={`/votedPage/${question._id}`}>
                                    <button className="btn">Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllSurveyShowUser;