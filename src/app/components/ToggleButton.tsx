"use client"
import { useEffect, useState } from 'react'
import { useThemeSwitch } from './Hooks/useThemeSwitch'
import useToggleStore from '../storeZustand/ToggleStore';
const ToggleButton = () => {
    const { isToggled, toggle } = useToggleStore();
    useEffect(() => {
        console.log("Toggle state:", isToggled);
    }, [isToggled]);


  return (
    <button className='inline-block sm:hidden z-50' onClick={toggle} >
    <div className="w-6 cursor-pointer transition-all ease duration-300 ">
       <div className="relative">
            <span className='absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200 '
            style={{
                transform: isToggled ? "rotate(-45deg) translateY(0)" : "rotate(0deg) translateY(6px) "
            }}
            >&nbsp;</span>
            <span className='absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200  '
            style={{
               opacity: isToggled ? 0 : 1
            }}>&nbsp;</span>
            <span className='absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all easeduration-200  '
            
            style={{
                transform: isToggled ? "rotate(45deg) translateY(0)" : "rotate(0deg) translateY(-6px) "
            }}>&nbsp;</span>
       </div>
    </div>
</button>
  )
}

export default ToggleButton