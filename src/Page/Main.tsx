import React from 'react';
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
            {/* Acquisition 카드 */}
            <MainCard 
            title={"Acquisition"}
            width='calc(25% - 20px)' />
            {/* Retention Rate 카드 */}
            <MainCard
            title={"Retention Rate"}
            width='calc(25% - 20px)' />
            {/* DAU 카드 */}
            <MainCard 
            title={"DAU"}
            width='calc(25% - 20px)' />
            {/* MAU  카드 */}
            <MainCard 
            title={"MAU"}
            width='calc(25% - 20px)' />
            {/* Average Session 카드 */}
            <MainCard 
            title="Average Session"
            width='calc(25% - 20px)' />
            {/* Average Frequency 카드 */}
            <MainCard 
            title={"Average Frequency"}
            width='calc(25% - 20px)' />
            {/* Uninstall Rate 카드 */}
            <MainCard 
            title={"Uninstall Rate"}
            width='calc(25% - 20px)' />
            {/* App Push 카드 */}
            <MainCard 
            title={"App Push"}
            width='calc(25% - 20px)' />
            {/* Total Impression 카드 */}
            <MainCard 
            title={"Total Impression"}
            width='calc(25% - 20px)' />
            {/* CTR 카드 */}
            <MainCard 
            title={"CTR"}
            width='calc(25% - 20px)' />
            {/* Retention Rate 카드 */}
            <MainCard 
            title={"Retention Rate"}
            width='calc(25% - 20px)' />
            {/* Average Session 카드 */}
            <MainCard 
            title={"Average Session"}
            width='calc(25% - 20px)' />
            {/* Average Frequency 카드 */}
            <MainCard 
            title={"Average Frequency"}
            width='calc(25% - 20px)' />
        </div>
    );
}
