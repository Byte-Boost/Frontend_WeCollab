import CustomButton from "@/components/CustomElements/custom_button";
import { User } from "@/models/models";
import { getAreas, getCompletedTicketsRatio, getSpeedTicketsRatio } from "@/scripts/http-requests/endpoints";
import { failureAlert, successAlert } from "@/scripts/utils/shared";
import { getSessionUser } from "@/scripts/utils/userService";
import xlsxToJSON from "@/scripts/utils/xlsxToJSON";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
const PieChart = dynamic(() => import('@/components/DashBoard/pie_chart'), { ssr: false });
const ColumnChart = dynamic(() => import('@/components/DashBoard/column_chart'), { ssr: false });
function Home() {
    const [ticketSpeedData, setTicketSpeedData] = useState<{ area: string, tickets: { speed: number | null }}[]>([]);
    const [ticketCompletionData, setTicketCompletionData] = useState<{ area: string, tickets: {concluido : number,ratio : number,total : number }}[]>([]);
    const [areas, setAreas] = useState<string[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [importedData, setImportedData] = useState<any>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        fetchCurrentUser();
    }, []);
    useEffect(() => {
        if (currentUser) {
            fetchAreas();
        }
    }, [currentUser]);
    useEffect(() => {
        if (areas.length > 0) {
            fetchTicketSpeed();
            fetchTicketCompletionRatio();
        }
    }, [areas]);
    useEffect(()=>{
        handleImport(selectedFile);
    }, [selectedFile]);
    useEffect(() => {
    }, [ticketSpeedData]);
    useEffect(() => {
    }, [ticketCompletionData]);

    

    async function fetchCurrentUser() {
        const user = await getSessionUser();
        setCurrentUser(user as unknown as User);
    }

    async function fetchAreas() {
        if (currentUser?.admin) {
            const areas = await getAreas({});
            setAreas(areas.map((area) => area.name));
        } else if (currentUser) {
            setAreas([currentUser.area as string]);
        }
    }

    async function fetchTicketSpeed() {
        const ticketSpeedPromises = areas.map(async (area) => {
            const tickets = await getSpeedTicketsRatio(area);
            return { area, tickets };
        });

        const ticketSpeedData = await Promise.all(ticketSpeedPromises);
        setTicketSpeedData(ticketSpeedData);
        checkDataFetched(ticketSpeedData, ticketCompletionData);
    }

    async function fetchTicketCompletionRatio() {
        const ticketCompletionPromises = areas.map(async (area) => {
            const tickets = await getCompletedTicketsRatio(area);
            return { area, tickets };
        });

        const ticketCompletionData = await Promise.all(ticketCompletionPromises);
        setTicketCompletionData(ticketCompletionData);
        checkDataFetched(ticketSpeedData, ticketCompletionData);
    }

    function checkDataFetched(speedData: { area: string, tickets: { speed: number | null } }[], completionData: { area: string,  tickets: {concluido : number,ratio : number,total : number }}[]) {
        if (speedData.length > 0 || completionData.length > 0) {
            setDataFetched(true);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        setSelectedFile(file);
    };

    async function handleImportedRow(jsonRow: any){
        console.log(jsonRow);
    }
    
    async function handleImport(file: any){
        if(file) {
            const jsonData = await xlsxToJSON(file);
            let i = 0;
            try{
              while(jsonData.length > i) {
                handleImportedRow(jsonData[i])
                i++;
              };
              successAlert('Sequências importadas com sucesso!', 'Sucesso');
            } catch (err: any){
              failureAlert(err.message, 'Erro');
            }
        }
    }

    return (
        <div className={`${currentUser?.admin? 'bg-white' : ''} min-h-screen flex flex-col justify-start`}>
            <Head>
                <title>Home - WeCollab</title>
            </Head>


                {dataFetched && currentUser?.admin ? (
                <div className="flex justify-center flex-col items-center h-[85vh]">
                    <h1 className="text-lg font-bold">Informações sobre Tickets</h1>
                    <label className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-2 cursor-pointer' htmlFor='file'>Escolha um arquivo</label>
                    <input className='hidden' type="file" name="file" id='file' required accept='.xlsx' onChange={handleFileChange}/>
                    <div className="flex justify-between items-center bg-white p-4 w-full">
                        <PieChart
                            name="Tickets concluídos em total"
                            series={[(ticketCompletionData.reduce((sum,data) => sum +  data.tickets.concluido, 0 )),(ticketCompletionData.reduce((sum, data) => sum + data.tickets.total, 0))-((ticketCompletionData.reduce((sum,data) => sum +  data.tickets.concluido, 0 )))]}
                            labels={['Concluido','Em andamento']}
                            colors={['#007BFF','#135f2f']}
                            width={600}
                            title="Tickets concluídos em total"
                            textColor="black"
                        />
                        <ColumnChart
                            name="Dias em média para concluir um ticket"
                            categories={ticketSpeedData.map(data => data.area)}
                            data={ticketSpeedData.map(data => parseFloat(((data.tickets.speed ?? 0)/(1000 * 60 * 60 * 24)).toFixed(0)))}
                            width={600}
                            title="Média de dias para concluir um ticket por área"	
                            textColor=""
                        />
                    </div>
                    <p>Info: {importedData.id}</p>
                </div>
                ) : (
                    currentUser?.admin ? (
                    <h1 className="text-2xl text-white">Carregando...</h1>
                    ) : 
                    <div className="flex justify-center flex-col items-center h-[85vh]">
                    <img src="/favicon-dark.ico" className="pointer-events-none" />
                    </div>
                )}
            
        </div>
    );
}

export default Home;