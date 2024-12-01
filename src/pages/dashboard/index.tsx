import CustomButton from "@/components/CustomElements/custom_button";
import { User } from "@/models/models";
import { getAreas, getCompletedTicketsRatio, getSpeedTicketsRatio } from "@/scripts/http-requests/endpoints";
import { formatMoney } from "@/scripts/utils/dataFormatter";
import { failureAlert, successAlert } from "@/scripts/utils/shared";
import { getSessionUser } from "@/scripts/utils/userService";
import xlsxToJSON from "@/scripts/utils/xlsxToJSON";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
const PieChart = dynamic(() => import('@/components/DashBoard/pie_chart'), { ssr: false });
const ColumnChart = dynamic(() => import('@/components/DashBoard/column_chart'), { ssr: false });
function DashBoard() {
    const [ticketSpeedData, setTicketSpeedData] = useState<{ area: string, tickets: { speed: number | null }}[]>([]);
    const [ticketCompletionData, setTicketCompletionData] = useState<{ area: string, tickets: {concluido : number,ratio : number,total : number }}[]>([]);
    const [areas, setAreas] = useState<string[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [cotasData, setCotasData] = useState<any>({});
    const [fiscalData,setFiscalData] = useState<any>({});
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

    async function handleImportedRow(jsonRow: any) {
        if (jsonRow["Nota Fiscal/Série"]) {
            const fiscalEntry = {
                "Nota Fiscal/Série": jsonRow["Nota Fiscal/Série"],
                "Pagador do frete/Nome fantasia": jsonRow["Pagador do frete/Nome fantasia"],
                "Nota Fiscal": 1 // Initialize with 1 as each entry represents one "Nota Fiscal"
            };
            setFiscalData((prevData: any) => {
                if (!Array.isArray(prevData)) {
                    return [fiscalEntry];
                }
                const existingClientIndex = prevData.findIndex((entry: any) => entry["Pagador do frete/Nome fantasia"] === fiscalEntry["Pagador do frete/Nome fantasia"]);
                if (existingClientIndex !== -1) {
                    const updatedData = [...prevData];
                    updatedData[existingClientIndex]["Nota Fiscal"] += 1;
                    return updatedData;
                } else {
                    return [...prevData, fiscalEntry];
                }
            });
        }
        if (jsonRow["CLIENTE"]) {
            const cotasEntry = {
                "CLIENTE": jsonRow["CLIENTE"],
                "Total a receber": parseFloat(jsonRow["Total a receber"]) || 0
            };
            setCotasData((prevData: any) => {
                if (!Array.isArray(prevData)) {
                    return [cotasEntry];
                }
                const existingClientIndex = prevData.findIndex((entry: any) => entry["CLIENTE"] === cotasEntry["CLIENTE"]);
                if (existingClientIndex !== -1) {
                    const updatedData = [...prevData];
                    updatedData[existingClientIndex]["Total a receber"] += cotasEntry["Total a receber"];
                    return updatedData;
                } else {
                    return [...prevData, cotasEntry];
                }
            });
        }
    }
    useEffect(() => {console.log(fiscalData)}, [fiscalData]);
    useEffect(() => {console.log(cotasData)}, [cotasData]);

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
        <div className={`${currentUser?.admin ? 'bg-white' : ''} min-h-screen  flex flex-col justify-start overflow-y-auto`}>
            <Head>
                <title>Home - WeCollab</title>
            </Head>
            <section>
                {dataFetched && currentUser?.admin ? (
                <div className="flex justify-center flex-col items-center">
                    <h1 className="text-lg font-bold">Informações sobre Tickets</h1>
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
                    <div className="flex flex-col gap-4 bg-white p-4 w-full border text-center">
                    <h1 className="text-lg font-bold">Notas e Cotas de Clientes</h1>
                    <div className="flex flex-row  bg-white p-4 overflow-hidden">

                    {fiscalData.length > 0 && (
                        <PieChart
                            name="Notas fiscais por cliente ( quantidade ) "
                            series={fiscalData.map((data : any)  => data["Nota Fiscal"]) as number[]}
                            labels={fiscalData.map((data : any) => data["Pagador do frete/Nome fantasia"])}
                            colors={['#FF69B4', '#8A2BE2', '#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#581845', '#28B463', '#1F618D', '#F39C12', '#D35400', '#7D3C98', '#2E4053', '#16A085', '#F4D03F', '#E74C3C', '#5D6D7E', '#AF7AC5', '#1ABC9C']}
                            width={700}
                            suffix="notas fiscais"
                            title="Notas fiscais por cliente ( quantidade )"
                            textColor="black"
                        />)}
                        {cotasData.length > 0 && (
                        <PieChart
                            name="Cotas a receber por cliente (quantidade) "
                            series={cotasData.map((data : any)  => data["Total a receber"]) as number[]}
                            labels={cotasData.map((data : any) => data["CLIENTE"])}
                            colors={['#FF69B4', '#135f2f', '#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#581845', '#28B463', '#1F618D', '#F39C12', '#D35400', '#7D3C98', '#2E4053', '#16A085', '#F4D03F', '#E74C3C', '#5D6D7E', '#AF7AC5', '#1ABC9C']}
                            formattingFunction={(value:number) => {return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}}
                            width={700}
                            suffix=""
                            title="Cotas a receber por cliente (quantidade)"
                            textColor="black"
                        />)}
                        </div>
                        <div className="text-center self-center content-center">
                            <label className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded p-2 cursor-pointer' htmlFor='file'>Adicionar Dados</label>
                            <input className='hidden' type="file" name="file" id='file' required accept='.xlsx' onChange={handleFileChange}/>
                        </div>
                    </div>
                </div>
                ) : (
                    currentUser?.admin ? (
                    <h1 className="text-2xl text-white">Carregando...</h1>
                    ) : 
                    <div className="flex justify-center flex-col items-center h-[85vh]">
                    <img src="/favicon-dark.ico" className="pointer-events-none" />
                    </div>
                )}
        </section>
        </div>
    );
}

export default DashBoard;