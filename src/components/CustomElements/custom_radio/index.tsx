
function CustomRadio({cb=()=>{}, opts}: {cb: Function, opts: Array<{name: string, id: string, value: string | number, label: string, default?: boolean}>}){
    
    return(  
        <ul className="mt-[0.5rem] items-center w-full h-[3rem] text-sm font-medium text-gray-900 bg-[#fffff2] border-[#ccccc2] border rounded-lg sm:flex">
            {
                opts.map((opt, index, arr) => {
                    return (
                        <li className={"w-full"+ (index+1<arr.length?" border-b border-[#ccccc2] sm:border-b-0 sm:border-r":"")} key={"radio-opt-"+index}>
                            <div className="flex items-center ps-3">
                                <input onChange={(e)=>{cb(opt.value)}} id={opt.id} type="radio" value={opt.value} name="role" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"/>
                                <label htmlFor={opt.id} className="w-full py-3 ms-2 text-sm font-medium text-gray-900">{opt.label}</label>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default CustomRadio;