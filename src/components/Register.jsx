
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    async function handleRegister(e) {
        
        e.preventDefault();

        const res = await fetch("http://localhost:5050/register", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        const data = await res.json();

        console.log(data);

        navigate("/");
    }

    return (
        <div>
            <h1>ODIN_BOOK REGISTER</h1>
       
        <form onSubmit={handleRegister}>
            <label htmlFor="username">USERNAME:</label>
            <input type="text" name="username" required value={username} onChange={(e) => setUsername(e.target.value)}/> <br />
            <label htmlFor="email">EMAIL:</label>
            <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)}/> <br />
            <label htmlFor="password">PASSWORD:</label>
            <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)}/> <br />
            <button type="submit">REGISTER</button>
        </form>

         </div>
    )
}