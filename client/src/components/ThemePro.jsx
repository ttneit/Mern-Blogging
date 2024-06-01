import React, { useContext } from 'react'
import { ThemeContext } from '../context/themeContext';
export default function ThemePro({children}) {
    const themeContext = useContext(ThemeContext)
  return (
    <div className={themeContext.theme}>
        <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)]'>
            {children}
        </div>
    </div>
  );
}
