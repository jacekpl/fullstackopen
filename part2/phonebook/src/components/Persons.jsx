import Person from "./Person.jsx";

const Persons = ({persons}) => {
    return (
        persons.map((person) => {
        return <Person key={person.name} person={person}/>
    }))
}

export default Persons;