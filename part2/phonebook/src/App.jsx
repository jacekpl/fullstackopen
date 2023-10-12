import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personsService from "./services/persons";
import Notification from "./components/Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        personsService.getAll()
            .then(initialPersons => setPersons(initialPersons))
            .catch(error => alert(error.response.data.error))
    }, []);

    const addContact = (event) => {
        event.preventDefault()

        if (!newNumber.length) {
            alert(`You have to add phone number for ${newName}`)
            return
        }

        const filtered = persons.filter(p => p.name === newName)

        if (filtered.length) {
            if (filtered[0].number !== newNumber && window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                personsService.update(filtered[0].id, {name: newName, number: newNumber})
                    .then(updated => setPersons(persons.map(p => p.id !== updated.id ? p : updated)))
                    .catch(error => alert(error.response.data.error))

                setMessage(`Updated ${newName}`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
                return
            }

            alert(`${newName} is already added to the phonebook`)
            return
        }

        personsService.create({name: newName, number: newNumber})
            .then(created => setPersons(persons.concat(created)))
            .catch(error => {
                alert(error.response.data.error)
            })

        setPersons(persons.concat({name: newName, number: newNumber}))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newName}`)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const handleDelete = (id) => {
        if (window.confirm("Delete " + persons.find(p => p.id === id).name + "?")) {
            personsService.deletePerson(id)
                .then(deleted => setPersons(persons.filter(p => p.id !== id)))
                .catch(error => {
                    setPersons(persons.filter(p => p.id !== id))
                    //can be something different, like not responding endpoint, etc
                    alert(`The person '${persons.find(p => p.id === id).name}' was already deleted from server`)
                })

                setMessage(`Deleted ${persons.find(p => p.id === id).name}`)
                setTimeout(() => {
                        setMessage(null)
                    }, 5000
                )
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
        <Notification message={message}/>
        <Filter value={newSearch} onChange={handleSearch}/>

        <h2>add a new</h2>

        <PersonForm onSubmit={addContact} nameValue={newName} onNameChange={handleNameChange}
                    numberValue={newNumber} onNumberChange={handleNumberChange}/>
        <h2>Numbers</h2>
        <Persons persons={contactsToShow} handleDelete={handleDelete}/>
    </div>)
}

export default App
