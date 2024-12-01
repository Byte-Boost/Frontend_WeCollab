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
        <div className={` min-h-screen flex flex-col justify-start`}>
            <Head>
                <title>Home - WeCollab</title>
            </Head>
                <div className="flex justify-center flex-col items-center h-[85vh]">
                    <div className="flex justify-center flex-col items-center h-[85vh]">
                        <img src="/favicon-dark.ico" className="pointer-events-none" />
                    </div>
                </div>
        </div>
    );
}

export default Home;