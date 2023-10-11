import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, []);

    const addContact = (event) => {
        event.preventDefault()

        const filtered = persons.filter(p => {
            return p.name === newName
        })

        if (filtered.length) {
            alert(`${newName} is already added to the phonebook`)
            return
        }

        if (!newNumber.length) {
            alert(`You have to add phone number for ${newName}`)
            return
        }

        axios.post('http://localhost:3001/persons', {name: newName, number: newNumber})
            .then(response => {
                setPersons(persons.concat(response.data))
            })

        setPersons(persons.concat({name: newName, number: newNumber}))
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        event.preventDefault()
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        event.preventDefault()
        setNewNumber(event.target.value)
    }

    const handleSearch = (event) => {
        event.preventDefault()
        setNewSearch(event.target.value)
    }

    const contactsToShow = newSearch ? persons.filter(p => {
        return p.name.toLowerCase().includes(newSearch.toLowerCase())
    }) : persons

    return (<div>
            <h2>Phonebook</h2>
            <Filter value={newSearch} onChange={handleSearch}/>

            <h2>add a new</h2>

            <PersonForm onSubmit={addContact} nameValue={newName} onNameChange={handleNameChange}
                        numberValue={newNumber} onNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons persons={contactsToShow}/>
        </div>)
}

export default App