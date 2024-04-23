import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/header/Header';
import FilterButton from './components/FilterButton/FilterButton';
import Countries from './components/countries/Countries';
import { useNavigate } from 'react-router-dom';

interface Country {
  name: { common: string };
  population: string;
  region: string;
  capital: string;
  flags: { png: string };
  cca3: string;
}

function App(): JSX.Element {
  const [countriesDark, setCountriesDark] = useState('country');
  const [regionDark, setRegionDark] = useState('regionFilters');
  const [filterDark, setFilterDark] = useState('filter');
  const [header, setHeader] = useState('header');
  const [searchDark, setSearchDark] = useState<string>('search');
  const [darkMode, setDarkMode] = useState<string>('main');
  const [darkLight, setDarkLight] = useState<boolean>(false);
  const [data, setData] = useState<Country[]>([]);
  const [filteredData, setFilteredData] = useState<Country[]>([]);
  const [uniqueRegions, setUniqueRegions] = useState<string[]>([]);
  const navigation = useNavigate();

  const countryDetailsClick = (country: Country): void => {
    navigation(`/countryDetails/${country.name.common}`, { state: { countryData: country } });
  };
  

  
  

  const darkModeToggle = (): void => {
    if (!darkLight) {
      setDarkMode('dark-mode-main');
      setSearchDark('searchDark');
      setDarkLight(true);
      setHeader('darkHeader');
      setFilterDark('filterDark');
      setRegionDark('darkRegion');
      setCountriesDark('darkCountry');
    } else {
      setDarkMode('main');
      setSearchDark('search');
      setDarkLight(false);
      setHeader('header');
      setFilterDark('filter');
      setRegionDark('regionFilters');
      setCountriesDark('country');
    }
  };

  useEffect(() => {
    axios.get<Country[]>('https://restcountries.com/v3.1/all')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
        const regions = [...new Set(response.data.map(country => country.region))];
        setUniqueRegions(regions.filter(region => region));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filterByName = (searchTerm: string): void => {
    const filtered = data.filter(country => {
      return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const filterByRegion = (region: string): void => {
    const filtered = data.filter(country => country.region === region);
    setFilteredData(filtered);
  };

  console.log("Unique Regions:", uniqueRegions);

  return (
    <div className={darkMode}>
      <Header onClick={darkModeToggle}
      classname={header}
      />
      <div className="search-div">
      <input
  className={searchDark}
  type="text"
  placeholder="Search For A Country..."
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => filterByName(e.target.value)}
  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      filterByName((e.target as HTMLInputElement).value);
    }
  }}
/>

      </div>
      <FilterButton classname1={filterDark} classname2={regionDark} filterByRegion={filterByRegion} />
      <div className='countries-div'>
        {filteredData.map(country => (
          <Countries
          classname={countriesDark}
            onclick={() => countryDetailsClick(country)}
            key={country.cca3}
            countryName={country.name.common}
            population={country.population}
            region={country.region}
            capital={country.capital && country.capital[0]}
            imageUrl={country.flags.png}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
