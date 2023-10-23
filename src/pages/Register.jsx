import axios from 'axios';
import React, { useState } from 'react'
import VerifyOtpModal from '../components/VerifyOtpModal';
import { Link } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isOtp, setIsOtp] = useState(false);

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}auth/register`, { name, email });
            if (res?.data?.message) {
                setIsOtp(true);
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            {isOtp && <VerifyOtpModal email={email} setIsOtp={setIsOtp} />}
            <div className='landing'>
                <div className="landing-container">
                    <h1>Welcome To Anchor's Forum</h1>
                    <form onSubmit={handleOnSubmit}>
                        <input type="text" className='form-input' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} required />
                        <input type="email" className='form-input' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <button type='submit' className='form-btn'>Register</button>
                        <p>Already have account? <Link to="/">Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register