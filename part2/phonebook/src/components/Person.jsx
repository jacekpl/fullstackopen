const Person = ({person}) => {
    const {name, number} = person
    return (
        <div>
            <div>{name} {number}</div>
        </div>
    )
}

export default Person