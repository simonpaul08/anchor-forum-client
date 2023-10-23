import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../components/Post';
import Comment from '../components/Comment';

const UserProfile = () => {

    const { id } = useParams();
    const [tab, setTab] = useState('posts');
    const [userPosts, setUserPosts] = useState([]);
    const [userComments, setUserComments] = useState([]);

    const userDetails = async () => {
        try {
            const postsRes = await axios.get(`${import.meta.env.VITE_APP_API}post/user/${id}`);
            if (postsRes.data) {
                setUserPosts(postsRes.data?.posts);
            }
            const commentsRes = await axios.post(`${import.meta.env.VITE_APP_API}comment/user`, { owner: id });
            if (commentsRes.data) {
                setUserComments(commentsRes.data?.comments);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        userDetails();
    }, [])

    return (
        <div className='user-profile'>
            <div className="user-profile-content">
                <div className="tabs">
                    <div className={`tab ${tab === 'posts' ? "active" : ""}`} onClick={() => setTab('posts')}>User Posts</div>
                    <div className={`tab ${tab === 'comments' ? "active" : ""}`} onClick={() => setTab('comments')}>User Comments</div>
                </div>

                <div className="tabs-content">
                    {tab === "posts" ? <div>
                        {userPosts?.map(post => {
                            return (
                                <Post key={post?._id} post={post} />
                            )
                        })}
                    </div>
                        :
                        <div>
                            {userComments?.map(comment => {
                                return (
                                    <Comment key={comment?._id} comment={comment} profile={true}/>
                                )
                            })}
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default UserProfile