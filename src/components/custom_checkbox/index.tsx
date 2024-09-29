
function CustomCheckbox({label, name, cb}: {label: string, name: string, cb: Function}){
    return(  
        
        <div className="inline-flex items-center">
            <label className="flex items-center cursor-pointer relative" htmlFor={"checkbox-"+name}>
                <input id={"checkbox-"+name} onChange={(e)=>{cb(e.target.checked)}} type="checkbox" name={name} className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-red-600 checked:border-red-600"/>
                <span className="absolute text-red-300 opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                </span>
            </label>
            <label className="cursor-pointer ml-2 text-red-600 font-bold text-sm" htmlFor={"checkbox-"+name}>
                {label}
            </label>
        </div>
    )
}

export default CustomCheckbox;