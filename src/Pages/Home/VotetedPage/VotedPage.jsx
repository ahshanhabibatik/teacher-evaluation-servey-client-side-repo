import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import NavBar from "../../Shared/NavBar";

const VotedPage = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const { data: proUserQuery } = useQuery({
        queryKey: ['proUser ', { email: user?.email }],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user?.email}`);
            return res.data;
        }
    });

    const isProUser = proUserQuery?.proUser;
    console.log(isProUser);



    const { data: surveyorData, isLoading, isError, refetch } = useQuery({
        queryKey: ['surveyorData', { id }],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/surveyorData/${id}`);
                return res.data;
            } catch (error) {
                console.error('Error fetching surveyor data:', error);
                throw error;
            }
        },
    });

    // comment related data 

    const onSubmitComment = async (commentData) => {
        commentData.email = user?.email;
        commentData.name = user?.displayName;
        commentData.Category = surveyorData?.Category;
        const apiUrl = 'https://teacher-evaluation-server.vercel.app/submitComment';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            const responseData = await response.json();

            if (response.ok) {
                // Handle successful response, e.g., show a success message
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Comment submitted successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                // Handle unsuccessful response, e.g., show an error message
                console.error('Failed to submit comment');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: responseData.error || 'Failed to submit comment',
                });
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error submitting comment:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error submitting comment',
            });
        }
    };

    // show comment data 
    const { data: commentData = [] } = useQuery({
        queryKey: ['commentData', { category: surveyorData?.Category }],
        queryFn: async ({ queryKey }) => {
            const [, params] = queryKey;
            const res = await axiosPublic.get(`/submitComment?category=${params.category}`);
            return res.data;
        }
    });


    const { register, handleSubmit } = useForm();

    const onSubmit = async (formData) => {
        formData.title = surveyorData?.title;
        formData.Category = surveyorData?.Category;
        formData.surveyorEmail = surveyorData?.email;
        formData.email = user?.email;
        formData.name = user?.displayName;
        formData.timestamp = new Date().toISOString();

        const apiUrl = 'https://teacher-evaluation-server.vercel.app/submitSurveyResponse';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();

            if (response.ok) {
                refetch();
                // Handle successful response, e.g., show a success message
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Survey response submitted successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                // Handle unsuccessful response, e.g., show an error message
                console.error('Failed to submit survey response');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: responseData.error || 'Failed to submit survey response',
                });
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error submitting survey response:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error submitting survey response',
            });
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError || !surveyorData) {
        return <p>You can click Public and UnPublic then go to result </p>;
    }

    const { title, description, Category, email } = surveyorData;

    return (
        <div>
            <NavBar></NavBar>
            <div>
                <div>
                    <h1></h1>
                    <div className="border-2 mt-4 border-orange-500 mb-4 rounded-lg w-full lg:w-[700px] px-5 py-2 mx-auto">
                        <h3 className="font-bold text-center text-lg">{title}</h3>
                        <h3 className="font-bold text-center text-lg">Subject: {Category}</h3>
                        <p className="py-4 justify-between">Dear Participant, <br /><span className="text-justify">{description}</span></p>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className=" ">
                                <div className=" ">
                                    <label className="text-xl">Your Name: </label>
                                    <div>
                                        <input
                                            className="border-2 mt-3 p-2 rounded-lg w-full"
                                            type="text"
                                            defaultValue={user?.displayName}
                                        />
                                    </div>
                                    <br />
                                    <label className="text-xl">Email: </label>
                                    <div>
                                        <input
                                            className="border-2 mt-3 p-2 rounded-lg w-full"
                                            type="email"
                                            defaultValue={user?.email}
                                        />
                                    </div>
                                    <label className="text-xl ">Survey Owner: </label>
                                    <div>
                                        <input
                                            className="border-2 mt-3 p-2 rounded-lg w-full"
                                            type="email"
                                            defaultValue={email}
                                        />
                                    </div>
                                    <label className="text-xl">Did you like Today's Class? </label>

                                    <div className="flex gap-4 lg:ml-60 items-center mt-2">
                                        <label className="mr-2">
                                            <input {...register('likedClass')} type="radio" value="like" />
                                            <span className="text-sky-400 font-bold ml-1">Like</span>
                                        </label>
                                        <label>
                                            <input {...register('likedClass')} type="radio" value="dislike" />
                                            <span className="text-red-500 font-bold ml-1">Dislike</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="">
                                    <label className="text-xl ">There was Gap in todays Class?</label>
                                    <div>
                                        <select {...register('gapInClass')} className="border-2 p-2 rounded-lg mt-3 w-full">
                                            <option value="">Select Yes Or No</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <br />
                                    <label className="text-xl">Report This Class:</label>
                                    <div>
                                        <textarea
                                            {...register('report')}
                                            className="w-full mt-5 px-1 py-1 border-2 rounded-lg"
                                            placeholder="Write Report"
                                            cols="10"
                                            rows="5"
                                        ></textarea>
                                    </div>
                                </div>
                                <input
                                    className="border-2 px-20 mb-10 flex mx-auto text-center py-1 mt-6 rounded-lg cursor-pointer border-orange-600 hover:bg-orange-200 font-bold"
                                    type="submit"
                                    value="Submit"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <h1 className="text-3xl text-center font-bold">Pro User Comment</h1>
                <div>
                    {
                        commentData.map(comment => <div key={comment._id}>
                            <div className="border mx-10 mt-6 rounded-lg border-green-500 mb-3 p-3">
                                <p className="font-bold">{comment.name}</p>
                                <p>{comment.proUserComment}</p>
                            </div>

                        </div>)
                    }
                </div>
                {isProUser && (
                    <form onSubmit={handleSubmit(onSubmitComment)}>
                        <input
                            className="border-2 flex mt-8 mx-auto py-2 px-1 lg:w-1/2 mb-4"
                            type="text"
                            placeholder="Only Pro User can comment"
                            {...register('proUserComment')} // Assuming you have a form field for the comment
                        />
                        <input className="btn flex mx-auto mb-7" type="submit" value="Submit Comment" />
                    </form>
                )}
            </div>
        </div>
    );
};

export default VotedPage;
