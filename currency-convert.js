const axios = require('axios');
// http://data.fixer.io/api/latest?access_key=adfb4f83da5c99319a6d1917e903c9cc

const getExchangeRate = async (from, to) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=adfb4f83da5c99319a6d1917e903c9cc');
    const euro = 1 / response.data.rates[from.toUpperCase()];
    const rate = euro * response.data.rates[to.toUpperCase()] ;
    return rate;
};

const getCountries = async (currencyCode) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode.toUpperCase()}`);
    
    return response.data.map(country => country.name);
};

// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then(rate => {
//         convertedAmount = (amount * rate).toFixed(2);
//         return getCountries(to);
//     }).then(countries => {
//         return `${amount.toFixed(2)} ${from} jest warte ${convertedAmount} ${to}. Możesz je wydać w następujących krajach: ${countries}.`;
//     });
// };

const convertCurrency = async (from, to, amount) => {
    const [rate, countries] = await Promise.all([getExchangeRate(from, to), getCountries(to)]);
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount.toFixed(2)} ${from} jest warte ${convertedAmount} ${to}. Możesz je wydać w następujących krajach: ${countries.join(', ')}.`;
};

// getExchangeRate('usd', 'pln').then(rate => console.log(rate)).catch(err => console.log(err));
// getCountries('usd').then(countries => console.log(countries));

convertCurrency('pln', 'usd', 1).then(exchange => console.log(exchange)).catch(err => console.log(err));
convertCurrency('pln', 'eur', 1).then(exchange => console.log(exchange)).catch(err => console.log(err));
// const [ countries, rate ] = await Promise.all([getCountries(to), getExchangeRate(from, to)])