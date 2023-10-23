import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddPostModal from '../components/AddPostModal';
import { useAuthContext } from '../context/AuthContext';

const Dashboard = () => {

    const [posts, setPosts] = useState([]);
    const [isAddPost, setIsAddPost] = useState(false);
    const { logout } = useAuthContext();

    // get all posts 
    const getAllPosts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_API}post`);
            const data = res.data;
            setPosts(data?.posts);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllPosts();
    }, [])
    return (
        <>
        {isAddPost && <AddPostModal setIsAddPost={setIsAddPost} getAllPosts={getAllPosts}/>}
            <div className='dashboard'>
                <div className="dashboard-container">
                    <h3>Forum Posts</h3>
                    <div className="dashboard-header">
                        <button className='addPostBtn' onClick={(e) => setIsAddPost(true)}>Add Post</button>
                        <button className='addPostBtn' onClick={logout}>Logout</button>
                    </div>
                    {posts?.map(post => {
                        return (
                            <div className='post'>
                                <h4>{post?.name}</h4>
                                <p>{post?.content}</p>
                                <button type='button' className='reply-btn'>
                                    Reply
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>

    )
}

export default Dashboard