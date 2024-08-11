import React from 'react';
import './MainCard.css'
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface MainCardProps {
    width:string;
    title:string;
    
}

export function MainCard({width,title}: MainCardProps) {
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
    <Card
      variant='outlined'
      sx={{
        borderRadius:"20px",
        width: width,
        height: '50%',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          height: '100%', // CardContent가 전체 높이를 차지하도록 설정
        }}
      >
        {/* 위에 간단한 소개 */}
        <div className='main-card-title' style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='main-title-txts'>
            <Typography fontSize={'14px'}>{title}</Typography>
            <Typography fontSize={'18px'} fontWeight={'500'}>
              55555명
            </Typography>
          </div>
          <div
            className='circle'
            style={{
              backgroundColor: '#D3DEF6',
            }}
          >
            <FaUserAlt size={20} />
          </div>
        </div>
        {/* 아래에 차트 */}
        <Divider />
        
        <div style={{ flexGrow: 1 }}> {/* 이 div가 남은 모든 공간을 차지하게 설정 */}
          <Line data={data} options={options} style={{ height: '100%' }} />
        </div>
      </CardContent>
    </Card>
  );
}
