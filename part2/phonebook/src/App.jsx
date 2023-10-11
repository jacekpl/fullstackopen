import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personsService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')

    useEffect(() => {
        personsService.getAll().then(initialPersons => setPersons(initialPersons))
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

        personsService.create({name: newName, number: newNumber})
            .then(created => setPersons(persons.concat(created)))

        setPersons(persons.concat({name: newName, number: newNumber}))
        setNewName('')
        setNewNumber('')
    }

    const handleDelete = (id) => {
        if (window.confirm("Delete " + persons.find(p => p.id === id).name + "?")) {
            personsService.deletePerson(id).then(
                setPersons(persons.filter(p => p.id !== id)
                ))
        }
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
        <Persons persons={contactsToShow} handleDelete={handleDelete}/>
    </div>)
}

export default App