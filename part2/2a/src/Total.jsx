const Total = ({parts}) => {
    let sum = 0;

    parts.forEach(part => {
        sum += part.exercises;
    });

    return (
        <p>Total exercises {sum}</p>
    )
}

export default Total