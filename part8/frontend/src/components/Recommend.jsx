import {useQuery} from "@apollo/client";
import {BOOKS_BY_GENRE, ME} from "../queries.js";

const Recommend = (props) => {
    if (!props.show) {
        return null
    }

    const result = useQuery(ME)

    if (result.loading) {
        return <div>loading...</div>
    }

    const me = result.data.me

    const booksResult = useQuery(BOOKS_BY_GENRE, {
        variables: {genre: me.favoriteGenre}
    })

    if (booksResult.loading) {
        return <div>loading...</div>
    }

    const books = booksResult.data.allBooks

    return (
        <div>
            <h2>books</h2>

            {me.genre && <div>your favourite genre <strong>{me.genre}</strong></div>}

            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.map((a) => (
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend