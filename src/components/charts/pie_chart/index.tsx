import ReactApexChart from "react-apexcharts";

interface PieChartProps {
    values: number[]
    labels: string[]
    width: number
}

function PieChart({ values, labels, width }: PieChartProps) {
    const series = values;
    const options = {
        chart: {
            background: '#FFFFFF'
        },
        labels: labels,
        legend: {
            fontSize: '25px',
            labels: { colors: 'white' }
        },
        stroke: {
            show: true,
            width: 0.5,
            colors: 'black'
        }
    };

    return (
        <>
            <ReactApexChart series={series} options={options} type="pie" width={width.toString()} />
        </>
    );
}

export default PieChart;
