import { MouseEventHandler } from 'react'
import './button.css'

interface CustomButton{
    name: string;
    onClick?: MouseEventHandler
    value: string
}


function CustomButton(CustomButton: CustomButton ){
    return(
        <button className='btn' onClick={CustomButton.onClick} name={CustomButton.name}>{CustomButton.value}</button>
    )
}

export default CustomButton;