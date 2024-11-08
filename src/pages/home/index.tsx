import PieChart from "@/components/charts/pie_chart";

function Home() {
    return (
        <div className="">
                <div className="flex justify-center flex-col items-center h-[85vh]">
                    {/* <img src="/favicon-dark.ico" className="pointer-events-none"/> */}
                    <PieChart/>
                </div>
        </div>
        );
}

export default Home;