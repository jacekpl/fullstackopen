import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '1234567'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addContact = (event) => {
        event.preventDefault()

        const filtered = persons.filter(p => {
            return p.name === newName
        })

        if(filtered.length) {
            alert(`${newName} is already added to the phonebook`)
            return
        }

        if(!newNumber.length) {
            alert(`You have to add phone number for ${newName}`)
            return
        }

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

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addContact}>
                <div>
                    name:
                    <input
                        value={newName}
                        onChange={handleNameChange}
                    />
                </div>

                <div>
                    number:
                    <input
                        value={newNumber}
                        onChange={handleNumberChange}
                    />
                </div>

                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(p => {
                return <div key={p.name}>{p.name} {p.number}<br/></div>
            })}
        </div>
    )
}

export default App