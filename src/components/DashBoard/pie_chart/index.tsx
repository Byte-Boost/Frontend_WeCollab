import dynamic from 'next/dynamic';
import React from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PieChartProps {
    name: string;
    series: number[];
    labels: string[];
    suffix?: string;
    formattingFunction?: Function;
    width: number;
    title?: string;
    textColor?: string;
    colors?: string[]; 
}
const defaultFormattingFunction = (value: number) => {
    return value;
};


const PieChart: React.FC<PieChartProps> = ({ series, labels, width, title, formattingFunction = defaultFormattingFunction, textColor = 'black', colors = ['#00ff00', '#ff0000'], suffix="tickets" }) => {
    const options: ApexCharts.ApexOptions = {
        labels: labels,
        colors: colors, 
        legend: {
            fontSize: '15px',
            labels: { colors: textColor }
        },
        stroke: {
            show: true,
            width: 0.5,
            colors: ['black']
        },
        title: {
            text: title,
            align: 'center',
            style: {
                color: textColor,
                fontSize: '15px',
                fontWeight: 'normal'
            }
        },
        tooltip: {
            enabled: true,
            theme: 'dark',
            style: {
                fontSize: '12px',
                fontFamily: undefined
            },
            y: {
                formatter: function (val: number) {
                    return `${formattingFunction(val)} ${suffix}`;
                }
            }
        }
    };

    return (
        <ReactApexChart series={series} options={options} type="pie" width={width.toString()} />
    );
}

export default PieChart;