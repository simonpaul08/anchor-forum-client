import axios from 'axios';
import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';

const AddPostModal = ({ setIsAddPost, getAllPosts  }) => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const { currentUser } = useAuthContext();

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}post`, { name, content, ownner: currentUser?._id });
            if(res?.data?.message){
                await getAllPosts();
                setIsAddPost(false);
            }
        }catch(e){
            console.log(e);
        }
    }
  return (
    <div className='modal'>
        <div className="modal-content">
            <form onSubmit={handleOnSubmit}>
                <input type="text" className='form-input' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' required/>
                <input type="text" className='form-input' value={content} onChange={(e) => setName(e.target.value)} placeholder='Enter Content' required/>
                <button className='form-btn' type='submit'>Post</button>
            </form>
        </div>
    </div>
  )
}

export default AddPostModal