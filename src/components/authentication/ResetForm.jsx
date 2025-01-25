import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPasswordRequest } from '../../redux/auth/authSlice'; 

const ResetForm = ({ path }) => {
    const [email, setEmail] = useState("superadmin@yopmail.com");
    
    const { isLoading, error , successMessage} = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();

    console.log(successMessage);
    
    
    const handleForgotPass = (e) => {
        e.preventDefault(); 
        const emailCredentials = email;
        console.log(typeof({email:emailCredentials}));
        dispatch(forgetPasswordRequest({email:emailCredentials})); 
    };
    
    

    return (
        <>
            <h2 className="fs-20 fw-bolder mb-4">Forgot Password</h2>
            <h4 className="fs-13 fw-bold mb-2">Reset your username/password</h4>
            <p className="fs-12 fw-medium text-muted">
                Enter your email, and a reset link will be sent to you. Let's access the best recommendations for you.
            </p>
            <form onSubmit={handleForgotPass} className="w-100 mt-4 pt-2">
                <div className="mb-4">
                    <input
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Email or Username"
                        required 
                    />
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-lg btn-primary w-100" disabled={isLoading}>
                        {isLoading ? "Sending..." : "Reset Now"}
                    </button>
                </div>
            </form>
            <div className="mt-5 text-muted">
                <span> Don't have an account? </span>
                <Link to={path} className="fw-bold">Create an Account</Link>
            </div>
            {successMessage && <div className="mt-3 text-success">{successMessage}</div>}
            {error && <div className="mt-3 text-danger">{error}</div>} 
        </>
    );
};

export default ResetForm;
