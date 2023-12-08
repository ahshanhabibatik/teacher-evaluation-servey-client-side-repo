import { useQuery } from "@tanstack/react-query";

import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { useContext, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
const SurveyorHome = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: surveyQuestion = []} = useQuery({
        queryKey: ['surveyQuestion'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/surveyQuestion?email=${user.email}`);
            return res.data;
        }
    });

    const { data: totalSurvey = [] } = useQuery({
        queryKey: ["totalSurvey"],
        queryFn: async () => {
            const res = await axiosPublic.get('submitSurveyResponse');
            return res.data;
        },
    });

    const { user } = useContext(AuthContext);
    const chartRef = useRef(null);

    const { data: totalSurveyResponse = [] } = useQuery({
        queryKey: ["totalSurveyResponse"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/surveyQuestion?email=${user.email}`);
            return res.data;
        },
    });

    const [categoryCountMap, setCategoryCountMap] = useState({});

    useEffect(() => {
        const countMap = {};
        totalSurveyResponse.forEach((data) => {
            const category = data.Category;
            countMap[category] = (countMap[category] || 0) + 1;
        });
        setCategoryCountMap(countMap);
    }, [totalSurveyResponse]);

    // Convert data for Chart.js
    const chartData = {
        labels: Object.keys(categoryCountMap),
        datasets: [
            {
                data: Object.values(categoryCountMap),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(255, 206, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                    "rgba(255, 159, 64, 0.8)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    useEffect(() => {
        // Destroy the existing chart instance before rendering a new one
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Render the new chart
        const ctx = document.getElementById("pie-chart").getContext("2d");
        chartRef.current = new Chart(ctx, {
            type: "pie",
            data: chartData,
            options: chartOptions,
        });
    }, [totalSurveyResponse, categoryCountMap]);



    return (
        <div>
            <div className="grid grid-cols-4 gap-3">
                <p className="bg-sky-500 w-48 h-32 font-bold text-3xl text-center px-5 py-2">Survey Response: <br />{totalSurvey?.length}</p>
                <p className="bg-amber-400 w-48 h-32 font-bold text-3xl text-center px-5 py-2">Total Survey: <br />{surveyQuestion?.length}</p>
            </div>
            <div>
                <h1 className="font-bold  text-3xl text-center mt-7">Result Analysis</h1>
                <div className="mt-4 h-[400px]">
                    <canvas id="pie-chart"></canvas>
                </div>
            </div>
        </div>
    );
};


export default SurveyorHome;