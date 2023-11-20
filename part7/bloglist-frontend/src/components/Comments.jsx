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
        <div className="my-1">
            <h2><strong>Comments</strong></h2>

            <div>
                <input
                    type="text"
                    id="input-comment"
                    role="input-comment"
                    value={comment}
                    onChange={handleCommentChange}
                />
                <button onClick={addComment} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded my-2 ml-1">add comment</button>
            </div>

            <div>
                <ul>
                    {comments.map(c => <li className="list-disc">{c}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default Comments