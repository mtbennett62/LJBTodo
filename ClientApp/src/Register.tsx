import axios from "axios";
import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const  [errorMessage, setErrorMessage] = useState('');
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

    const validatePassword = () => {
        if (!passwordRegex.test(password)) {
            setErrorMessage('Password must be at least 8 characters, contain 1 or more capitals, 1 or more special characters, and 1 or more numbers');
            return false;
        }
        if (confirmPassword != password) {
            setErrorMessage('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleRegister = () => {
        if (!validatePassword()) {
            return;
        }
        setErrorMessage('');

        axios.post("https://localhost:7174/register", {email, password}).then(() => {
            window.location.href = '/login';
        });
    };


    return (
        <div className="loginForm">
            <label htmlFor="email">Email</label>
            <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email" />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            <label htmlFor="confirmPassword">Confirm password</label>
            <input id="confirmPassword" type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirm password" />

            {errorMessage.length > 0 && <span>{errorMessage}</span>}

            <button onClick={handleRegister}>Register</button>
        </div>


    );
};

export default Register;