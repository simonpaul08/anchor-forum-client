import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comment from '../components/Comment';
import { useAuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import { FaUser } from 'react-icons/fa';

const PostDetails = () => {

    const { id } = useParams();
    const { currentUser } = useAuthContext();
    const [currentPost, setCurrentPost] = useState(null);
    const [isComment, setIsComment] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const [allComments, setAllComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [postOwner, setPostOwner] = useState(null);

    const getAllComments = async (post) => {

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}comment/post`, { post });
            const data = res.data;
            setAllComments(data?.comments);
        } catch (e) {
            console.log(e);
        }
    }

    const getOwnerDetails = async (id) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_API}auth/user/${id}`);
            setPostOwner(res.data?.user);
        } catch (e) {
            console.log(e);
        }

    }

    // get post by id 
    const getPostById = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_API}post/${id}`);
            const data = res.data;
            setCurrentPost(data?.post);
            getOwnerDetails(data?.post?.owner);
            getAllComments(data?.post?._id);
        } catch (e) {
            console.log(e);
        }
    }

    // post a comment
    const handleComment = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}comment`, { content: commentContent, post: currentPost?._id, owner: currentUser?._id });
            const data = res.data;
            getAllComments(currentPost?._id);
            setCommentContent('');
            setIsComment(false);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getPostById(id);
    }, [])

    return (
        <div className='post-details'>

            <h1 className='post-details-title'>{currentPost?.name || "Post Title"}</h1>
            <p className='post-details-content'>{currentPost?.content || "no content for this post"}</p>
            <p className='post-details-owner'><FaUser size={12}/> {postOwner}</p>
            <div className="reply-container">
                <button className="btn-reply" onClick={() => setIsComment(prev => !prev)}>Post A Comment</button>
                {isComment && <form className='reply-form' onSubmit={handleComment}>
                    <textarea name="comment" id="comment" cols="30" rows="5" placeholder='Your Comment Here...' value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)} required>

                    </textarea>
                    <button className='submitBtn' type='submit'>{isLoading ? <Loader /> : "Post Reply"}</button>
                </form>}
            </div>

            <hr />

            <div className="comments-section">
                {allComments?.length ?
                    allComments?.map(comment => {
                        return (
                            <Comment key={comment?._id} comment={comment} />
                        )
                    })
                    : "No Comments for this post."}
            </div>
        </div>
    )
}

export default PostDetails

