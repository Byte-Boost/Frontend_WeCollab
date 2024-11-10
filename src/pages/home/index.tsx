import ColumnChart from "@/components/charts/column_chart";
import PieChart from "@/components/charts/pie_chart";
import Head from "next/head";

function Home() {
    return (
        <div className="">
            <Head>
                <title>Home - WeCollab</title>
            </Head>
            <div className="flex justify-center flex-col items-center h-[85vh]">
                {/* <img src="/favicon-dark.ico" className="pointer-events-none"/> */}
                <PieChart series={[3,4,5]} labels={['doing', 'done', 'to do']} width={900}/>
                <ColumnChart name={"taxes"} categories={['IPVA','IPTU','Aluguel','Imposto']} data={[4, 10, 16, 22]} width={900}/>
            </div>
        </div>
        );
}

export default Home;