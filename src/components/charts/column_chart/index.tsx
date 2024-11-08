import ReactApexChart from "react-apexcharts";

interface ColumnChartProps {
    data: number[]
    categories: string[]
    width: number
    name: string
}

function ColumnChart({name, data, categories, width }: ColumnChartProps) {
    const series = [
        {
            name: name,
            data: data
        }
    ];

    const options = {
        chart: {
            background: '#FFFFFF'
        },
        xaxis: {
            categories: categories
        },
        legend: {
            fontSize: '25px',
            labels: { colors: 'black' }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,          // Arredonda os cantos das colunas
                borderColor: '#0000FF',   // Cor do contorno (exemplo: azul)
                borderWidth: 2            // Largura do contorno
            }
        },
        colors: ['#8A0DF9'] // Cor das colunas (exemplo: vermelho)
    };

    return (
        <>
            <ReactApexChart series={series} options={options} type="bar" width={width.toString()} />
        </>
    );
}

export default ColumnChart;
