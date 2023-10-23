import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom';

const Header = () => {
    const { currentUser, logout } = useAuthContext();
    return (
        <header className='header'>
            <nav>
                <Link to="/" className='brand-logo'>Anchor's Forum</Link>
                <div className="nav-profile">
                    <Link to={`/user/${currentUser?._id}`} className='nav-profile-name'>{currentUser?.name}</Link>
                    {currentUser && <button className='logoutBtn' onClick={logout}>Logout</button>}
                </div>
            </nav>
        </header>
    )
}

export default Header