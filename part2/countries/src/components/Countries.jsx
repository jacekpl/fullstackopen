import CountryView from "./CountryView.jsx";
import {useState} from "react";

const Countries = ({filteredCountries}) => {
    const [showCountry, setShowCountry] = useState(null)
    const handleShowClick = (commonName) => {
        const selectedCountry = filteredCountries.find(country => country.name.common === commonName)
        setShowCountry(selectedCountry)
    }

    const handleHideClick = () => {
        setShowCountry(null)
    }

    if (filteredCountries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    if (filteredCountries.length === 1) {
        return <CountryView country={filteredCountries[0]}/>
    }

    return <div>
        <ul>
            {filteredCountries.map(country => <li key={country.name.common}>{country.name.common} <button onClick={() => handleShowClick(country.name.common)}>show</button></li>)}
        </ul>

        {showCountry && <><CountryView country={showCountry}/><button onClick={handleHideClick}>hide</button></>}
    </div>
}

export default Countries