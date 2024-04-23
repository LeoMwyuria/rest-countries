import React from 'react';


interface CountriesProps {
  countryName: string;
  population: string;
  region: string;
  capital: string;
  imageUrl: string;
  onclick: () => void;
}


const Countries: React.FC<CountriesProps> = ({
  countryName,
  population,
  region,
  capital,
  imageUrl,
  onclick,
}) => {
  return (
    <div onClick={onclick} className='country'>
      <img className='country-img' src={imageUrl} alt={countryName} />
      <p className='countryP'>{countryName}</p>
      <p>Population: {population}</p>
      <p>Region: {region}</p>
      <p>Capital: {capital}</p>
     
    </div>
    

  );
};

export default Countries;
