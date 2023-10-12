import countriesService from "./services/countries.js";
import {useEffect, useState} from "react";
import Form from "./components/Form.jsx";
import Countries from "./components/Countries.jsx";

const App = () => {
    const [countries, setCountries] = useState(null)
    const [search, setSearch] = useState('')

    useEffect(() => {
        countriesService.getAll()
            .then(initialCountries => {
                setCountries(initialCountries)
            })
            .catch(error => {
                alert(error)
            })
    }, []);

    const handleSearchChange = (event) => {
        event.preventDefault()
        setSearch(event.target.value)
    }

    const handleSearch = (countryName) => {
        setSearch(countryName)
    }

    if (countries === null) {
        return <div>loading...</div>
    }

    return (
        <>
            <Form handleSearchChange={handleSearchChange} search={search}/>
            {search && <Countries
                handleSearch={handleSearch}
                filteredCountries={countries.filter(country => {
                    return country.name.common.toLowerCase().includes(search.toLowerCase())
                })}
            />}
        </>
    )
}

export default App
