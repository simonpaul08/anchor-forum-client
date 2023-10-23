import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddPostModal from '../components/AddPostModal';
import { useAuthContext } from '../context/AuthContext';
import Post from '../components/Post';

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
            {isAddPost && <AddPostModal setIsAddPost={setIsAddPost} getAllPosts={getAllPosts} />}
            <div className='dashboard'>
                <div className="dashboard-container">
                    <div className="dashboard-header">
                        <button className='addPostBtn' onClick={(e) => setIsAddPost(true)}>Add Post</button>
                    </div>
                    {posts?.map(post => {
                        return (
                            <Post post={post} key={post?._id}/>
                        )
                    })}
                </div>
            </div>
        </>

    )
}

export default Dashboard