import dynamic from 'next/dynamic';
import React from 'react';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ColumnChartProps {
    data: number[];
    categories: string[];
    width: number;
    name: string;
    title?: string;
    textColor?: string;
}

function ColumnChart({ name, data, categories, width, title, textColor = 'black' }: ColumnChartProps) {
    const series = [
        {
            name: name,
            data: data
        }
    ];

    const options: ApexCharts.ApexOptions = {
        chart: {
            background: '#FFFFFF'
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    colors: textColor
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: textColor
                }
            }
        },
        legend: {
            fontSize: '25px',
            labels: { colors: textColor }
        },
        title: {
            text: title,
            align: 'center',
            style: {
                color: textColor,
                fontSize: '15px',
                fontWeight: 'normal'
            }
        }
    };

    return (
        <ReactApexChart series={series} options={options} type="bar" width={width.toString()} />
    );
}

export default ColumnChart;