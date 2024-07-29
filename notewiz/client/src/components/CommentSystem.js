import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './CommentSystem.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './fontAwesomeConfig';
import {notifySuccess, notifyError} from "./ToastNotification";

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
                // setMessage('Comment added successfully');
                notifySuccess('Comment added successfully');
                fetchComments();
            } catch (error) {
                // setMessage('Failed to add comment');
                notifyError('Failed to add comment');
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
            // setMessage('Comment deleted successfully');
            notifySuccess('Comment deleted successfully');
        } catch (error) {
            // setMessage('Failed to delete comment');
            notifyError('Failed to delete comment');
            console.error("Error deleting comment", error);
        }
    };

    return (
        <div className="comment-system">
            <h3>Comments</h3>
            {/*{message && <div className="message">{message}</div>}*/}
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment"
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>

            <ul className="comment-bar">
                {comments
                    .slice()
                    .reverse()
                    .map((comment, index) => (
                        <li key={index} className="comment">
                            <li className="comment-detail">
                                <strong className="Strong">{comment.username} :</strong>{comment.content}
                            </li>
                            <button onClick={() => handleDeleteComment(comment._id)} className="delete-button">
                                <FontAwesomeIcon icon="trash"/>
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default CommentSystem;
