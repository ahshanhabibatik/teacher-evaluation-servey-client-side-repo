import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/UseAxiosSecure';
import useAxiosPublic from '../../hooks/UseAxiosPublic';

const SurveyorAllData = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    
    const { data: totalSurvey = [] } = useQuery({
        queryKey: ["totalSurvey"],
        queryFn: async () => {
            const res = await axiosPublic.get('CheckAdminResponse');
            return res.data;
        },
    });

    const { data: surveyorData, isLoading, isError } = useQuery({
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

    console.log(surveyorData);

    if (isLoading) {
        return <span className="loading flex mx-auto justify-center loading-ring   w-40"></span>;
    }

    if (isError || !surveyorData) {
        return <p>You can click Public and UnPublic then go to result </p>;
    }

    const { title, description, Category, vote, date } = surveyorData;

    return (
        <div className='border-2 border-orange-600 h-{600} w-[600px] px-3 py-2 mx-auto'>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <p className='mt-2 text-justify'>{description}</p>
            <p className='mt-2 text-2xl font-bold'>Subject: {Category}</p>
            <p className='mt-2 text-xl font-bold '><span className='text-red-500 font-bold'>Date: </span>{date}</p>

            <p className='text-4xl mt-2 text-center font-bold'>Total Vote: {totalSurvey.length}</p>

            <Link to="/dashboard/surveyorRequest">
                <button className='border-2 flex mx-auto mt-3 border-orange-700 px-3 hover:bg-amber-400 py-2 rounded-lg'> Go Back</button>
            </Link>
        </div>
    );
};

export default SurveyorAllData;
