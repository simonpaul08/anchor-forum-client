import React from 'react'
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    let content = post?.content?.substring(0, 60);
    return (
        <Link to={`/post/${post?._id}`} className='post'>
            <h4 className='post-title'>{post?.name}</h4>
            <p className='post-content'>{content + "..."}</p>
        </Link>
    )
}

export default Post