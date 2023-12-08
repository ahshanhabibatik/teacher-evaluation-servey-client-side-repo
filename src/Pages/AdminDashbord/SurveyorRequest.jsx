import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";

const SurveyorRequest = () => {
    const axiosSecure = useAxiosSecure();
    const [publishedId, setPublishedId] = useState('');
    const [isDataProcessed, setIsDataProcessed] = useState(false);

    const { data: surveyQuestion = [], refetch } = useQuery({
        queryKey: ['surveyorRequest'],
        queryFn: async () => {
            const res = await axiosSecure.get('/surveyorRequest');
            return res.data;
        }
    });

    const handlePublish = async (question) => {
        if (isDataProcessed) {
            // Notify using toast or another UI element
            Swal.fire("Data has already been processed");
            return;
        }

        question.status = 'published';
        setPublishedId(question._id);

        try {
            const res = await axiosSecure.post('/surveyQuestion', question);
            setIsDataProcessed(true); // Set the flag to true after processing
            Swal.fire('Published!', 'The question has been published.', 'success');
            refetch();
        } catch (error) {
            console.error('Error publishing question:', error);
            Swal.fire('Error', 'Failed to publish the question.', 'error');
        }
    };

    const handleUnPublish = async (question) => {
        if (isDataProcessed) {
            // Notify using toast or another UI element
            Swal.fire("Data has already been processed");
            return;
        }

        const data = {
            email: question?.email,
            status: 'unpublished'
        };

        try {
            const res = await axiosSecure.post('/surveyQuestion/unpublish', data);
            setIsDataProcessed(true); // Set the flag to true after processing
            Swal.fire('Unpublished!', 'The Survey has been Unpublished.', 'success');
            refetch();
        } catch (error) {
            console.error('Error unpublishing survey:', error);
            Swal.fire('Error', 'Failed to unpublish the survey.', 'error');
        }
    };

    const { data: StatusRequest = [] } = useQuery({
        queryKey: ['StatusRequest'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/StatusRequest?surveyId=${publishedId}`);
            return res.data;
        }
    });

    return (
        <div>
            <h1 className="text-2xl font-bold text-orange-500 text-center mb-7">Total Survey Request: {surveyQuestion.length}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {surveyQuestion.map((question) => (
                    <div key={question._id} className="card bg-base-100 border border-orange-500">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{question.title}</h2>
                            <h2 className="card-title">{question.Subject}</h2>
                            <p className="text-justify">{question.description}</p>
                            <p>{question.date}</p>
                            <p>Total Voted: {question.vote}</p>
                            <div className=" flex gap-2">
                                <div>
                                    <Link to={`/dashBoard/surveyordata/${question._id}`}>
                                        <button className="border-2 border-orange-600 px-2 py-1 rounded-lg hover:bg-lime-400 font-bold">Result</button>
                                    </Link>
                                </div>
                                <div>
                                    <button onClick={() => handlePublish(question)} className="border-2 border-orange-600 px-2 py-1 rounded-lg hover:bg-lime-400 font-bold">
                                        Publish
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => handleUnPublish(question)} className="border-2 border-orange-600 px-2 py-1 rounded-lg hover:bg-lime-400 font-bold">
                                        UnPublish
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SurveyorRequest;
