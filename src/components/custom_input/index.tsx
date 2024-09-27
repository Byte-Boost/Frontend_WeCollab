import React, { forwardRef, LegacyRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* Based on Uiverse.io by kamehame-ha */ 

interface CustomInputProps {
  name: string;
  value?: string;
  type: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}
const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  return (
    <div className={twMerge('w-[20rem] flex flex-col static ', props.containerClassName)}>
      <label htmlFor={props.name} className={twMerge(`text-[0.75rem] relative font-[700] top-[0.5rem] w-fit bg-white ml-[10px] px-[10px]`,props.labelClassName)}>{props.name}</label>
      <input 
        type={props.type} 
        name={props.name} 
        className={twMerge(`p-[4px] text-[1.5rem] border-[#C019A2] rounded border-[2px]`,props.inputClassName) }
        ref={ref as LegacyRef<HTMLInputElement>} 
      />
    </div>
  );
});
export default CustomInput;