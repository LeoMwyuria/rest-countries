import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

interface CountryData {
    name: {
      common: string;
      official: string;
    };
    flags: {
      png: string;
    };
    population: number;
    region: string;
    subregion: string;
    capital: string;
    topLevelDomain: string[];
    currencies: {
      [key: string]: {
        name: string;
      };
    };
    languages: {
      [key: string]: string;
    };
  }
  const CountryDetails: React.FC = () => {
    const [darkMode, setDarkMode] = useState('main')
  const [darkLight, setDarkLight] = useState(false);
    const [data, setData] = useState<CountryData | null>(null);
    const { countryName } = useParams<{ countryName: string }>();
    const [header, setHeader] = useState('header')
    const darkModeToggle = () => {
        if (!darkLight) {
            setDarkMode('dark-mode-main');
            setDarkLight(true); 
            setHeader('darkHeader')
        } else {
         
            setDarkMode('main');
            setDarkLight(false);
            setHeader('header')
        }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<CountryData[]>(`https://restcountries.com/v3.1/name/${countryName}`);
          setData(response.data[0]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [countryName]);
  return (
    <div className={darkMode}>
      <Header
      classname={header}
      onClick={darkModeToggle}
      
      />
      <br />
      <div className='back'> <Link to="/">Back</Link></div>
      <br /><br />
      <div className='countryDetails'>
        <img className='details-img' src={data?.flags?.png} alt="" />
        <div className='info'>
        <p className='details-name'>{data?.name?.common}</p>
        <p>Native Name: {data?.name?.official}</p>
        <p>Population: {data?.population}</p>
        <p>Region: {data?.region}</p>
        <p>Sub Region: {data?.subregion}</p>
        <p>Capital: {data?.capital}</p>
        <p>Top Level Domain: {data?.topLevelDomain?.join(', ')}</p>
        <p>Currencies: {data?.currencies && Object.values(data.currencies).map(currency => currency.name).join(', ')}</p>
        <p>Languages: {data?.languages && Object.values(data.languages).join(', ')}</p>
        </div>
        
      </div>
    </div>
  );
};

export default CountryDetails;
