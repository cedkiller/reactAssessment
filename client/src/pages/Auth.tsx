import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState} from '../store/store';
import {setMode, setName, setEmail, setEmail2, setPass, setPass2, setConPass, loginSlice, signupSlice} from '../store/slice/authSlice';
import '../assets/css/Style.css';

function Auth () {
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.auth.mode);
    const name = useSelector((state: RootState) => state.auth.name);
    const email = useSelector((state: RootState) => state.auth.email);
    const email2 = useSelector((state: RootState) => state.auth.email2);
    const pass = useSelector((state: RootState) => state.auth.pass);
    const pass2 = useSelector((state: RootState) => state.auth.pass2);
    const conPass = useSelector((state: RootState) => state.auth.conPass);

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        loginSlice(email, pass, dispatch);
    }

    const signup = async (e: React.FormEvent) => {
        e.preventDefault();
        signupSlice(name, email2, pass2, conPass, dispatch);
    }

    return(
        <>
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow rounded-4 auth-card">
                <div className={`fade-slide ${mode === "login" ? "show" : "hide"}`}>
                <h3 className="text-center mb-3">Login</h3>

                <form onSubmit={login}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>

                        <input type="email" value={email} onChange={(e) => dispatch(setEmail(e.target.value))} className="form-control rounded-pill" placeholder="Enter email" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>

                        <input type="password" value={pass} onChange={(e) => dispatch(setPass(e.target.value))} className="form-control rounded-pill" />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 rounded-pill">Login</button>
                </form>

                <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <button className="btn btn-link p-0" onClick={() => dispatch(setMode("signup"))}>
                    Sign Up
                    </button>
                </p>

                </div>

                <div className={`fade-slide ${mode === "signup" ? "show" : "hide"}`}>
                <h3 className="text-center mb-3">Sign Up</h3>

                <form onSubmit={signup}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>

                        <input type="text" value={name} onChange={(e) => dispatch(setName(e.target.value))} className="form-control rounded-pill" placeholder="Enter full name" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>

                        <input type="email" value={email2} onChange={(e) => dispatch(setEmail2(e.target.value))} className="form-control rounded-pill" placeholder="Enter email" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>

                        <input type="password" value={pass2} onChange={(e) => dispatch(setPass2(e.target.value))} className="form-control rounded-pill" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>

                        <input type="password" value={conPass} onChange={(e) => dispatch(setConPass(e.target.value))} className="form-control rounded-pill" />
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-pill">Sign Up</button>
                </form>

                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <button className="btn btn-link p-0" onClick={() => dispatch(setMode("login"))}>
                    Login
                    </button>
                </p>

                </div>
            </div>
        </div>
        </>
    );
}

export default Auth;