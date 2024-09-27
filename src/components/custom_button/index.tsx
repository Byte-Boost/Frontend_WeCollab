import { MouseEventHandler } from 'react'
import './button.css'

interface CustomButton{
    name: string;
    onClick?: MouseEventHandler
    value: string
}


function CustomButton(CustomButton: CustomButton ){
    if (CustomButton.onClick == undefined){
        CustomButton.onClick = () => ``
    }
    return(
        <>
        <button className='Btn'  onClick={CustomButton.onClick} name={CustomButton.name}>{CustomButton.value}</button>
        </>
    )
}

export default CustomButton;