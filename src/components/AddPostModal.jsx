import axios from 'axios';
import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import Loader from './Loader';

const AddPostModal = ({ setIsAddPost, getAllPosts  }) => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const { currentUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}post`, { name, content, owner: currentUser?._id });
            if(res?.data?.message){
                await getAllPosts();
                setIsAddPost(false);
            }
            setIsLoading(false);
        }catch(e){
            console.log(e);
            setIsLoading(false);
        }
    }
  return (
    <div className='modal'>
        <div className="modal-content">
            <h3 className='modal-title'>Add Post</h3>
            <form onSubmit={handleOnSubmit}>
                <input type="text" className='form-input' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' required/>
                <textarea rows="5" className='form-textarea' value={content} onChange={(e) => setContent(e.target.value)} placeholder='Enter Content' required> </textarea>
                <button className='form-btn' type='submit'>{isLoading ? <Loader /> : "Post"}</button>
            </form>
        </div>
    </div>
  )
}

export default AddPostModal