const Form = ({ search, handleSearchChange }) => {
    return <div>
        <form>
            find countries <input value={search} onChange={handleSearchChange}/>
        </form>
    </div>
}

export default Form