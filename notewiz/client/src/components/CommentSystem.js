import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentSystem({ noteId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/getComments', { noteId });
                setComments(response.data.comments);
            } catch (error) {
                console.error("Error fetching comments", error);
            }
        };

        fetchComments();
    }, [noteId]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            try {
                const response = await axios.post('http://localhost:8000/api/addComment', {
                    noteId,
                    content: newComment
                });
                setComments([...comments, response.data.comment]);
                setNewComment('');
                setMessage('Comment added successfully');
            } catch (error) {
                setMessage('Failed to add comment');
                console.error("Error adding comment", error);
            }
        }
    };

    return (
        <div>
            <h3>Comments</h3>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <strong>{comment.username}</strong>: {comment.content}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment"
                />
                <button type="submit">Submit</button>
            </form>
            {message && <div>{message}</div>}
        </div>
    );
}

export default CommentSystem;
