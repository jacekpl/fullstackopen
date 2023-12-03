import {useQuery} from "@apollo/client";
import {ALL_BOOKS, BOOKS_BY_GENRE} from "../queries.js";
import {useState} from "react";

const Books = (props) => {
    if (!props.show) {
        return null
    }

    const [genre, setGenre] = useState()
    const query = genre ? BOOKS_BY_GENRE : ALL_BOOKS

    const result = useQuery(query, {
        variables: genre ? {genre: genre} : null
    })

    if(result.loading) {
        return <div>loading...</div>
    }

    const uniqueFilter = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    const books = result.data.allBooks
    const genres = [];
    for(const book of books) {
        genres.push(...book.genres)
    }

    const uniqueGenres = genres.filter(uniqueFilter)

    return (
        <div>
            <h2>books</h2>

            {genre && <div>in genre <strong>{genre}</strong></div>}

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

            {uniqueGenres.map(genre => (
                <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
            ))}
            <button key="all" onClick={() => setGenre(null)}>all genres</button>
        </div>
    )
}

export default Books