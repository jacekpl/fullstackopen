const StatisticLine = ({text, value}) => {
    return <div>{text} {value}{text === 'positive' ? ' %' : ''}</div>
}

export default StatisticLine;