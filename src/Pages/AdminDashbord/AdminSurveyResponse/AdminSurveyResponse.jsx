import React, { useState, useEffect, useRef, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import Chart from "chart.js/auto"; // Import Chart.js
import useAxiosPublic from "../../../hooks/UseAxiosPublic";


const AdminSurveyResponse = () => {

    const axiosPublic = useAxiosPublic();
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
            <p>Total: {totalSurveyResponse.length}</p>
            <div className="">
                <table className="table border rounded-lg lg:w-[800px] mx-auto border-lime-600">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Time</th>
                            <th>Vote Count</th>
                            {/* Change the column name to "Vote Count" */}
                        </tr>
                    </thead>
                    <tbody>
                        {totalSurveyResponse.map((data, index) => (
                            <tr key={data._id}>
                                <th>{index + 1}</th>
                                <td>{data.Category}</td>
                                <td>{data.email}</td>
                                <td>{data.timestamp}</td>
                                <td>{categoryCountMap[data.Category]}</td>
                                {/* Display the vote count for each category */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <canvas id="pie-chart"></canvas>
            </div>
        </div>
    );
};
export default AdminSurveyResponse;