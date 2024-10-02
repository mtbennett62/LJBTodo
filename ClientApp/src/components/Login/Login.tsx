import { useState } from "react";
import { useAuth } from "../../provider/authProvider";
import './Login.scss';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();

    function handleLogin() {
        const data = { email, password };
        login(data);
    }

    return (
        <div>
            <h1>Login</h1>
            <p>Log in to access the user home page.</p>
            <div className="loginForm">
                <label htmlFor="email">Email</label>
                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email" />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />

                <button onClick={handleLogin}>Login</button>
            </div>
        </div>

    );
};

export default Login;