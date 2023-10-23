import axios from 'axios';
import React, { useState } from 'react'
import VerifyOtpModal from '../components/VerifyOtpModal';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const Main = () => {

    const [email, setEmail] = useState('');
    const [isOtp, setIsOtp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}auth/login`, { email });
            if (res?.data?.message) {
                setIsOtp(true);
            }
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    return (
        <>
        {isOtp && <VerifyOtpModal email={email} setIsOtp={setIsOtp}/>}
            <div className='landing'>
                <div className="landing-container">
                    <h1>Welcome To Anchor's Forum</h1>
                    <form onSubmit={handleOnSubmit}>
                        <input type="email" className='form-input' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <button type='submit' className='form-btn'>{ isLoading ? <Loader /> : "Login" }</button>
                        <p>Dont have account <Link to="/register"> Register</Link></p>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Main