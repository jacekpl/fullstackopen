import Person from "./Person.jsx";

const Persons = ({persons, handleDelete}) => {
    return (
        persons.map((person) => {
        return <Person key={person.id+person.name} person={person} handleDelete={handleDelete}/>
    }))
}

export default Persons;