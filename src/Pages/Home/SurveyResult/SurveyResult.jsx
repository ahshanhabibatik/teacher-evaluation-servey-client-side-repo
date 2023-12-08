import React, { useState, useEffect, useRef, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Chart from "chart.js/auto";
import useAxiosPublic from "../../../hooks/UseAxiosPublic";
import NavBar from "../../Shared/NavBar";

const SurveyResult = () => {
    const axiosPublic = useAxiosPublic();
    const chartRef = useRef(null);

    const { data: totalSurveyResponse = [] } = useQuery({
        queryKey: ["totalSurveyResponse"],
        queryFn: async () => {
            const res = await axiosPublic.get('CheckUserResponse');
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
            <NavBar></NavBar>
            <p className="text-2xl font-bold text-center">Total Response: {totalSurveyResponse.length}</p>
            <div className="mt-4 h-96">
                <canvas id="pie-chart"></canvas>
            </div>
        </div>
    );
};

export default SurveyResult;