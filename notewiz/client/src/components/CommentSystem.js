import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CommentSystem.css'; // Import the CSS file

function CommentSystem({noteId}) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [message, setMessage] = useState('');

    const fetchComments = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/getComments', {noteId});
            if (Array.isArray(response.data)) {
                setComments(response.data);
            } else {
                setComments([]);
            }
        } catch (error) {
            console.error("Error fetching comments", error);
        }
    };


    useEffect(() => {
        fetchComments();
    }, [noteId]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            try {
                const response = await axios.post('http://localhost:5000/api/addComment', {
                    noteId,
                    content: newComment
                }, {withCredentials: true});
                setComments([...comments, response.data.comment]);
                setNewComment('');
                setMessage('Comment added successfully');
                fetchComments();
            } catch (error) {
                setMessage('Failed to add comment');
                console.error("Error adding comment", error);
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await axios.post('http://localhost:5000/api/deleteComment', {
                noteId,
                commentId
            }, {withCredentials: true});
            setComments(comments.filter(comment => comment._id !== commentId));
            setMessage('Comment deleted successfully');
        } catch (error) {
            setMessage('Failed to delete comment');
            console.error("Error deleting comment", error);
        }
    };

    return (
        <div className="comment-system">
            <h3>Comments</h3>
            {message && <div className="message">{message}</div>}
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment"
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>

            <ul>
                {comments
                    .slice()
                    .reverse()
                    .map((comment, index) => (
                        <li key={index}>
                            <strong>{comment.username}</strong>: {comment.content}
                            <button onClick={() => handleDeleteComment(comment._id)} className="delete-button">
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default CommentSystem;
