import { LegacyRef, MouseEventHandler } from 'react'
import './button.css'
import { twMerge } from 'tailwind-merge';

interface CustomButton{
    name: string;
    onClick?: MouseEventHandler;
    value: string;
    className?: string;
    ref? : LegacyRef<HTMLButtonElement> | undefined
}


function CustomButton(props: CustomButton ){
    return(
        <button ref={props.ref} className={twMerge('btn',props.className)} onClick={props.onClick} name={props.name}>{props.value}</button>
    )
}

export default CustomButton;