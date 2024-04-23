
import  { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/header/Header';
import FilterButton from './components/FilterButton/FilterButton';
import Countries from './components/countries/Countries';
import { useNavigate } from 'react-router-dom';


function App() {
  const [searchDark, setSearchDark] = useState('search')
  const [darkMode, setDarkMode] = useState('main')
  const [darkLight, setDarkLight] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueRegions, setUniqueRegions] = useState([]);
  const navigation = useNavigate();
  const countryDetailsClick = (country) => {
    navigation(`/countryDetails/${country.name.common}`, { countryData: country });
  };
  const darkModeToggle = () => {
    if (!darkLight) {
        setDarkMode('dark-mode-main');
        setSearchDark('searchDark')
        setDarkLight(true);
    } else {
        
        setDarkMode('main');
        setSearchDark('search')
        setDarkLight(false); 
    }

};
  
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
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
  
  
 

  const filterByName = (searchTerm) => {
    const filtered = data.filter(country => {
      return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredData(filtered);
  };

  const filterByRegion = (region) => {
    const filtered = data.filter(country => country.region === region);
    setFilteredData(filtered);
  };

  console.log("Unique Regions:", uniqueRegions);

  return (
    <div className={darkMode}>
      <Header
      onClick={darkModeToggle}
      />
      <div className="search-div">
        <input
          className={searchDark}
          type="text"
          placeholder="Search For A Country..."
          onChange={(e) => filterByName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              filterByName(e.target.value);
            }
          }}
        />
      </div>
      <FilterButton filterByRegion={filterByRegion} />
      <div className="countries-div">
        {}
        {filteredData.map(country => (
          <Countries 
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
