"use client";
import { useThemeSwitch } from './Hooks/useThemeSwitch'
import React, { useEffect, useRef, useState } from 'react';

import LightModeToggle from './LightModeToggle';
import Link from 'next/link';
import useToggleStore from '../storeZustand/ToggleStore';
import { usePathname } from 'next/navigation';
 
import { useRouter } from 'next/navigation'

 
interface NavbarProps {
    menuItems: MenuItem[];
}

interface MenuItem {
    id: string; // After mapping in mapMainMenuItems
    label?: string;
    icon?: string; // Assuming icon is optional
    // destination?: Destination;
    destination?: string;
    subMenuItems?: SubMenuItem[];
    menuItem?: { // New property to match RawMenuItem structure
      destination?: {
        uri: string; // Optional URI for navigation
      };
      label: string; // Required label for the menu item
      slug: string;
    };
    slug: string;
}

export interface SubMenuItem {
      id: string;
      // destination?: Destination; // Optional, as it may not be defined
      destination?: string;
      label: string;
}
export interface MenuResponse {
        menuItems: MenuItem[];  // ReturnType<typeof mapMainMenuItems>
}

const Navbar: React.FC<NavbarProps> = ({ menuItems }) => {
    const router = useRouter()
    const { isToggled, toggle } = useToggleStore();
    const [activeButton, setActiveButton] = useState<string | null>(null);
    // const indicatorRef = useRef<HTMLSpanElement>(null);
    const smallScreenIndicatorRef = useRef<HTMLSpanElement>(null);
    const largeScreenIndicatorRef = useRef<HTMLSpanElement>(null);
    const [mode, setMode] = useThemeSwitch();
    const pathname = usePathname();
    const isDarkMode = mode === "dark" ? true : false;

    useEffect(() => {
        // Set initial active button based on current pathname
        console.log("path: ",pathname);
        const modifiedPathname = pathname.length > 1 ? pathname + '/' : pathname
        console.log("modifiedPathname",modifiedPathname);

        menuItems.forEach(
          item =>  console.log(item)
        )
   
        const initialActiveButton = menuItems.find(item => item.destination === modifiedPathname)?.id || null;
        console.log("initialactiveButton: ",initialActiveButton );
        console.log("isDarkMode: ", isDarkMode);
        
        setActiveButton(initialActiveButton);
        updateIndicatorPosition(initialActiveButton);
    }, [pathname, menuItems]);
    // const updateIndicatorPosition = (id: string | null) => {
    //     const currentButton = document.getElementById(id);
    //     if (currentButton && indicatorRef.current) {
    //         indicatorRef.current.style.width = `${currentButton.offsetWidth}px`;
    //         indicatorRef.current.style.left = `${currentButton.offsetLeft}px`;
    //     }
    // };
    const updateIndicatorPosition = (id: string | null) => {
        if (!id) return; 
        const currentButton = document.getElementById(id);

        console.log("finding button : ", currentButton);
        console.log("small currentButton.offsetWidth1", currentButton?.offsetWidth);
        if(currentButton) {
            if(window.innerWidth < 640) {
                console.log("window innerWidth",window.innerWidth);
                
                // Update position for small screens
                if (currentButton && smallScreenIndicatorRef.current) {
                    console.log("changing width and left on small");
                    console.log("small currentButton.offsetWidth2",currentButton.offsetWidth);
                    console.log("small currentButton.offsetLeft",currentButton.offsetLeft);

                    console.log("small actual span width: ", smallScreenIndicatorRef.current.style.width );
                    smallScreenIndicatorRef.current.style.width = `${currentButton.offsetWidth}px`;
                    smallScreenIndicatorRef.current.style.left = `${currentButton.offsetLeft}px`;
                    console.log("width  on small changed to : ", smallScreenIndicatorRef.current.style.width );
                    console.log("left on small changed to : ", smallScreenIndicatorRef.current.style.left);
                }
            } else {
                // Update position for large screens
                if (largeScreenIndicatorRef.current) {
                    console.log("changing width and left on bigger");
                    console.log("currentButton.offsetWidth2",currentButton.offsetWidth);
                    console.log("currentButton.offsetLeft",currentButton.offsetLeft);
                    console.log("actual span width: ", largeScreenIndicatorRef.current.style.width );

                    largeScreenIndicatorRef.current.style.width = `${currentButton.offsetWidth}px`;
                    largeScreenIndicatorRef.current.style.left = `${currentButton.offsetLeft}px`;
                    console.log("width changed to : ", largeScreenIndicatorRef.current.style.width );
                    console.log("left changed to : ", largeScreenIndicatorRef.current.style.left);
                }
            }
        }
    }
    const handleButtonClick = (id: string) => {
        console.log(id);

        console.log("large current span width ",largeScreenIndicatorRef?.current?.style.width);
        
        setActiveButton(id);
        updateIndicatorPosition(id);
    };

    return (
        <div className='relative '>
            <nav
                className={`w-max gap-1 lg:gap-2 p-0.5  rounded-full border  border-dark/30 dark:border-light/30 border-solid font-medium capitalize items-center md:hidden flex fixed top-6 right-1/2 translate-x-1/2 bg-dark/20 dark:bg-white/10 backdrop-blur z-50 overflow-hidden`}
                style={{
                    top: isToggled ? "1rem" : "-5rem",
                }}
            >
                 <ul className='relative'>
                    {menuItems.map((menuItem: MenuItem) =>
                        menuItem.destination ? (
                            <li key={menuItem.id} className='inline-flex transition-all rounded-full duration-500 ease-out hover:dark:bg-light/10 hover:text-white hover:bg-dark/20  '>
                                <Link
                                    href={menuItem.destination}
                                    className={`z-0 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full ${activeButton === menuItem.id ? "text-light dark:text-dark " : "text-dark dark:text-light"}`}
                                    id={menuItem.id}
                                    onClick={() => handleButtonClick(menuItem.id)}
                                >
                                    {menuItem.label}
                                </Link>
                            </li>
                        ) : null
                    )}

                    <span ref={smallScreenIndicatorRef} className='absolute bottom-0 h-full bg-dark dark:bg-light  transition-all duration-300 -z-20 shadow-lg rounded-full '></span>
                </ul>
                <div className='pr-4'>
                    <LightModeToggle />
                </div>
            </nav>
            <nav className={`w-max gap-1 lg:gap-2 p-0.5  rounded-full border  border-dark/30 dark:border-light/30 border-solid font-medium capitalize items-center hidden md:flex fixed top-6 right-1/2 translate-x-1/2 bg-dark/20 dark:bg-white/10 backdrop-blur z-50 overflow-hidden`}>
           
                <ul className='relative'>
                    {menuItems.map((menuItem: MenuItem) =>
                        menuItem.destination ? (
                            <li key={menuItem.id} className='inline-flex transition-all rounded-full duration-500 ease-out  '>
                                <Link
                                    href={menuItem.destination}
                                    className={`z-0 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full ${activeButton === menuItem.id ? "text-light dark:text-dark " : "text-dark dark:text-white"}`}
                                    id={menuItem.id}
                                    onClick={() => handleButtonClick(menuItem.id)}
                                >
                                    {menuItem.label}
                                </Link>
                            </li>
                        ) : null
                    )}
                    <span ref={largeScreenIndicatorRef} className='absolute bottom-0 h-full transition-all bg-dark dark:bg-light duration-300 -z-20 shadow-lg rounded-full '></span>
                </ul>
                <div className='pr-4'>
                    <LightModeToggle />
                </div>
            </nav>
        </div>
    );
};

export default Navbar;