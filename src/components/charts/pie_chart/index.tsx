import dynamic from 'next/dynamic';
import React from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PieChartProps {
    series: number[];
    labels: string[];
    width: number;
}

const PieChart: React.FC<PieChartProps> = ({ series, labels, width }) => {
    const options = {
        labels: labels,
        legend: {
            fontSize: '25px',
            labels: { colors: 'white' }
        },
        stroke: {
            show: true,
            width: 0.5,
            colors: ['black']
        }
    };

    return (
        <>
            <ReactApexChart series={series} options={options} type="pie" width={width.toString()} />
        </>
    );
}

export default PieChart;