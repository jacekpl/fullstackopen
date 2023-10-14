import personsService from '../services/persons'

const Person = ({person, handleDelete}) => {
    const {id, name, number} = person

    return (
        <div>
            <div>{name} {number}<button onClick={() => handleDelete(id)}>delete</button> </div>
        </div>
    )
}

export default Person