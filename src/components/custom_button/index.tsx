import { MouseEventHandler } from 'react'
import './button.css'




function CustomButton(name: string, onClick? : MouseEventHandler ){
    if (onClick == undefined){
        onClick = () => ``
    }
    return(
        <>
        <button className='Button' onClick={onClick} name={name}/>
        </>
    )
}
