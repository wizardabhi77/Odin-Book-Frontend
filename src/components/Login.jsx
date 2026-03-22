
import { useNavigate } from "react-router-dom";

import { useState } from "react";


export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <form >
                <label htmlFor="username">USERNAME:</label>
                <input type="text" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/> <br />
                <label htmlFor="password">PASSWORD:</label>
                <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
                <button>LOGIN</button>
            </form>

            <p>Are u still not part of the gang? <button onClick={()=> navigate("/register")}>REGISTER NOW!</button></p>

        </div>
    )
}