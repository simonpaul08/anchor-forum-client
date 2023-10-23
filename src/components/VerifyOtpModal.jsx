import axios from 'axios';
import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VerifyOtpModal = ({ email, setIsOtp }) => {
    const [otp, setOtp] = useState('');

    const { setCurrentUser } = useAuthContext();
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {

        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}auth/verify`, { otp, email });
            if(res?.data?.message){
                setIsOtp(false);
                setCurrentUser(res.data?.user);
                window.localStorage.setItem('user', JSON.stringify(res.data?.user));
                navigate('/dashboard');
            }
        }catch(e){
            console.log(e);
        }
    }

  return (
    <div className='modal'>
        <div className="modal-content">
            <form onSubmit={handleOnSubmit}>
                <input type="text" className='form-input' value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter OTP' required/>
                <button className='form-btn' type='submit'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default VerifyOtpModal