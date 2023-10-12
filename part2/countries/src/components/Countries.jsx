const Countries = ({filteredCountries}) => {
    if (filteredCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (filteredCountries.length === 1) {
        const languages = [];
        for (const [code, name] of Object.entries(filteredCountries[0].languages)) {
            languages.push({code, name})
        }

        return <div>
            <h1>{filteredCountries[0].name.common}</h1>
            capital {filteredCountries[0].capital[0]}<br/>
            population {filteredCountries[0].area}<br/>
            <h2>languages</h2>
            <ul>
                {languages.map(language => <li key={language.code}>{language.name}</li>)}
            </ul>
            <img src={filteredCountries[0].flags.png} alt="flag" width="100" height="100"/>
        </div>
    }

    return <div>
        <ul>
            {filteredCountries.map(country => <li key={country.name.common}>{country.name.common}</li>)}
        </ul>
    </div>
}

export default Countries