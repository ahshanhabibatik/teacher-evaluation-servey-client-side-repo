import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
 

const SurveyData = () => {
    const axiosSecure = useAxiosSecure();
    

    const { data: recentSurveys = [] } = useQuery({
        queryKey: ['recentSurveys'],
        queryFn: async () => {
            const res = await axiosSecure.get('/recentSurveys');
            return res.data;
        }
    });


    return (
        <div className="bg-gray-200">
            <SectionTitle heading="Latest Surveys" subHeading="Most recently created survey" />
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto px-5 ">
                {recentSurveys.map(survey => (
                    <div key={survey._id} className="border-2 space-y-3 border-orange-500 mb-4 p-4 rounded-lg">
                        <h3 className="font-bold text-lg"><span>Class Title: </span>{survey.title}</h3>
                        <p className="text-xl font-bold text-stone-500">Category: {survey.Category}</p>
                        <p className="text-justify"><span> </span> {survey.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SurveyData;
