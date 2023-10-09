const Total = ({parts}) => {
    const total = parts.reduce((accumulator, part) => {
        return accumulator + part.exercises;
    }, 0);


    return (
        <p>Total exercises {total}</p>
    )
}

export default Total