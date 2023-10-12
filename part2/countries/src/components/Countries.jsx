import CountryView from "./CountryView.jsx";

const Countries = ({filteredCountries, handleSearch}) => {
    if (filteredCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (filteredCountries.length === 1) {
        return <CountryView country={filteredCountries[0]}/>
    }

    return <div>
        <ul>
            {filteredCountries.map(country => {
                    return (
                        <li key={country.name.common}>{country.name.common}
                            <button onClick={() => handleSearch(country.name.common)}>show</button>
                        </li>
                    )
                }
            )}
        </ul>
    </div>
}

export default Countries