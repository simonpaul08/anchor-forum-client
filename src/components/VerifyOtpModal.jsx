import axios from 'axios';
import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const VerifyOtpModal = ({ email, setIsOtp }) => {
    const [otp, setOtp] = useState('');

    const { setCurrentUser } = useAuthContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleOnSubmit = async (e) => {

        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}auth/verify`, { otp, email });
            if(res?.data?.message){
                setIsOtp(false);
                setCurrentUser(res.data?.user);
                window.localStorage.setItem('user', JSON.stringify(res.data?.user));
                setIsLoading(false);
                navigate('/');
            }
        }catch(e){
            console.log(e);
            setIsLoading(false);
        }
    }

  return (
    <div className='modal'>
        <div className="modal-content">
            <h3 className='modal-title'>Verify OTP</h3>
            <form onSubmit={handleOnSubmit}>
                <input type="text" className='form-input' value={otp} onChange={(e) => setOtp(e.target.value)} placeholder='Enter OTP' required/>
                <button className='form-btn' type='submit'>{isLoading ? <Loader /> : "Submit"}</button>
            </form>
        </div>
    </div>
  )
}

export default VerifyOtpModal