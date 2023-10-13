import Weather from "./Weather.jsx";

const CountryView = ({country}) => {
    const languages = [];
    for (const [code, name] of Object.entries(country.languages)) {
        languages.push({code, name})
    }

    return <div>
        <h1>{country.name.common}</h1>
        capital {country.capital[0]}<br/>
        population {country.area}<br/>
        <h2>languages</h2>
        <ul>
            {languages.map(language => <li key={language.code}>{language.name}</li>)}
        </ul>
        <img src={country.flags.png} alt="flag" width="100" height="100"/>
        <Weather city={country.capital[0]}/>
    </div>
}

export default CountryView