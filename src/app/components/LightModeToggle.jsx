"use client"
import { useThemeSwitch } from './Hooks/useThemeSwitch'
import { MoonIcon, SunIcon} from './Icons'
import { cx } from '../utils/cx'


const  LightModeToggle= () => {
  const [mode, setMode] = useThemeSwitch();
  return (

    <button onClick={() => setMode(mode === "light" ? "dark" : "light")  }
            className={cx("w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1", mode === "light" ? "bg-black text-white" :
            "bg-white text-black" )}
            aria-label="theme-switcher"
            >
                {
                  mode === "light" ? <MoonIcon className={"fill-dark"} />  : <SunIcon className={"fill-dark"} />
                }
            </button>
  )
}

export default LightModeToggle