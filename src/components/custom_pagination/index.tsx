import { useEffect, useState } from 'react';


function CustomPagination({currentPage, totalPages, onPageChange}: {currentPage: number, totalPages: number, onPageChange: Function}){
    const [currentSelectedPage, setcurrentSelectedPage] = useState<number>(1);
    const [shownPages, setShownPages] = useState<Array<number>>([1])
    const range = (n: number) => Array.from({length: n}, (value, key) => key+1)

    const calculateNeighbors = (page: number): Array<number> => {
        const calculated: Array<number> = []
        let maximumStop = page +2;
        if (totalPages <= 5) return range(totalPages)
        if (totalPages > 5 && page <=3) return range(5) 
        while (!(calculated.length == 5 || maximumStop <= 0)) {
            console.log(maximumStop)
            if (maximumStop <= totalPages) calculated.push(maximumStop);
            maximumStop--;
        }
        return calculated.reverse();
    } 
    useEffect(()=>{
        setcurrentSelectedPage(currentSelectedPage)
        setShownPages(calculateNeighbors(currentSelectedPage));
        
    }, [])
    
    return (
        <div id="paginationContainer" className="flex justify-center items-center gap-2">
            <button value="test" className="p-2 bg-slate-200 rounded-l-lg" onClick={()=>{
                onPageChange(currentPage-1)
            }}>Anterior</button>
            
            {
                shownPages.map((pageNum: number)=>{
                    return (
                        <button key={pageNum} value="test" className={"py-2 px-5 rounded-full w-[2rem] flex justify-center "+ (pageNum == currentSelectedPage ? "bg-blue-200" : "bg-slate-200")}>{pageNum}</button>
                    )
                })
            }
            
            <button value="test" className="p-2 bg-slate-200 rounded-r-lg" onClick={()=>{
                onPageChange(currentPage+1)
            }}>Próximo</button>
        </div>    
    )
};

export default CustomPagination;
