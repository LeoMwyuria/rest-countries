
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import './components/countries/countries.css';
import './components/countryDetails/countryDetails.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CountryDetails from './components/countryDetails/CountryDetails.tsx';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/countryDetails/:countryName" element={<CountryDetails />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
