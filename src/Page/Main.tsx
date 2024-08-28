import React, { useEffect } from 'react';
import './Main.css'
import { Card, CardContent, Divider, Typography } from '@mui/material';
import { FaUserAlt } from "react-icons/fa";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { MainCard } from '../Component/MainCard';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export interface MainProps { }

export function Main(props: MainProps) {
    const navigate=useNavigate()
    useEffect(()=>{
        navigate("/hospital")
    },[])
    // Chart.js 데이터와 옵션 설정
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Acquisition Over Time',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Acquisition Line Chart',
            },
        },
    };

    return (
        <div className='main-container'>
            {/* <MainCard 
            title={"Acquisition"}
            width='calc(25% - 20px)' />
            <MainCard
            title={"Retention Rate"}
            width='calc(25% - 20px)' />
            <MainCard 
            title={"DAU"}
            width='calc(25% - 20px)' />
            <MainCard 
            title={"MAU"}
            width='calc(25% - 20px)' />
            <MainCard 
            title="Average Session"
            width='calc(25% - 20px)' />
            <MainCard 
            title={"Average Frequency"}
            width='calc(25% - 20px)' />
            <MainCard 
            title={"Uninstall Rate"}
            width='calc(25% - 20px)' />
            <MainCard 
            title={"App Push"}
            width='calc(25% - 20px)' />
            <MainCard 
            title={"Total Impression"}
            width='calc(25% - 20px)' />
            <MainCard 
            title={"CTR"}
            width='calc(25% - 20px)' />
            <MainCard 
            title={"Retention Rate"}
            width='calc(25% - 20px)' />
            <MainCard 
            title={"Average Session"}
            width='calc(25% - 20px)' />
            <MainCard 
            title={"Average Frequency"}
            width='calc(25% - 20px)' /> */}
        </div>
    );
}
