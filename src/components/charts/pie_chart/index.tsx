import ReactApexChart from "react-apexcharts"

function PieChart(){
    const series = [1,2,3,4]
    const options = {
        labels:['a','b','c','d'], 
        responsive: [{
            breakpoint: 480
        }]
    }

    return (
        <>
            <ReactApexChart series={series} options={options} type="pie" width='500' />
        </>
    )
}
export default PieChart