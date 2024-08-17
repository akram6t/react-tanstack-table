import { useEffect, useState } from 'react';
import { IoMdMoon, IoMdCloud } from 'react-icons/io';

export function ThemeSwitcher(){
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const colorScheme = localStorage.getItem('theme');
        if(colorScheme === 'dark'){
            setIsDarkTheme(true);
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkTheme(isDark => {
            if(!isDark){
                document.body.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                return true;
            }else{
                document.body.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                return false;
            }
        });
    }


    return(
        <span onClick={toggleTheme} className='dark:text-white'>
            {
                isDarkTheme ? <IoMdMoon size={24}/> : <IoMdCloud size={24}/>
            }
        </span>
    )
}