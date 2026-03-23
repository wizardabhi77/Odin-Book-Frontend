
import { useNavigate } from "react-router-dom";

import { useState } from "react";


export default function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {

        
        e.preventDefault();
       

        try{
            
            
        const res = await fetch("http://localhost:5050/login", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body : JSON.stringify({
                username: username,
                password: password
            })
        });

        

        const data = await res.json();

        if(!res.ok){
            alert(data.message || "Login Failed");
            return;
        }

        

        localStorage.setItem("token", data.token);

        navigate(`/home`);

        }catch(err){
            console.log(err);
            alert("Server error");
        }
    }

    return (
        <div>

            <h1>ODIN_BOOK LOGIN</h1> <br />
            <form onSubmit={handleLogin}>
                <label htmlFor="username">USERNAME:</label>
                <input type="text" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/> <br />
                <label htmlFor="password">PASSWORD:</label>
                <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
                <button type="submit">LOGIN</button>
            </form>

            <p>Are u still not part of the gang? <button onClick={()=> navigate("/register")}>REGISTER NOW!</button></p>

        </div>
    )
}