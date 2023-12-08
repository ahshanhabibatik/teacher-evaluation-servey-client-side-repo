import React from 'react';
import Banner from './Banner';
import MostVoted from './MostVoted/MostVoted';
import SurveyData from './SurveyData/SurveyData';
import Tastimonials from './Tastimonials/Tastimonials';
import QuestionAnswer from './QuestionAnswer/QuestionAnswer';
import NavBar from '../Shared/NavBar';

const Home = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Banner></Banner>
            <MostVoted></MostVoted>
            <SurveyData></SurveyData>
            <Tastimonials></Tastimonials>
            <QuestionAnswer></QuestionAnswer>
        </div>
    );
};

export default Home;









