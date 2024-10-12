import { Select } from 'flowbite-react';
import React, { ChangeEventHandler, forwardRef, LegacyRef } from 'react';
import { twMerge } from 'tailwind-merge';

/* Based on Uiverse.io by kamehame-ha */ 

interface CustomInputProps {
  labelName?: string;
  name: string;
  value?: string;
  options: any;
  defaultValue?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  maxLenght? : number;
  onChange?: ChangeEventHandler;

}
const CustomSelect = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  return (
    <div className={twMerge('w-[20rem] flex flex-col static ', props.containerClassName)}>
      <label htmlFor={props.name} className={twMerge(`text-[0.75rem] relative font-[700] top-[0.5rem] w-fit bg-white ml-[10px] px-[10px]`,props.labelClassName)}>{props.labelName}</label>
      
      <select id={props.name} name={props.name} value={props.value} onChange={props.onChange} required
      className={twMerge(`p-[4px] h-[2.9em] text-[1rem] border-[#C019A2] rounded border bg-transparent`,props.inputClassName) }
      ref={ref as LegacyRef<HTMLSelectElement>} 
      >
            <option value="" disabled>{props.defaultValue}</option>
            {
                props.options.map((option: any, i: number) => {
                    return <option key={i} value={option.name}>{option.name}</option>
                })
            }
      </select>
    </div>
  );
});
export default CustomSelect;