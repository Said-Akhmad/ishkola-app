import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkened, setIsDarkened] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('skin');
        console.log('@@@'+storedTheme);
        if (storedTheme !== null) {
          setIsDarkened(JSON.parse(storedTheme) === 'dark');
        }
      } catch (error) {
        console.error('Failed to fetch the theme from storage', error);
      }
    };

    fetchTheme();
  }, []);

  const toggleDarkMode = async (value) => {
    try {
      const newTheme = value !== undefined ? value : !isDarkened;
      setIsDarkened(newTheme);
      await AsyncStorage.setItem('skin', JSON.stringify(newTheme ? 'dark' : 'light'));
    } catch (error) {
      console.error('Failed to save the theme to storage', error);
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDarkened, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
