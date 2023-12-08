import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    const axiosPublic = useAxiosPublic();

    const { data: totalPayment = [] } = useQuery({
        queryKey: ["totalPayment"],
        queryFn: async () => {
            const res = await axiosPublic.get('adminPaymentInfo');
            return res.data;
        },
    });

    const { data: surveyQuestion = [], refetch } = useQuery({
        queryKey: ['surveyorRequest'],
        queryFn: async () => {
            const res = await axiosSecure.get('/surveyorRequest');
            return res.data;
        }
    });

    const { data: totalSurvey = [] } = useQuery({
        queryKey: ["totalSurvey"],
        queryFn: async () => {
            const res = await axiosPublic.get('CheckAdminResponse');
            return res.data;
        },
    });

    const chartRef = useRef(null);

    const { data: totalSurveyResponse = [], isLoading } = useQuery({
        queryKey: ["totalSurveyResponse"],
        queryFn: async () => {
            const res = await axiosPublic.get('CheckAdminResponse');
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
                <p className="bg-lime-300 w-48 h-32 font-bold text-3xl text-center px-5 py-6">Total User: <br />{users?.length}</p>
                <p className="bg-green-500 w-48 h-32 font-bold text-3xl text-center px-5 py-2">Total Payment: {totalPayment?.length}</p>
                <p className="bg-teal-500 w-48 h-32 font-bold text-3xl text-center px-5 py-2">Survey Request: <br /> {surveyQuestion?.length}</p>
                <p className="bg-sky-500 w-48 h-32 font-bold text-3xl text-center px-5 py-2">Survey Response: <br />{totalSurvey?.length}</p>
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

export default AdminHome;