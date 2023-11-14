import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import blogService from "../services/blogs.js";

const Comments = ({blogId, comments}) => {
    const [comment, newComment] = useState('')
    const queryClient = useQueryClient()
    const handleCommentChange = (event) => {
        event.preventDefault()
        newComment(event.target.value)
    }

    const addComment = (event) => {
        event.preventDefault()
        newCommentMutation.mutate({id: blogId, comment})
    }

    const newCommentMutation = useMutation({
        mutationFn: blogService.addComment,
        onSuccess: () => {
            queryClient.invalidateQueries(['blogs'])
            newComment('')
        }
    })

    return (
        <>
            <h2>comments</h2>

            <div>
                <input
                    type="text"
                    id="input-comment"
                    role="input-comment"
                    value={comment}
                    onChange={handleCommentChange}
                />
                <button onClick={addComment}>add comment</button>
            </div>

            <div>
                <ul>
                    {comments.map(c => <li>{c}</li>)}
                </ul>
            </div>
        </>
    )
}

export default Comments