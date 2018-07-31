const axios = require('axios');
// http://data.fixer.io/api/latest?access_key=adfb4f83da5c99319a6d1917e903c9cc

const getExchangeRate = async (from, to) => {
    try{

        const response = await axios.get('http://data.fixer.io/api/latest?access_key=adfb4f83da5c99319a6d1917e903c9cc');
        const euro = 1 / response.data.rates[from.toUpperCase()];
        const rate = euro * response.data.rates[to.toUpperCase()] ;

        if(isNaN(rate)){
            throw new Error();
        }
        return rate;
    } catch(err){
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
    }
};

const getCountries = async (currencyCode) => {
    try{
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode.toUpperCase()}`);
        return response.data.map(country => country.name);
    } catch(err){
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
};

const convertCurrency = async (from, to, amount) => {
    const [rate, countries] = await Promise.all([getExchangeRate(from, to), getCountries(to)]);
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount.toFixed(2)} ${from} jest warte ${convertedAmount} ${to}. Możesz je wydać w następujących krajach: ${countries.join(', ')}.`;
};

convertCurrency('pln', 'usd', 1).then(exchange => console.log(exchange))
.catch(err => {
    console.log(err.message);
});
// convertCurrency('pln', 'eur', 1).then(exchange => console.log(exchange));

// const add = async (a, b) => a + b + c;

// const doWork = async () => {
//     try{
//         const result = await add(12, 13);
//         return result;
//     } catch(err){
//         return err.message;
//     }
// };

// doWork().then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log('Something went wrong');
// });