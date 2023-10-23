import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Comment = ({ comment, profile=false }) => {

    const { currentUser } = useAuthContext();
    const [commentOwner, setCommentOwner] = useState(null);
    let timeStamp = moment(comment?.createdAt).format('DD-MM-YYYY');

    const getOwnerDetails = async () => {
        if (comment?.owner != currentUser?._id) {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_API}auth/user/${comment?.owner}`);
                setCommentOwner(res.data?.user);
            } catch (e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        getOwnerDetails();
    }, [])

    return (
        <div className="comment">
            {!profile && <p className='comment-owner'>By - {comment?.owner == currentUser?._id ? "You" : commentOwner}</p>}
            <p className='comment-text'>{comment?.content}</p>
            <div className='comment-timestamp'>
                <p>Posted On  {timeStamp}</p>
            </div>
            {profile && <Link to={`/post/${comment?.post}`}>See Post</Link>}
        </div>
    )
}

export default Comment